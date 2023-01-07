import createAdler from "../../../vendor/adler.js";
import {TabulatorFull as Tabulator} from "../../../vendor/tabulator_esm.min.js";
import {checkColsForCustomFormating} from "../table/table_custom_formaters.js"


var softUpdate= function (event, data, instance) {
    var itemsList = data.list
    if (typeof itemsList === 'function') {
        itemsList = data.list()
    }
    populateSelected(data, instance)
    data.table.replaceData(itemsList) //load data array
}

var setUp = function (event, data, instance) {
    
}

var filterTable = function (event, data, instance) {
    console.log(event.target.value);
    data.table.setFilter("name", "like", event.target.value);
}

var setUpTable = function(event, data, instance){
    var itemsList = data.list
    if (!itemsList[0]) {
                itemsList = [
                    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
                    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
                    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                ];
            }
    var tableAra = instance.query(".tableArea")
    var table = new Tabulator(tableAra, {
        height:window.innerHeight*0.5,
        data:itemsList,
        clipboard:true,
        clipboardPasteAction:"replace",
        columns:[
            {title:"Name", field:"name", width:200, editor:"input"},
            {title:"Progress", field:"progress", width:100, sorter:"number", editor:"input"},
            {title:"Gender", field:"gender", editor:"input"},
            {title:"Rating", field:"rating", width:80, editor:"input"},
            {title:"Favourite Color", field:"col", editor:"input"},
            {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date", editor:"input"},
            {title:"Driver", field:"car", hozAlign:"center", formatter:"tickCross", editor:"input"},
        ],
    });
//     var colsList = []
//     if (typeof itemsList === 'function') {
//         itemsList = data.list()
//     }

//     populateSelected(data, instance)
//     console.log(itemsList);

//     if (!itemsList[0]) {
//         itemsList = [
//             {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
//             {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
//             {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
//             {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
//             {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
//         ];
//     }
//     if (itemsList[0].iconPath) {
//         colsList.push({customIcon:true, field:"iconPath", })
//     }
//     colsList.push({title:"value", field:"name", cellClick:function(e,cell){
//         data.callback({value : cell.getData()})
//         instance.do.softUpdate()
//         },
//     })

//     //check if cols need custom formatters
//     checkColsForCustomFormating(itemsList,colsList)

//     var tableAra = instance.query(".tableArea")
//     console.log(tableAra);
//     var table = new Tabulator(tableAra, {
//         height:window.innerHeight*0.5, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
//         data:itemsList, //assign data to table
//         layout:"fitColumns", //fit columns to width of table (optional)
//         headerVisible:false,
//         columns:colsList
        
//         // [ //Define Table Columns
//         //     // {title:"id", field:"uuid", },
            
//         // //     {title:"Name", field:"name", width:150},
// 	 	// // {title:"Age", field:"age", hozAlign:"left", formatter:"progress"},
// 	 	// // {title:"Favourite Color", field:"col"},
// 	 	// // {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
//         // ],
//    });
   instance.setData({table:table},false)

//    table.on("cellClick", function(e, cell){ 
//         data.callback({value : cell.getData()})
//         instance.do.softUpdate()
//    });

}

var populateSelected = function (data, instance) {
    var itemsList = data.selectedlist
    if (typeof itemsList === 'function') {
        itemsList = data.selectedlist()
    }
    var selectedArea = instance.query(".selectedArea")
    var html = itemsList.map(i=>'<span class="selectTag">'+i.name+'<span data-uuid="'+i.uuid+'" class="selectCloseTag"> | X</span></span>').join('')
    selectedArea.innerHTML =html 
    selectedArea.querySelectorAll('.selectCloseTag').forEach(item => {
        item.addEventListener('click', event => {
          
            data.closeSelectedCallback({uuid:event.target.dataset.uuid})
        })
      })
}

var inputTable =createAdler({
    content: p => /*html*/`
    <div class="Component container is-max-desktop">
        <div class="field">
            <label class="label"></label>
            <div class="control">
                <input class="input action_select_filter" type="text" placeholder="Search">
            </div>
            <div class="selectedArea"></div>
            <div class="tableArea"></div>
        </div>
    </div>
        `,
    params:{
        props:{
            list:15,
        },
        listen:{
            test:function (event, data, instance) {
                //alert("test")
            }
        },
        data:{
            value:"Hello",
            list:[],
            selectedlist:[],
            callback : (event)=> alert(event.value.id),
            closeSelectedCallback: (event)=> console.log(event.value.id),
            table:undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            [".action_select_filter","keyup", filterTable ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            onMount:(event, data, instance) => setUpTable(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    components:{
        // table_component: table_component
    },
    css:/*css*/`
    .selectTag {
        align-items: center;
        background-color: #f5f5f5;
        border-radius: .375em;
        display: inline-flex;
        font-size: .75rem;
        height: 2em;
        justify-content: center;
        line-height: 1.5;
        padding-left: .75em;
        padding-right: .75em;
        white-space: nowrap;
        background-color: #00d1b2;
        margin-right:5px;
        font-weight: bold;
    }
    .selectCloseTag {
        cursor:pointer;
        color:#b32415;
    }
    .selectedArea {
        margin:8px;
    }
    `,
})

export default inputTable