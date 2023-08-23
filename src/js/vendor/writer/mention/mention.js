var mentions= [
    {name:"hastag", key:"#", attributes:["name", "id", "color"], attributeToDisplay:'name'},
    {name:"at", key:"@", attributes:["name", "id",], attributeToDisplay:'name'},
]

var nodeCreator =function (defs) {
    for (let i = 0; i < defs.length; i++) {
        const def = defs[i];


        
    }
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
        domAttr.class = "prosemirror-"+def.name+"-"+attr
        return domAttr
    }
    var returnFunction = function (node, def) {
        return [
            "span",
            domAttrFunction(node, def),
            `${def.key}` + node.attrs[attributeToDisplay]
          ];
    }
    var DOMFunc = function (node) {
        returnFunction(node, def)
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
}
