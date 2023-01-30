import * as THREE from "../three.module.js"
import inputElements from "./stellae_inputs.js"

let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

const textCanvas = document.createElement( 'canvas' );
textCanvas.height = 34;

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

const hwidth = 3;
const hheight = 0.5;
const geometry = new THREE.PlaneGeometry( 1, 1 );
geometry.translate(0.5,0.5,0)

var getGroupBoundaries = function(group, handle){
    var boundaries ={}
    boundaries.left = group.position.x
    boundaries.right = handle.position.x + group.position.x
    boundaries.top = group.position.z
    boundaries.bottom = handle.position.y + group.position.z

    return boundaries
}


var createGroupLayout  = function({
    headerColor = 0xffff00,
    name = undefined,
    position={x:0,y:0},
    uuid = nanoid(),
    nodeData = {},
    dashed = false,
    circular = false, //if is cicular, don't use arrow and update group position instead of line
    } = {}){

    const groupGroup = new THREE.Group();
    var layoutItems={
        header:undefined,
        handles:{},
        sockets:{},
        props:{},
    }
    var lastPosition = {x:undefined,y:undefined}
    var previouslyInGroup = []
    var hex = 0x7B7B7B;

    //createMainPlane

    const material = new THREE.MeshBasicMaterial( {color: hex, side: THREE.DoubleSide, transparent:true, opacity:0.2} );
    const plane = new THREE.Mesh( geometry, material );
    plane.layoutItemType ="header"
    plane.layoutItemRoot =groupGroup
    plane.position.set(0,0,0.08)
    

    groupGroup.add( plane );
    layoutItems.header = plane

    //createMainHandle
    const materialHandle = new THREE.MeshBasicMaterial( {color: hex, side: THREE.DoubleSide, transparent:true, opacity:0.5} );
    const planeHandle = new THREE.Mesh( geometry, materialHandle );
    planeHandle.layoutItemType ="handle"
    planeHandle.layoutItemRoot =groupGroup
    // var initPos={x:0.5, y:0.5}
    planeHandle.position.set(0.95,0.95,0.07)
    planeHandle.scale.set(0.1,0.1,1)
    planeHandle.layoutItemInteractions = {}
    planeHandle.layoutItemInteractions.onMove = function(x,z){
        planeHandle.position.set(-groupGroup.position.x+x        ,      -groupGroup.position.z+z           ,0.07)
        plane.scale.set(        (-groupGroup.position.x+x)     ,       (-groupGroup.position.z+z)     ,1)
    }

    groupGroup.add( planeHandle );
    layoutItems.handles["bottomRight"] = {mesh:planeHandle, positionOffset:{x:0,y:0,z:0}}
    
    // //create label
    // if (name) {
    //     var spritetext = createCharacterLabel(name)
    //     lineGroup.add(spritetext)
    //     spritetext.position.set(0,0,-0.01)
    //     lineGroup.labelItem = spritetext 
    // }
    // if (circular) {
    //     lineGroup.isCircular = true
    // }
    groupGroup.rotation.x =3.1416/2
    groupGroup.layout=layoutItems
    groupGroup.layoutType="group"

    groupGroup.layoutItemInteractions={}
    groupGroup.layoutItemInteractions.onMove = function(x,z, state, simulation){
        console.log(x,z, state, previouslyInGroup);
        if (!lastPosition.x) { //init original position if not existant
            lastPosition.x=groupGroup.position.x; lastPosition.z=groupGroup.position.z;
        }
        var positionDifference = {x:x-lastPosition.x,z:z-lastPosition.z}
        var currentBoundaries = getGroupBoundaries(groupGroup,planeHandle)
        for (let i = 0; i < previouslyInGroup.length; i++) {
            const node = previouslyInGroup[i];
            if (node !=groupGroup) {
                console.log(positionDifference.x);
                var newPositionX = node.position.x + positionDifference.x
                var newPositionZ = node.position.z + positionDifference.z
                node.edata.nodeData.setPosition(newPositionX, newPositionZ)
                if (simulation) {
                    simulation.dragNode(node.edata.uuid,newPositionX, newPositionZ)
                }else{
                    node.position.x = newPositionX
                    node.position.z = newPositionZ
                }
            }
        }
        console.log(getGroupBoundaries(groupGroup,planeHandle));
        console.log(groupGroup.position.z);
        lastPosition.x=groupGroup.position.x
        lastPosition.z=groupGroup.position.z
        // planeHandle.position.set(-groupGroup.position.x+x,-groupGroup.position.z+z,0.07)
        // plane.scale.set( (-groupGroup.position.x+x)*2 ,(-groupGroup.position.z+z)*2,1)
    }
    groupGroup.layoutItemInteractions.onDragStart = function(x,z, state, simulation){
        var currentBoundaries = getGroupBoundaries(groupGroup,planeHandle)
        previouslyInGroup=[]
        for (let i = 0; i < state.nodes.length; i++) {
            const node = state.nodes[i];
            if (node !=groupGroup) {
                if (node.position.x > currentBoundaries.left  &&  node.position.x < currentBoundaries.right   &&  node.position.z > currentBoundaries.top   && node.position.z < currentBoundaries.bottom  ) {
                    previouslyInGroup.push(node)
                }
            }
        }
        console.log(getGroupBoundaries(groupGroup,planeHandle));
        console.log(groupGroup.position.z);
        lastPosition.x=groupGroup.position.x
        lastPosition.z=groupGroup.position.z
        // planeHandle.position.set(-groupGroup.position.x+x,-groupGroup.position.z+z,0.07)
        // plane.scale.set( (-groupGroup.position.x+x)*2 ,(-groupGroup.position.z+z)*2,1)
    }

    return groupGroup
}

var createGroup =function (scene, params) {
    
    if (params && params.from == params.to) { //check if some arrowe are circular
        params.circular = true
    }
    var group = createGroupLayout(params)
    return group
}

export {createGroup}