import createAdler from "../../../vendor/adler.js";
import {TabulatorFull as Tabulator} from "../../../vendor/tabulator_esm.min.js";


var softUpdate= function (event, data, instance) {

}

var setUp = function (event, data, instance) {
    
}

var filterTable = function (event, data, instance) {
    console.log(event.target.value);
    data.table.setFilter("name", "like", event.target.value);
}

var setUpTable = function(event, data, instance){
    var itemsList = data.list
    console.log(itemsList);

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
    console.log(tableAra);
    var table = new Tabulator(tableAra, {
        height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data:itemsList, //assign data to table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            // {title:"id", field:"uuid", },
            {title:"value", field:"name", },
            // {title:"added", field:"theTime", },
        //     {title:"Name", field:"name", width:150},
	 	// {title:"Age", field:"age", hozAlign:"left", formatter:"progress"},
	 	// {title:"Favourite Color", field:"col"},
	 	// {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
        ],
   });
   instance.setData({table:table},false)

   table.on("cellClick", function(e, cell){ 
        data.callback({value : cell.getData()})
   });

}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component container is-max-desktop">
        <div class="field">
            <label class="label">Label</label>
            <div class="control">
                <input class="input action_select_filter" type="text" placeholder="Text input">
            </div>
            <div class="tableArea"></div>
            <p class="help">This is a help text</p>
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
            callback : (event)=> alert(event.value.id),
            table:undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            [".action_select_filter","keydown", filterTable ],
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
    }
    // css:/*css*/` `,
})

export default component