import createAdler from "../../vendor/adler.js";
import projectManagement from "../common_project_management/project_management.js";
import state from "../common_state/state_manager.js";

var getItemsList = function (){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    return projectManagement.getProjectStore(projectId,"views").getAll()
}

var renderElement = function(p){
    var htmlElement= document.createElement("div");
    htmlElement.innerHTML= `<div class="side-bar-page-item" ><div class="side-bar-page-item-inside" ><img src="./img/icons/${p.iconPath}" style="filter: invert(100%);"> <span>${p.name}</span> </div> </div>`
    htmlElement.addEventListener("click", ()=> state.goTo("/:/views/"+p.uuid))
    return htmlElement
}

var renderRegularElement = function(p){
    var htmlElement= document.createElement("div");
    htmlElement.innerHTML= `<div class="side-bar-page-item" ><div class="side-bar-page-item-inside" ><img src="./img/icons/${p.iconPath}" style="filter: invert(100%);"> <span>${p.name}</span> </div> </div>`
    htmlElement.addEventListener("click", ()=> state.goTo(p.path))
    return htmlElement
}

var renderList = function(event,data, instance){
    var items = getItemsList()
    instance.getDOMElement().innerHTML = ''
    addRegularIcons(instance)
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        if (element.isVisible) {
            var htmlItem = renderElement(element)
            instance.getDOMElement().appendChild(htmlItem)
        }
    }
}

var addRegularIcons = function(instance) {
    var items = [{iconPath:"grid.svg", name:"Dashboard", path:"/:/dashboard", isVisible:true}]
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        if (element.isVisible) {
            var htmlItem = renderRegularElement(element)
            instance.getDOMElement().appendChild(htmlItem)
        }
    }
}

var setUp = function(event,data, instance){
    renderList(event,data, instance)
    subscribeToDB(event,data, instance)
}

var softUpdate= function (event, data, instance) {

}

var subscribeToDB = function (event, data, instance) {
    
    var updateFunc = function (params) {
        
        if (instance && instance.getDOMElement() && instance.getDOMElement().isConnected) {
            renderList(event, data, instance)
            // alert("update")//TODO sometimes to update. Why?
        }else{
            window.removeEventListener("cluster_update", updateFunc);
        }
        
    }
    window.addEventListener("cluster_update", updateFunc);
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
            onMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            // softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    css:/*css*/`
    .side-bar-page-item{
        padding-left: 5px;
        padding-top: 8px;
        margin:0px;
        width:50px;
        height:40px;
        overflow:hidden;
        cursor: pointer;
    }
    .side-bar-page-item-inside{
        padding-left: 10px;
        margin:0px;
        width:200px;
        cursor: pointer;
        display: flex;
    }
    .side-bar-page-item-inside img{
        padding-right: 10px;
    }
    .side-bar-page-item:hover{
        overflow:visible;
        background-color: #000000;
        opacity:0.8;
        width:200px;
        color:white;
    }
    `,
})

export default component