import projectManagement from "../common_project_management/project_management.js";
import userManagement from "../common_user_management/user_management.js";
import createAdler from "../../vendor/adlerLegacy.js";
import state_manager from "../common_state/state_manager.js"

import settings_component from "./model_settings.js";
import settings_component_details from "./model_settings_details.js";
import side_menu_component from "../common_ui_components/menu/side_menu.js";
import { createTemplateManager } from "../common_import_export/common_import_export.js";

// import {Tabulator} from "../../vendor/tabulator_esm.min.js";

// var getCurrentUser = function(){
//     return userManagement.getCurrentUser()
// }
// var getCurrentProject = function(){
//     return projectManagement.getCurrent()
// }

// var addEntityToProject = function(event, data, instance){
//     var projectId = projectManagement.getCurrent().id
//     console.log(projectId)
//     projectManagement.getProjectStore(projectId,"entities").add({theTime:Date.now()})
//     instance.getNodes().table.do.softUpdate()
//     // instance.update()
// }
// var getItemsList = function (){
//     var projectId = projectManagement.getCurrent().id
//     console.log(projectId)
//     // return projectManagement.getProjectStore(projectId,"default").getAll().map((i)=> {return {value:i.name, onClick:(event, data, instance)=> console.log(i.id, instance)} } )
//     return projectManagement.getProjectStore(projectId,"entities").getAll()
//     // return projectManagement.getProjectStore(projectId,"default").getAll().toString()
// }

// var setUpData = function (event, data, instance) {
//     console.trace(getCurrentProject);
//     instance.setData({
//         currentUserName:getCurrentUser().name,
//         currentProject:getCurrentProject().name,
//         // currentItems:getItemsList(),

//      }, false)
// }

// var setUpTable = function (event, data, instance) {
//      console.log(instance.getNodes());
//      instance.getNodes().table.setData({list:getItemsList()})
// }

var switchComponent = function (event, data, instance) { //check wich view to show
    if (instance.props.modelElementDetails && instance.props.modelElementDetails.get()) {
        // alert("go to switch")
        instance.replaceComponents({settings_component: settings_component_details})
    }
}


var common_settings =createAdler({
    content: p => /*html*/`
    <div class="common-settings">
        <div class="common-settings-side">

            <div class="" a-id="settingsAreaSideMenu" a-props="sections:sideMenuLinks,activeItem:activeSideMenuLink" adler="side_menu_component" ></div>
        
        </div>
        <div class="inherit_height">
            <div class="main-settings inherit_height" a-props="modelElementType:modelElementType,modelElementDetails:modelElementDetails" a-id="settingsArea"  adler="settings_component" ></div>
        </div>
    </div>
    `
    ,
    params:{
        props:{
            modelElementType:"entities",
            modelElementDetails:false,
            sideMenuLinks:[
                {
                    value:"Workflow",
                    items:[
                        {id:"cycles", iconPath:"repeat.svg", value:"Cycles",onClick:()=> state_manager.goTo("/:/:/workflow/cycles")},
                        {id:"simulations", iconPath:"bar-chart-2.svg", value:"Simulations",onClick:()=> state_manager.goTo("/:/:/workflow/simulations")},
                    ]
                },
                {
                    value:"Model",
                    items:[
                        // {id:"entities", value:"Entities",onClick:()=> state_manager.goTo({mode:"replace", url:"model/entities"})},
                        {id:"entities", iconPath:"box.svg", value:"Entities",onClick:()=> state_manager.goTo("/:/:/model/entities")},
                        // {id:"relations", value:"Relations",onClick:()=> state_manager.goTo({mode:"replace", url:"model/relations"})},
                        {id:"relations", iconPath:"share-2.svg", value:"Relations",onClick:()=> state_manager.goTo("/:/:/model/relations")},
                    ]
                },
                {
                    value:"Interface",
                    items:[
                        {id:"views", iconPath:"monitor.svg", value:"Views",onClick:()=> state_manager.goTo({mode:"replace", url:"interface/views"})},
                        {id:"evaluators", iconPath:"code.svg", value:"Evaluators",onClick:()=> state_manager.goTo({mode:"replace", url:"interface/evaluators"})},
                    ]
                },
                {
                    value:"Project",
                    items:[
                        {id:"export_as_template", iconPath:"download.svg", value:"Export as template",onClick:()=> createTemplateManager().exportTemplate()},
                        // {id:"import_template", iconPath:"upload-cloud.svg", value:"Import template",onClick:()=> createTemplateManager().importTemplateFromFile()},
                        {id:"delete_project", iconPath:"trash-2.svg", value:"Delete Project",onClick:()=> projectManagement.removeCurrentProject()},
                    ]
                },
            ],
            activeSideMenuLink:"entities"
        },
        // listen:{
        //     test:function(){
        //         // alert("depli")
        //     },
        // },
        // data:{
        //     currentUserName:"Hello",
        //     currentProject:"push",
        //     currentItems:undefined,
        //     seen:true,
        //     list:[{test:"un"}, {test:"deux"}, {test:"trois"} ]
        // },
        // on:[
        //     // [".action1","click", (event, data)=> alert("test "+ data.test)],
        //     [".action_settings_add_entity","click", (event, data, instance)=> addEntityToProject(event, data, instance) ],
        // ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            onBeforeMount:switchComponent,
            // onMount:(event, data, instance) => setUpTable(event, data, instance),
        },
        
    },
    css:/*css*/`
    .common-settings {
        width:100%;
        height:100%;
        position:relative;
    }.common-settings-side {
        position:absolute;
        width:200px;
        height:100%;
        padding: 7px;
        padding-top: 20px;
        margin-left: 9px;
    }
    .main-settings {
        width:calc(100% - 200px);
        height:100%;
        top:0px;
        position:relative;
        left:200px;
    }
`,
    components:{
        settings_component: settings_component,
        side_menu_component:side_menu_component,
    }
})

export default common_settings