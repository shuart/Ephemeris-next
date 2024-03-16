
import createEntityManagement from "../common_project_management/entity_management.js";
import createInstancesManagement from "../common_project_management/instances_management.js";
import createPropertyManagement from "../common_project_management/properties_management.js";
import createDialogue from "../common_select_dialogue/common_dialogue.js";
import { createPropertiesSelectionOptions } from "../common_selectors/properties_selector.js";
import { textArea } from "../common_ui_components/textEditor.js/textArea.js";
import showPopupInstancePreview from "../popup_instance_preview/popup_instance_preview.js";

var uuidFromSelection = function(data){
    if (data && data[0]) {
        return data.map(i=>i.uuid)
    }else{
        return []
    }
}

function extractSummary(stringifyData) {
    var rx = /(?<=\"text\":\").*?(?=\")/s;
    
    var arr = rx.exec(stringifyData);
    return arr[0] +"..."; 
  }

export function renderNotebookAttribute(attributeId,currentValue,bearingEntityId, callback){
    // var attRepo= createPropertyManagement()
    // var att = attRepo.getById(attributeId)
    var valueToDisplay
    if (!currentValue) {
        currentValue = "_"
        valueToDisplay = "_"
    }else{
        valueToDisplay = extractSummary(currentValue)
    }
    var domEl = document.createElement("div")
    domEl.innerHTML=`<div>${valueToDisplay}</div>`
    domEl.addEventListener('click', function (event) {
        createNotebookAttributeEditor(attributeId,currentValue,bearingEntityId, callback)
        if (callback) {
            callback()
        }
    })
    return domEl
}

var setCurrentTags = function () {
    var instancesRepo = createInstancesManagement()
    var instances = instancesRepo.getAll()
  
    return instances.map(i=>({id:i.uuid, tag:i.name}))
  }

function createTextAreaEditor(domElement, currentValue, attributeId, bearingEntityId) {
    var editor = textArea.instance()
    editor.showExplorer = false;
    editor.showMenu = false;
    // console.log(currentValue);
    // var currentInstance = undefined
    // if (currentInstance || currentInstance?.attributes?.desc) {
    //     editor.defaultValue= JSON.parse(currentInstance.attributes.desc)
        
    // }
    if (currentValue && currentValue !="" & currentValue !="_") {
        editor.defaultValue= JSON.parse(currentValue)
    }
    
    editor.onSave=(json,editor, currentDoc)=>{
        // changeDescription(event, data, instance, json)
        var result = JSON.stringify(json)
        console.log(result);
            var attRepo= createPropertyManagement()
            var att = attRepo.getById(attributeId)
            var instancesRepo = createInstancesManagement()
            var entity =instancesRepo.getById(bearingEntityId)
            console.log(att, entity);
            if (att && entity) {
                var payload={uuid:bearingEntityId}
                payload["prop_"+attributeId] = result
                instancesRepo.update(payload)
            }
    }

    editor.mentionsDefs= [
        {name:"hashtag", key:"#", attributes:["id", "tag"], attributeToDisplay:'tag'},
        // {name:"mention", key:"@", attributes:["name", "id","email"], attributeToDisplay:'name'},
        // {name:"arrow", key:"->", attributes:["id","tag"], attributeToDisplay:'tag'},
    ]
    editor.mentionsCallback={
    // "arrow": (e,view)=> console.log(e),
    "hashtag": (e,view)=> {
        console.log(e);
        showPopupInstancePreview(e.originalTarget.dataset.hashtagId);
    },
    // "mention": (e,view)=> console.log(e),
    }
    editor.mentionsOptions ={
    // "arrow": [{id:1,tag: '-> abc'}, {id:2,tag: '-> 123'},],
    "hashtag": setCurrentTags(),
    // "mention": [{name: 'John Doe', id: '101', email: 'joe@abc.com'}, {name: 'Joe Lewis', id: '102', email: 'lewis@abc.com'}],
    }

    domElement.append(editor)
    
}

export function createNotebookAttributeEditor(attributeId,currentValue,bearingEntityId, callback) {
    //OPTIONS
    // var options = createEntitiesSelectionOptions()
    // var propertiesOptions = createPropertiesSelectionOptions()
    //DEFAULTS
    // var useNodes = comp.renderSettings?.useNodes || false
    // var relationsToDisplay = comp.renderSettings?.relationsToDisplay || []
    // var entitiesToDisplay = comp.renderSettings?.entitiesToDisplay || []
    // var propertiesToDisplay = comp.renderSettings?.fieldsToDisplay || []
    //DIALOGUE
    if (currentValue == "_") {
        currentValue=""
    }
    createDialogue({
        header:"Edit Notebook",
        fields:[
        // {type:"boolean", name:"useNodes",config:{
        //         label:"Use Nodes",
        //         value:useNodes,
        //     }
        // },  
        // {type:"text", name:"text",config:{
        //         label:"Property Name",
        //         value:currentValue,
        //         autofocus:true,
        //     }
        // },
        // {type:"selection", name:"entitiesToDisplay", config:{
        //     multipleSelection:true,
        //         label:"Entities to Display",
        //         list: options,
        //         selected:entitiesToDisplay,
        //     }
        // },
        // {type:"selection", name:"propertiesToDisplay", config:{
        //     multipleSelection:true,
        //         label:"Properties to Display",
        //         list: propertiesOptions,
        //         selected:propertiesToDisplay,
        //     }
        // },
        // {type:"graph", name:"graph", config:{
        //     multipleSelection:true,
        //         label:"Show Relations With",
        //         list: options,
        //         selected:relationsToDisplay,
        //     }
        // },
        ],
        onRender:(domElem)=>{
            createTextAreaEditor(domElem,currentValue, attributeId, bearingEntityId)
        } ,
        // onConfirm:(result)=>{
        //     console.log(result);
        //     var attRepo= createPropertyManagement()
        //     var att = attRepo.getById(attributeId)
        //     var instancesRepo = createInstancesManagement()
        //     var entity =instancesRepo.getById(bearingEntityId)
        //     console.log(att, entity);
        //     if (att && entity) {
        //         var payload={uuid:bearingEntityId}
        //         payload["prop_"+attributeId] = result.text
        //         instancesRepo.update(payload)
        //     }
        //     // var newConfig = {
        //     //     useNodes : result.useNodes,
        //     //     entitiesToDisplay : uuidFromSelection(result.entitiesToDisplay),
        //     //     fieldsToDisplay : uuidFromSelection(result.propertiesToDisplay),
        //     //     relationsToDisplay : result.graph,
        //     // }
        //     // console.log(newConfig);
        //     // if (callback) {
        //     //     callback(newConfig)
        //     // }
        //     // var added = []
        //     // var removed = []
        //     // var newSelection = result.selection
        // } 
     })
    
}