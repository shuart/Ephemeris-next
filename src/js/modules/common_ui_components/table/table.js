import createAdler from "../../../vendor/adler.js";
import {TabulatorFull as Tabulator} from "../../../vendor/tabulator_esm.min.js";
import {checkColsForCustomFormating} from "./table_custom_formaters.js"

var setUpTable = function(event, data, instance){
    var itemsList = data.list
    var colsList = data.cols
    // var itemsList = []
    console.log(itemsList);
    console.log(instance);
    console.log(instance.props.test.get());
    // instance.props.test.set("4564fesfsefesfef")

    if (!itemsList[0]) {
        itemsList = [
            // {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
            // {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
            // {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
            // {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
            // {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
        ];
    }
    if (!colsList || !colsList[0]) {
        colsList = [
            {title:"id", field:"uuid", },
            {title:"value", field:"name", },
            {title:"added", field:"theTime", },
        ];
    }

    //check if cols need custom formatters
    checkColsForCustomFormating(itemsList,colsList)

    var tableAra = instance.query("div")
    console.log(tableAra);
    var table = new Tabulator(tableAra, {
        height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data:itemsList, //assign data to table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:colsList,
        // [ //Define Table Columns
            
        // //     {title:"Name", field:"name", width:150},
	 	// // {title:"Age", field:"age", hozAlign:"left", formatter:"progress"},
	 	// // {title:"Favourite Color", field:"col"},
	 	// // {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
        // ],
   });
   instance.setData({table:table},false)
   console.log(table.rowManager)
//    table.on("rowMouseOut", function(e, row){
//     console.log('efssssssss');
//     });
//     table.on("headerMouseOver", function(e, column){
//         console.log('efssssssss');
//     });
   //trigger an alert message when the row is clicked
   table.on("cellClick", function(e, cell){ 
        instance.props.callback.get()(cell.getData())
    //    alert("cell " + cell.getData()+ " Clicked!!!!");
   });
//    table.on("scrollVertical", function(top){
//     //top - the current vertical scroll position
//     console.log(top)
//     });
    // table.on("click", function(e, cell){ 
    //     alert("cell  Clicked!!!!");
    // });

}

var softUpdate= function (event, data, instance) {
    console.log("data.table--------------------");
    console.log(data.table);
    data.table.replaceData(data.list) //load data array
}

var table_component =createAdler({
    content: p => /*html*/`
    <div class="tableComponent"></div>
    <div a-if="onAdd" class="action-table-add">add</div>
    <div class="qdsqs"></div>
        `,
    params:{
        props:{
            test:15,
            dataList:[],
            // onAdd: alert,
            callback:(event)=>alert(event.name),
        },
        listen:{
            test:function (event, data, instance) {
                //alert("test")
            }
        },
        data:{
            value:"Hello",
            list:[],
            cols:[],
            table:undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            [".action-table-add","click", (event, data, instance)=> instance.props.get("onAdd")() ],
        ],
        events:{
            onMount:(event, data, instance) => setUpTable(event, data, instance),
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    // css:/*css*/` `,
})

export default table_component