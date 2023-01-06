import * as THREE from "../../vendor/three.module.js"
import { OrbitControls } from '../../vendor/three.orbitcontrols.js';
import createTween from  "./simulations_tween.js";


var create3dSimulationRender = function({
    container = document.body,
    canvasWidth =800, canvasHeight = 500,
    darkMode = "auto",
    uiCallbacks = {},//onConnect,
    } = {}){
    var self = {}

    var TWEEN = undefined;

    var state ={
        scene:undefined,camera:undefined,renderer:undefined,mouse: new THREE.Vector2(),raycaster:new THREE.Raycaster(),raycasterPlan:undefined,
        canvas:undefined,containerDim:undefined,controls:undefined,play:true,helperLine:undefined,
        nodes:[],links:[],items:[], mapping:{},
        triggers:{headers:[], sockets:{}, props:{}},
        selectedToMove:[], selectedSocket:undefined, selectedHandle:undefined, lastSelectedHeader:undefined, selectedLine:undefined, linkToAdd: undefined,
        draggingNodes:false,draggingSocket:false,draggingHandle:false,draggingPreviousPosition:undefined,dragStarted:false,dragOffset:{x:0,z:0},
        recordedClickForMouseUp:false,
    }

    var resetScene = function(){
        for( var i = state.scene.children.length - 1; i >= 0; i--) { 
            var obj = state.scene.children[i];
            state.scene.remove(obj); 
            state.items= []
            state.mapping = {}
       }
    }

    var createItem = function(uuid){
        const geometry = new THREE.BoxGeometry( 1, 0.5, 0.5 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00d6a3 } );
        const cube = new THREE.Mesh( geometry, material );
        state.items.push()
        state.scene.add( cube );
        state.mapping[uuid]=cube;
    }
    var moveItem = function(uuid, x,y,z, animate){
        
        var item = state.mapping[uuid]
        if (animate) {
            var tween = new TWEEN.Tween(item.position)

            // Then tell the tween we want to animate the x property over 1000 milliseconds
            tween.to({x: x, y:y, z:z}, 1000).start()
        }else{
            state.mapping[uuid].position.set(x, y, z)
        }
        
    }

    var updateView = function(nodeGraph, evaluatedNode, frame){
        
        if (evaluatedNode.templateName =="source") {
            resolveSourceNode(evaluatedNode, nodeGraph, frame)
        }
        // if (node.templateName =="flux") {
        //     resolveFluxNode(node, data, frame)
        // }
        if (evaluatedNode.templateName =="stock") {
            resolveStockNode(evaluatedNode, nodeGraph, frame)
        }
        if (evaluatedNode.templateName =="process") {
            resolveProcessNode(evaluatedNode, nodeGraph, frame)
        }
    }

    var resolveSourceNode = function(node, data, frame){
        for (let i = 0; i < node.data.outObjects.length; i++) {
            const item = node.data.outObjects[i];
            if (!state.mapping[item.uuid]) {
                createItem(item.uuid)
            }
            
            moveItem(item.uuid, node.params.position.x*2 ,0,0-(i*1.5), true )
        }
    }
    var resolveStockNode = function(node, data, frame){
        for (let i = 0; i < node.data.outObjects.length; i++) {
            const item = node.data.outObjects[i];
            // createItem(item.uuid)
            moveItem(item.uuid, node.params.position.x*2 ,0,0-(i*1.5), true )
        }
    }
    var resolveProcessNode = function(node, data, frame){
        //create a queu of postions for the buffers
        var bufferPositionOffset = []
        for (const bufferKey in node.data.bufferObjects) {
            if (Object.hasOwnProperty.call(node.data.bufferObjects, bufferKey)) {
                if (node.data.bufferObjects[bufferKey][0]) { //buffer is not empty
                    bufferPositionOffset.push(bufferPositionOffset.length)
                }
            }
        }
        bufferPositionOffset = bufferPositionOffset.reverse()

        var bufferIndex=0
        for (const bufferKey in node.data.bufferObjects) {
            if (Object.hasOwnProperty.call(node.data.bufferObjects, bufferKey) && node.data.bufferObjects[bufferKey][0]) {
                const buffer = node.data.bufferObjects[bufferKey];
                bufferIndex ++
                for (let i = 0; i < buffer.length; i++) {
                    const item = buffer[i];
                    // createItem(item.uuid)
                    moveItem(item.uuid, node.params.position.x*2 +(bufferPositionOffset[bufferIndex]*1.1)*1.2 ,0,0-(i*1.5), true )
                }
            }
        }
        
        for (let i = 0; i < node.data.outObjects.length; i++) {
            const item = node.data.outObjects[i];
            // createItem(item.uuid)
            moveItem(item.uuid, node.params.position.x*2 +( (bufferPositionOffset.length+1) *1.1)*1.2 ,0,0-(i*1.5), true )
        }
        
    }

    var createScene= function(){
        state.scene = new THREE.Scene();
        state.camera = new THREE.PerspectiveCamera( 75, canvasWidth / canvasHeight, 0.1, 1000 );
        state.renderer = new THREE.WebGLRenderer({alpha:true, antialias:true,});
        state.renderer.setSize( canvasWidth, canvasHeight );
        state.canvas = state.renderer.domElement 
        container.appendChild( state.canvas);
        state.containerDim = state.canvas.getBoundingClientRect()
        state.camera.position.y = 5;
        state.controls = new OrbitControls( state.camera, state.renderer.domElement );
        //set intersection plan
        state.raycasterPlan = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

        //create a line to draw connection
        const lineMaterial = new THREE.LineBasicMaterial( {
            color: 0xa5abb6,
            linewidth: 16,
        } );
        const linePoints = [];
        linePoints.push( new THREE.Vector3( - 1, -1, -0.15 ) );
        linePoints.push( new THREE.Vector3( -1.01, -1.01, -0.15 ) );
        const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
        state.helperLine = new THREE.Line( lineGeometry, lineMaterial );
        state.scene.add(state.helperLine)
        const size = 1000;
        const divisions = 1000;
        const gridHelper = new THREE.GridHelper( size, divisions );
        state.scene.add(gridHelper)
    }
    var startRenderer = function () {
        function animate() {
            if (state.play) {
                // updateLinks()
                requestAnimationFrame( animate );
                state.renderer.render( state.scene, state.camera );
                TWEEN.update()
            }
        }
        animate();
    }

    var init = function () {
        TWEEN = createTween
        createScene()
        // interactions()
        startRenderer()
    }

    init()
    self.resetScene = resetScene
    self.updateView = updateView
    return self
}

export default create3dSimulationRender