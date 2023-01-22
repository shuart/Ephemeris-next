import createTextEditor from "../../../vendor/tiptap/tiptapCustom.js"
import suggestionConfigurator from "./suggestionsElement.js"
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";

function addCSS(cssText){
    var style = document.createElement('style');
    style.innerHTML = cssText;
    document.head.appendChild(style);
}

var createTexteArea = function({
    container = document.body,
    changeCallback = (text)=>console.log(text),
    transactionCallback = (text)=>console.log(text),
    changeCallbackDelay = 5000,
    content=undefined,
    }={}){
    var self = {}
    var textEditor = undefined
    var editor = undefined
    var lastUpdate = Date.now()
    var lastRegisterFutureUpdate = Date.now()


    var init = function(){
        textEditor = createTextEditor({container, customSuggestion:suggestionConfigurator, useBaseExtension:false,})
        
        editor = textEditor.getEditor()
        if (content) {
            editor.commands.setContent(content)
        }

        editor.view.dom.addEventListener("click", function (e) { //TODO do it via prosemirror
            console.log(e);
            if (e.target.classList.contains('mention')) {
                //alert(e.target.dataset.id)
                showPopupInstancePreview(e.target.dataset.id)
            }
        })
        editor.on('update', ({ editor }) => {
            if (lastUpdate + changeCallbackDelay < Date.now()) {
                lastUpdate = Date.now()
                changeCallback(editor.getJSON())
            }else {
                var currentRegister = Date.now()
                lastRegisterFutureUpdate = Date.now()
                
                setTimeout(function () {
                    if (lastRegisterFutureUpdate<=currentRegister) {
                        changeCallback(editor.getJSON())  
                    }
                }, changeCallbackDelay)
            }
            
          })
          
          editor.on('selectionUpdate', ({ editor }) => {
            // The selection has changed.
          })
          
          editor.on('transaction', ({ editor, transaction }) => {
            transactionCallback(transaction)
            console.log(editor);
          })
        //   editor.on('clicked', (ev) => {
        //     console.log(ev);
        //     alert(eef)
            
        //   })
        // editor.onChange(function () {
        //     const json = editor.getJSON()
        // })
    }

    init()
    return self
}

addCSS(/*css*/`
.ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }
  }
  .mention {
    border: 1px solid #797979;
    border-radius: 0.4rem;
    padding: 0.1rem 0.3rem;
    box-decoration-break: clone;
    cursor:pointer;
  }
  .sug-item{

  }
`)

export default createTexteArea