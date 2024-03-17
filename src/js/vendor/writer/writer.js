import * as pmModule from './pmCore.js'
import { getMentionsNodes, getMentionsPlugin, getDefaultMentionPlugin } from './mention/mention.js';
import { createSideView } from './sideView/sideView.js';
import { createTitle } from './docTitle/docTitle.js';
import { createTopBar } from './topbar.js';
import { createHighlighter } from './highlighter/highlighter.js';
import { createTagger } from './highlighter/tagger.js';
var pm = pmModule.pmCore
console.log(pm);

var EditorState = pm.state.EditorState
var EditorView = pm.view.EditorView
var Schema = pm.model.Schema
var DOMParser = pm.model.DOMParser
var schema = pm.schemaBasic.schema
var addListNodes = pm.schemaList.addListNodes
var exampleSetup = pm.exampleSetup.exampleSetup




var createEditor = function ({
    mountAt=document.body,
    mentionsDefinitions = undefined,
    mentionsOptions = {},
    mentionsCallback = {},
    currentDocument = undefined,
    documentsList = [],
    isEditable = true,
    otherEntries =[],
    showExplorer = true,
    showMenu = true,
    defaultValue = undefined,
    onSave = (json,editor, currentDocument)=> console.log(json,editor, currentDocument),
    onSetDocument = (doc, editor, updateDoc)=> console.log(doc, editor, updateDoc),
    onError = (message)=>console.log(message),
    preventWritingWithoutTarget = true,
}={}) {
    var self = {}
    var domWrapper = document.createElement('div')
    var editor = undefined
    var plugins = undefined
    var mySchema = undefined
    var sideView = undefined
    var docTitle = undefined
    var topBar = undefined
    var modes ={editable:true}
    var writerState = {editor:undefined}
    var addEditor = function () {

        

        // import {EditorState} from "prosemirror-state"
        // import {EditorView} from "prosemirror-view"
        // import {Schema, DOMParser} from "prosemirror-model"
        // import {schema} from "prosemirror-schema-basic"
        // import {addListNodes} from "prosemirror-schema-list"
        // import {exampleSetup} from "prosemirror-example-setup"

        // Mix the nodes from prosemirror-schema-list into the basic schema to
        // create a schema with list support.

        //set up nodes

        var baseNodes = addListNodes(schema.spec.nodes, "paragraph block*", "block")

        //add custom base nodes
        if (mentionsDefinitions) {
            var addMentionsNodes = getMentionsNodes(mentionsDefinitions)
            baseNodes = addMentionsNodes(  addListNodes(schema.spec.nodes, "paragraph block*", "block")    )
        }
        
        //define schema
        mySchema = new Schema({
        nodes: baseNodes,
        marks: schema.spec.marks
        })

        plugins = exampleSetup({schema: mySchema})

        //add custom plugins
        if (true) {
            var highlighter = createHighlighter()
            plugins = plugins.concat(highlighter)
        }
        if (false) {
            var tagger = createTagger({schema: mySchema, commonState:writerState})
            plugins = plugins.concat(tagger)
        }
        if (mentionsDefinitions) {
            var mentionPlugin = getDefaultMentionPlugin(mentionsDefinitions,mentionsOptions,mentionsCallback)
            plugins.unshift(mentionPlugin); // push it before keymap plugin to override keydown handlers
        }
        
        
        // //add editor
        // var value = "<p>*some sentence* whatever.</p>";
        // var dom = (new DOMParser).parseFromString(value, "text/html");
        var jsonInit = {"doc": {"type": "doc","content": [{"type": "paragraph", "content": [] }]}}
        if (defaultValue) {
            jsonInit = defaultValue
        }else{
            onError("No Default Value")
            if (preventWritingWithoutTarget) { addShield() }
        }
        editor = new EditorView(domWrapper, {
            state: EditorState.create({
                // doc: DOMParser.fromSchema(mySchema).parse("Hello"),
                doc: mySchema.nodeFromJSON(jsonInit.doc),
                plugins: plugins
            }),
            editable() { //set editable status
                return modes.editable;
            },
        })
        writerState.editor = editor
    }

    // setTimeout(function () {
    //     modes.editable = false
    // },5000)



    var updateDoc= function (json) {
        var newState= EditorState.create({
            doc: mySchema.nodeFromJSON(json.doc),
            plugins: plugins
        })
        editor.updateState(newState);
    }

    var addTopBar = function () {
        topBar = createTopBar({
            mountAt:domWrapper
        })   
    }

    //Shield
    var addShield = function(){
        var shield = document.createElement("div")
        shield.classList="shield"
        shield.style.position= "absolute";
        shield.style.backgroundColor= "#9191919c";
        shield.style.zIndex= "11";
        shield.style.top= "0px";
        shield.style.left= "0px";
        shield.style.width= "100%";
        shield.style.height= "100%";
        shield.style.borderRadius= "5px";
        shield.style.backdropFilter= "blur(10px)";
        shield.innerHTML="<div style='width:50px; height:50px;'>"
        domWrapper.append(shield)
    }
    var removeShield = function () {
        var shield = domWrapper.querySelector(".shield")
        if (shield) {
            shield.remove()
        }
    }

    //SideView
    var addSideView = function () {
        sideView = createSideView({
            mountAt:domWrapper,
            entries:otherEntries,
            onEntryClick:(doc)=>setDocument(doc),
        })
        var sideViewButton = document.createElement("div")
        sideViewButton.innerHTML="Explorer"
        sideViewButton.classList="prosemirror-top-bar-item"
        topBar.getDomElement().append(sideViewButton)
        sideViewButton.addEventListener("click", function () {
            sideView.toggleVisibility()
        }) 
    }

    var addDocTitle = function () {
        docTitle = createTitle({
            mountAt:topBar.getDomElement(),
            // title:"testdoc",
            // onEntryClick:(doc)=>setDocument(doc),
        })   
    }

    var addSaveButton = function () {
        var saveButton = document.createElement("div")
        saveButton.innerHTML="Save"
        saveButton.classList="prosemirror-top-bar-item"
        topBar.getDomElement().append(saveButton)
        saveButton.addEventListener("click", function () {
            onSave(getJson(), editor, currentDocument)
        })
    }
    

    var setDocument = function (doc) {
        currentDocument = doc
        if(docTitle) docTitle.update(doc.name);
        removeShield()
        onSetDocument(doc, editor, updateDoc)
    }

    var toggleMenu = function () {
        var menuDom = domWrapper.querySelector('.ProseMirror-menubar')

        if (menuDom.style.display !="none") { 
            menuDom.style.display ="none"
        }else{
            menuDom.style.display ="block"
        }
    }

    var mountAt = function(domElement){
        domElement.append(domWrapper)
    }

    var init = function () {
        modes.editable = isEditable
        if (modes.editable) {addTopBar()}
        
        addEditor()
        if (modes.editable) {
            if (showExplorer) addSideView()
            addSaveButton()
            addDocTitle()
        }
        if (!modes.editable || showMenu == false) {toggleMenu()}
        if (currentDocument) setDocument(currentDocument);
        
    }

    var getJson = function () { return editor.state.toJSON() }

    init()
    
    self.mountAt = mountAt
    self.getJson = getJson
    self.setDocument = setDocument
    return self
}

export {createEditor}