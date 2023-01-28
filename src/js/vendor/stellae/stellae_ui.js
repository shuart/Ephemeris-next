import * as THREE from "../three.module.js"
import { MapControls } from '../three.orbitcontrols.js';
import createNodeLayout from "./stellae_layouts.js";
import inputElements from "./stellae_inputs.js"
import createSimulation from "./stellae_d3_forces.js"
import createListView from "./stellae_side_list.js";
import createToolbar from "./stellae_toolbar.js";
import createStellaeSearchBox from "./stellae_search_box.js";
import createConnectionHighlighter from "./stellae_connection_highlighter.js";
import createArrowLayout from "./stellae_layouts_arrow.js";
import behaveAsNormalNode from "./stellae_utils_check_if_normal_node.js";


export default function createStellaeUi({
    container = document.body,
    canvasWidth =800, canvasHeight = 500,
    darkMode = "auto",
    useSimulation = false,
    uiCallbacks = {},//onConnect,
    showList = true,
    showToolbar =false,
    showSearchBox= true,
    useConnectionHighlighter =true,
    useCustomNodeAddList = false,
    allowCustomNameForNodes = false,
    allowCustomNameForRelations = false,
    fixNodesWithPositions = true,
    } = {}) {
    var self = {};

    var simulation = undefined;
    var sideList = undefined;
    var toolbar = undefined;
    var searchBox = undefined;
    var connectionHighlighter = undefined;

    if (useSimulation) {
        simulation = createSimulation()
    }
    if (showList) {
        sideList= createListView(container)
    }
    if (showToolbar) {
        toolbar= createToolbar(container) //data manager is set elsewhere
    }
    if (showSearchBox) {
        searchBox = createStellaeSearchBox(container)
    }
    if (useConnectionHighlighter) {
        connectionHighlighter = createConnectionHighlighter()
    }
    var state ={
        scene:undefined,camera:undefined,renderer:undefined,mouse: new THREE.Vector2(),raycaster:new THREE.Raycaster(),raycasterPlan:undefined,
        canvas:undefined,containerDim:undefined,controls:undefined,play:true,helperLine:undefined,
        nodes:[],links:[], mapping:undefined,
        triggers:{headers:[], sockets:{}, props:{}},
        selectedToMove:[], selectedSocket:undefined, selectedHandle:undefined, lastSelectedHeader:undefined, selectedLine:undefined, linkToAdd: undefined,
        draggingNodes:false,draggingSocket:false,draggingHandle:false,draggingPreviousPosition:undefined,dragStarted:false,dragOffset:{x:0,z:0},
        recordedClickForMouseUp:false,
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
    nodeMeshManager.getHandlesMesh =function(){
        var result = []
        for (var key in state.triggers.handles){
            result.push(state.triggers.handles[key].mesh)
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
        state.renderer = new THREE.WebGLRenderer({alpha:true, antialias:true,});
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

        if (useSimulation) {
            if (behaveAsNormalNode(node)) {
                simulation.addNodes(node)
                if (fixNodesWithPositions) {
                    simulation.fixNodes(node)
                }
            }
        }
        if (showList) {
            sideList.addNodes(state.nodes)
        }
        if (showSearchBox) {
            searchBox.addNodes(state.nodes)
        }
        if (useConnectionHighlighter) {
            connectionHighlighter.updateNodes(state.nodes)
        }
        return node;
    }

    var addLinks = function(links){
        for (let i = 0; i < links.length; i++) {
            const element = links[i];
            var meshLine = createMeshLine(element)
            state.scene.add(meshLine)
            meshLine.edata = element
            state.links.push(meshLine)
        }
        updateMapping()
        if (useSimulation) {
            simulation.addlinks(links, state)
        }
        if (useConnectionHighlighter) {
            connectionHighlighter.updateRelations(state.links)
        }
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
        state.triggers.headers = []; state.triggers.sockets={};state.triggers.props={};state.triggers.handles = {}
        for (let i = 0; i < state.nodes.length; i++) {
            const node = state.nodes[i];
            if (node.parent === state.scene) {
                newNodeList.push(node)
                state.triggers.headers.push(node.layout.header)
                state.triggers.sockets= Object.assign({},state.triggers.sockets, node.layout.sockets)
                state.triggers.props= Object.assign({},state.triggers.props, node.layout.props)
                state.triggers.handles= Object.assign({},state.triggers.handles, node.layout.handles)
            }else{
                console.log("removed")
            }
        }
        state.nodes=newNodeList
    }

    var createMeshLine = function(data){

        var lineGroup =createArrowLayout(state.scene,data)

        return lineGroup
    }

    var updateLinks = function(){
        for (let i = 0; i < state.links.length; i++) {
            const link = state.links[i];
            if (state.mapping[link.edata.to]) {
                var startPosition = state.mapping[link.edata.from].position; var endPosition = state.mapping[link.edata.to].position;
                var startPositionOffset = state.mapping[link.edata.from].sockets[link.edata.from_socket].positionOffset; var endPositionOffset = state.mapping[link.edata.to].sockets[link.edata.to_socket].positionOffset;

                link.update(startPosition, endPosition, startPositionOffset, endPositionOffset)
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
                }else{
                    state.recordedClickForMouseUp = {x:state.mouse.x, y:state.mouse.y}
                    
                }

                //TODO move in other function
                if (useConnectionHighlighter && behaveAsNormalNode(object.layoutItemRoot) ) {
                    connectionHighlighter.highlight(object.layoutItemRoot)
                }
                
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

                console.log(intersectionsProps[ 0 ].object.edata);
                intersectionsProps[ 0 ].object.edata.action({callback:dataManager.evaluateTree})


            }
            const intersectionsHandles = state.raycaster.intersectObjects( nodeMeshManager.getHandlesMesh(), true );
            if ( intersectionsHandles.length > 0 ) { //Case hit header
                const object = intersectionsHandles[ 0 ].object;
                state.selectedHandle= intersectionsHandles[ 0 ].object;
                state.draggingHandle = true;
            }
            if(!intersections[0] && !intersectionsSockets[0] && !intersectionsHandles[0]){
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
                    
                    console.log(state.links);
                    if (state.selectedLine.layoutItemRoot) {
                        dataManager.removeLinks(state.selectedLine.layoutItemRoot.edata.uuid)
                    }else{
                        dataManager.removeLinks(state.selectedLine.parent.layoutItemRoot.edata.uuid)//TODO sometimes have to go to parent, should avoid
                    }
                    
                }
            }
            if (state.draggingNodes) {
                
                state.controls.enabled = false;
                var intersects = new THREE.Vector3();
                state.raycaster.setFromCamera(state.mouse, state.camera);
                state.raycaster.ray.intersectPlane(state.raycasterPlan, intersects);

                if (!state.draggingPreviousPosition) { //initialize dragging previous pos
                    state.draggingPreviousPosition={x:intersects.x,z:intersects.z}
                    console.log(state.draggingPreviousPosition);
                }
                if (!state.dragStarted) { //init offset from main dragging object
                    state.dragStarted = true
                    state.dragOffset.x =  state.selectedToMove[0].position.x  - intersects.x
                    state.dragOffset.z =  state.selectedToMove[0].position.z  - intersects.z
                    if (state.selectedToMove[0].layoutType=="group") {//when node is group
                        state.selectedToMove[0].layoutItemInteractions.onDragStart(intersects.x,intersects.z,state, simulation) //delegate the move action of the other nodes to the group
                    }
                }

                //find offset from previous position for smooth move
                // var offIntersects ={}
                // offIntersects.x = intersects.x - state.draggingPreviousPosition.x;
                // offIntersects.z = intersects.z - state.draggingPreviousPosition.z;
                var newPos = {}
                newPos.x = state.dragOffset.x + intersects.x;
                newPos.z = state.dragOffset.z + intersects.z;

                state.selectedToMove[0].position.set(newPos.x, 0.1, newPos.z);
                state.selectedToMove[0].edata.nodeData.setPosition(newPos.x, newPos.z)

                if (state.selectedToMove[0].layoutType=="group") {//when node is group
                    state.selectedToMove[0].layoutItemInteractions.onMove(newPos.x,newPos.z,state, simulation) //delegate the move action of the other nodes to the group
                }

                if (useSimulation) {
                    simulation.dragNode(state.selectedToMove[0].edata.uuid,newPos.x, newPos.z)
                }
                state.draggingPreviousPosition.x=intersects.x;//Record state for next move
                state.draggingPreviousPosition.z=intersects.z;
            }
            if (state.draggingHandle) {
                state.controls.enabled = false;
                var intersects = new THREE.Vector3();
                state.raycaster.setFromCamera(state.mouse, state.camera);
                state.raycaster.ray.intersectPlane(state.raycasterPlan, intersects);
                console.log(state.selectedHandle);
                state.selectedHandle.layoutItemInteractions.onMove(intersects.x,intersects.z)
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
            state.selectedHandle= false;
            state.draggingHandle = false;
            state.selectedLine =undefined;
            state.draggingPreviousPosition=undefined;
            state.dragStarted = false;
            state.dragOffset = {x:0,z:0};
            state.controls.enabled = true;
            //check for click up
            if (state.recordedClickForMouseUp && state.recordedClickForMouseUp.x == state.mouse.x && state.recordedClickForMouseUp.y == state.mouse.y) {
                if (uiCallbacks.onNodeClick) {
                    uiCallbacks.onNodeClick({dataManager, state, input:{targetItem:state.lastSelectedHeader.edata.uuid}})
                }
            }
            state.recordedClickForMouseUp = false
            //check for connections
            lineMeshManager.hideHelperLine()
            if (state.linkToAdd && state.linkToAdd.from != state.linkToAdd.to) {
                if (uiCallbacks.onConnect) {
                    uiCallbacks.onConnect({dataManager, state, input:{sourceItem:state.linkToAdd.from, targetItem:state.linkToAdd.to}})
                }else{
                    console.log(state.linkToAdd);
                    if (allowCustomNameForRelations) {
                        state.linkToAdd.name = prompt("Name")
                    }
                    dataManager.addLinks([state.linkToAdd])
                }
                dataManager.evaluateTree();
                state.linkToAdd = undefined;
            }
        }
        function onDblClick (){
            state.mouse.x = ( (event.clientX-state.containerDim.x) / state.containerDim.width ) * 2 - 1;
            state.mouse.y = - ( (event.clientY-state.containerDim.y) / state.containerDim.height ) * 2 + 1;
            var intersects = new THREE.Vector3();
            state.raycaster.setFromCamera(state.mouse, state.camera);
            state.raycaster.ray.intersectPlane(state.raycasterPlan, intersects);

            //fill the selector with templates
            var usedTemplates = dataManager.getUsedTemplates()
            var usedTemplatesList = []
            var selectionList = []
            for (const key in usedTemplates) {
                if (Object.hasOwnProperty.call(usedTemplates, key)) {
                    const template = usedTemplates[key];
                    usedTemplatesList.push({id:template.templateName, value:template.name, category:template.category})
                }
            }
            //check if there is an alternative user provided list
            if (useCustomNodeAddList) {
                selectionList = useCustomNodeAddList({usedTemplates , position:{x:intersects.x,y:intersects.z}}) //has to be a function
            }else{
                selectionList = usedTemplatesList
            }
            inputElements.createListInput({
                options :selectionList,
                customName : allowCustomNameForNodes,
                callback:function (event) {
                    if (!event.params.position) {
                        event.params.position={x:intersects.x,y:intersects.z}
                    }
                    // console.log(usedTemplates[event.id], {name:event.value,  position:{x:intersects.x,y:intersects.z}});
                    dataManager.addNode(event.id, event.params)
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
    var labelNode=function (object, value) {
        if (object.layoutItemInteractions && object.layoutItemInteractions.setLabel) {
            object.layoutItemInteractions.setLabel(value)
        }
        
    }
    var attachDataManager = function (dataManagerToAttach) {
        dataManager = dataManagerToAttach
        if (showToolbar) {
            toolbar.setDataManager(dataManagerToAttach)
        }
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
    self.labelNode = labelNode;
    return self
}
