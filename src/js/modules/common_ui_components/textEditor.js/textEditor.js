import createTextEditor from "../../../vendor/tiptap/tiptapCustom.js"

var createTexteArea = function({
    container = document.body,
    changeCallback = (text)=>console.log(text),
    transactionCallback = (text)=>console.log(text),
    changeCallbackDelay = 5000,
    }={}){
    var self = {}
    var textEditor = undefined
    var editor = undefined
    var lastUpdate = Date.now()
    var lastRegisterFutureUpdate = Date.now()


    var init = function(){
        textEditor = createTextEditor({container})
        editor = textEditor.getEditor()
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
          })
        // editor.onChange(function () {
        //     const json = editor.getJSON()
        // })
    }

    init()
    return self
}

export default createTexteArea