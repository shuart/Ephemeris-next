import * as THREE from "../three.module.js"
import inputElements from "./stellae_inputs.js"
import createNodeLayoutRound from "./stellae_layouts_round.js"

let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

const textCanvas = document.createElement( 'canvas' );
textCanvas.height = 34;

var updatePositions = function(link, startPosition, endPosition, startPositionOffset, endPositionOffset){

    var attributes = link.geometry.attributes
    
    attributes.position.array[3] =endPosition.x+endPositionOffset.x; attributes.position.array[4] =endPosition.y; attributes.position.array[5] =endPosition.z+endPositionOffset.y
    attributes.position.array[0] =startPosition.x+startPositionOffset.x; attributes.position.array[1] =startPosition.y; attributes.position.array[2] =startPosition.z+startPositionOffset.y
    attributes.position.needsUpdate = true;

    //update arrow position
    // link.arrowOrigin.set(attributes.position.array[0],attributes.position.array[1],attributes.position.array[2] )
    if (link.labelItem) {
        link.labelItem.position.set((attributes.position.array[0]+attributes.position.array[3])/2,(attributes.position.array[1]+attributes.position.array[4])/2,(attributes.position.array[2]+attributes.position.array[5])/2 )
    }
    
    link.arrowOrigin.set((attributes.position.array[0]+attributes.position.array[3])/2,(attributes.position.array[1]+attributes.position.array[4])/2,(attributes.position.array[2]+attributes.position.array[5])/2 )
    var arrowDir = new THREE.Vector3(); // create once an reuse it
    
    // const v1 = new THREE.Vector3(attributes.position.array[0], attributes.position.array[1], attributes.position.array[2] ) 
    // const v2 = new THREE.Vector3( attributes.position.array[3], attributes.position.array[4], attributes.position.array[5] ) 
    // arrowDir.subVectors( v2, v1 ).normalize();
    arrowDir = new THREE.Vector3(attributes.position.array[3] - attributes.position.array[0],attributes.position.array[4]-attributes.position.array[1],attributes.position.array[5]-attributes.position.array[2]); // create once an reuse it
    arrowDir.normalize();
    link.arrowItem.setDirection(arrowDir)
}

function createCharacterLabel( text, maxLength ) {

    if (text.length > maxLength) {
        text = text.substring(0, maxLength-2)+"..";
    }
    const ctx = textCanvas.getContext( '2d' );
    const font = '18px arial';

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


var createMeshLineArrow  = function({
    headerColor = 0xffff00,
    name = undefined,
    position={x:0,y:0},
    uuid = nanoid(),
    nodeData = {},
    } = {}){

    const lineGroup = new THREE.Group();
    
    var dir = new THREE.Vector3( 1, 2, 0 );
    // //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    var origin = new THREE.Vector3( 0, 0, 0 );
    var length = 1;
    // var hex = 0xffff00;
    var hex = 0xa5abb6;

    const lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xa5abb6,
        linewidth: 0.01,
    } );
    const linePoints = [];
    linePoints.push( new THREE.Vector3( - 1, -1, -0.15 ) );
    linePoints.push( new THREE.Vector3( -1.01, -1.01, -0.15 ) );
    const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
    var line = new THREE.Line( lineGeometry, lineMaterial );
    // line.edata= data
    lineGroup.add( line );
    lineGroup.geometry = line.geometry
    lineGroup.edata = line.edata
    //add arrow
    const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    lineGroup.arrowOrigin = arrowHelper.position
    lineGroup.arrowItem = arrowHelper 
    lineGroup.update = function(startPosition, endPosition, startPositionOffset, endPositionOffset){
        updatePositions(lineGroup, startPosition, endPosition, startPositionOffset, endPositionOffset)
    }
    lineGroup.add( arrowHelper );
    //create label
    if (name) {
        var spritetext = createCharacterLabel(name)
        lineGroup.add(spritetext)
        spritetext.position.set(0,0,-0.01)
        lineGroup.labelItem = spritetext 
    }
    return lineGroup
}

var createArrow = function (params) {
    // if (params.nodeLayout == "round") {
    //     return createNodeLayoutRound(params)
    // } else {
    //     return createNodeSquare(params)
    // }
    return createMeshLineArrow(params)
}

var createArrowLayout =function (scene, params) {
    var arrow = createArrow(params)
    return arrow
}

export default createArrowLayout