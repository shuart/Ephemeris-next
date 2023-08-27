import * as pmModule from './pmCore.js'
import { getMentionsNodes, getMentionsPlugin, getDefaultMentionPlugin } from './mention/mention.js';
import { createSideView } from './sideView/sideView.js';
import { createTitle } from './docTitle/docTitle.js';
import { createTopBar } from './topbar.js';
import { createHighlighter } from './highlighter/highlighter.js';
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
    onSave = (json,editor, currentDocument)=> console.log(json,editor, currentDocument),
    onSetDocument = (doc, editor, updateDoc)=> console.log(doc, editor, updateDoc),
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
        if (mentionsDefinitions) {
            var mentionPlugin = getDefaultMentionPlugin(mentionsDefinitions,mentionsOptions,mentionsCallback)
            plugins.unshift(mentionPlugin); // push it before keymap plugin to override keydown handlers
        }
        
        
        // //add editor
        // var value = "<p>*some sentence* whatever.</p>";
        // var dom = (new DOMParser).parseFromString(value, "text/html");
        var jsonInit = {"doc": {"type": "doc","content": [{"type": "paragraph", "content": [] }]}}
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
        onSetDocument(doc, editor, updateDoc)
    }

    var toggleMenu = function () {
        domWrapper.querySelector('.ProseMirror-menubar')
        if (domWrapper.style.display !="none") { 
            domWrapper.style.display ="none"
        }else{
            domWrapper.style.display ="block"
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
            addSideView()
            addSaveButton()
            addDocTitle()
        }
        if (!modes.editable) {toggleMenu()}
        if (currentDocument) setDocument(currentDocument);
        
    }

    var getJson = function () { return editor.state.toJSON() }

    init()
    
    self.mountAt = mountAt
    self.getJson = getJson
    return self
}

export {createEditor}