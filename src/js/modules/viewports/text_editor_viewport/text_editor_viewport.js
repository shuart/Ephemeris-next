import createAdler from "../../../vendor/adlerLegacy.js";
import table_component from "../../common_ui_components/table/table.js";
import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import instanceCard from "../../common_ui_components/instance_card/instance_card.js";
import createInstancesManagement from "../../common_project_management/instances_management.js";
import createTexteArea from "../../common_ui_components/textEditor.js/textEditor.js";
import { textArea } from "../../common_ui_components/textEditor.js/textArea.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";

var setCurrentTags = function () {
  var instancesRepo = createInstancesManagement()
  var instances = instancesRepo.getAll()

  return instances.map(i=>({id:i.uuid, tag:i.name}))
}

var softUpdate= function (event, data, instance) {
    var itemsData = getItemsList(event,data, instance)
    // instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols}, false)
    // instance.getNodes().tablevp.do.softUpdate()
}

var addItem = function (event, data, instance) {

    instance.props.get("addAction" )()

}

var getEvaluatorData = function (event, data, instance){

    var data = {}
    var evaluator = createEvaluator({originInstance:instance.props.get('settings').calledFromInstance, type:instance.props.get("settings").entityType , graphId:instance.props.get("settings").evaluatorId})
    console.log(evaluator);
    // if (!evaluator.evaluate()) {
    //     return {instance:{}}
    // }
    var evalResult = evaluator.evaluate().output_text_editor
    data.instance =evalResult.instance
    data.attribute =evalResult.attribute
    data.instances = evalResult.instances
    // // data.cols =evaluator.evaluate().cols
    // // data.actions =evaluator.evaluate().actions
    // if (typeof data.instance == "string") {
    //     var instanceRepo = createInstancesManagement()
    //     data.instance = instanceRepo.getById(data.instance)
    // }
    
    console.log(evalResult);
    return data
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


var setUpTable = function (event, data, instance) {
    var itemData = getEvaluatorData(event,data, instance)
    // var textContainer = instance.query(".textEditorDesc")
    // var textProperty= itemData.instance.properties[itemData.propertyName]
    // if ( !textProperty) {
    //     // alert("Property is not compatible with")
    //     instance.query(".title").innerText = "Property does not exist"
    //     return 
    // }
    // var textContent = textProperty.value
    // if ( textProperty.property.type != "rich_text") {
    //     // alert("Property is not compatible with")
    //     instance.query(".title").innerText = "Property type is not compatible with text editor"
    //     return 
    // }
    // if (textContent ) {
    //     textContent = JSON.parse(textContent)
    // }
    // if (!textContent || !textContent.type) {
    //     textContent = "Add Text"
    // }
    // data.editor = createTexteArea({
    //     container:textContainer,
    //     customClass:"textarea",
    //     content:textContent,
    //     changeCallback:(text)=>{
    //         console.log(text)
    //         itemData.instance.setPropertyByUuid(textProperty.property.uuid, JSON.stringify( text) )
    //     },
    // })
    // instance.query(".ProseMirror").classList += " ephtextEditor"
    // instance.query(".title").innerText = itemData.propertyName
    // //  instance.getNodes().instance_card.setData({instance:itemData.instance })
    // //  subscribeToDB(event, data, instance)
    


    var editor = textArea.instance()
    editor.onSave=(json,editor, currentDoc)=>{
        console.log(json, editor, currentDoc);
        if (currentDoc.id ) {
            var instancesRepo = createInstancesManagement()
            var instance = instancesRepo.getById(currentDoc.id)
            instance.setPropertyByName(itemData.attribute,JSON.stringify(json))
            console.log(instancesRepo.getById(currentDoc.id));
        }
        
        
    }
    editor.otherInstances= itemData.instances.map(i=>({name:i.name, id:i.uuid}))
    console.log(editor.otherEntries);

    editor.mentionsDefs= [
        {name:"hashtag", key:"#", attributes:["id", "tag"], attributeToDisplay:'tag'},
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
    instance.query(".textEditorDesc").append(editor)
    console.log(editor);
}

var textEditorViewport =createAdler({
    content: p => /*html*/`
    <div class="Component container">
    <div class="title" ></div>
        <div class="textEditorDesc" > text</div>
        
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
        instance_card: instanceCard,
    },
    // css:/*css*/``,
})

export default textEditorViewport