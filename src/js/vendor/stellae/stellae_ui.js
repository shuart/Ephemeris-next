import * as THREE from "../three.module.js"
import { MapControls } from '../three.orbitcontrols.js';
import createNodeLayout from "./stellae_layouts.js";
import inputElements from "./stellae_inputs.js"
import simulation from "./stellae_d3_forces.js"


export default function createStellaeUi({
    container = document.body,
    canvasWidth =800, canvasHeight = 500,
    darkMode = "auto",
    useSimulation = false,
    uiCallbacks = {},//onConnect,
    } = {}) {
    var self = {};
    var state ={
        scene:undefined,camera:undefined,renderer:undefined,mouse: new THREE.Vector2(),raycaster:new THREE.Raycaster(),raycasterPlan:undefined,
        canvas:undefined,containerDim:undefined,controls:undefined,play:true,helperLine:undefined,
        nodes:[],links:[], mapping:undefined,
        triggers:{headers:[], sockets:{}, props:{}},
        selectedToMove:[], selectedSocket:undefined,lastSelectedHeader:undefined, selectedLine:undefined, linkToAdd: undefined,
        draggingNodes:false,draggingSocket:false,
    }
    var dataManager = undefined
    var nodeMeshStorage ={};var nodeMeshManager ={};var lineMeshManager ={};

    nodeMeshManager.getHeadersMesh =function () {
        return state.triggers.headers
    }
    nodeMeshManager.getLinksMesh=function () {
        return state.links
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
    nodeMeshManager.getPropsMesh =function(){
        var result = []
        for (var key in state.triggers.props){
            result.push(state.triggers.props[key].mesh)
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
        state.camera = new THREE.PerspectiveCamera( 75, canvasWidth / canvasHeight, 0.1, 1000 );

        state.renderer = new THREE.WebGLRenderer({alpha:true});
        state.renderer.setSize( canvasWidth, canvasHeight );
        state.canvas = state.renderer.domElement 
        container.appendChild( state.canvas);
        state.containerDim = state.canvas.getBoundingClientRect()
        state.camera.position.y = 5;
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
    }

    var addNode = function(params){
        var node =createNodeLayout(state.scene,params)
        node.edata = params
        state.scene.add(node)
        state.nodes.push(node)
        updateTriggers()
        updateMapping()
        // state.triggers.headers.push(node.layout.header)
        // state.triggers.sockets= Object.assign({},state.triggers.sockets, node.layout.sockets)
        // state.triggers.props= Object.assign({},state.triggers.props, node.layout.props)
        // nodeMeshStorage[node.uuid] = node
        if (useSimulation) {
            simulation.addNodes(node)
        }
        return node;
    }

    var addLinks = function(links){
        for (let i = 0; i < links.length; i++) {
            const element = links[i];
            var meshLine = createMeshLine()
            state.scene.add(meshLine)
            meshLine.edata = element
            state.links.push(meshLine)
        }
        updateMapping()
    }

    var removeLinks = function(uuid){
        var linkToRemoveIndex = state.links.findIndex((l)=>l.edata.uuid==uuid)
        state.scene.remove(state.links[linkToRemoveIndex])
        state.links[linkToRemoveIndex] = state.links[state.links.length -1];
        state.links.pop();  
        updateMapping()
    }

    var updateTriggers = function(){//update all triggers list for raycaster
        var newNodeList = []
        state.triggers.headers = []; state.triggers.sockets={};state.triggers.props={};
        for (let i = 0; i < state.nodes.length; i++) {
            const node = state.nodes[i];
            if (node.parent === state.scene) {
                newNodeList.push(node)
                state.triggers.headers.push(node.layout.header)
                state.triggers.sockets= Object.assign({},state.triggers.sockets, node.layout.sockets)
                state.triggers.props= Object.assign({},state.triggers.props, node.layout.props)
            }else{
                console.log("removed")
            }
        }
        state.nodes=newNodeList
    }

    var createMeshLine = function(data){
        const lineMaterial = new THREE.LineBasicMaterial( {
            color: 0xa5abb6,
            linewidth: 0.01,
        } );
        const linePoints = [];
        linePoints.push( new THREE.Vector3( - 1, -1, -0.15 ) );
        linePoints.push( new THREE.Vector3( -1.01, -1.01, -0.15 ) );
        const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
        var line = new THREE.Line( lineGeometry, lineMaterial );
        line.edata= data
        return line
    }

    var updateLinks = function(){
        for (let i = 0; i < state.links.length; i++) {
            const link = state.links[i];
            // console.log(link.edata);
            //     console.log(state.mapping);
            if (state.mapping[link.edata.to]) {
                
                
                var startPositon = state.mapping[link.edata.from].position; var endPositon = state.mapping[link.edata.to].position;
                var startPositonOffset = state.mapping[link.edata.from].sockets[link.edata.from_socket].positionOffset; var endPositonOffset = state.mapping[link.edata.to].sockets[link.edata.to_socket].positionOffset;
                var attributes = link.geometry.attributes
                
                attributes.position.array[3] =endPositon.x+endPositonOffset.x; attributes.position.array[4] =endPositon.y; attributes.position.array[5] =endPositon.z+endPositonOffset.y
                attributes.position.array[0] =startPositon.x+startPositonOffset.x; attributes.position.array[1] =startPositon.y; attributes.position.array[2] =startPositon.z+startPositonOffset.y
                attributes.position.needsUpdate = true;
            }   
        }
    }
    var updateMapping = function(){
        state.mapping = {}
        for (let i = 0; i < state.nodes.length; i++) {
            const node = state.nodes[i];
            console.log(node.edata);
            state.mapping[node.edata.uuid] = {position:node.position, sockets:{}}
            console.log(node.layout);

            for (const key in node.layout.sockets) {
                if (Object.hasOwnProperty.call(node.layout.sockets, key)) {
                    const socket = node.layout.sockets[key];
                    state.mapping[node.edata.uuid].sockets[socket.mesh.edata.uuid] = {positionOffset:socket.mesh.edata.positionOffset}
                }
            }
        }
    }

    var interactions = function(){
        function onClick(event) {
            event.preventDefault();
            state.selectedToMove =[] //clear move list
            state.selectedSocket = undefined;
            state.selectedLine =undefined;
            state.draggingNodes=false,
            state.containerDim = state.canvas.getBoundingClientRect() //check if needed
            state.mouse.x = ( (event.clientX-state.containerDim.x) / state.containerDim.width ) * 2 - 1;
			state.mouse.y = - ( (event.clientY-state.containerDim.y) / state.containerDim.height ) * 2 + 1;
            state.raycaster.setFromCamera( state.mouse, state.camera );

            const intersections = state.raycaster.intersectObjects( nodeMeshManager.getHeadersMesh(), true );
            console.log(intersections);
            if ( intersections.length > 0 ) { //Case hit header
    
                const object = intersections[ 0 ].object;
                state.selectedToMove.push(object.layoutItemRoot)
                state.lastSelectedHeader = object.layoutItemRoot;
                state.draggingNodes=true;
                if (event.button == 2) {
                    console.log(object.layoutItemRoot);
                    if (confirm("Delete node?")) {
                        dataManager.removeNode(state.lastSelectedHeader.edata.uuid)
                    }
                }
                // if ( group.children.includes( object ) === true ) {
                // 	object.material.emissive.set( 0x000000 );
                // 	scene.attach( object );
                // } else {
                // 	object.material.emissive.set( 0xaaaaaa );
                // 	group.attach( object );
                // }
            }
            
            const intersectionsSockets = state.raycaster.intersectObjects( nodeMeshManager.getSocketsMesh(), true );
            if ( intersectionsSockets.length > 0 ) { //Case hit header
                const object = intersectionsSockets[ 0 ].object;
                state.selectedSocket= intersectionsSockets[ 0 ].object;
                state.draggingSocket = true;
            }
            const intersectionsProps = state.raycaster.intersectObjects( nodeMeshManager.getPropsMesh(), true );
            if ( intersectionsProps.length > 0 ) { //Case hit header
                const object = intersectionsProps[ 0 ].object;
                // state.selectedSocket= intersectionsProps[ 0 ].object;
                // state.draggingSocket = true;
                // if (prop.type =="text") {
                //     inputElements.createListInput()
                // }

                console.log(intersectionsProps[ 0 ].object.edata);
                // dataManager.evaluateTree();
                intersectionsProps[ 0 ].object.edata.action({callback:dataManager.evaluateTree})
                // var newValue = prompt(intersectionsProps[ 0 ].object.edata.value)
                // if (newValue && newValue != "") {
                //     var propId = intersectionsProps[ 0 ].object.edata.prop.id
                //     intersectionsProps[ 0 ].object.edata.nodeData.setProp(propId, newValue)
                //     dataManager.evaluateTree();
                // }

            }
            if(!intersections[0] && !intersectionsSockets[0]){
                state.raycaster.params.Line.threshold = 0.05;
                const intersectionsLines = state.raycaster.intersectObjects( nodeMeshManager.getLinksMesh(), true );
                if ( intersectionsLines.length > 0 ) { //Case hit header
                    const object = intersectionsLines[ 0 ].object;
                    console.log(object)
                    state.selectedLine = object
                }
            }
        }
        function onMove(event){
            state.mouse.x = ( (event.clientX-state.containerDim.x) / state.containerDim.width ) * 2 - 1;
            state.mouse.y = - ( (event.clientY-state.containerDim.y) / state.containerDim.height ) * 2 + 1;
            if (state.selectedLine) {
                console.log(state.selectedLine);
                if (confirm("Delete Line?")) {
                    dataManager.removeLinks(state.selectedLine.edata.uuid)
                }
            }
            if (state.draggingNodes) {
                state.controls.enabled = false;
                var intersects = new THREE.Vector3();
                state.raycaster.setFromCamera(state.mouse, state.camera);
                state.raycaster.ray.intersectPlane(state.raycasterPlan, intersects);

                state.selectedToMove[0].position.set(intersects.x, 0.1, intersects.z);
                state.selectedToMove[0].edata.nodeData.setPosition(intersects.x, intersects.z)

                if (useSimulation) {
                    simulation.dragNode(state.selectedToMove[0].edata.uuid,intersects.x, intersects.z)
                }
            }
            if (state.draggingSocket) {
                state.controls.enabled = false;
                state.linkToAdd = undefined
                var intersects = new THREE.Vector3();
                state.raycaster.setFromCamera(state.mouse, state.camera);
                state.raycaster.ray.intersectPlane(state.raycasterPlan, intersects);
                // state.selectedToMove[0].position.set(intersects.x, 0.1, intersects.z);
                var startPosition = nodeMeshManager.getSocketPosition(state.selectedSocket.edata.root, state.selectedSocket)
                lineMeshManager.setHelperLineStart(startPosition.x,startPosition.y,startPosition.z)
                lineMeshManager.setHelperLineEnd(intersects.x,0,intersects.z)
                const intersectsOtherSockets = state.raycaster.intersectObjects( nodeMeshManager.getSocketsMesh(), true );
                if ( intersectsOtherSockets.length > 0 ) { //Case hit header
                    const object = intersectsOtherSockets[ 0 ].object;
                    state.linkToAdd =  {from:state.selectedSocket.edata.root.edata.uuid, from_socket:state.selectedSocket.edata.uuid, to:object.edata.root.edata.uuid, to_socket:object.edata.uuid}
    
                }
            }
        }
        function onMouseUp (){
            state.draggingNodes=false;
            state.draggingSocket=false;
            state.selectedLine =undefined;
            state.controls.enabled = true;
            
            lineMeshManager.hideHelperLine()
            if (state.linkToAdd && state.linkToAdd.from != state.linkToAdd.to) {
                if (uiCallbacks.onConnect) {
                    uiCallbacks.onConnect({dataManager, state})
                }else{
                    console.log(state.linkToAdd);
                    dataManager.addLinks([state.linkToAdd])
                }
                dataManager.evaluateTree();
                // alert()
                state.linkToAdd = undefined;
            }
        }
        function onDblClick (){
            state.mouse.x = ( (event.clientX-state.containerDim.x) / state.containerDim.width ) * 2 - 1;
            state.mouse.y = - ( (event.clientY-state.containerDim.y) / state.containerDim.height ) * 2 + 1;
            var intersects = new THREE.Vector3();
            state.raycaster.setFromCamera(state.mouse, state.camera);
            state.raycaster.ray.intersectPlane(state.raycasterPlan, intersects);
            var usedTemplates = dataManager.getUsedTemplates()
            var usedTemplatesList = []
            for (const key in usedTemplates) {
                if (Object.hasOwnProperty.call(usedTemplates, key)) {
                    const template = usedTemplates[key];
                    usedTemplatesList.push({id:template.templateName, value:template.name})
                }
            }
            inputElements.createListInput({
                options :usedTemplatesList,
                callback:function (event) {
                    console.log(usedTemplates[event.id], {name:event.value,  position:{x:intersects.x,y:intersects.z}});
                    dataManager.addNode(event.id, {name:event.value,  position:{x:intersects.x,y:intersects.z}})
                },
            })
                // state.selectedToMove[0].position.set(intersects.x, 0.1, intersects.z);
            // alert(intersects.x)
        }
        container.addEventListener( 'mousedown', onClick );
        container.addEventListener( 'mousemove', onMove );
        container.addEventListener( 'mouseup', onMouseUp );
        state.canvas.addEventListener('dblclick', onDblClick, false);
    }

    var startRenderer = function () {
        function animate() {
            if (state.play) {
                updateLinks()
                requestAnimationFrame( animate );
                state.renderer.render( state.scene, state.camera );
            }
        }
        animate();
    }

    var removeNode=function (object) {
        state.scene.remove(object)
    }

    var attachDataManager = function (dataManagerToAttach) {
        dataManager = dataManagerToAttach
    }

    var init = function () {
        createScene()
        interactions()
        startRenderer()
    }
    init()
    self.attachDataManager = attachDataManager;
    self.removeNode = removeNode;
    self.addLinks = addLinks;
    self.removeLinks = removeLinks;
    self.addNode = addNode;
    return self
}
