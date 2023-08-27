import * as pmModule from '../pmCore.js'
var pm = pmModule.pmCore

var Plugin = pm.state.Plugin
var PluginKey = pm.state.PluginKey
var TextSelection = pm.state.TextSelection
var Decoration = pm.view.Decoration
var DecorationSet = pm.view.DecorationSet

var toLint = [
  {regexExp:/=== .* ===/ig, classSuffix:"knot", style:"font-size:bold; color:#11a88c;"},
  {regexExp:/\*/ig, classSuffix:"choice", style:"font-size:bold; color:#11a88c;"}, 
  {regexExp:/\[(.*?)\]/gi, classSuffix:"suppressor", style:"font-size:bold; color:#11a88c;"},
]

//FOUNTAIN
var previousLineIsEmpty =function (doc, node, topIndex, index) {
    console.log(doc);
    console.log(topIndex);
    console.log(doc.maybeChild(topIndex));
    if (doc.maybeChild(topIndex-1) && doc.maybeChild(topIndex-1).textContent =="") {
        console.log("is true");
        return true
    }
    return false
}
var toLint = [
    {classSuffix:"scene", regexExp:/INT\. .*/g, style:"font-size:bold; color:#11a88c;"},
    {classSuffix:"scene", regexExp:/EXT\. .*/g, style:"font-size:bold; color:#11a88c;"},
    {classSuffix:"character", regexExp:/=== .* ===/ig, conditions:[previousLineIsEmpty], style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
    // {classSuffix:"knot", regexExp:/=== .* ===/ig, style:"font-size:bold; color:#11a88c;"},
  ]

var createHighlighter = function(){

  function lintDeco(doc) {
    let decos = []
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

//   const knots = /=== .* ===/ig

//   // Words you probably shouldn't use
//   const badWords = /\b(obviously|clearly|evidently|simply)\b/ig
//   // Matches punctuation with a space before it
//   const badPunc = / ([,\.!?:]) ?/g
//   // Matches punctuation with a space before it
//   const goToLinks = /->/ig

  function lint(doc) {
    let result = [], lastHeadLevel = null

    function record(msg, from, to,rule, fix) {
      result.push({msg, from, to, rule, fix})
    }

    // For each node in the document
    console.log("nodelistfeach");
    doc.forEach((node, offset, topIndex) => {
        node.descendants((node, pos, parent, index) => {
            console.log(index);
            console.log(node);
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
                        console.log(cond(doc,node, topIndex, index));
                        conditionsPassed = cond(node, topIndex, index)
                        console.log(conditionsPassed);
                    }  
                }
                console.log("liniting",rule,conditionsPassed );
                if (conditionsPassed) { //do the regex verif
                    console.log("liniting",rule );
                    while (m = toLint[i].regexExp.exec(node.text)){
                        record(`${toLint[i].classSuffix} '${m[0]}'`, offset+1 +pos + m.index, offset+1+ pos + m.index + m[0].length, toLint[i])
                    }
                }
                
                
            }
          }
        })
        console.log(topIndex);
        console.log(node);
    })
    console.log("nodelist");

    // doc.descendants((node, pos, parent, index) => {
    //     console.log(index);
    //     console.log(node);
    //   if (node.isText) {
    //     // Scan text nodes for suspicious patterns
    //     let m
        
    //     for (let i = 0; i < toLint.length; i++) {
    //       while (m = toLint[i].regexExp.exec(node.text)){
    //         record(`${toLint[i].classSuffix} '${m[0]}'`, pos + m.index, pos + m.index + m[0].length, toLint[i])
    //       }
    //     }
        

          
    //   //   while (m = goToLinks.exec(node.text))
    //   //     record(`GoTo '${m[0]}'`,
    //   //            pos + m.index, pos + m.index + m[0].length)
    //   //   while (m = badWords.exec(node.text))
    //   //     record(`Try not to say '${m[0]}'`,
    //   //            pos + m.index, pos + m.index + m[0].length)
    //   //   while (m = badPunc.exec(node.text))
    //   //     record("Suspicious spacing around punctuation",
    //   //            pos + m.index, pos + m.index + m[0].length,
    //   //            fixPunc(m[1] + " "))
    //   // } else if (node.type.name == "heading") {
    //     // Check whether heading levels fit under the current level
    //   //   let level = node.attrs.level
    //   //   if (lastHeadLevel != null && level > lastHeadLevel + 1)
    //   //     record(`Heading too small (${level} under ${lastHeadLevel})`,
    //   //            pos + 1, pos + 1 + node.content.size,
    //   //            fixHeader(lastHeadLevel + 1))
    //   //   lastHeadLevel = level
    //   // } else if (node.type.name == "image" && !node.attrs.alt) {
    //     // Ensure images have alt text
    //   //   record("Image without alt text", pos, pos + 1, addAlt)
    //   }
    // })

    return result
  }

  function fixPunc(replacement) {
    return function({state, dispatch}) {
      dispatch(state.tr.replaceWith(this.from, this.to,
                                    state.schema.text(replacement)))
    }
  }

  function fixHeader(level) {
    return function({state, dispatch}) {
      dispatch(state.tr.setNodeMarkup(this.from - 1, null, {level}))
    }
  }

  function addAlt({state, dispatch}) {
    let alt = prompt("Alt text", "")
    if (alt) {
      let attrs = Object.assign({}, state.doc.nodeAt(this.from).attrs, {alt})
      dispatch(state.tr.setNodeMarkup(this.from, null, attrs))
    }
  }


  return new Plugin({
    key: new PluginKey("highlighter"),
    state: {
      init(_, {doc}) { return lintDeco(doc) },
      apply(tr, old) { return tr.docChanged ? lintDeco(tr.doc) : old }
    },
    props: {
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





export {createHighlighter}