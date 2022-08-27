import * as THREE from "../three.module.js"
import { MapControls } from '../three.orbitcontrols.js';
import createNodeLayout from "./stellae_layouts.js";

function createStellae({
    container = document.body,
    canvasWidth =800,
    canvasHeight = 500,
    darkMode = "auto",
    } = {}) {
    var self = {};
    var state ={
        scene:undefined,camera:undefined,renderer:undefined,mouse: new THREE.Vector2(),raycaster:new THREE.Raycaster(),raycasterPlan:undefined,
        canvas:undefined,containerDim:undefined,controls:undefined,play:true,helperLine:undefined,
        nodes:[],
        triggers:{headers:[], sockets:{}},
        selectedToMove:[], selectedSocket:undefined,
        draggingNodes:false,draggingSocket:false,
    }
    var nodeMeshStorage ={}
    var nodeMeshManager ={}
    var lineMeshManager ={}
    nodeMeshManager.getHeadersMesh =function () {
        return state.triggers.headers
    }
    nodeMeshManager.getSocketPosition =function (node, socket) {
        // return {x:node.position.x + socket.edata.positionOffset.x,y:node.position.y+ socket.edata.positionOffset.y,z:node.position.z+ socket.edata.positionOffset.z}
        return {x:node.position.x + socket.edata.positionOffset.x,y:node.position.y,z:node.position.z + socket.edata.positionOffset.y}
    }
    nodeMeshManager.getSocketsMesh =function(){
        var result = []
        for (var key in state.triggers.sockets){
            result.push(state.triggers.sockets[key].mesh)
        }
        return result
    }
    lineMeshManager.setHelperLineEnd =function (x,y,z) {
        state.helperLine.geometry.attributes.position.array[3] =x; state.helperLine.geometry.attributes.position.array[4] =y; state.helperLine.geometry.attributes.position.array[5] =z
        state.helperLine.geometry.attributes.position.needsUpdate = true;
    }
    lineMeshManager.setHelperLineStart =function (x,y,z) {
        state.helperLine.geometry.attributes.position.array[0] =x; state.helperLine.geometry.attributes.position.array[1] =y; state.helperLine.geometry.attributes.position.array[2] =z
        state.helperLine.geometry.attributes.position.needsUpdate = true;
    }
    lineMeshManager.hideHelperLine =function (x,y,z) {
        state.helperLine.geometry.attributes.position.array[0] =500; state.helperLine.geometry.attributes.position.array[1] =500; state.helperLine.geometry.attributes.position.array[2] =500
        state.helperLine.geometry.attributes.position.array[3] =500; state.helperLine.geometry.attributes.position.array[4] =500; state.helperLine.geometry.attributes.position.array[5] =500
        state.helperLine.geometry.attributes.position.needsUpdate = true;
    }

    var createScene= function(){
        state.scene = new THREE.Scene();
        state.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        state.renderer = new THREE.WebGLRenderer({alpha:true});
        state.renderer.setSize( canvasWidth, canvasHeight );
        state.canvas = state.renderer.domElement 
        container.appendChild( state.canvas);
        state.containerDim = state.canvas.getBoundingClientRect()
        console.log(state.containerDim);
        console.log(state.canvas );
        state.camera.position.y = 5;

        var node =createNodeLayout(state.scene,{name:"node1"})
        state.scene.add(node)
        state.nodes.push(node)
        state.triggers.headers.push(node.layout.header)
        state.triggers.sockets= Object.assign({},state.triggers.sockets, node.layout.sockets)
        nodeMeshStorage[node.uuid] = node
        

        var node2 =createNodeLayout(state.scene,{name:"node2"})
        state.scene.add(node2)
        state.nodes.push(node2)
        state.triggers.headers.push(node2.layout.header)
        state.triggers.sockets= Object.assign({},state.triggers.sockets, node2.layout.sockets)
        nodeMeshStorage[node.uuid] = node


        state.controls = new MapControls( state.camera, state.renderer.domElement );
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
        // state.scene.add( gridHelper );
        
    }

    var createDemo = function () {
        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // const cube = new THREE.Mesh( geometry, material );
        // const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        // const cube2 = new THREE.Mesh( geometry, material2 );
        // cube2.position.set(1,0,3)
        // state.nodes.push(cube)
        // state.nodes.push(cube2)
        // console.log(state.nodes);
        // state.scene.add( cube );
        // state.scene.add( cube2 );
    }

    var interactions = function(){
        function onClick(event) {
            event.preventDefault();
            state.selectedToMove =[] //clear move list
            state.selectedSocket = undefined;
            state.draggingNodes=false,
            state.containerDim = state.canvas.getBoundingClientRect() //check if needed
            state.mouse.x = ( (event.clientX-state.containerDim.x) / state.containerDim.width ) * 2 - 1;
			state.mouse.y = - ( (event.clientY-state.containerDim.y) / state.containerDim.height ) * 2 + 1;
            state.raycaster.setFromCamera( state.mouse, state.camera );
            // console.log(state.raycaster.ray.direction);

            const intersections = state.raycaster.intersectObjects( nodeMeshManager.getHeadersMesh(), true );
            console.log(intersections);
            if ( intersections.length > 0 ) { //Case hit header
                console.log(intersections);
                const object = intersections[ 0 ].object;
                state.selectedToMove.push(object.layoutItemRoot)
                state.draggingNodes=true;
                // if ( group.children.includes( object ) === true ) {
                // 	object.material.emissive.set( 0x000000 );
                // 	scene.attach( object );
                // } else {
                // 	object.material.emissive.set( 0xaaaaaa );
                // 	group.attach( object );
                // }
                // controls.transformGroup = true;
                // draggableObjects.push( group );
            }
            const intersectionsSockets = state.raycaster.intersectObjects( nodeMeshManager.getSocketsMesh(), true );
            if ( intersectionsSockets.length > 0 ) { //Case hit header
                console.log(intersectionsSockets);
                const object = intersectionsSockets[ 0 ].object;
                state.selectedSocket= intersectionsSockets[ 0 ].object;
                state.draggingSocket = true;
            }
            console.log(state.mouse);
        }
        function onMove(event){
            state.mouse.x = ( (event.clientX-state.containerDim.x) / state.containerDim.width ) * 2 - 1;
            state.mouse.y = - ( (event.clientY-state.containerDim.y) / state.containerDim.height ) * 2 + 1;
            if (state.draggingNodes) {
                state.controls.enabled = false;
                var intersects = new THREE.Vector3();
                state.raycaster.setFromCamera(state.mouse, state.camera);
                state.raycaster.ray.intersectPlane(state.raycasterPlan, intersects);

                state.selectedToMove[0].position.set(intersects.x, 0.1, intersects.z);

                console.log(intersects);
            }
            if (state.draggingSocket) {
                state.controls.enabled = false;
                var intersects = new THREE.Vector3();
                state.raycaster.setFromCamera(state.mouse, state.camera);
                state.raycaster.ray.intersectPlane(state.raycasterPlan, intersects);
                // state.selectedToMove[0].position.set(intersects.x, 0.1, intersects.z);
                console.log(state.selectedSocket);
                var startPosition = nodeMeshManager.getSocketPosition(state.selectedSocket.edata.root, state.selectedSocket)
                lineMeshManager.setHelperLineStart(startPosition.x,startPosition.y,startPosition.z)
                lineMeshManager.setHelperLineEnd(intersects.x,0,intersects.z)

                // console.log(intersects);
            }
            
        }
        function onMouseUp (){
            state.draggingNodes=false;
            state.draggingSocket=false;
            state.controls.enabled = true;
            lineMeshManager.hideHelperLine()
        }
        container.addEventListener( 'mousedown', onClick );
        container.addEventListener( 'mousemove', onMove );
        container.addEventListener( 'mouseup', onMouseUp );
    }

    var startRenderer = function () {
        function animate() {
            if (state.play) {
                requestAnimationFrame( animate );
                state.renderer.render( state.scene, state.camera );
            }
        }
        animate();
    }

    var init = function () {
        createScene()
        createDemo()
        interactions()
        startRenderer()
    }
    init()
    return self
}
export default createStellae