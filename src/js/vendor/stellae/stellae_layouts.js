import * as THREE from "../three.module.js"
import inputElements from "./stellae_inputs.js"
import { createGroup } from "./stellae_layouts_plane.js";
import createNodeLayoutRound from "./stellae_layouts_round.js"

let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

const textCanvas = document.createElement( 'canvas' );
textCanvas.height = 34;

const shadowCanvas = document.createElement( 'canvas' );

const hwidth = 3;
const hheight = 0.5;

const squareShapeNoRadius = new THREE.Shape()
    .moveTo( 0, 0 )
    .lineTo( 0, hheight )
    .lineTo( hwidth, hheight )
    .lineTo( hwidth, 0 )
    .lineTo( 0, 0 );
const hwidthS = 12;
const hheightS = 12;
const bevel = 0.15;
const squareShape= new THREE.Shape()
    .moveTo( 0, hheight  )
    .lineTo( 0, hheight*0.28 )
    .quadraticCurveTo (  0, 0.002,  bevel, 0  )
    .lineTo( hwidth-bevel, 0 )
    .quadraticCurveTo (  hwidth, 0.002,  hwidth, hheight*0.28  )
    .lineTo( hwidth, hheight )


const squareShapeSocketStraight = new THREE.Shape()
    .moveTo( -hwidthS/2, -hwidthS/2 )
    .lineTo( -hwidthS/2, hheightS/2 )
    .lineTo( hwidthS/2, hheightS/2 )
    .lineTo( hwidthS/2, -hwidthS/2)
    .lineTo( 0, -hwidthS/2 );
const squareShapeSocket = new THREE.Shape()
    .moveTo( 0, -hwidthS/2 )
    .lineTo( -hwidthS/2, 0 )
    .lineTo( 0, hheightS/2 )
    .lineTo( hwidthS/2, 0)
    .lineTo( 0, -hwidthS/2 );

const squareShapeBack = new THREE.Shape()
    .moveTo( 0, 0 )
    .lineTo( 0, hheight+0.5 )
    .lineTo( hwidth, hheight+0.5 )
    .lineTo( hwidth, 0 )
    .lineTo( 0, 0 );
var circleRadius =5
const circleShape = new THREE.Shape()
    .moveTo( 0, circleRadius )
    .quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 )
    .quadraticCurveTo( circleRadius, - circleRadius, 0, - circleRadius )
    .quadraticCurveTo( - circleRadius, - circleRadius, - circleRadius, 0 )
    .quadraticCurveTo( - circleRadius, circleRadius, 0, circleRadius );
var headerGeometry = new THREE.ShapeGeometry( squareShape );
var roundSocketGeometry = new THREE.ShapeGeometry( circleShape );
var squareSocketGeometry = new THREE.ShapeGeometry( squareShapeSocket );
var squareStraightSocketGeometry = new THREE.ShapeGeometry( squareShapeSocketStraight );

var propsHeightMap={
    hidden:0.5,
    text:0.3,
    select:0.3,
    secret:0,
}

var socketColorMap={
    // array:0x6767d1,
    array:0xa35abd,
    float:0xbfbf96,
    data:0x00d6a3,
    boolean:0xcca6d6,
    function:0x686363,
    configuration:0xc14f57,
    // vector:0x6363c7,
    vector:0x6860c2,
    color:0xc7c729,
    string:0x70b2ff,
    object:0xed9e5c,
    default:0x00b5ad, 
}

const colorShade = (color, amt) => {
    // col = col.replace(/^#/, '')
    var col = color
    if (col[0]!='#') { //is decimal
        // col = "#"+col.toString(16);
        let r = (col & 0xff0000) >> 16;
        let g = (col & 0x00ff00) >> 8;
        let b = (col & 0x0000ff);
        // var r = Math.floor(col / (256*256));
        // var g = Math.floor(col / 256) % 256;
        // var b = col % 256;
        ([r, g, b] = [r + amt, g+ amt, b + amt])
        r = Math.max(Math.min(255, r), 0).toString(16)
        g = Math.max(Math.min(255, g), 0).toString(16)
        b = Math.max(Math.min(255, b), 0).toString(16)
    
        const rr = (r.length < 2 ? '0' : '') + r
        const gg = (g.length < 2 ? '0' : '') + g
        const bb = (b.length < 2 ? '0' : '') + b
    
        return `#${rr}${gg}${bb}`
        // const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)
        // const getChunksFromString = (st, chunkSize) => st.match(new RegExp(`.{${chunkSize}}`, "g"))
        // const convertHexUnitTo256 = (hexStr) => parseInt(hexStr.repeat(2 / hexStr.length), 16)
        // const getAlphafloat = (a, alpha) => {
        //     if (typeof a !== "undefined") {return a / 255}
        //     if ((typeof alpha != "number") || alpha <0 || alpha >1){
        //     return 1
        //     }
        //     return alpha
        // }
        // const hexToRGBA = (hex, alpha) => {
        //     // if (!isValidHex(hex)) {throw new Error("Invalid HEX")}
        //     const chunkSize = Math.floor((hex.length - 1) / 3)
        //     const hexArr = getChunksFromString(hex.slice(1), chunkSize)
        //     let [r, g, b, a] = hexArr.map(convertHexUnitTo256)
        //     const original = `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`
        //     ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])
    
        //     r = Math.max(Math.min(255, r), 0).toString(16)
        //     g = Math.max(Math.min(255, g), 0).toString(16)
        //     b = Math.max(Math.min(255, b), 0).toString(16)
        
        //     const rr = (r.length < 2 ? '0' : '') + r
        //     const gg = (g.length < 2 ? '0' : '') + g
        //     const bb = (b.length < 2 ? '0' : '') + b
        
        //     return `#${rr}${gg}${bb}`
        // }
        // hexToRGBA(col)
    }else{
        col = col.substring(1)
        if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]
  
        let [r, g, b] = col.match(/.{2}/g);
        ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])
    
        r = Math.max(Math.min(255, r), 0).toString(16)
        g = Math.max(Math.min(255, g), 0).toString(16)
        b = Math.max(Math.min(255, b), 0).toString(16)
    
        const rr = (r.length < 2 ? '0' : '') + r
        const gg = (g.length < 2 ? '0' : '') + g
        const bb = (b.length < 2 ? '0' : '') + b
    
        return `#${rr}${gg}${bb}`
    }
  }




var createNodeSquare  = function({
    headerColor = undefined,
    name = "Node",
    position={x:0,y:0},
    uuid = nanoid(),
    nodeData = {},
    template = undefined,
    props =[
        {id:nanoid(), label:"demo", type:"text", editable:true, socket:"output", value:"Default"},
        {id:nanoid(), label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
        {id:nanoid(), label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
    ],
    } = {}){
    
    if (!headerColor && template && template.style && template.style.headerColor) { //overide template color if local has one
        headerColor = template.style.headerColor
    }else if (!headerColor) {
        headerColor = 0x00b5ad
    }


    var layoutItems={
        header:undefined,
        sockets:{},
        props:{},
        label:undefined,
    }
    function createShadow (){
        //do it only one time
        const ctx = shadowCanvas.getContext('2d');
        shadowCanvas.height=200;
        shadowCanvas.width=200;

        // Shadow
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 15;

        // Rectangle
        ctx.fillStyle = 'white';
        ctx.fillRect(20, 20, 150, 100);
        const spriteMap = new THREE.Texture( ctx.getImageData( 0, 0, shadowCanvas.width, shadowCanvas.height ) );
        spriteMap.minFilter = THREE.LinearFilter;
        spriteMap.generateMipmaps = false;
        spriteMap.needsUpdate = true;
        const sprite = new THREE.Sprite( new THREE.SpriteMaterial( { map: spriteMap } ) );
        var mult = 2
        // sprite.scale.set( mult * 0.12 * shadowCanvas.width / shadowCanvas.height , mult *0.12, 1 );
        // sprite.position.y = 0.7 ;

        return sprite;
    }

    function createCharacterLabel( textToRender, maxLength ) {
        var text = textToRender
        if (textToRender == undefined) {
            text = "Missing"
        }
        if (text.length > maxLength) {
            text = text.substring(0, maxLength-2)+"..";
        }
        const ctx = textCanvas.getContext( '2d' );
        const font = '32px arial';

        ctx.font = font;
        textCanvas.width = Math.ceil( ctx.measureText( text ).width + 16 );

        ctx.font = font;
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 4;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 3;
        ctx.strokeText( text, 8, 26 );
        ctx.fillStyle = 'white';
        // ctx.textAlign = 'left';
        ctx.fillText( text, 8, 26 );

        const spriteMap = new THREE.Texture( ctx.getImageData( 0, 0, textCanvas.width, textCanvas.height ) );
        spriteMap.minFilter = THREE.LinearFilter;
        spriteMap.generateMipmaps = false;
        spriteMap.needsUpdate = true;

        const sprite = new THREE.Sprite( new THREE.SpriteMaterial( { map: spriteMap } ) );
        var mult = 2
        sprite.scale.set( mult * 0.12 * textCanvas.width / textCanvas.height , mult *0.12, 1 );
        sprite.position.y = 0.7 ;

        return sprite;
    }

    function createHeader(node, name){
        const materialHeader = new THREE.MeshBasicMaterial( { color: headerColor,side: THREE.DoubleSide  } );
        
        var header = new THREE.Mesh( headerGeometry, materialHeader );
        header.layoutItemType ="header"
        header.layoutItemRoot =node
        header.position.set((0-hwidth/2),0-hheight/2,0)
        //text
        var spritetext = createCharacterLabel(name)
        node.add(spritetext)
        spritetext.position.set(0,0,-0.01)
        
        createSubHeader(node) //only for extra coolness
        node.add(header)
        layoutItems.header = header
        return header
    }
    function createSubHeader(node){
        const materialHeader = new THREE.MeshBasicMaterial( { color: colorShade(headerColor, -35),side: THREE.DoubleSide  } );
        
        var subheader = new THREE.Mesh( headerGeometry, materialHeader );
        subheader.layoutItemType ="subheader"
        subheader.layoutItemRoot =node
        subheader.position.set((0-hwidth/2),0-hheight/2+0.05,0.001)
        node.add(subheader)
        // layoutItems.subheader = subheader
        return subheader
    }

    function createBack(node, props){
        const materialBack = new THREE.MeshBasicMaterial( { color: 0x303030,side: THREE.DoubleSide  } );
        var geometryBack = new THREE.ShapeGeometry( squareShapeBack );
        var background = new THREE.Mesh( geometryBack, materialBack );
        background.layoutItemType ="header"
        background.layoutItemRoot =node
        background.scale.y = (props.filter(p=>p.type != 'secret').length+1)/2
        background.position.set((0-hwidth/2),0-hheight/5,0.002)
        node.add(background)
        //createShadow
        var spriteShadow = createShadow()
        node.add(spriteShadow)
        // spriteShadow.position.set(0,1.7,0.008)
        // spriteShadow.scale.set(3.5,4.5/3,1)
        // background.scale.y = (props.length+1)/2
        var scaler = props.length+1
        
        scaler = Math.min(props.filter(p=>p.type != 'secret').length,5)
        spriteShadow.position.set(0.1,scaler/4 +(scaler/10) ,0.008)
        spriteShadow.scale.set(3.7,scaler,1)
        // spriteShadow.scale.y = (props.length+1)
    }

    function createSocket(group, prop){
        var socketColor = socketColorMap.default
        if (prop.expect) {
            if (socketColorMap[prop.expect]) {
                socketColor = socketColorMap[prop.expect]
            }
        }else{
            
            if (Array.isArray(prop.value)) {
                socketColor = socketColorMap.array
            }
            if (prop.value instanceof Function) {
                socketColor = socketColorMap.function
            }
        }
        
        const materialSocketFlow = new THREE.MeshBasicMaterial( { color: socketColor,side: THREE.DoubleSide  } );
        var socket = undefined;
        if (prop.isSquare && !prop.multiple) {
            socket = new THREE.Mesh( squareSocketGeometry, materialSocketFlow );
        }else if (prop.isSquare && prop.multiple) {
            socket = new THREE.Mesh( squareStraightSocketGeometry, materialSocketFlow );
        }else{
            socket = new THREE.Mesh( roundSocketGeometry, materialSocketFlow );
        }
        
        group.add(socket)
        if (prop.socket == "output") {
            socket.position.set(1.47,0,0)
        }else{
            socket.position.set(-1.47,0,0)
        }

        if (prop.multiple) { //set aspect
            socket.scale.set(0.02,0.03,0.02)
        }else{
            socket.scale.set(0.02,0.02,0.02)
        }
        
        return socket
    }

    function createPropAction(node,prop, template){
        
        var action = undefined
        
        if(prop.type == "custom" || prop.onClick){
            
            var currentTemplate = template
            var templateProp = template.props.find(p=>p.id == prop.id)
            action = function (param) {
                templateProp.onClick({prop:prop, node:nodeData})
                param.callback()
            }
        }else{
            if (Array.isArray(prop.value)) {
                action = function (param) {
                    // inputElements.createFieldView({field:prop.value})
                    console.log(prop.value);
                    alert(JSON.stringify(prop.value ))
                }
                return action
            }else if (prop.type == "text") {
                action = function (param) {
                    
                    var newValue = prompt("Set "+prop.label,prop.value)
                    if (newValue && newValue != "") {
                        var propId = prop.id
                        nodeData.setProp(propId, newValue)
                        // dataManager.evaluateTree();
                        if (param && param.callback) {param.callback()}
                    }
                }
            }
            if (prop.type == "select") {
                action = function (param) {
                    inputElements.createListInput({options:prop.options, callback:(event)=> {nodeData.setProp(prop.id, event.value);param.callback(); }})
                }
            }
        }
        
        return action
    }

    function createProp (node,position, prop, template){
        //text
        var propGroup = new THREE.Group()
        var spritetext = createCharacterLabel(prop.label,15)
        var isField = false;
        var isFunc = false;
        propGroup.add(spritetext)
        if (prop.type == "hidden") {
            spritetext.position.set(+0.5,0,0)
        }else if (prop.type == "text" || prop.type == "select" || prop.type == "custom") {
            spritetext.position.set(-0.5,0,0)
            var textToDisplay = prop.value
            if (Array.isArray(textToDisplay)) {
                textToDisplay = "Array"
                isField =true
            }
            if (textToDisplay instanceof Function) {
                textToDisplay = "Function"
                isFunc =true
            }
            
            var spritetextValue = createCharacterLabel(textToDisplay, 8)
            propGroup.add(spritetextValue)
            spritetextValue.position.set(0.5,0,0)
            layoutItems.props[spritetextValue.uuid] = {mesh:spritetextValue}
            spritetextValue.edata = { root:node, uuid:prop.id, value:prop.value, prop:prop, nodeData: nodeData, isField:isField, action:createPropAction(node, prop, template), }
        }
        
        if(prop.socket && prop.socket != "none"){
            var socket = createSocket(propGroup, prop)
            socket.layoutItemRoot =node
            socket.edata = { root:node, nodeData: nodeData, uuid:prop.id, positionOffset:{x:socket.position.x,y:0.5+position,z:0} }
            layoutItems.sockets[socket.uuid] = {mesh:socket, positionOffset:{x:socket.position.x,y:0.5+position,z:0}}
        }
        
        node.add(propGroup)
        propGroup.position.set(0,0.5+position,0)
        
        return propGroup

    }

    function createRows (node,props, template){
        var currentPosition =0;
        for (let i = 0; i < props.length; i++) {
            if (props[i].type != "secret") {
                var propLayout = createProp(node, currentPosition, props[i], template)
                currentPosition +=propsHeightMap[props[i].type]
            }
        }
    }
    function createLabel (node, value){
        var spritetext = createCharacterLabel(value)
        if (node.layout.label) {
            node.remove(node.layout.label)
        }
        node.layout.label = spritetext
        node.add(spritetext)
        spritetext.position.set(1,-0.5,-0.01)
    }
     
    var node= new THREE.Group();
    node.layoutItemInteractions = {
        setLabel : function(value){
            createLabel(node, value)
        }
    }
    var header = createHeader(node,name)
    createBack(node,props)
    // createSocket(node)
    createRows (node, props, template)

    // var spritetext = createCharacterLabel("testtest test")
    // node.add(spritetext)
    // spritetext.position.set(0,0,-0.1)
    // // spritetext.scale.set(0.2,0.2,0.2)

    

    node.rotation.x =3.1416/2
    node.position.set(position.x,0.1,position.y)
    node.layout =layoutItems
    return node
}

var createNode = function (params) {
    if (params.nodeLayout == "round") {
        return createNodeLayoutRound(params)
    } else if (params.nodeLayout == "group") {
        return createGroup(params)
    } else {
        return createNodeSquare(params)
    }
}

var createNodeLayout =function (scene, params) {
    var node = createNode(params)
    return node
}

export default createNodeLayout