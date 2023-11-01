import { createAdler } from "../../../vendor/adler.js";
import {TabulatorFull as Tabulator} from "../../../vendor/tabulator_esm.min.js";


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
    console.log(tableAra);
    var table = new Tabulator(instanceElem, {
        // height:tableHeight, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data:itemsList, //assign data to table
        headerVisible:false,
        dataTreeCollapseElement:"<span class='collapse'>></span>",
        dataTreeBranchElement:"<span class='branch'>", //hide branch element
        dataTreeChildIndent:25, //indent child rows by 15 px
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:colsList,
        dataTree:options.dataTree,
        dataTreeStartExpanded:options.dataTreeStartExpanded,
        dataTreeElementColumn:options.dataTreeElementColumn,
   });
   self.tablepr = table //to avoid using a proxy
   console.log(table.rowManager)



}

// var softUpdate= function (self) {
//     console.log("data.table--------------------");
//     console.log(self.table);
//     console.log(self.list);
//     self.tablepr.replaceData(self.list) //load data array
// }

var folder_view_component =createAdler({
    tag:'folder-view',
    props:{
        onClick:function (e,cell) {
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
        // ["updateData", (self)=>softUpdate(self)]
    ],
    events : [
        // ["click", ".action-table-add", (ev,self)=>self.onAdd()],
        // [".action-table-add","click", (event, data, instance)=> instance.props.get("onAdd")() ],
    ],
    onRender:(self) =>{
        setUpTable(self)
        
    },
    html: p => /*html*/`
    <link rel="stylesheet" href="css/vendor/tabulator_semanticui.min.css">
    <link rel="stylesheet" href="css/vendor/tabulator_semanticui_dark.min.css">
    <link rel="stylesheet" href="css/main.css">



    <div class="folder_view">
        <input type="text" placeholder="Search.." class="stellae_inj_css_side_search">
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
    
    @media (prefers-color-scheme: dark) {
        .folder_view{
            background-color: rgb(38, 38, 38);
        }
        .tabulator-row {
            background-color: transparent !important;
        }
        
      }
    `,
})

export default folder_view_component