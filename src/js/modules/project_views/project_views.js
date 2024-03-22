import createAdler from "../../vendor/adlerLegacy.js";
import table_viewport from "../viewports/table_viewport/table_ui.js"
import graph from "../common_graph/graph.js"
import viewGridSettings from "./view_grid_settings.js"
import projectManagement from "../common_project_management/project_management.js";
import folder_view_component from "../common_ui_components/folder_view/folder_view.js";
import state_manager from "../common_state/state_manager.js";

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
    ])) //TODO, check if can be removed
}
function getVisibleAreas(event,data,instance) {
    var visibleArea = {main:true, left:false}
    var layout= loadLayout(data.viewId)
    
    for (let i = 0; i < layout.length; i++) {
        const element = layout[i];
        if (layout[i].area == "left") {
            visibleArea.left = true
        }
    }
    return visibleArea
}
function setMainView(event, data, instance) {
    var projectId = projectManagement.getCurrent().id
    var view = projectManagement.getProjectStore(projectId,"views").getById(data.viewId)
    data.viewName = view.name

    var viewGrid = viewGridSettings.instance()
    viewGrid.currentPageId= data.viewId
    viewGrid.currentPageName= data.viewName
    viewGrid.currentPageIcon= view.iconPath
    viewGrid.calledFromInstance= data.calledFromInstance
    viewGrid.schema= loadLayout(data.viewId)
    viewGrid.showSettings= data.settings
    // console.log(loadLayout(data.viewId));
    // console.log(viewGrid.schema);
    instance.query(".view_mount_point_grid").append(viewGrid)
}
// function setLeftView(event, data, instance) {
//     var sideArea = instance.query(".view_mount_point_select")
//         sideArea.classList.add("inuse")
//         instance.query(".view_mount_point_grid").classList.add('with_side')
//         instance.query(".container").classList.add('with_side')
//         var folderView = folder_view_component.instance()
        
//         folderView.onClick= function (e, cell) {
//             state_manager.setSearchParams("test","tas", "silent")
//             instance.query(".view_mount_point_grid").innerHTML=''
//             setMainView(event, data, instance)
//         }
//         instance.query(".view_mount_point_select").append(folderView)
// }
function setLeftView(event, data, instance) {
    var sideArea = instance.query(".view_mount_point_select")
        sideArea.classList.add("inuse")
        instance.query(".view_mount_point_grid").classList.add('with_side')
        instance.query(".container").classList.add('with_side')
        
        var projectId = projectManagement.getCurrent().id
        var view = projectManagement.getProjectStore(projectId,"views").getById(data.viewId)
        data.viewName = view.name

        var viewGrid = viewGridSettings.instance()
        viewGrid.currentPageId= data.viewId
        viewGrid.currentArea= "left"
        viewGrid.calledFromInstance= data.calledFromInstance
        viewGrid.schema= loadLayout(data.viewId)
        viewGrid.showSettings= data.settings
        // console.log(loadLayout(data.viewId));
        // console.log(viewGrid.schema);
        instance.query(".view_mount_point_select").append(viewGrid)
}

function setUp(event, data, instance){
    var visibleArea = getVisibleAreas(event, data, instance)
    setMainView(event, data, instance)
    if (visibleArea.left) {
        setLeftView(event, data, instance)
        
    }

}

function addEntity(event, data, instance){
    instance.append(table_viewport.instance(), "view_mount_point1");
}



var component =createAdler({
    content: p => /*html*/`
    <div class="Component" style="height:100%;">
        <div class="view_mount_point_grid" a-slot="view_mount_point_grid" style="height: 100%;"></div>
        <div class="view_mount_point_select" a-slot="view_mount_point_select" style=""></div>

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
    css:/*css*/`
    .view_mount_point_select.inuse{
        height: 100%;
        width: 250px;
        position: absolute;
        top: 0px;
    }
    .view_mount_point_grid.with_side{
        width: calc(100% - 250px);
        position:relative;
        left:250px;
    }
    .container.with_side{
        width: calc(100% - 250px);
        position:relative;
        left:250px;
    }
    `,
})

export default component