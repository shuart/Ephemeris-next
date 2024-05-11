import createAdler from "../../../vendor/adlerLegacy.js";
import table_component from "../../common_ui_components/table/table.js";
import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";
import instanceCard from "../../common_ui_components/instance_card/instance_card.js";
import createInstancesManagement from "../../common_project_management/instances_management.js";
import { subscribeToChanges, subscribeToSearchParam } from "../../common_state/state_change_subscription.js";
import state from "../../common_state/state_manager.js";
import { getViewGridPlaceholder } from "../../project_views/view_grid_placeholders.js";
import { textArea } from "../../common_ui_components/textEditor.js/textArea.js";


var addItem = function (event, data, instance) {
    instance.props.get("addAction" )()
}
var setCurrentTags = function () {
    var instancesRepo = createInstancesManagement()
    var instances = instancesRepo.getAll()
  
    return instances.map(i=>({id:i.uuid, tag:i.name, icon:"./img/icons/"+i.iconPath}))
  }

var getEvaluatorData = function (event, data, instance){

    var config = {}
    var useNodes = false
    var renderSettings = instance.props.get("settings").renderSettings
    if (renderSettings) {
        useNodes = renderSettings.useNodes || false
    }
    // alert(useNodes)
    if (!useNodes) {

        config.instance ={}
        config.instances =[]
        if (renderSettings?.useCurrentlySelected ) {
            config.useCurrentlySelected = true
            config.instance =state.getSearchParam("selected") || {}
        }
        if (renderSettings?.entitiesToDisplay ) {
            var instanceRepo = createInstancesManagement()
            config.instances = instanceRepo.getByType(renderSettings.entitiesToDisplay)
        }
        if (renderSettings?.fieldsToDisplay && renderSettings?.fieldsToDisplay[0]) {
            config.attribute = renderSettings?.fieldsToDisplay[0]
        }
        // data.cols =evaluator.evaluate().cols
        // data.actions =evaluator.evaluate().actions
        if (typeof config.instance == "string") {
            var instanceRepo = createInstancesManagement()
            config.instance = instanceRepo.getById(config.instance) || {}
        }

        // data.instance =evalResult.instance
        // data.attribute = "desc"
        // data.instances =  []
        
        console.log(config);

    }else{
        // alert("efsfs")
        var evaluator = createEvaluator({originInstance:instance.props.get('settings').calledFromInstance, type:instance.props.get("settings").entityType , graphId:instance.props.get("settings").evaluatorId})
        console.log(evaluator);
        if (!evaluator.evaluate()) {
            return {instance:{}}
        }
        config.instance =evaluator.evaluate().output_instance_card.instance 
        // data.cols =evaluator.evaluate().cols
        // data.actions =evaluator.evaluate().actions
        if (typeof config.instance == "string") {
            var instanceRepo = createInstancesManagement()
            config.instance = instanceRepo.getById(config.instance)
        }
        
        console.log(config);
    }
    data.config = config
    return config
}

var updateTableInstance = function name (event, data, instance) {
    // var renderSettings = instance.props.get("settings").renderSettings
    if (data.config.useCurrentlySelected ) {
        data.config.instance =state.getSearchParam("selected") || {}
        if (typeof data.config.instance == "string") {
            var instanceRepo = createInstancesManagement()
            data.config.instance = instanceRepo.getById(data.config.instance) || {}
        }
        console.log(data.config);
        if (data.config.instance.hasPropertyWithUuid(data.config.attribute)) {
            // var newJson= JSON.parse(data.config.instance.attributes["prop_"+data.config.attribute])
            data.editor.setDocument({name:data.config.instance.name, id:data.config.instance.uuid})
        }else{
            alert("This instance has no related properties")
        }
        
    }
    
}

var updateTable = function (event, data, instance) {
    var itemData = getEvaluatorData(event,data, instance)
    var editor = textArea.instance()
    editor.onError = function (message) {
        // var test = getViewGridPlaceholder("instanceCard")
        // document.body.append(test)
    }
    

    if (data.instance ) {
        if (data.instance.attributes["prop_"+itemData.attribute]) {
            editor.defaultValue= JSON.parse(data.instance.attributes["prop_"+itemData.attribute])
        }
        
        
    }

    editor.onSave=(json,editor, currentDoc)=>{
        console.log(json, editor, currentDoc);
        if (currentDoc.id ) {
            var instancesRepo = createInstancesManagement()
            var instance = instancesRepo.getById(currentDoc.id)
            instance.setPropertyByUuid(itemData.attribute,JSON.stringify(json))
            // console.log(instancesRepo.getById(currentDoc.id));
        }
        
        
    }

    // editor.showExplorer = false;
    // editor.showMenu = false;
    // if (currentInstance.attributes.desc) {
    //     editor.defaultValue= JSON.parse(currentInstance.attributes.desc)
        
    // }
    
    // editor.onSave=(json,editor, currentDoc)=>{
    //     changeDescription(event, data, instance, json)
    // }
    editor.onSetDocument=(doc, editor, updateDoc)=>{
        console.log(doc, editor, updateDoc);
        if (doc.id ) {
            var instancesRepo = createInstancesManagement()
            var instance = instancesRepo.getById(doc.id)

            if (instance && instance.attributes["prop_"+itemData.attribute] ) {
                var newJson = JSON.parse(instance.attributes["prop_"+itemData.attribute])
                if (newJson.doc) {
                    updateDoc(newJson)
                }else{
                    console.warn("content is not compatible", newJson);
                    var jsonInit = {"doc": {"type": "doc","content": [{"type": "paragraph", "content": [] }]}}
                    updateDoc(jsonInit)
                }
                // console.log(instance);
                // alert("ee") 
            }else{
                console.warn("no related attribute found in", instance);
                var jsonInit = {"doc": {"type": "doc","content": [{"type": "paragraph", "content": [] }]}}
                updateDoc(jsonInit)
            }
            // instance.setPropertyByName(itemData.attribute,JSON.stringify(json))
            // console.log(instancesRepo.getById(currentDoc.id));
        }
    }
    editor.otherInstances= itemData.instances.map(i=>({name:i.name, id:i.uuid}))
    console.log(editor.otherEntries);

    editor.mentionsDefs= [
        {name:"hashtag", key:"#", attributes:["id", "tag"], attributeToDisplay:'tag', imageAttributes:"icon"},
        {name:"mention", key:"@", attributes:["name", "id","email"], attributeToDisplay:'name'},
        {name:"arrow", key:"->", attributes:["id","tag"], attributeToDisplay:'tag'},
    ]
    editor.mentionsCallback={
    "arrow": (e,view)=> console.log(e),
    "hashtag": (e,view)=> {
        console.log(e);
        showPopupInstancePreview(e.originalTarget.dataset.hashtagId);
    },
    "mention": (e,view)=> console.log(e),
    }
    editor.mentionsOptions ={
    "arrow": [{id:1,tag: '-> abc'}, {id:2,tag: '-> 123'},],
    "hashtag": setCurrentTags(),
    "mention": [{name: 'John Doe', id: '101', email: 'joe@abc.com'}, {name: 'Joe Lewis', id: '102', email: 'lewis@abc.com'}],
    }
    data.editor = editor
    instance.query(".textEditorDesc").append(editor)
    console.log(editor);
}

var setUpTable = function (event, data, instance) {
    updateTable(event, data, instance)
    setTimeout(function(){
        updateTableInstance(event, data, instance)// if use current is activated
    }, 500)
    
    // subscribeToChanges(event, data, instance, updateTable)
    subscribeToSearchParam(event, data, instance, updateTableInstance)
}

var writingBoardViewport =createAdler({
    content: p => /*html*/`
    <div class="Component container" style="height: calc(100% - 75px);">
        <div style="top:25px; position:relative; height:100%;"class="textEditorDesc" ></div>
        
    </div>
        `,
    params:{
        props:{
            test:15,
            addAction: undefined,
            settings:{
                entityType:false,
                evaluatorId:false,
                calledFromInstance:false,
            },
        },
        listen:{
            test:function (event, data, instance) {
                //alert("test")
            }
        },
        data:{
            value:"Hello",
            list:[],
            table:undefined,
            addAction: undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            [".action_add_entity","click", (event, data, instance)=> addItem(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUpTable(event, data, instance),
            
        },
        methods:{
            // softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    components:{
        // instance_card: instanceCard,
    }
    // css:/*css*/` `,
})

export default writingBoardViewport