import * as THREE from "../three.module.js"
import inputElements from "./stellae_inputs.js"

let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

const textCanvas = document.createElement( 'canvas' );
textCanvas.height = 34;

const shadowCanvas = document.createElement( 'canvas' );

const hwidth = 3;
const hheight = 0.5;

const squareShape = new THREE.Shape()
    .moveTo( 0, 0 )
    .lineTo( 0, hheight )
    .lineTo( hwidth, hheight )
    .lineTo( hwidth, 0 )
    .lineTo( 0, 0 );

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

var propsHeightMap={
    hidden:0.5,
    text:0.3,
    select:0.3,
}


var createNode  = function({
    headerColor = 0xffff00,
    name = "Node",
    position={x:0,y:0},
    uuid = nanoid(),
    nodeData = {},
    props =[
        {id:nanoid(), label:"demo", type:"text", editable:true, socket:"output", value:"Default"},
        {id:nanoid(), label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
        {id:nanoid(), label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
    ],
    } = {}){

    var layoutItems={
        header:undefined,
        sockets:{},
        props:{},
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

    function createCharacterLabel( text, maxLength ) {

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
        const materialHeader = new THREE.MeshBasicMaterial( { color: 0x00b5ad,side: THREE.DoubleSide  } );
        
        var header = new THREE.Mesh( headerGeometry, materialHeader );
        header.layoutItemType ="header"
        header.layoutItemRoot =node
        header.position.set((0-hwidth/2),0-hheight/2,0)
        //text
        var spritetext = createCharacterLabel(name)
        node.add(spritetext)
        spritetext.position.set(0,0,-0.01)

        node.add(header)
        layoutItems.header = header
        return header
    }

    function createBack(node, props){
        const materialBack = new THREE.MeshBasicMaterial( { color: 0x303030,side: THREE.DoubleSide  } );
        var geometryBack = new THREE.ShapeGeometry( squareShapeBack );
        var background = new THREE.Mesh( geometryBack, materialBack );
        background.layoutItemType ="header"
        background.layoutItemRoot =node
        background.scale.y = (props.length+1)/2
        background.position.set((0-hwidth/2),0-hheight/2,0.002)
        node.add(background)
        //createShadow
        var spriteShadow = createShadow()
        node.add(spriteShadow)
        // spriteShadow.position.set(0,1.7,0.008)
        // spriteShadow.scale.set(3.5,4.5/3,1)
        // background.scale.y = (props.length+1)/2
        var scaler = props.length+1
        scaler = Math.min(props.length,5)
        spriteShadow.position.set(0.1,scaler/4 +(scaler/10) ,0.008)
        spriteShadow.scale.set(3.7,scaler,1)
        // spriteShadow.scale.y = (props.length+1)
    }

    function createSocket(group, prop){
        var socketColor = 0x00d6a3
        if (Array.isArray(prop.value)) {
            socketColor = 0x6767d1
        }
        const materialSocketFlow = new THREE.MeshBasicMaterial( { color: socketColor,side: THREE.DoubleSide  } );
        var socket = new THREE.Mesh( roundSocketGeometry, materialSocketFlow );
        
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

    function createPropAction(prop){
        var action = undefined

        if (Array.isArray(prop.value)) {
            action = function (param) {
                // inputElements.createFieldView({field:prop.value})
                console.log(prop.value);
                alert(JSON.stringify(prop.value ))
            }
            return action
        }
        if (prop.type == "text") {
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
        return action
    }

    function createProp (node,position, prop){
        //text
        var propGroup = new THREE.Group()
        var spritetext = createCharacterLabel(prop.label,15)
        var isField = false;
        propGroup.add(spritetext)
        if (prop.type == "hidden") {
            spritetext.position.set(+0.5,0,0)
        }else if (prop.type == "text" || prop.type == "select") {
            spritetext.position.set(-0.5,0,0)
            var textToDisplay = prop.value
            if (Array.isArray(textToDisplay)) {
                textToDisplay = "Field"
                isField =true
            }
            var spritetextValue = createCharacterLabel(textToDisplay, 8)
            propGroup.add(spritetextValue)
            spritetextValue.position.set(0.5,0,0)
            layoutItems.props[spritetextValue.uuid] = {mesh:spritetextValue}
            spritetextValue.edata = { root:node, uuid:prop.id, value:prop.value, prop:prop, nodeData: nodeData, isField:isField, action:createPropAction(prop), }
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

    function createRows (node,props){
        var currentPosition =0;
        for (let i = 0; i < props.length; i++) {
            var propLayout = createProp(node, currentPosition, props[i])
            currentPosition +=propsHeightMap[props[i].type]
        }
    }
     
    var node= new THREE.Group();
    var header = createHeader(node,name)
    createBack(node,props)
    // createSocket(node)
    createRows (node, props)

    // var spritetext = createCharacterLabel("testtest test")
    // node.add(spritetext)
    // spritetext.position.set(0,0,-0.1)
    // // spritetext.scale.set(0.2,0.2,0.2)

    

    node.rotation.x =3.1416/2
    node.position.set(position.x,0.1,position.y)
    node.layout =layoutItems
    return node
}

var createNodeLayout =function (scene, params) {
    var node = createNode(params)
    return node
}

export default createNodeLayout