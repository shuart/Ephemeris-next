import * as pmModule from '../pmCore.js'
var pm = pmModule.pmCore

var Plugin = pm.state.Plugin
var PluginKey = pm.state.PluginKey
var TextSelection = pm.state.TextSelection
var Decoration = pm.view.Decoration
var DecorationSet = pm.view.DecorationSet


//INK
var toLint3 = [
  {regexExp:/bbb .* bbb/ig, classSuffix:"knot", style:"font-size:bold; color:#11a88c;"},
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
var toLint2 = [
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
  // var experimentWhithNodes= function(tr){
  //   console.log(tr);
  // }
var createNodeFinder = function(nodesToHighlight,nodesToHighlightOnClick){

  var tagsMapping={};
  var toLint =[];
  for (let i = 0; i < nodesToHighlight.length; i++) {
    // if (!nodesToHighlight[i].style) {
    //   nodesToHighlight[i].style="font-size:bold; color:#11a88c;"
    // }
    // tagsMapping[nodesToHighlight[i].tag] =nodesToHighlight[i]
    toLint.push({classSuffix:"scene",id:nodesToHighlight[i].id, regexExp:new RegExp(String.raw`${nodesToHighlight[i].tag}`, "gi"), style:"font-size:bold; color:#11a88c;"})
  }
  
  function lintDeco(doc) {
    // var doc = tr.doc
    // experimentWhitNodes(tr)


    let decos = []
    lint(doc).forEach(prob => {
      decos.push(Decoration.inline(prob.from, prob.to, {class: "prose_highlight_"+prob.rule.classSuffix, style:prob.rule.style}),
                 Decoration.widget(prob.from, lintIcon(prob)))
    })
    return DecorationSet.create(doc, decos)
  }

  function lintIcon(prob) {
    let icon = document.createElement("div")
    icon.className = "lint-icon-local"
    icon.title = prob.msg
    icon.problem = prob
    icon.onclick = function () {
      console.log(prob);
      if (typeof nodesToHighlightOnClick == 'function') {
        nodesToHighlightOnClick(prob)
      }
    }
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
    let notableLines ={}

    
    // For each node in the document
    doc.forEach((node, offset, topIndex) => {
        node.descendants((node, pos, parent, index) => {
          if (node.isText) {
            // // check matching tags
            // if (tagsMapping[node.text]){ 
            //   toLint = tagsMapping[node.text]
            //   record(`${toLint.classSuffix} '${node.text}'`, offset+1 +pos, offset+1+ pos + node.text.length, toLint)

            // }


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
                      // console.log(notableLines);
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

  function scan(tr) {
    // experimentWhithNodes(tr);
    lintDeco(tr.doc)
    return lintDeco(tr.doc)
  }


  return new Plugin({
    key: new PluginKey("node_finder"),
    state: {
      init(_, {doc}) { return lintDeco(doc) },
      apply(tr, old) { return tr.docChanged ? scan(tr) : old }
    },
    props: {
      decorations(state) { return this.getState(state) },
      handleClick(view, _, event) {
        if (/lint-icon-local/.test(event.target.className)) {
          let {from, to} = event.target.problem
          view.dispatch(
            view.state.tr
              .setSelection(TextSelection.create(view.state.doc, from, to))
              .scrollIntoView())
          return true
        }
      },
      handleDoubleClick(view, _, event) {
        if (/lint-icon-local/.test(event.target.className)) {
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





export {createNodeFinder}