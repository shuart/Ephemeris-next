import createAdler from "../../vendor/adlerLegacy.js";
import table_viewport from "../viewports/table_viewport/table_ui.js"
import graph from "../common_graph/graph.js"
import viewGridSettings from "./view_grid_settings.js"
import projectManagement from "../common_project_management/project_management.js";

var softUpdate= function (event, data, instance) {

}

var loadLayout = function(currentPageId){
    var projectId = projectManagement.getCurrent().id
    var jsonLayout = projectManagement.getProjectStore(projectId,"views").getById(currentPageId).layout
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
    // instance.append(viewGridSettings.instance({props:{currentPageId:data.viewId,showSettings:true, schema:loadLayout(data.viewId)}}), "view_mount_point_grid");
    // // instance.append(graph.instance(), "view_mount_point0");
    // // instance.append(table_viewport.instance(), "view_mount_point1");


    var viewGrid = viewGridSettings.instance()
    viewGrid.currentPageId= data.viewId
    viewGrid.showSettings= true
    viewGrid.calledFromInstance= data.calledFromInstance
    viewGrid.schema= loadLayout(data.viewId)
    // console.log(loadLayout(data.viewId));
    // console.log(viewGrid.schema);
    instance.query(".view_mount_point_grid").append(viewGrid)
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component" style="height:100%;">
        <div class="block"></div>
        <div class="container is-widescreen" style="height:90%;">
            <h1 class="title">${p.viewName}</h1>
            <h2 class="subtitle">settings of ${p.viewId}</h2>
            <div class="view_mount_point_grid" a-slot="view_mount_point_grid" style="height: calc(100% - 90px);"></div>
        </div>
        
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
            list:[],
            table:undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            // [".tableCddomponent","click", (event, data, instance)=> data.onClick(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => alert("eeee"),
            onMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    // css:/*css*/` `,
})

export default component