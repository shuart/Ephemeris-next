import createAdler from "../../vendor/adler.js";
import projectManagement from "../common_project_management/project_management.js";
import state from "../common_state/state_manager.js";

var getItemsList = function (){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    return projectManagement.getProjectStore(projectId,"pages").getAll()
}

var renderElement = function(p){
    var htmlElement= document.createElement("div");
    htmlElement.innerHTML= `<div class="side-bar-page-item" >${p.uuid}</div>`
    htmlElement.addEventListener("click", ()=> state.goTo("/:/views/"+p.uuid))
    return htmlElement
}

var renderList = function(event,data, instance){
    var items = getItemsList()
    
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        var htmlItem = renderElement(element)
        instance.getDOMElement().appendChild(htmlItem)
    }
}

var softUpdate= function (event, data, instance) {

}

var component =createAdler({
    content: p => /*html*/`
    <div class="component">
    </div>
        `,
    params:{
        // props:{
        //     test:15,
        // },
        // listen:{
        //     test:function (event, data, instance) {
        //         //alert("test")
        //     }
        // },
        data:{
            // value:"Hello",
            // list:[],
            // table:undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            // [".tableCddomponent","click", (event, data, instance)=> data.onClick(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => renderList(event, data, instance),
            
        },
        methods:{
            // softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    css:/*css*/`
    .side-bar-page-item{
        padding: 8px;
        margin:2px;
        cursor: pointer;
        background-color: #80808042;
    }
    `,
})

export default component