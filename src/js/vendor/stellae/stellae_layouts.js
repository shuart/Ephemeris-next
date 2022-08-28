import * as THREE from "../three.module.js"

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
    .lineTo( 0, hheight+2 )
    .lineTo( hwidth, hheight+2 )
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
    text:0.3,
}


var createNode  = function({
    headerColor = 0xffff00,
    name = "Node",
    uuid = nanoid(),
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

    function createCharacterLabel( text ) {

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

    function createBack(node){
        const materialBack = new THREE.MeshBasicMaterial( { color: 0x303030,side: THREE.DoubleSide  } );
        var geometryBack = new THREE.ShapeGeometry( squareShapeBack );
        var background = new THREE.Mesh( geometryBack, materialBack );
        background.layoutItemType ="header"
        background.layoutItemRoot =node
        background.position.set((0-hwidth/2),0-hheight/2,0.002)
        node.add(background)
        //createShadow
        var spriteShadow = createShadow()
        node.add(spriteShadow)
        spriteShadow.position.set(0,1.7,0.008)
        spriteShadow.scale.set(3.5,4.5,1)
    }

    function createSocket(group, prop){
        const materialSocketFlow = new THREE.MeshBasicMaterial( { color: 0x00d6a3,side: THREE.DoubleSide  } );
        var socket = new THREE.Mesh( roundSocketGeometry, materialSocketFlow );
        
        group.add(socket)
        if (prop.socket == "output") {
            socket.position.set(1.47,0,0)
        }else{
            socket.position.set(-1.47,0,0)
        }
        
        socket.scale.set(0.02,0.02,0.02)
        return socket
    }

    function createProp (node,position, prop){
        //text
        var propGroup = new THREE.Group()
        var spritetext = createCharacterLabel(prop.label)
        propGroup.add(spritetext)
        spritetext.position.set(-0.5,0,0)

        var spritetextValue = createCharacterLabel(prop.value)
        propGroup.add(spritetextValue)
        spritetextValue.position.set(0.5,0,0)
        layoutItems.props[spritetextValue.uuid] = {mesh:spritetextValue}
        spritetextValue.edata = { root:node, uuid:prop.id, value:prop.value, prop:prop }

        if(prop.socket && prop.socket != "none"){
            var socket = createSocket(propGroup, prop)
            socket.layoutItemRoot =node
            socket.edata = { root:node, uuid:prop.id, positionOffset:{x:socket.position.x,y:0.5+position,z:0} }
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
    createBack(node)
    // createSocket(node)
    createRows (node, props)

    // var spritetext = createCharacterLabel("testtest test")
    // node.add(spritetext)
    // spritetext.position.set(0,0,-0.1)
    // // spritetext.scale.set(0.2,0.2,0.2)

    

    node.rotation.x =3.1416/2
    node.position.set(0,0.1,0)
    node.layout =layoutItems
    return node
}

var createNodeLayout =function (scene, params) {
    var node = createNode(params)
    return node
}

export default createNodeLayout