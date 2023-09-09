import * as pmModule from '../pmCore.js'
var pm = pmModule.pmCore


console.log(pm);

var Plugin = pm.state.Plugin
var PluginKey = pm.state.PluginKey
var TextSelection = pm.state.TextSelection
var Decoration = pm.view.Decoration
var DecorationSet = pm.view.DecorationSet
var findWrapping = pm.tranform.findWrapping


//INK
var toLint = [
  {regexExp:/=== .* ===/ig, classSuffix:"knot", style:"font-size:bold; color:#11a88c;"},
  {regexExp:/\*/ig, classSuffix:"choice", style:"font-size:bold; color:#11a88c;"}, 
  {regexExp:/\[(.*?)\]/gi, classSuffix:"suppressor", style:"font-size:bold; color:#11a88c;"},
]

//FOUNTAIN
var previousLineIsEmpty =function (doc, node, topIndex, index, notableLines) {
    if (doc.maybeChild(topIndex-1) && doc.maybeChild(topIndex-1).textContent =="") {
        return true
    }
    return false
}
var previousLineIsDialogueOrCharacter =function (doc, node, topIndex, index, notableLines) {
    if (notableLines[topIndex-1] && (notableLines[topIndex-1]=="character" || notableLines[topIndex-1]=="dialogue")) {
        return true
    }
    return false
}
var toLint = [
    {classSuffix:"scene", regexExp:/INT\. .*/g, style:"font-size:bold; color:#11a88c;"},
    {classSuffix:"scene", regexExp:/EXT\. .*/g, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, conditions:[previousLineIsEmpty], style:"font-size:bold; color:#11a88c;"},
    {classSuffix:"character", regexExp:/^[A-Z][A-Z][A-Z]*$/gm, conditions:[previousLineIsEmpty],style:"font-size:bold; color:#11a88c; display:block; margin:auto; text-align: center; " },
    {classSuffix:"dialogue", regexExp:false, conditions:[previousLineIsDialogueOrCharacter], style:"display:block; margin:auto; text-align: center; width:80%;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
  ]
  var experimentWhithNodes= function(tr, schema){
    console.log(tr);
    const $position = tr.selection.$from;
    console.log($position);
    // Get a range around the selected blocks
    let range = tr.selection.$from.blockRange(tr.selection.$to)
    console.log(range);
    // // See if it is possible to wrap that range in a note group
    console.log(schema);
    let wrapping = findWrapping(range, schema.nodes.blockquote)
    console.log(wrapping);
    // // If not, the command doesn't apply
    if (!wrapping) return false
    // Otherwise, dispatch a transaction, using the `wrap` method to
    // create the step that does the actual wrapping.
    // if (dispatch) dispatch(state.tr.wrap(range, wrapping).scrollIntoView())
    return true
  }
  var experimentWhithNodesB= function(view, from, to, text, schema, commonState){
    console.log(view);
    console.log(text);
    const $position = view.state.selection.$from;
    console.log($position);
    // Get a range around the selected blocks
    let range = view.state.selection.$from.blockRange(view.state.selection.$to)
    console.log(range);
    // // See if it is possible to wrap that range in a note group
    console.log(schema);
    let wrapping = findWrapping(range, schema.nodes.blockquote)
    console.log(wrapping);
    // // If not, the command doesn't apply
    
    var textToCheck = view.state.selection.$head.parent.textContent
    
    var regexExp = /IOT\. .*/g
    let m
    // while (m = regexExp.exec(textToCheck)){
    //   console.log(m);
    //   alert("refesf")
        
    // }
    
    console.log("matching");
    console.log(range);
    console.log(range.parent);
    console.log(textToCheck);
    console.log(/INT\. .*/.test(textToCheck));
    console.log(regexExp.exec(textToCheck));
    console.log(regexExp.test(textToCheck));
    console.log( view.state.doc.resolve($position.before(1)));
    alert ("fesfs")
    if (!wrapping) return false
    if (regexExp.test(textToCheck) && range.parent.type.name !="blockquote") {
      console.log("FOUND");
      console.log("FOUND");
      let wrapping = findWrapping(range, schema.nodes.blockquote)
      console.log(range);
      console.log(wrapping);
      // setTimeout(function () {
      //   view.dispatch(view.state.tr.wrap(range, wrapping))
      //   // if (view.dispatch) view.dispatch(view.state.tr.wrap(range, wrapping).scrollIntoView())
      // },0)
      var tr2 = view.state.tr.insertText(text, from, to)
      // var tr1 = view.dispatch(view.state.tr.wrap(range, wrapping))
      // view.dispatch(tr2)
      // view.dispatch(tr1.setMeta(plugin, {transform: tr, from, to, text}))
      if (view.dispatch) view.dispatch(view.state.tr.wrap(range, wrapping))
      view.dispatch(commonState.editor.state.tr.insertText(text, from+1, to+1))
      var newState = commonState.editor.state
      const endPos = newState.selection.$from;
      console.log(endPos);
      // alert("d")
      // const selection = new TextSelection(newState.doc.resolve(endPos));
      // let transaction = newState.tr.setSelection(selection);
      // view.dispatch(transaction);

    //   console.log(commonState);
    // alert("fesf")
      // Subtract one so that it falls within the current node
      // const endPos = view.state.selection.$to.after() - 1;
      // const endPos = view.state.selection.$to.after()-1;
      // const selection = new TextSelection(view.state.doc.resolve(endPos));
      // let transaction = view.state.tr.setSelection(selection);
      // view.dispatch(transaction);
      // view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, $position+1)));
      return true
    }
    // Otherwise, dispatch a transaction, using the `wrap` method to
    // create the step that does the actual wrapping.
    // console.log(view.state.doc.textBetween(parastart, $position.pos, "\n", "\0") );
    console.log(view.state.selection.$head.parent.textContent);
    console.log(view.state.selection.$head.parent.parent);
    // if (view.dispatch) view.dispatch(view.state.tr.wrap(range, wrapping).scrollIntoView())
    return false
  }
var createTagger = function({
  schema=undefined,
  commonState = {}
}={}){
  
  function lintDeco(doc) {
    // var doc = tr.doc
    // experimentWhitNodes(tr)

    let decos = []
    var tagged = lint(doc)
    console.log(tagged);
    lint(doc).forEach(prob => {
      decos.push(Decoration.inline(prob.from, prob.to, {class: "prose_highlight_"+prob.rule.classSuffix, style:prob.rule.style}),
                 Decoration.widget(prob.from, lintIcon(prob)))
    })
    return DecorationSet.create(doc, decos)
  }

  function lintIcon(prob) {
    let icon = document.createElement("div")
    icon.className = "lint-icon"
    icon.title = prob.msg
    icon.problem = prob
    return icon
  }


  function lint(doc) {
    let result = [], lastHeadLevel = null

    function record(msg, from, to,rule, fix) {
      result.push({msg, from, to, rule, fix})
    }
    let notableLines ={}
    
    // For each node in the document
    doc.forEach((node, offset, topIndex) => {
        node.descendants((node, pos, parent, index) => {
          if (node.isText) {
            // Scan text nodes for suspicious patterns
            let m
            for (let i = 0; i < toLint.length; i++) {
                //check surrounding Conditions
                var rule = toLint[i]
                var conditionsPassed = true
                if (toLint[i].conditions) { //check for extra conditions
                    for (let j = 0; j < toLint[i].conditions.length && conditionsPassed; j++) {
                        const cond = toLint[i].conditions[j];
                        conditionsPassed = cond(doc, node, topIndex, index, notableLines)
                    }  
                }
                if (conditionsPassed && toLint[i].regexExp) { //do the regex verif
                    while (m = toLint[i].regexExp.exec(node.text)){
                      console.log(notableLines);
                        record(`${toLint[i].classSuffix} '${m[0]}'`, offset+1 +pos + m.index, offset+1+ pos + m.index + m[0].length, toLint[i])
                        notableLines[topIndex]= toLint[i].classSuffix //record for current exe
                    }
                }else if (conditionsPassed ) { 
                  console.log("fefesf");
                  record(`${toLint[i].classSuffix} '${node.text}'`, offset+1 +pos, offset+1+ pos + node.text.length, toLint[i])
                  notableLines[topIndex]= toLint[i].classSuffix //record for current exe
              }
                
                
            }
          }
        })

    })


    return result
  }



  function scan(tr) {
    // experimentWhithNodes(tr, schema);
    lintDeco(tr.doc)
    return lintDeco(tr.doc)
  }


  return new Plugin({
    key: new PluginKey("tagger"),
    // state: {
    //   init(_, {doc}) { return lintDeco(doc) },
    //   apply(tr, old) { return tr.docChanged ? scan(tr) : old }
    // },
    // props: {
    //   handleTextInput(view, from, to, text) {
    //     return run(view, from, to, text, rules, plugin)
    //   },
      
    // },

    // isInputRules: true,
    props: {
      // handleDOMEvents: {
      //   compositionend: (view) => {
      //     alert("e")
      //     // setTimeout(() => {
      //     //   // let {$cursor} = view.state.selection as TextSelection
      //     //   // if ($cursor) run(view, $cursor.pos, $cursor.pos, "", rules, plugin)
      //     // })
      //   }
      // },
      handlePaste(view, event, slice){
        console.log(slice);
        alert("fesfe")
      },
      handleTextInput(view, from, to, text) {
        // return run(view, from, to, text, rules, plugin)
        console.log("fsfesf");
        return experimentWhithNodesB(view, from, to, text, schema, commonState)
      },
      decorations(state) { return this.getState(state) },
      handleClick(view, _, event) {
        if (/lint-icon/.test(event.target.className)) {
          let {from, to} = event.target.problem
          view.dispatch(
            view.state.tr
              .setSelection(TextSelection.create(view.state.doc, from, to))
              .scrollIntoView())
          return true
        }
      },
      handleDoubleClick(view, _, event) {
        if (/lint-icon/.test(event.target.className)) {
          let prob = event.target.problem
          if (prob.fix) {
            prob.fix(view)
            view.focus()
            return true
          }
        }
      }
    }
  })

}





export {createTagger}