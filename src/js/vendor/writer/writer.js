import * as pmModule from './pmCore.js'
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
}={}) {
    var self = {}
    var domWrapper = document.createElement('div')
    var editor = undefined
    var addEditor = function () {

        

        // import {EditorState} from "prosemirror-state"
        // import {EditorView} from "prosemirror-view"
        // import {Schema, DOMParser} from "prosemirror-model"
        // import {schema} from "prosemirror-schema-basic"
        // import {addListNodes} from "prosemirror-schema-list"
        // import {exampleSetup} from "prosemirror-example-setup"

        // Mix the nodes from prosemirror-schema-list into the basic schema to
        // create a schema with list support.
        const mySchema = new Schema({
        nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
        marks: schema.spec.marks
        })

        editor = new EditorView(domWrapper, {
            state: EditorState.create({
                doc: DOMParser.fromSchema(mySchema).parse(''),
                plugins: exampleSetup({schema: mySchema})
            })
        })
        
    }

    var mountAt = function(domElement){
        domElement.append(domWrapper)
    }

    var init = function () {
        addEditor()
    }

    init()
    
    self.mountAt = mountAt
    return self
}

export {createEditor}