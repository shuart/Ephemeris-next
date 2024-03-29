import { createAdler } from "../../../vendor/adler.js";
import {TabulatorFull as Tabulator} from "../../../vendor/tabulator_esm.min.js";
import { createFolders } from "./folder_custom_table.js";


// import {checkColsForCustomFormating} from "./table_custom_formaters.js"

var setUpTable = function(self){
    var itemsList = self.list || []

    // var colsList = self.cols
    // var currentHeight = self.height
    // console.log(itemsList);
    // var itemsList = []
    var colsList = []

    if (!itemsList[0]) {
        itemsList = [
            {name:"Chapitre 1", _children:[
                {name:"Item 1"},
                {name:"Item 2"},
            ]},
            {name:"Chapitre 2 ", _children:[
                {name:"Item 1"},
                {name:"Item 2"},
            ]},
        ];
    }

    
    if (!colsList || !colsList[0]) {
        colsList = [
            {title:"value", field:"name", cellClick:function(e, cell){
                self.onClick(e, cell)
                }, 
            },
        ];
    }
    console.log(colsList);
    console.log(itemsList);
    // checkColsForCustomFormating(itemsList,colsList)

    //get corret height:
    var instanceElem = self.query(".tableComponent")
    if (instanceElem) {
        instanceElem.remove()//remove current element to clean all events
    }
    var instanceElem = document.createElement("div")
    instanceElem.classList.add("tableComponent")
    var instanceRoot = self.query(".folder_view")
    instanceRoot.append(instanceElem)
    // var tableHeight = 205
    // if (currentHeight<0) {
    //     tableHeight = window.innerHeight + currentHeight
    // } else if(typeof currentHeight == 'int'){
    //     tableHeight = currentHeight
    // }


    var options = {}

    if (itemsList[0] && itemsList[0]._children) {
        options.dataTree = true
        options.dataTreeStartExpanded=true
        options.dataTreeElementColumn="name"
    }
    

    var tableAra = instanceElem

//     console.log(tableAra);
//     var table = new Tabulator(instanceElem, {
//         // height:tableHeight, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
//         data:itemsList, //assign data to table
//         headerVisible:false,
//         dataTreeCollapseElement:"<span class='collapse'>></span>",
//         dataTreeBranchElement:"<span class='branch'>", //hide branch element
//         dataTreeChildIndent:25, //indent child rows by 15 px
//         layout:"fitColumns", //fit columns to width of table (optional)
//         columns:colsList,
//         dataTree:options.dataTree,
//         dataTreeStartExpanded:options.dataTreeStartExpanded,
//         dataTreeElementColumn:options.dataTreeElementColumn,
//         movableRows:true,
//         // movableRowsConnectedElements: "#drop-area", //element to receive rows
//    });
//    self.tablepr = table //to avoid using a proxy
//    console.log(table.rowManager)
    var table = createFolders({
        domElement:tableAra,
        context:self.context,
        data:itemsList,
        cols:self.cols,
        sessionId:self.sessionId,
        onDropped: self.onDropped,
        onNameClick:function(e, cell){
            self.onClick(e, cell)
            },
    })


}

var softUpdate= function (self) {
    console.log("data.table--------------------");
    console.log(self.table);
    console.log(self.list);
    // self.tablepr.replaceData(self.list) //load data array
    var instanceElem = self.query(".tableComponent")
    instanceElem.innerHTML =""
    setUpTable(self)
}

var setUpActionMenu = function(self){
    self.query(".add").addEventListener("click", function (event) {
        self.addItem(event)
    })
}

var folder_view_component =createAdler({
    tag:'folder-view',
    props:{
        cols:undefined,
        context:undefined,
        sessionId:undefined,
        onClick:function (e,cell) {
            alert("no action")
            // state_manager.setSearchParams("test","tas", "silent")
        },
        onDropped:function (e,data) {
            alert("no action")
            // state_manager.setSearchParams("test","tas", "silent")
        },
        addItem:function (e) {
            alert("no action")
            // state_manager.setSearchParams("test","tas", "silent")
        }
        // test:15,
        // dataList:[],
        // height: "auto",
        // onAdd: ()=>alert("fefes"),
        // callback:(event)=>alert(event.name),
        // value:"Hello",
        // height: "auto",
        // list:[],
        // cols:[],
        // table:undefined,
    },
    attributes:[
    ],
    watch:[
        // ["list", softUpdate]
    ],
    methods:[
        // ["updateTable", (self)=>softUpdate(self)],
        ["updateData", (self)=>softUpdate(self)]
    ],
    events : [
        // ["click", ".action-table-add", (ev,self)=>self.onAdd()],
        // [".action-table-add","click", (event, data, instance)=> instance.props.get("onAdd")() ],
    ],
    onRender:(self) =>{
        setUpTable(self)
        setUpActionMenu(self)
    },
    html: p => /*html*/`
    <link rel="stylesheet" href="css/vendor/tabulator_semanticui.min.css">
    <link rel="stylesheet" href="css/vendor/tabulator_semanticui_dark.min.css">
    <link rel="stylesheet" href="css/main.css">



    <div class="folder_view">
        
        <input type="text" placeholder="Search.." class=" folder_search">
        <div class="folder_options">
            <div class="add folder_options_button"><img style="height:18px;" class="darkModeCompatibleIcons"src="./img/icons/folder-plus.svg"></div>
        </div>
        <div class="tableComponent"></div>
    </div>
        `,
    css:/*css*/`

    .folder_view{
        height: 100%;
        width: 100%;
        background-color: #f9f9f9;
        position: relative;
        top: 0px;
    }
    .folder_options{
        height: 24px;
        margin-left: 18px;
        margin-right: 18px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: rgba(136, 136, 136, 0.44);
        justify-content: right;
        display: flex;
    }
    .folder_options_button{
        cursor:pointer;
        display:inline-block;
    }
    .stellae_inj_css_side_search {
        width: 80%;
        margin: 12px;
        border-radius: 11px;
        border-style: none;
        padding: 8px;
        outline: none;
    }

    .tabulator {
        background-color: transparent !important;
        border: none !important;
        margin: 0 0 !important;
}
    }
    .tabulator-row {
        background-color: transparent !important;
        border-bottom: none !important;
        
    }
    .tabulator-row-odd{
        background-color: transparent !important;
        border-bottom: none !important;
    }
    .tabulator-row-even{
        background-color: transparent !important;
        border-bottom: none !important;
    }
    
    .tabulator-cell{
        padding: .5em .75em;
        font-size:14px;
    }
    .tabulator-tree-level-0{
        font-size: .75em;
        letter-spacing: .1em;
        text-transform: uppercase;
        font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size:12px;
    }

    .tableComponent{
        height: calc(100% - 140px);
        overflow: auto; 
    }

    .folder_component_item:hover{
        font-weight:bold;
    }
    .folder_component_item img{
        filter: invert(100%);
    }

    .folder_component_rcm{
        width:150px;
        position:absolute;
        top:5px;
        right:-5px;
        z-index:999999999999999999999999999999999999999;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.2);
        overflow:hidden;
    }

    .folder_component_rcm_option{
        padding: 5px;
        padding-left: 13px;
        font-weight: normal;
    }
    .folder_component_rcm_option:hover{
        background-color: #f9f9f9;
    }
    .folder_search{
        width: 80%;
        border-radius: 11px;
        border-style: none;
        padding: 8px;
        outline: none;
        margin-left: 6%;
        margin-top: 13px;
        
    }
    .folder_view_img{
            
        filter: invert(100%);
    }

    
    @media (prefers-color-scheme: dark) {
        .folder_view{
            background-color: rgb(38, 38, 38);
        }
        .folder_view_img{
            
            filter: invert(0%);
        }
        .tabulator-row {
            background-color: transparent !important;
        }
        .folder_component_item:hover{
        }
        .folder_component_rcm{
            background-color: rgb(27, 27, 27);
        }
        .folder_component_rcm_option:hover{
            background-color: #252525;
        }
        .folder_component_rcm_option img{
            filter: invert(100%);
        }
        .folder_search{
            background-color: #424242;
            color: white;
        }
    
        
      }
    `,
})

export default folder_view_component