import * as pmModule from './pmCore.js'
import { getMentionsNodes, getMentionsPlugin, getDefaultMentionPlugin } from './mention/mention.js';
var pm = pmModule.pmCore
console.log(pm);

var EditorState = pm.state.EditorState
var EditorView = pm.view.EditorView
var Schema = pm.model.Schema
var DOMParser = pm.model.DOMParser
var schema = pm.schemaBasic.schema
var addListNodes = pm.schemaList.addListNodes
var exampleSetup = pm.exampleSetup.exampleSetup


var mentionsDefs= [
    {name:"hastag", key:"#", attributes:["id", "tag"], attributeToDisplay:'tag'},
    {name:"mention", key:"@", attributes:["name", "id","email"], attributeToDisplay:'name'},
    {name:"arrow", key:"->", attributes:["id","tag"], attributeToDisplay:'tag'},
]

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
        //set up mentions
        var addMentionsNodes = getMentionsNodes(mentionsDefs)



        //Mention
        var tagsCallbacks={
            "arrow": (e,view)=> console.log(e),
            "hashtag": (e,view)=> console.log(e),
            "mention": (e,view)=> console.log(e),
          }
        var tags ={
            "arrow": [{id:1,tag: '-> abc'}, {id:2,tag: '-> 123'},],
            "hashtag": [{id:1,tag: 'abc'}, {id:2,tag: '123'}, ],
            "mention": [{name: 'John Doe', id: '101', email: 'joe@abc.com'}, {name: 'Joe Lewis', id: '102', email: 'lewis@abc.com'}],
        }


        var mentionPlugin = getDefaultMentionPlugin(mentionsDefs,tags,tagsCallbacks)

        const mySchema = new Schema({
        nodes: addMentionsNodes(  addListNodes(schema.spec.nodes, "paragraph block*", "block")    ),
        marks: schema.spec.marks
        })

        var plugins = exampleSetup({schema: mySchema})
        plugins.unshift(mentionPlugin); // push it before keymap plugin to override keydown handlers

        editor = new EditorView(domWrapper, {
            state: EditorState.create({
                doc: DOMParser.fromSchema(mySchema).parse(''),
                plugins: plugins
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