import createAdler from "../../../vendor/adler.js";
import table_component from "../../common_ui_components/table/table.js";
import projectManagement from "../../common_project_management/project_management.js";

var softUpdate= function (event, data, instance) {

}

var addItem = function (event, data, instance) {
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    var name= prompt("Name")
    if (name) {
        projectManagement.getProjectStore(projectId,"instances").add({name:name ,theTime:Date.now()})
        instance.getNodes().tablevp.do.softUpdate()
    }
}

var getItemsList = function (data){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    // return projectManagement.getProjectStore(projectId,"default").getAll().map((i)=> {return {value:i.name, onClick:(event, data, instance)=> console.log(i.id, instance)} } )
    return projectManagement.getProjectStore(projectId,"instances").getAll()
    // return projectManagement.getProjectStore(projectId,"default").getAll().toString()
}

var setUpTable = function (event, data, instance) {
     console.log(instance.getNodes());
     instance.getNodes().tablevp.setData({list:getItemsList(data)})
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component container">
        <div class="action_add_entity" >TABLE</div>
        <div class="example-table" a-id="tablevp" adler="table_component" ></div>
        
    </div>
        `,
    params:{
        props:{
            test:15,
        },
        listen:{
            test:function (event, data, instance) {
                //alert("test")
            }
        },
        data:{
            value:"Hello",
            list:[],
            table:undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            [".action_add_entity","click", (event, data, instance)=> addItem(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUpTable(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    components:{
        table_component: table_component,
    }
    // css:/*css*/` `,
})

export default component