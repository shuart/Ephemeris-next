import createAdler from "../../vendor/adler.js";
import table_viewport from "../viewports/table_viewport/table_ui.js"
import graph from "../common_graph/graph.js"
import viewGridSettings from "./view_grid_settings.js"
import projectManagement from "../common_project_management/project_management.js";

var softUpdate= function (event, data, instance) {

}

var loadLayout = function(currentPageId){
    var projectId = projectManagement.getCurrent().id
    var jsonLayout = projectManagement.getProjectStore(projectId,"views").getById(currentPageId).layout
    console.log(jsonLayout);
    return JSON.parse(jsonLayout || JSON.stringify([
        { settings:{}, cols:[
            { settings:{}, components:[]},{ settings:{}, components:[ { settings:{}, componentType:"test"} ]}
        ]},
        { settings:{}, cols:[
            { settings:{}, components:[]},
        ]}
    ]))
}

function setUp(event, data, instance){
    var projectId = projectManagement.getCurrent().id
    var view = projectManagement.getProjectStore(projectId,"views").getById(data.viewId)
    data.viewName = view.name
    instance.append(viewGridSettings.instance({props:{currentPageId:data.viewId,calledFromInstance:data.calledFromInstance, schema:loadLayout(data.viewId)}}), "view_mount_point_grid");
    // instance.append(graph.instance(), "view_mount_point0");
    // instance.append(table_viewport.instance(), "view_mount_point1");
    // alert("append")
}

function addEntity(event, data, instance){
    instance.append(table_viewport.instance(), "view_mount_point1");
}



var component =createAdler({
    content: p => /*html*/`
    <div class="Component">
        <div class="block"></div>
        <div class="container is-widescreen">
            <h1 a-if="title" class="title">${p.viewName}</h1>
            <h2 a-if="subtitle" class="subtitle">${p.viewId}, called from ${p.calledFromInstance}</h2>
        </div>
        <div a-slot="view_mount_point_grid"></div>

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
            viewId:"Hello",
            viewName :"View",
            calledFromInstance:undefined,
            list:[],
            title:true,
            table:undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            // [".tableCddomponent","click", (event, data, instance)=> data.onClick(event, data, instance) ],
            [".getTemplate","click", (event, data, instance)=> console.log(loadLayout(data.viewId)) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => alert("eeee"),
            onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    // css:/*css*/` `,
})

export default component