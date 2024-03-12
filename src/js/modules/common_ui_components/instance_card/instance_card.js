import createAdler from "../../../vendor/adlerLegacy.js";
import userManagement from "../../common_user_management/user_management.js";
import state_manager from "../../common_state/state_manager.js";

import { textArea } from "../textEditor.js/textArea.js";
import createInstancesManagement from "../../common_project_management/instances_management.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";
import createPropertyManagement from "../../common_project_management/properties_management.js";
import createEntityManagement from "../../common_project_management/entity_management.js";
import { getAttributeRenderer } from "../../common_attributes_editors/common_render_attributes.js";

// var getCurrentUser = function () {
//     return userManagement.getCurrentUser()
// }

// var signOutUser = function () {
//     return userManagement.signOutUser()
// }


var setCurrentTags = function () {
    var instancesRepo = createInstancesManagement()
    var instances = instancesRepo.getAll()
  
    return instances.map(i=>({id:i.uuid, tag:i.name}))
  }

var changeDescription = function (event, data, instance, json) {
    var instanceManagement = createInstancesManagement()
    console.log(data);
    
    instanceManagement.setDescription(data.instance.uuid, JSON.stringify(json))
    var currentInstance = instanceManagement.getById(data.instance.uuid)
    console.log(currentInstance);
}

var addPropertyList = function (event, data, instance, currentInstance) {
    var propRepo = createPropertyManagement()
    var props = propRepo.getAll()
    var propsToShow=[]

    for (let i = 0; i < props.length; i++) {
        var prop = props[i];
        var entityRepo = createEntityManagement()
        
        console.log(currentInstance);
        var entity = entityRepo.getById(currentInstance.attributes.type)
        console.log(entity);
        for (const key in entity.attributes) {
            if (Object.hasOwnProperty.call(entity.attributes, key) && key.search("prop_")>=0) {
                const element = entity.attributes[key];

                if (key.substring(5) == prop.uuid) {
                    var AttributeDomElement = getAttributeRenderer("text")(prop.uuid,currentInstance.attributes[key],currentInstance.uuid, undefined)
                    propsToShow.push({prop:prop, domElement:AttributeDomElement})
                }
                // //TODO check if ref is still used
                // // ownProperties.push({uuid:key, value:aggregate.attributes[key]})
                // var property = projectStore.get("properties").where("uuid").equals(key.substring(5))
                // var propertyName = property.name
                // // ownProperties[propertyName] = aggregate.attributes[key]
                // ownProperties[propertyName] = property
            }
        }
        
    }
    console.log(propsToShow);
    console.log(propsToShow);
    for (let i = 0; i < propsToShow.length; i++) {
        const propToShow = propsToShow[i];
        var domElement = document.createElement("div")
        // domElement.innerHTML=`<div><span>${propToShow.prop.name}</span><span class="prop-value"></span></div>`
        domElement.innerHTML=`<div class="tags has-addons">
            <span class="tag is-primary  prop-name">${propToShow.prop.name}</span>
            <span class="tag prop-value"></span>
        </div>`
        domElement.classList.add("control")
        domElement.querySelector(".prop-value").append(propToShow.domElement)

        instance.query(".attributes-area").append(domElement)
        
    }
    alert("sgdftrq")
}

var setUp = function(event, data, instance){
    if (data.instance.uuid) {
        var instanceManagement = createInstancesManagement()
        var currentInstance = instanceManagement.getById(data.instance.uuid)
        // var editor = textWriter.instance()
        // editor.saveCallback =(json, editor)=>{
        //     changeDescription(event, data, instance, json)
        // }
        // editor.defaultValue = currentInstance.attributes.desc
        // instance.query(".textEditorArea").appendChild(editor)

        addPropertyList(event, data, instance, currentInstance)


        ///////////////////////////


        var editor = textArea.instance()
        editor.showExplorer = false;
        editor.showMenu = false;
        if (currentInstance.attributes.desc) {
            editor.defaultValue= JSON.parse(currentInstance.attributes.desc)
            
        }
        
        editor.onSave=(json,editor, currentDoc)=>{
            changeDescription(event, data, instance, json)
        }
        // editor.onSetDocument=(doc, editor, updateDoc)=>{
        //     console.log(doc, editor, updateDoc);
            
        //     if (doc.id ) {
        //         var instancesRepo = createInstancesManagement()
        //         var instance = instancesRepo.getById(doc.id)
    
        //         if (instance && instance.properties[itemData.attribute] && instance.properties[itemData.attribute].value) {
        //             var newJson = JSON.parse(instance.properties[itemData.attribute].value)
        //             if (newJson.doc) {
        //                 updateDoc(newJson)
        //             }else{
        //                 console.warn("content is not compatible", newJson);
        //                 var jsonInit = {"doc": {"type": "doc","content": [{"type": "paragraph", "content": [] }]}}
        //                 updateDoc(jsonInit)
        //             }
                    
        //             // console.log(instance);
        //             // alert("ee") 
        //         }else{
        //             console.warn("no data found in", instance);
        //             var jsonInit = {"doc": {"type": "doc","content": [{"type": "paragraph", "content": [] }]}}
        //             updateDoc(jsonInit)
        //         }
        //         // instance.setPropertyByName(itemData.attribute,JSON.stringify(json))
        //         // console.log(instancesRepo.getById(currentDoc.id));
        //     }
            
            
        // }
        
        // editor.otherInstances= itemData.instances.map(i=>({name:i.name, id:i.uuid}))
        // console.log(editor.otherEntries);
    
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
        instance.query(".textEditorArea").append(editor)
    }else if (data.placeholder) {
        instance.query(".card").innerHTML =""
        instance.query(".card").append(data.placeholder)
    }
}

// var softUpdate= function (event, data, instance) {

// }

var instanceCard =createAdler({
    content: p => /*html*/`
    <div class="instance-card">
        <div class="card">
            
            <div class="card-content">
            <div class="media">
                <div class="media-left">
                <figure class="image is-48x48">
                    <img class="darkModeCompatibleIcons" src="./img/icons/${p.instance.sourceEntity?.iconPath}" alt="Placeholder image">
                </figure>
                </div>
                <div class="media-content">
                <p class="title is-4">${p.instance.name}</p>
                
                <p class="subtitle is-6">
                    <div class="tags has-addons">
                        <span class="tag">Type</span>
                        <span style="background-color:${p.instance?.color};" class="tag is-primary">${p.instance.sourceEntity?.name}</span>
                    </div>
                </p>
                </div>
            </div>
            <div class="field is-grouped is-grouped-multiline attributes-area">

            </div>
        
            <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                <div class="textEditorDesc"></div>
                <div class="textEditorArea" style="position:relative;">.</div>
            </div>
            </div>
        </div>
    </div>
        `,
    params:{
        // props:{
        //     test:15,
        // },
        // listen:{
        //     test:function (event, data, instance) {
        //         //alert("test")
        //     }
        // },
        data:{
            instance:{name:"no name"},
            placeholder:undefined,
            // onClick:()=>signOutUser(),
            // onClickSettings:()=>state_manager.goTo("/:/settings/model/entities")
        },
        on:[
            // [".user-macaron-pic","click", (event, data, instance)=> data.onClick(event, data, instance) ],
            // [".user-macaron-settings","click", (event, data, instance)=> data.onClickSettings(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            // softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    css:/*css*/`
        .ephtextarea{
            background-color: #262626;
            border-color: #363636;
            color: #dbdbdb;
            box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
            padding: 15px;
        }
        .ephtextarea:focus{
            outline: none;
            
        }
    `,
})

export default instanceCard