import projectManagement from "../common_project_management/project_management.js";
import userManagement from "../common_user_management/user_management.js";
import createAdler from "../../vendor/adler.js";

import table_component from "../common_ui_components/table/table.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"

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
    var entityRepo = createEntityManagement()
    // console.log(entityRepo.getAll());
    var element = entityRepo.getById(instance.props.get("modelElementDetails"))
    // console.log(element.properties);
    // element.addProperty("testprop",54)
    // console.log("propAdded");
    // var element = entityRepo.getAll()[0]
    // console.log(element.properties);
    // alert("settings details")
    var list = []
    for (const key in element.properties) {
        if (Object.hasOwnProperty.call(element.properties, key)) {
            const prop = element.properties[key];
            list.push(prop)
        }
    }
    return list
}
var getRelationList = function (data, instance){
    var entityRepo = createEntityManagement()
    var element = entityRepo.getById(instance.props.get("modelElementDetails"))
    var list = element.relations
    return list
}

var setUpData = function (event, data, instance) {

    //test repo

    // var entityRepo = createEntityManagement()
    // console.log(entityRepo.getAll());
    // var element = entityRepo.getAll()[0]
    // console.log(element.properties);
    // element.addProperty("testprop",54)
    // console.log("propAdded");
    // var element = entityRepo.getAll()[0]
    // console.log(element.properties);
    // alert("settings details")


    // console.trace(getCurrentProject);
    // instance.setData({
    //     modelElementType:instance.props.modelElementType.get(),
    //     currentUserName:getCurrentUser().name,
    //     currentProject:getCurrentProject().name,
    //     // currentItems:getItemsList(),

    //  }, false)
    var entityRepo = createEntityManagement()
    var element = entityRepo.getById(instance.props.get("modelElementDetails"))
    instance.props.set('onAdd', ()=>{
        var propName = prompt()
        element.addProperty(propName,propName)
    } )
    instance.props.set('onAddRelation', ()=>{
        // var propName = prompt()
        mainPopup.mount()
        mainPopup.append(select.instance({
            data:{
                list:entityRepo.getAll(),
                callback:function(event){
                    element.addRelation("type",event.value.uuid)
                    // var currentSchema = instance.props.schema.get(); 
                    // currentSchema[ compPos[0] ].cols[ compPos[1] ].components[ compPos[2] ].settings={entityType:event.value.uuid};
                }
            }
        }), "main-slot")
        mainPopup.update();
        
    } )
}

var setUpTable = function (event, data, instance) {
     console.log(instance.getNodes());
     instance.getNodes().table.setData({list:getItemsList(data,instance)})
     instance.getNodes().relationsTable.setData({list:getRelationList(data,instance)})
}



var model_settings_component =createAdler({
    content: p => /*html*/`
        <div class="container">
            <div class="example-table" a-id="table" a-props="test:test,onAdd" adler="table_component" >${p.modelElementType}</div>
            <div class="relations-table" a-id="relationsTable" a-props="onAdd:onAddRelation" adler="table_component" >Relations${p.modelElementType}</div>
        </div>
        `
        ,
    params:{
        props:{
            modelElementType:"entities",
            modelElementDetails:false,
            onAdd:alert,//TODO: Does not work if undefined. Why?
            onAddRelation:alert,//TODO: Does not work if undefined. Why?
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