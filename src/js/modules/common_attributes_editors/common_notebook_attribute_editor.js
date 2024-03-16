
import createEntityManagement from "../common_project_management/entity_management.js";
import createInstancesManagement from "../common_project_management/instances_management.js";
import createPropertyManagement from "../common_project_management/properties_management.js";
import createDialogue from "../common_select_dialogue/common_dialogue.js";
import { createPropertiesSelectionOptions } from "../common_selectors/properties_selector.js";
import { textArea } from "../common_ui_components/textEditor.js/textArea.js";

var uuidFromSelection = function(data){
    if (data && data[0]) {
        return data.map(i=>i.uuid)
    }else{
        return []
    }
}

export function renderNotebookAttribute(attributeId,currentValue,bearingEntityId, callback){
    // var attRepo= createPropertyManagement()
    // var att = attRepo.getById(attributeId)
    if (!currentValue) {
        currentValue = "_"
    }
    var domEl = document.createElement("div")
    domEl.innerHTML=`<div>${currentValue}</div>`
    domEl.addEventListener('click', function (event) {
        createNotebookAttributeEditor(attributeId,currentValue,bearingEntityId, callback)
        if (callback) {
            callback()
        }
    })
    return domEl
}

function createTextAreaEditor(domElement) {
    var editor = textArea.instance()
    editor.showExplorer = false;
    editor.showMenu = false;
    if (currentInstance.attributes.desc) {
        editor.defaultValue= JSON.parse(currentInstance.attributes.desc)
        
    }
    
    editor.onSave=(json,editor, currentDoc)=>{
        changeDescription(event, data, instance, json)
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

    // instance.query(".textEditorArea").append(editor)
    
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
        {type:"text", name:"text",config:{
                label:"Property Name",
                value:currentValue,
                autofocus:true,
            }
        },
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
            alert("fff")
            domElem.innerHTML("fefsffesfes")
        } ,
        onConfirm:(result)=>{
            console.log(result);
            var attRepo= createPropertyManagement()
            var att = attRepo.getById(attributeId)
            var instancesRepo = createInstancesManagement()
            var entity =instancesRepo.getById(bearingEntityId)
            console.log(att, entity);
            if (att && entity) {
                var payload={uuid:bearingEntityId}
                payload["prop_"+attributeId] = result.text
                instancesRepo.update(payload)
            }
            // var newConfig = {
            //     useNodes : result.useNodes,
            //     entitiesToDisplay : uuidFromSelection(result.entitiesToDisplay),
            //     fieldsToDisplay : uuidFromSelection(result.propertiesToDisplay),
            //     relationsToDisplay : result.graph,
            // }
            // console.log(newConfig);
            // if (callback) {
            //     callback(newConfig)
            // }
            // var added = []
            // var removed = []
            // var newSelection = result.selection
        } 
     })
    
}