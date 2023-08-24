
var getMentionsNodes =function (defs) {
    var appendFunc = function (nodes) {

        for (let i = 0; i < defs.length; i++) {
            const def = defs[i];
            nodes = nodes.append({
                    [def.name]: nodeFromDef(def)
                  }
            )
        } 
        console.log(defs);
        console.log(nodes);
        return nodes
    }
    return appendFunc
}

var defToAttributes = function (def) {
    var attrs = {}
    for (let i = 0; i < def.attributes.length; i++) {
        const attr = def.attributes[i];
        attrs[attr]=""
    }
    return attrs
}

var defToMatchTag = function (def) {
    var tagTxt = "span"
    for (let i = 0; i < def.attributes.length; i++) {
        const attr = def.attributes[i];
        tagTxt+="data-"+def.name+"-"+attr
    }
    return tagTxt
}
var defToReturnAttrs = function (def) {
    var returnFunction = function (dom, def) {
        var objToReturn = {}
        for (let i = 0; i < def.attributes.length; i++) {
            const attr = def.attributes[i];
            objToReturn[attr] = dom.getAttribute("data-"+def.name+"-"+attr)
        }
        return objToReturn
    }
    var DOMFunc = function (dom) {
        returnFunction(dom, def)
    }
    return DOMFunc
}

var defToDOM = function (def) {
    var domAttrFunction =function (node, def) {
        var domAttr = {}
        for (let i = 0; i < def.attributes.length; i++) {
            const attr = def.attributes[i];
            domAttr["data-"+def.name+"-"+attr]=node.attrs[attr]
        }
        // domAttr.class = "prosemirror-"+def.name+"-"+def.attributeToDisplay
        domAttr.class = "prosemirror-"+def.name+"-node"
        return domAttr
    }
    var returnFunction = function (node, def) {
        return [
            "span",
            domAttrFunction(node, def),
            `${def.key}` + node.attrs[def.attributeToDisplay]
          ];
    }
    var DOMFunc = function (node) {
        return returnFunction(node, def)
    }
    
    return DOMFunc
}

var nodeFromDef = function(def){
    var newNode = {
        group: "inline",
        inline: true,
        atom: true,
      
        // attrs: {
        //   id: "",
        //   name: "",
        //   email: ""
        // },
        attrs:defToAttributes(def),
      
        selectable: false,
        draggable: false,
      
        toDOM: defToDOM(def),
      
        parseDOM: [
          {
            // match tag with following CSS Selector
            tag: defToMatchTag(def),
      
            getAttrs: defToReturnAttrs(def)
          }
        ]
    };
    return newNode
}


//THIS IS THE TARGET TO CREATE
/**
 * See https://prosemirror.net/docs/ref/#model.NodeSpec
 */
// export const mentionNode = {
//     group: "inline",
//     inline: true,
//     atom: true,
  
//     attrs: {
//       id: "",
//       name: "",
//       email: ""
//     },
  
//     selectable: false,
//     draggable: false,
  
//     toDOM: node => {
//       return [
//         "span",
//         {
//           "data-mention-id": node.attrs.id,
//           "data-mention-name": node.attrs.name,
//           "data-mention-email": node.attrs.email,
//           class: "prosemirror-mention-node"
//         },
//         "@" + node.attrs.name || node.attrs.email
//       ];
//     },
  
//     parseDOM: [
//       {
//         // match tag with following CSS Selector
//         tag: "span[data-mention-id][data-mention-name][data-mention-email]",
  
//         getAttrs: dom => {
//           var id = dom.getAttribute("data-mention-id");
//           var name = dom.getAttribute("data-mention-name");
//           var email = dom.getAttribute("data-mention-email");
//           return {
//             id: id,
//             name: name,
//             email: email
//           };
//         }
//       }
//     ]
//   };
  

export {getMentionsNodes}