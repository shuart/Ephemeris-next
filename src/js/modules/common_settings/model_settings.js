import projectManagement from "../common_project_management/project_management.js";
import createRelationManagement from "../common_project_management/relations_management.js";
import userManagement from "../common_user_management/user_management.js";
import createAdler from "../../vendor/adler.js";
import state_manager from "../common_state/state_manager.js"
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"
import iconSelect from "../common_ui_components/icon_picker/iconPicker.js"

import table_component from "../common_ui_components/table/table.js";
import createEntityManagement from "../common_project_management/entity_management.js";
// import createViewManagement from "../common_project_management/view_management.js";

// import {Tabulator} from "../../vendor/tabulator_esm.min.js";

var getCurrentUser = function(){
    return userManagement.getCurrentUser()
}
var getCurrentProject = function(){
    return projectManagement.getCurrent()
}

var addEntityToProject = function(event, data, instance){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    var name= prompt("Name")
    if (name) {
        projectManagement.getProjectStore(projectId,data.modelElementType).add({name:name ,theTime:Date.now()})
        instance.getNodes().table.do.softUpdate()
    }
    // instance.update()
}
var getItemsList = function (data, instance){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    var listData ={ list:undefined, cols:undefined}

    if (instance.props.modelElementType.get() == "entities") {
        // listData.list = projectManagement.getProjectStore(projectId,data.modelElementType).getAll()
        var entityRepo = createEntityManagement()
        listData.list = entityRepo.getAll()
        //Create extra fields
        for (let i = 0; i < listData.list.length; i++) {
            const element = listData.list[i];
            element.defaultView = element.getDefaultView()
            element.color = element.attributes.color
            element.iconPath = element.attributes.iconPath
        } 
        
        listData.cols = [
            // {title:"id", field:"uuid", },
            
            {customIcon:true, field:"iconPath", callback:(e,cell)=>{ 
                iconSelect({
                    callback:e=>{projectManagement.getProjectStore(projectId,data.modelElementType).add({uuid:cell.getRow().getData().uuid, iconPath:e.value.name})}
                    })  
                }  
            },
            {title:"Name", field:"name", cellClick:(e,cell)=>state_manager.goTo("/:/settings/details/"+instance.props.modelElementType.get()+"/"+cell.getData().uuid), }, //"/:project/settings/details/:entity/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}
            {customColor:true, field:"color", callback:(e,cell)=>{ projectManagement.getProjectStore(projectId,data.modelElementType).add({uuid:cell.getRow().getData().uuid, color:e.value.color}) }},
            {customObject:true, title:"default view", field:"defaultView", callback:(e,cell)=>{  }, cellClick:function(e, cell){
                var viewRepo = projectManagement.getProjectStore(projectId,"views").getAll()
                mainPopup.mount()
                mainPopup.append(select.instance({
                    data:{
                        list:viewRepo,
                        callback:function(event){ cell.getData().setDefaultViewId(event.value.uuid) }
                    }
                }), "main-slot")
                mainPopup.update();
            }},
        ];
    } else if (instance.props.modelElementType.get() == "evaluators") {
        listData.list = projectManagement.getProjectStore(projectId,data.modelElementType).getAll()
        listData.cols = [
            // {title:"id", field:"uuid", },
            {title:"Name", field:"name", cellClick:(e,cell)=>state_manager.goTo("/:/"+instance.props.modelElementType.get()+"/"+cell.getData().uuid) }, ///evaluators/:evaluatorId 
        ];
    } else if (instance.props.modelElementType.get() == "views") {
        listData.list = projectManagement.getProjectStore(projectId,data.modelElementType).getAll()
        listData.cols = [
            // {title:"id", field:"uuid", },
            {customIcon:true, field:"iconPath", },
            {title:"Name", field:"name", cellClick:(e,cell)=>state_manager.goTo("/:/settings/"+instance.props.modelElementType.get()+"/"+cell.getData().uuid) },  //"/:project/settings/views/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}
            // {formatter:e=>"x", width:40, hozAlign:"center", cellClick:function(e, cell){projectManagement.getProjectStore(projectId,data.modelElementType).remove(cell.getRow().getData().uuid)}},
            {customButton: {value:"Icon", onClick:function(e, cell){
                iconSelect({
                    callback:e=>{console.log(cell.getData()); console.log(e);projectManagement.getProjectStore(projectId,data.modelElementType).add({uuid:cell.getRow().getData().uuid, iconPath:e.value.name})}
                    })  
                } } 
            },
            {customButton: {value:"X", onClick:function(e, cell){projectManagement.getProjectStore(projectId,data.modelElementType).remove(cell.getRow().getData().uuid)} } },
            {customSwitch: {onClick:function(e, cell){projectManagement.getProjectStore(projectId,data.modelElementType).add({uuid:cell.getRow().getData().uuid, isVisible:e.value.checked})}}, field:"isVisible"  },
            
        ];
    } else if (instance.props.modelElementType.get() == "relations")  {
        var relationManagement = createRelationManagement()
        listData.list = relationManagement.getAll()
        listData.list.forEach(element => {
            console.log(element);
            if (element.fromList) {
                
                element.fromList = element.fromList.map(i=>i.name).join(',')
                console.log(element.fromList);
            }
            if (element.toList) {
                
                element.toList = element.toList.map(i=>i.name).join(',')
                console.log(element.toList);
            }
            
        });
        
        listData.cols = [
            {title:"Name", field:"name", },
            {title:"From", field:"fromList", cellClick:function(e, cell){
                var entityRepo = createEntityManagement()
                mainPopup.mount()
                mainPopup.append(select.instance({
                    data:{
                        list:entityRepo.getAll(),
                        callback:function(event){ cell.getData().addSource(event.value.uuid) }
                    }
                }), "main-slot")
                mainPopup.update();
            }, },
            {title:"To", field:"toList", cellClick:function(e, cell){
                var entityRepo = createEntityManagement()
                mainPopup.mount()
                mainPopup.append(select.instance({
                    data:{
                        list:entityRepo.getAll(),
                        callback:function(event){ cell.getData().addTarget(event.value.uuid) }
                    }
                }), "main-slot")
                mainPopup.update();
            },},
        ];
    }

    // if (data.modelElementType != "relations") {
    //     listData.list = projectManagement.getProjectStore(projectId,data.modelElementType).getAll()
    //     listData.cols = [
    //         {title:"id", field:"uuid", },
    //         {title:"value", field:"name",  },
    //     ];
    // } else if (data.modelElementType == "relations"){
    //     var relationManagement = createRelationManagement()
    //     listData.list = relationManagement.getAll()
    //     listData.list.forEach(element => {
    //         console.log(element);
    //         if (element.fromList) {
                
    //             element.fromList = element.fromList.map(i=>i.name).join(',')
    //             console.log(element.fromList);
    //         }
    //         if (element.toList) {
                
    //             element.toList = element.toList.map(i=>i.name).join(',')
    //             console.log(element.toList);
    //         }
            
    //     });
        
    //     listData.cols = [
    //         {title:"value", field:"name", },
    //         {title:"From", field:"fromList", cellClick:function(e, cell){
    //             var entityRepo = createEntityManagement()
    //             mainPopup.mount()
    //             mainPopup.append(select.instance({
    //                 data:{
    //                     list:entityRepo.getAll(),
    //                     callback:function(event){ cell.getData().addSource(event.value.uuid) }
    //                 }
    //             }), "main-slot")
    //             mainPopup.update();
    //         }, },
    //         {title:"To", field:"toList", cellClick:function(e, cell){
    //             var entityRepo = createEntityManagement()
    //             mainPopup.mount()
    //             mainPopup.append(select.instance({
    //                 data:{
    //                     list:entityRepo.getAll(),
    //                     callback:function(event){ cell.getData().addTarget(event.value.uuid) }
    //                 }
    //             }), "main-slot")
    //             mainPopup.update();
    //         },},
    //     ];
    // }
    // return projectManagement.getProjectStore(projectId,"default").getAll().map((i)=> {return {value:i.name, onClick:(event, data, instance)=> console.log(i.id, instance)} } )
    
    return listData
    // return projectManagement.getProjectStore(projectId,"default").getAll().toString()
}

var setUpData = function (event, data, instance) {
    console.trace(getCurrentProject);
    instance.setData({
        modelElementType:instance.props.modelElementType.get(),
        currentUserName:getCurrentUser().name,
        currentProject:getCurrentProject().name,
        // currentItems:getItemsList(),

     }, false)
    //  alert()
    if (instance.props.modelElementType.get() == "evaluators") {
        instance.props.callback.set((e)=>state_manager.goTo("/:/"+instance.props.modelElementType.get()+"/"+e.uuid) ) ///evaluators/:evaluatorId 
    } else if (instance.props.modelElementType.get() == "views") {
        instance.props.callback.set((e)=>state_manager.goTo("/:/settings/"+instance.props.modelElementType.get()+"/"+e.uuid)) //"/:project/settings/views/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}
    } else {
        instance.props.callback.set((e)=>state_manager.goTo("/:/settings/details/"+instance.props.modelElementType.get()+"/"+e.uuid)) //"/:project/settings/details/:entity/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}

    }
}

var setUpTable = function (event, data, instance) {
     console.log(instance.getNodes());
     var tableData = getItemsList(data, instance)
     instance.getNodes().table.setData({list:tableData.list, cols:tableData.cols, height:-180})
     subscribeToDB(event, data, instance)
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
    instance.getNodes().table.setData({list:itemsData.list, cols:itemsData.cols, height:-180}, false)
    instance.getNodes().table.do.softUpdate()
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
                        <a class="navbar-item">
                            About
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
        

            <div class="example-table" style="height:580px" a-id="table" a-props="test:test,callback:callback" adler="table_component" >${p.modelElementType}</div>
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
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUpTable(event, data, instance),
        },
    },
    components:{
        table_component: table_component
    }
})

export default model_settings_component