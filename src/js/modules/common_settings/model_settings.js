import projectManagement from "../common_project_management/project_management.js";
import createRelationManagement from "../common_project_management/relations_management.js";
import userManagement from "../common_user_management/user_management.js";
import createAdler from "../../vendor/adlerLegacy.js";
import state_manager from "../common_state/state_manager.js"
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"
import iconSelect from "../common_ui_components/icon_picker/iconPicker.js"

import table_component from "../common_ui_components/table/table.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import { createSimpleSummaryPageForEntities } from "../common_quick_settings/common_quick_settings.js";
import { createAttributeSettingsTable } from "./settings_tables/attributes_table.js";
import { createRelationsSettingsTable } from "./settings_tables/relations_table.js";
import { createEntitiesSettingsTable } from "./settings_tables/entities_table.js";
import { createAttributesAddEditor } from "../common_add_editors/common_attributes_add_editor.js";
import { createStructureSettingsTable } from "./settings_tables/structures_table.js";
import { createStructuresAddEditor } from "../common_add_editors/common_structures_add_editor.js";
// import createViewManagement from "../common_project_management/view_management.js";

var getCurrentUser = function(){
    return userManagement.getCurrentUser()
}
var getCurrentProject = function(){
    return projectManagement.getCurrent()
}

var addEntityToProject = function(event, data, instance){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    if (data.modelElementType=="attributes") {
        // data.modelElementType = "properties"
        createAttributesAddEditor()
    }else if (data.modelElementType=="structures") {
        createStructuresAddEditor()
    }else{
        var name= prompt("Name")
        if (name) {
            projectManagement.getProjectStore(projectId,data.modelElementType).add({name:name ,theTime:Date.now()})
            // instance.getNodes().table.do.softUpdate()
        }
    }
   
    // instance.update()
}
var getItemsList = function (data, instance){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    var listData ={ list:undefined, cols:undefined}

    if (instance.props.modelElementType.get() == "entities") {
        
        var tableSettings = createEntitiesSettingsTable(projectId, data)
        listData.list = tableSettings.list
        listData.cols = tableSettings.cols

    } else if (instance.props.modelElementType.get() == "cycles") {
        listData.list = projectManagement.getProjectStore(projectId,instance.props.modelElementType.get()).getAll()
        listData.cols = [
            // {title:"id", field:"uuid", },
            {title:"Name", field:"name", cellClick:(e,cell)=>state_manager.goTo("/:/"+instance.props.modelElementType.get()+"/"+cell.getData().uuid) }, ///evaluators/:evaluatorId 
        ];
    } else if (instance.props.modelElementType.get() == "simulations") { //TODO move to own page
        listData.list = projectManagement.getProjectStore(projectId,instance.props.modelElementType.get()).getAll()
        listData.cols = [
            // {title:"id", field:"uuid", },
            {title:"Name", field:"name", cellClick:(e,cell)=>state_manager.goTo("/:/"+instance.props.modelElementType.get()+"/"+cell.getData().uuid) }, ///evaluators/:evaluatorId 
        ];
    } else if (instance.props.modelElementType.get() == "evaluators") {
        listData.list = projectManagement.getProjectStore(projectId,instance.props.modelElementType.get()).getAll()
        listData.cols = [
            // {title:"id", field:"uuid", },
            {customIcon:true, field:"iconPath", defaultPath:"code.svg"},
            {title:"Name", field:"name", cellClick:(e,cell)=>state_manager.goTo("/:/"+instance.props.modelElementType.get()+"/"+cell.getData().uuid) }, ///evaluators/:evaluatorId 
            {customButton: {value:"", iconPath:"copy.svg", style:"", onClick:function(e, cell){
                var dataToCopy = projectManagement.getProjectStore(projectId,data.modelElementType).getById(cell.getRow().getData().uuid);
                var newName = prompt("Set Name", dataToCopy.name+"_copy")
                if (newName) {
                    projectManagement.getProjectStore(projectId,data.modelElementType).add({name:newName ,theTime:Date.now(), nodeLayout: dataToCopy.nodeLayout})
                }
            } } },
            {customButton: {value:"X", style:"smallCircle", onClick:function(e, cell){projectManagement.getProjectStore(projectId,data.modelElementType).remove(cell.getRow().getData().uuid)} } },
        ];
    } else if (instance.props.modelElementType.get() == "views") {
        listData.list = projectManagement.getProjectStore(projectId,instance.props.modelElementType.get()).getAll()
        listData.cols = [
            // {title:"id", field:"uuid", },
            {customIcon:true, field:"iconPath", defaultPath:"monitor.svg",callback:(e,cell)=>{ 
                iconSelect({
                    callback:e=>{console.log(cell.getData()); console.log(e);projectManagement.getProjectStore(projectId,instance.props.modelElementType.get()).add({uuid:cell.getRow().getData().uuid, iconPath:e.value.uuid})}
                    })  
                }  
            },
            {title:"Name", field:"name", cellClick:(e,cell)=>state_manager.goTo("/:/settings/"+instance.props.modelElementType.get()+"/"+cell.getData().uuid) },  //"/:project/settings/views/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}
            // {formatter:e=>"x", width:40, hozAlign:"center", cellClick:function(e, cell){projectManagement.getProjectStore(projectId,data.modelElementType).remove(cell.getRow().getData().uuid)}},
            // {customButton: {value:"Icon", onClick:function(e, cell){
            //     iconSelect({
            //         callback:e=>{console.log(cell.getData()); console.log(e);projectManagement.getProjectStore(projectId,data.modelElementType).add({uuid:cell.getRow().getData().uuid, iconPath:e.value.name})}
            //         })  
            //     } } 
            // },
            
            {title:"Visible",customSwitch: {onClick:function(e, cell){projectManagement.getProjectStore(projectId,data.modelElementType).add({uuid:cell.getRow().getData().uuid, isVisible:e.value.checked})}}, field:"isVisible"  },
            {customButton: {value:"X", style:"smallCircle", onClick:function(e, cell){projectManagement.getProjectStore(projectId,data.modelElementType).remove(cell.getRow().getData().uuid)} } },
            
        ];
    } else if (instance.props.modelElementType.get() == "attributes") {
        var tableSettings = createAttributeSettingsTable(projectId)
        listData.list = tableSettings.list
        listData.cols = tableSettings.cols
    } else if (instance.props.modelElementType.get() == "relations")  {
        var tableSettings = createRelationsSettingsTable(projectId);
        listData.list = tableSettings.list
        listData.cols = tableSettings.cols
    }else if (instance.props.modelElementType.get() == "structures")  {
        var tableSettings = createStructureSettingsTable(projectId);
        listData.list = tableSettings.list
        listData.cols = tableSettings.cols
    }
    
    return listData
    // return projectManagement.getProjectStore(projectId,"default").getAll().toString()
}

var addSummaryPageToProject = function (event, data, instance) {
    // alert("fefesfses")
    createSimpleSummaryPageForEntities()
}

var setUpData = function (event, data, instance) {
    console.trace(getCurrentProject);
    instance.setData({
        modelElementType:instance.props.modelElementType.get(),
        currentUserName:getCurrentUser().name,
        currentProject:getCurrentProject().name,
        // currentItems:getItemsList(),
     }, false)
    if (instance.props.modelElementType.get() == "evaluators") {
        instance.props.callback.set((e)=>state_manager.goTo("/:/"+instance.props.modelElementType.get()+"/"+e.uuid) ) ///evaluators/:evaluatorId 
    } else if (instance.props.modelElementType.get() == "views") {
        instance.props.callback.set((e)=>state_manager.goTo("/:/settings/"+instance.props.modelElementType.get()+"/"+e.uuid)) //"/:project/settings/views/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}
    } else {
        instance.props.callback.set((e)=>state_manager.goTo("/:/settings/details/"+instance.props.modelElementType.get()+"/"+e.uuid)) //"/:project/settings/details/:entity/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}

    }
}

var setUpTable = function (event, data, instance) {
    //  console.log(instance.getNodes());
     var tableData = getItemsList(data, instance)
    //  instance.getNodes().table.setData({list:tableData.list, cols:tableData.cols, height:-180})
    //  subscribeToDB(event, data, instance)
     setTimeout(function () {
        var mountPlace = instance.query(".setting-model-table")
        console.log(mountPlace);
        var tablevp = table_component.instance()
        tablevp.classList="current-table"
        tablevp.list = tableData.list
        tablevp.cols = tableData.cols
        tablevp.height = -180
        mountPlace.append(tablevp)
        subscribeToDB(event, data, instance)
    })
}

var subscribeToDB = function (event, data, instance) {
    var updateFunc = function (params) {
        if (instance && instance.getDOMElement() && instance.getDOMElement().isConnected) {
            softUpdate(event, data, instance)
            // alert("update")//TODO sometimes to update. Why?
        }else{
            window.removeEventListener("cluster_update", updateFunc);
        }
    }
    window.addEventListener("cluster_update", updateFunc);
}

var softUpdate= function (event, data, instance) {
    var itemsData = getItemsList(data, instance)
    // instance.getNodes().table.setData({list:itemsData.list, cols:itemsData.cols, height:-180}, false)
    // instance.getNodes().table.do.softUpdate()
    var itemsData = getItemsList(event, instance)
    var currentTable = instance.query(".current-table")
    console.log(instance.query(".current-table"));
    currentTable.list = itemsData.list
    currentTable.updateTable()
}

var model_settings_component =createAdler({
    content: p => /*html*/`
        <div class="container inherit_height" >
            <nav class="navbar" role="navigation" aria-label="main navigation">

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                    <a class="navbar-item action_settings_add_entity">
                        Add
                    </a>

                    <a class="navbar-item">
                        Documentation
                    </a>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                        More
                        </a>

                        <div class="navbar-dropdown">
                        <a class="navbar-item action_settings_add_quick_view_summary">
                            Add Summary Page
                        </a>
                        <a class="navbar-item">
                            Jobs
                        </a>
                        <a class="navbar-item">
                            Contact
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">
                            Report an issue
                        </a>
                        </div>
                    </div>
                    </div>

                    <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light">
                            Log in
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </nav>
        

            <div class="setting-model-table" style="height:580px" a-id="table" a-props="test:test,callback:callback" adler="table_component" ></div>
        </div>
        `
        ,
    params:{
        props:{
            modelElementType:"entities",
            callback: ()=> true,
        },
        listen:{
            test:function(){
                // alert("depli")
            },
        },
        data:{
            currentUserName:"Hello",
            currentProject:"push",
            modelElementType:undefined,
            currentItems:undefined,
            seen:true,
            list:[{test:"un"}, {test:"deux"}, {test:"trois"} ]
        },
        on:[
            // [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action_settings_add_entity","click", (event, data, instance)=> addEntityToProject(event, data, instance) ],
            [".action_settings_add_quick_view_summary","click", (event, data, instance)=> addSummaryPageToProject(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUpTable(event, data, instance),
        },
    },
    components:{
        // table_component: table_component
    }
})

export default model_settings_component