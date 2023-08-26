import * as pmModule from './pmCore.js'
import { getMentionsNodes, getMentionsPlugin, getDefaultMentionPlugin } from './mention/mention.js';
import { createSideView } from './sideView/sideView.js';
import { createTitle } from './docTitle/docTitle.js';
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
    onSave = (json,editor, currentDocument)=> console.log(json,editor, currentDocument),
}={}) {
    var self = {}
    var domWrapper = document.createElement('div')
    var editor = undefined
    var sideView = undefined
    var docTitle = undefined
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
        const mySchema = new Schema({
        nodes: baseNodes,
        marks: schema.spec.marks
        })

        var plugins = exampleSetup({schema: mySchema})

        //add custom plugins
        if (mentionsDefinitions) {
            var mentionPlugin = getDefaultMentionPlugin(mentionsDefinitions,mentionsOptions,mentionsCallback)
            plugins.unshift(mentionPlugin); // push it before keymap plugin to override keydown handlers
        }
        
        //add editor
        editor = new EditorView(domWrapper, {
            state: EditorState.create({
                doc: DOMParser.fromSchema(mySchema).parse(''),
                plugins: plugins
            })
        })
        
    }

    //SideView
    var addSideView = function () {
        sideView = createSideView({
            mountAt:domWrapper,
            onEntryClick:(doc)=>setDocument(doc),
        })   
    }

    var addDocTitle = function () {
        docTitle = createTitle({
            mountAt:domWrapper,
            // title:"testdoc",
            // onEntryClick:(doc)=>setDocument(doc),
        })   
    }

    var addSaveButton = function () {
        var saveButton = document.createElement("div")
        saveButton.innerHTML="save"
        domWrapper.append(saveButton)
        saveButton.addEventListener("click", function () {
            onSave(getJson(), editor, currentDocument)
        })
    }
    

    var setDocument = function (doc) {
        currentDocument = doc
        if(docTitle) docTitle.update(doc.name);
    }

    var mountAt = function(domElement){
        domElement.append(domWrapper)
    }

    var init = function () {
        addSaveButton()
        addDocTitle()
        addEditor()
        addSideView()
        if (currentDocument) setDocument(currentDocument);
        
    }

    var getJson = function () { return editor.state.toJSON() }

    init()
    
    self.mountAt = mountAt
    self.getJson = getJson
    return self
}

export {createEditor}