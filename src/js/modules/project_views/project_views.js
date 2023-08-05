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

    var viewGrid = viewGridSettings.instance()
    viewGrid.currentPageId= data.viewId
    viewGrid.calledFromInstance= data.calledFromInstance
    viewGrid.schema= loadLayout(data.viewId)
    viewGrid.showSettings= data.settings
    // console.log(loadLayout(data.viewId));
    // console.log(viewGrid.schema);
    instance.query(".view_mount_point_grid").append(viewGrid)

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
        <div class="view_mount_point_grid" a-slot="view_mount_point_grid"></div>

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
            settings:false,
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
            onMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    // css:/*css*/` `,
})

export default component