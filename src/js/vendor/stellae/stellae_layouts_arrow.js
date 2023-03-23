import * as THREE from "../three.module.js"
import { createLine2 } from "./stellae_layout_arrow_fat.js";
import { createLine } from "./stellae_layout_arrow_meshlines.js";

let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

const textCanvas = document.createElement( 'canvas' );
textCanvas.height = 34;

var updatePositions = function(link, startPosition, endPosition, startPositionOffset, endPositionOffset){

    var attributes = link.geometry.attributes;
    var pos0 = startPosition.x+startPositionOffset.x;
    var pos1 = startPosition.y;
    var pos2 = startPosition.z+startPositionOffset.y;
    var pos3 = endPosition.x+endPositionOffset.x;
    var pos4 = endPosition.y;
    var pos5 = endPosition.z+endPositionOffset.y;

    if (link.geometry.setPositions && !link.isCircular) { //if using fat lines
        link.geometry.setPositions( [pos0,pos1,pos2,pos3,pos4,pos5] )

    }else if(link.geometry.setPositions && link.isCircular) { //if using fat lines
        link.position.set( pos0+0.4, pos1-0.001, pos2-0.4 )

    } else { //if using mesh lines
        attributes.position.array[3] =pos3; attributes.position.array[4] =pos4; attributes.position.array[5] =pos5
        attributes.position.array[0] =pos0; attributes.position.array[1] =pos1; attributes.position.array[2] =pos2
        attributes.position.needsUpdate = true;
    }

    if (!link.isCircular) {
        //update arrow position
        // link.arrowOrigin.set(attributes.position.array[0],attributes.position.array[1],attributes.position.array[2] )
        if (link.labelItem) {
            link.labelItem.position.set((pos0+pos3)/2,((pos1+pos4)/2)+0.2,((pos2+pos5)/2)-0.1 )
        }

        link.arrowOrigin.set((pos0+pos3)/2,(pos1+pos4)/2,(pos2+pos5)/2 )
        var arrowDir = new THREE.Vector3(); // create once an reuse it

        // const v1 = new THREE.Vector3(attributes.position.array[0], attributes.position.array[1], attributes.position.array[2] ) 
        // const v2 = new THREE.Vector3( attributes.position.array[3], attributes.position.array[4], attributes.position.array[5] ) 
        // arrowDir.subVectors( v2, v1 ).normalize();
        arrowDir = new THREE.Vector3(pos3 - pos0,pos4-pos1,pos5-pos2); // create once an reuse it
        arrowDir.normalize();
        link.arrowItem.setDirection(arrowDir)
    }else{
        if (link.labelItem) {
            link.labelItem.position.set(0.4, 0, -0.4 )
        }
    }
    
    
}

function createCharacterLabel( text, maxLength ) {

    if (text.length > maxLength) {
        text = text.substring(0, maxLength-2)+"..";
    }
    const ctx = textCanvas.getContext( '2d' );
    const font = '18px arial';

    ctx.font = font;
    textCanvas.width = Math.ceil( ctx.measureText( text ).width + 16 );

    ctx.font = font; ctx.strokeStyle = '#222'; ctx.lineWidth = 4; ctx.lineJoin = 'miter'; ctx.miterLimit = 3;
    ctx.strokeText( text, 8, 26 ); ctx.fillStyle = 'white';ctx.fillText( text, 8, 26 );
    // ctx.textAlign = 'left';
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


var createLineArrow  = function({
    headerColor = 0xffff00,
    name = undefined,
    position={x:0,y:0},
    uuid = nanoid(),
    nodeData = {},
    dashed = false,
    circular = false, //if is cicular, don't use arrow and update group position instead of line
    } = {}){

    const lineGroup = new THREE.Group();
    
    var dir = new THREE.Vector3( 1, 2, 0 );
    // //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    var origin = new THREE.Vector3( 0, 0, 0 );
    var length = 1.2;
    // var hex = 0xffff00;
    var hex = 0xa5abb6;


    var line = createLine2({dashed, circular})
    line.layoutItemRoot= lineGroup
    lineGroup.add( line );
    lineGroup.geometry = line.geometry
    // lineGroup.edata = line.edata
    //add arrow
    const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    arrowHelper.setLength(0.01, 0.25, 0.10)
    arrowHelper.layoutItemRoot= lineGroup
    lineGroup.arrowOrigin = arrowHelper.position
    lineGroup.arrowItem = arrowHelper 
    lineGroup.update = function(startPosition, endPosition, startPositionOffset, endPositionOffset){
        updatePositions(lineGroup, startPosition, endPosition, startPositionOffset, endPositionOffset)
    }
    if (!circular) {
        lineGroup.add( arrowHelper );
    }
    
    //create label
    if (name) {
        var spritetext = createCharacterLabel(name)
        lineGroup.add(spritetext)
        spritetext.position.set(0,0,-0.01)
        spritetext.layoutItemRoot = lineGroup
        lineGroup.labelItem = spritetext 
    }
    if (circular) {
        lineGroup.isCircular = true
    }
    return lineGroup
}

var createArrow = function (params) {
    // if (params.nodeLayout == "round") {
    //     return createNodeLayoutRound(params)
    // } else {
    //     return createNodeSquare(params)
    // }
    return createLineArrow(params)
}

var createArrowLayout =function (scene, params) {
    
    if (params && params.from == params.to) { //check if some arrowe are circular
        params.circular = true
    }
    var arrow = createArrow(params)
    return arrow
}

export default createArrowLayout