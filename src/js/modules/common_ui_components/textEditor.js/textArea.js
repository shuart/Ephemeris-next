import { createAdler } from "../../../vendor/adler.js"
import createInstancesManagement from "../../common_project_management/instances_management.js";
import { createEditor } from "../../../vendor/writer/writer.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";

var setCurrentTags = function () {
  var instancesRepo = createInstancesManagement()
  var instances = instancesRepo.getAll()

  return instances.map(i=>({id:i.uuid, tag:i.name}))
}


var textArea = createAdler({
    tag:'text-area',
    props:{
        onSave:(json,editor)=>{
          console.log(json,'txt');
        },
        onSetDocument:undefined,
        showExplorer:true,
        showMenu:true,
        defaultValue:undefined,
        otherInstances:[],
        onError:undefined,
        mentionsDefs: [
          // {name:"hashtag", key:"#", attributes:["id", "tag"], attributeToDisplay:'tag'},
          // {name:"mention", key:"@", attributes:["name", "id","email"], attributeToDisplay:'name'},
          // {name:"arrow", key:"->", attributes:["id","tag"], attributeToDisplay:'tag'},
        ],
        mentionsCallback:{
          // "arrow": (e,view)=> console.log(e),
          // "hashtag": (e,view)=> {
          //   console.log(e);
          //   showPopupInstancePreview(e.originalTarget.dataset.hashtagId);
          // },
          // "mention": (e,view)=> console.log(e),
        },
        mentionsOptions :{
          // "arrow": [{id:1,tag: '-> abc'}, {id:2,tag: '-> 123'},],
          // "hashtag": setCurrentTags(),
          // "mention": [{name: 'John Doe', id: '101', email: 'joe@abc.com'}, {name: 'Joe Lewis', id: '102', email: 'lewis@abc.com'}],
        },
        nodesToHighlight:{

        },
        nodesToHighlightOnClick:undefined,
        to_print:"foo",
        to_print_reac:"bar",
    },
    attributes:[
        "to_print",
        "to_print_reac",
    ],
    html:()=>/*html*/`

        <div class="area">
          <div class="action-writer-save"></div>
          <div class="writerArea"></div>
        </div>
        <svg id="ProseMirror-icon-collection" style="display: none;"><symbol id="pm-icon-4eb53ba9" viewBox="0 0 805 1024"><path d="M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z"></path></symbol><symbol id="pm-icon-25612f7a" viewBox="0 0 585 1024"><path d="M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z"></path></symbol><symbol id="pm-icon--1d0983fe" viewBox="0 0 896 1024"><path d="M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z"></path></symbol><symbol id="pm-icon--78ecc05e" viewBox="0 0 951 1024"><path d="M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z"></path></symbol><symbol id="pm-icon-5a60796" viewBox="0 0 1024 1024"><path d="M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z"></path></symbol><symbol id="pm-icon--6ff882d4" viewBox="0 0 1024 1024"><path d="M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z"></path></symbol><symbol id="pm-icon--6141f81" viewBox="0 0 768 896"><path d="M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"></path></symbol><symbol id="pm-icon-28a6efee" viewBox="0 0 768 896"><path d="M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z"></path></symbol><symbol id="pm-icon--2d1566b3" viewBox="0 0 640 896"><path d="M0 448v256h256v-256h-128c0 0 0-128 128-128v-128c0 0-256 0-256 256zM640 320v-128c0 0-256 0-256 256v256h256v-256h-128c0 0 0-128 128-128z"></path></symbol><symbol id="pm-icon--3cb9c8" viewBox="0 0 800 900"><path d="M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z"></path></symbol><symbol id="pm-icon--2eec1b76" viewBox="0 0 1024 1024"><path d="M219 310v329q0 7-5 12t-12 5q-8 0-13-5l-164-164q-5-5-5-13t5-13l164-164q5-5 13-5 7 0 12 5t5 12zM1024 749v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12zM1024 530v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 310v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 91v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12z"></path></symbol></svg>
        
    `,
    onRender:(self) =>{


        var editor = createEditor({
          onSave:self.onSave,
          onSetDocument:self.onSetDocument,
          onError:self.onError,
          showExplorer:self.showExplorer,
          showMenu:self.showMenu,
          mentionsDefinitions : self.mentionsDefs,
          mentionsOptions : self.mentionsOptions,
          mentionsCallback : self.mentionsCallback,
          nodesToHighlight:self.nodesToHighlight,
          nodesToHighlightOnClick:self.nodesToHighlightOnClick,
          otherEntries : self.otherInstances,
          defaultValue : self.defaultValue,
        })
        editor.mountAt(self.query(".writerArea"))
        self.setDocument = function (doc) {
          editor.setDocument(doc)
        }
        // var jsonContent = undefined
        // if (self.defaultValue) {
        //   jsonContent = JSON.parse(self.defaultValue).doc
        // }
        // var editor = createEditor({
        //     initialJson: jsonContent,
        //     tagsCallbacks:{
        //         "arrow": (e,view)=> console.log(e,view),
        //         "hashtag": (e,view)=> {
        //           showPopupInstancePreview(e.originalTarget.dataset.tagId)
        //         },
        //         "at": (e,view)=> console.log(e,view),
        //     },
        // })
        // setCurrentTags(editor)
        // editor.addEditor(self.query('.writerArea'))
        // // editor.getEditor().state.toJSON()
        // self.query(".action-writer-save").addEventListener("click", function (event) {
        //   var json =editor.getEditor().state.toJSON()
        //   self.saveCallback(json,editor)
        // })
    },
    css:`
    .area{
      height:100%;
    }
    .writer-dom-wrapper{
      height:100%;
    }

    .writerArea{
        border-color: rgb(253, 253, 253);
        background-color: rgb(249, 249, 249);
        color: black;
        padding: 15px;
        border-color: #363636;
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
        position:relative;
        height: calc(100% - 38px);
    }
    .action-writer-save{
      position: absolute;
      right: 31px;
      cursor: pointer;
    }
    .prosemirror-tag-node{
      color: rgb(0, 209, 178);
      font-weight: bold;
      cursor: pointer;
    }
    .prosemirror-entries-menu{
      position: absolute;
      height: 190px;
      width: 500px;
      font-size: 19px;
      overflow-y: auto;
      background-color: #82828257;
      backdrop-filter: blur(10px);
      padding: 10px;
      border-radius: 7px;
      top: 25px;
      z-index: 11;
      cursor:pointer;
    }
    .prosemirror-top-bar-menu{
      display: flex;
      column-gap: 11px;
      position: absolute;
      top: -23px;
      left: 40px;
    }
    .prosemirror-top-bar-item{
      background-color: #93939314;
      padding-left: 7px;
      padding-right: 7px;
      border-radius: 5px;
      cursor: pointer;
    }
    .prosemirror-top-bar-filename{
      font-weight: bold;
    }
    
    

    @media (prefers-color-scheme: dark) {
      .writerArea{
        background-color: rgb(38, 38, 38);
        color: #dbdbdb;

        
      }
      
    }

    .prosemirror-hashtag-node {
      color: rgb(0, 209, 178);
      font-weight: bold;
      cursor: pointer;
      background-color: rgba(147, 147, 147, 0.17);
      border-radius: 5px;
      padding-left: 5px;
      padding-right: 5px;
    }


    .ProseMirror {
        position: relative;
      }
      
      .ProseMirror {

        overflow: auto;
        height: calc( 100% - 20px);

        word-wrap: break-word;
        white-space: pre-wrap;
        white-space: break-spaces;
        -webkit-font-variant-ligatures: none;
        font-variant-ligatures: none;
        font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
      }
      
      .ProseMirror pre {
        white-space: pre-wrap;
      }
      .ProseMirror-menubar-wrapper{
        height:100%;
      }
      .ProseMirror li {
        position: relative;
      }
      
      .ProseMirror-hideselection *::selection { background: transparent; }
      .ProseMirror-hideselection *::-moz-selection { background: transparent; }
      .ProseMirror-hideselection { caret-color: transparent; }
      
      .ProseMirror-selectednode {
        outline: 2px solid #8cf;
      }
      
      /* Make sure li selections wrap around markers */
      
      li.ProseMirror-selectednode {
        outline: none;
      }
      
      li.ProseMirror-selectednode:after {
        content: "";
        position: absolute;
        left: -32px;
        right: -2px; top: -2px; bottom: -2px;
        border: 2px solid #8cf;
        pointer-events: none;
      }
      
      /* Protect against generic img rules */
      
      img.ProseMirror-separator {
        display: inline !important;
        border: none !important;
        margin: 0 !important;
      }
      .ProseMirror-textblock-dropdown {
        min-width: 3em;
      }
      
      .ProseMirror-menu {
        margin: 0 -4px;
        line-height: 1;
      }
      
      .ProseMirror-tooltip .ProseMirror-menu {
        width: -webkit-fit-content;
        width: fit-content;
        white-space: pre;
      }
      
      .ProseMirror-menuitem {
        margin-right: 3px;
        display: inline-block;
      }
      
      .ProseMirror-menuseparator {
        border-right: 1px solid rgba(221, 221, 221, 0.08);
        margin-right: 4px;
      }
      
      .ProseMirror-menu-dropdown, .ProseMirror-menu-dropdown-menu {
        font-size: 90%;
        white-space: nowrap;
      }
      
      .ProseMirror-menu-dropdown {
        vertical-align: 1px;
        cursor: pointer;
        position: relative;
        padding-right: 15px;
      }
      
      .ProseMirror-menu-dropdown-wrap {
        padding: 1px 0 1px 4px;
        display: inline-block;
        position: relative;
      }
      
      .ProseMirror-menu-dropdown:after {
        content: "";
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid currentColor;
        opacity: .6;
        position: absolute;
        right: 4px;
        top: calc(50% - 2px);
      }
      
      .ProseMirror-menu-dropdown-menu, .ProseMirror-menu-submenu {
        position: absolute;
        background: white;
        color: #666;
        border: 1px solid #aaa;
        padding: 2px;
      }
      
      .ProseMirror-menu-dropdown-menu {
        z-index: 15;
        min-width: 6em;
      }
      
      .ProseMirror-menu-dropdown-item {
        cursor: pointer;
        padding: 2px 8px 2px 4px;
      }
      
      .ProseMirror-menu-dropdown-item:hover {
        background: #f2f2f2;
      }
      
      .ProseMirror-menu-submenu-wrap {
        position: relative;
        margin-right: -4px;
      }
      
      .ProseMirror-menu-submenu-label:after {
        content: "";
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 4px solid currentColor;
        opacity: .6;
        position: absolute;
        right: 4px;
        top: calc(50% - 4px);
      }
      
      .ProseMirror-menu-submenu {
        display: none;
        min-width: 4em;
        left: 100%;
        top: -3px;
      }
      
      .ProseMirror-menu-active {
        background: #eee;
        border-radius: 4px;
      }
      
      .ProseMirror-menu-disabled {
        opacity: .3;
      }
      
      .ProseMirror-menu-submenu-wrap:hover .ProseMirror-menu-submenu, .ProseMirror-menu-submenu-wrap-active .ProseMirror-menu-submenu {
        display: block;
      }
      
      .ProseMirror-menubar {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        position: relative;
        min-height: 1em;
        color: #666;
        padding: 1px 6px;
        top: 0; left: 0; right: 0;
        z-index: 10;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        overflow: visible;
      }

      
      
      .ProseMirror-icon {
        display: inline-block;
        line-height: .8;
        vertical-align: -2px; /* Compensate for padding */
        padding: 2px 8px;
        cursor: pointer;
      }
      
      .ProseMirror-menu-disabled.ProseMirror-icon {
        cursor: default;
      }
      
      .ProseMirror-icon svg {
        fill: currentColor;
        height: 1em;
      }
      
      .ProseMirror-icon span {
        vertical-align: text-top;
      }
      .ProseMirror-gapcursor {
        display: none;
        pointer-events: none;
        position: absolute;
      }
      
      .ProseMirror-gapcursor:after {
        content: "";
        display: block;
        position: absolute;
        top: -2px;
        width: 20px;
        border-top: 1px solid black;
        animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
      }
      
      @keyframes ProseMirror-cursor-blink {
        to {
          visibility: hidden;
        }
      }
      
      .ProseMirror-focused .ProseMirror-gapcursor {
        display: block;
      }
      /* Add space around the hr to make clicking it easier */
      
      .ProseMirror-example-setup-style hr {
        padding: 2px 10px;
        border: none;
        margin: 1em 0;
      }
      
      .ProseMirror-example-setup-style hr:after {
        content: "";
        display: block;
        height: 1px;
        background-color: silver;
        line-height: 2px;
      }
      
      .ProseMirror ul, .ProseMirror ol {
        padding-left: 30px;
      }
      
      .ProseMirror blockquote {
        padding-left: 1em;
        border-left: 3px solid #eee;
        margin-left: 0; margin-right: 0;
      }
      
      .ProseMirror-example-setup-style img {
        cursor: default;
      }
      
      .ProseMirror-prompt {
        background: white;
        padding: 5px 10px 5px 15px;
        border: 1px solid silver;
        position: fixed;
        border-radius: 3px;
        z-index: 11;
        box-shadow: -.5px 2px 5px rgba(0, 0, 0, .2);
      }
      
      .ProseMirror-prompt h5 {
        margin: 0;
        font-weight: normal;
        font-size: 100%;
        color: #444;
      }
      
      .ProseMirror-prompt input[type="text"],
      .ProseMirror-prompt textarea {
        background: #eee;
        border: none;
        outline: none;
      }
      
      .ProseMirror-prompt input[type="text"] {
        padding: 0 4px;
      }
      
      .ProseMirror-prompt-close {
        position: absolute;
        left: 2px; top: 1px;
        color: #666;
        border: none; background: transparent; padding: 0;
      }
      
      .ProseMirror-prompt-close:after {
        content: "✕";
        font-size: 12px;
      }
      
      .ProseMirror-invalid {
        background: #ffc;
        border: 1px solid #cc7;
        border-radius: 4px;
        padding: 5px 10px;
        position: absolute;
        min-width: 10em;
      }
      
      .ProseMirror-prompt-buttons {
        margin-top: 5px;
        display: none;
      }
      #editor, .editor {
        background: white;
        color: black;
        background-clip: padding-box;
        border-radius: 4px;
        border: 2px solid rgba(0, 0, 0, 0.2);
        padding: 5px 0;
        margin-bottom: 23px;
      }
      
      .ProseMirror p:first-child,
      .ProseMirror h1:first-child,
      .ProseMirror h2:first-child,
      .ProseMirror h3:first-child,
      .ProseMirror h4:first-child,
      .ProseMirror h5:first-child,
      .ProseMirror h6:first-child {
        margin-top: 10px;
      }
      
      .ProseMirror {
        padding: 4px 8px 4px 14px;
        line-height: 1.2;
        outline: none;
      }
      
      .ProseMirror p { margin-bottom: 1em }
      
      .problem { background: #fdd; border-bottom: 1px solid #f22; margin-bottom: -1px; }
      .lint-icon {
        display: inline-block; position: absolute; right: 2px; cursor: pointer;
        border-radius: 100px; background: #f22; color: white; font-family: times, georgia, serif;
        font-size: 15px; font-weight: bold; width: 1.1em; height: 1.1em;
        text-align: center; padding-left: .5px; line-height: 1.1em
      }
      .lint-icon:before { content: "!" }
      .ProseMirror { padding-right: 20px }

      .lint-icon-local {
        display: inline-block; position: none; right: 2px; cursor: pointer;
        border-radius: 100px; background: #000000; color: white; font-family: times, georgia, serif;
        font-size: 15px; font-weight: bold; width: 1.1em; height: 1.1em;
        text-align: center; padding-left: .5px; line-height: 1.1em
      }
      .lint-icon-local:before { content: "!" }
      .ProseMirror { padding-right: 20px }


    
    `
})

export {textArea}