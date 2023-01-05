import * as THREE from "../../vendor/three.module.js"
import { OrbitControls } from '../../vendor/three.orbitcontrols.js';


var create3dSimulationRender = function({
    container = document.body,
    canvasWidth =800, canvasHeight = 500,
    darkMode = "auto",
    uiCallbacks = {},//onConnect,
    } = {}){
    var self = {}

    var state ={
        scene:undefined,camera:undefined,renderer:undefined,mouse: new THREE.Vector2(),raycaster:new THREE.Raycaster(),raycasterPlan:undefined,
        canvas:undefined,containerDim:undefined,controls:undefined,play:true,helperLine:undefined,
        nodes:[],links:[], mapping:undefined,
        triggers:{headers:[], sockets:{}, props:{}},
        selectedToMove:[], selectedSocket:undefined, selectedHandle:undefined, lastSelectedHeader:undefined, selectedLine:undefined, linkToAdd: undefined,
        draggingNodes:false,draggingSocket:false,draggingHandle:false,draggingPreviousPosition:undefined,dragStarted:false,dragOffset:{x:0,z:0},
        recordedClickForMouseUp:false,
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

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        state.scene.add( cube );
    }
    var startRenderer = function () {
        function animate() {
            if (state.play) {
                // updateLinks()
                requestAnimationFrame( animate );
                state.renderer.render( state.scene, state.camera );
            }
        }
        animate();
    }

    var init = function () {
        createScene()
        // interactions()
        startRenderer()
    }

    init()
    return self
}

export default create3dSimulationRender