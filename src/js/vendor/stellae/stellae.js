import * as THREE from "../three.module.js"
import { MapControls } from '../three.orbitcontrols.js';



function createStellae({
    container = document.body,
    canvasWidth =800,
    canvasHeight = 500,
    darkMode = "auto",
    } = {}) {
    var self = {};
    var state ={
        scene:undefined,
        camera:undefined,
        renderer:undefined,
        play:true,
        nodes:[],
        draggable:[],
        mouse: new THREE.Vector2(),
        raycaster:new THREE.Raycaster(),
        raycasterPlan:undefined,
        canvas:undefined,
        containerDim:undefined,
        selectedToMove:[],
        draggingNodes:false,
        controls:undefined,
    }

    var createNode  = function({
        headerColor = 0xffff00,
        } = {}){


	const textCanvas = document.createElement( 'canvas' );
	textCanvas.height = 34;

	function createCharacterLabel( text ) {

		const ctx = textCanvas.getContext( '2d' );
		const font = '30px grobold';

		ctx.font = font;
		textCanvas.width = Math.ceil( ctx.measureText( text ).width + 16 );

		ctx.font = font;
		ctx.strokeStyle = '#222';
		ctx.lineWidth = 8;
		ctx.lineJoin = 'miter';
		ctx.miterLimit = 3;
		ctx.strokeText( text, 8, 26 );
		ctx.fillStyle = 'white';
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
            
            
        var node= new THREE.Group();
        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const materialHeader = new THREE.MeshBasicMaterial( { color: 0xffff00,side: THREE.DoubleSide  } );
        const materialBack = new THREE.MeshBasicMaterial( { color: 0xffffff,side: THREE.DoubleSide  } );
        const materialSocketFlow = new THREE.MeshBasicMaterial( { color: 0x55ff00,side: THREE.DoubleSide  } );
        //create header
        var geometry = new THREE.ShapeGeometry( squareShape );
        var geometryBack = new THREE.ShapeGeometry( squareShapeBack );

        var header = new THREE.Mesh( geometry, materialHeader );
        header.layoutItemType ="header"
        header.layoutItemRoot =node
        header.position.set((0-hwidth/2),0-hheight/2,0)
        node.add(header)

        var background = new THREE.Mesh( geometryBack, materialBack );
        background.layoutItemType ="header"
        background.layoutItemRoot =node
        background.position.set((0-hwidth/2),0-hheight/2,0.002)
        node.add(background)

        var socket = new THREE.Mesh( geometry, materialSocketFlow );
        node.add(socket)
        socket.position.set(0,3,0)
        socket.scale.set(0.2,0.2,0.2)
        // node.scale.set(0.5,0.5,0.5)

        var spritetext = createCharacterLabel("testtest test")
        node.add(spritetext)
        spritetext.position.set(0,0,-0.1)
        // spritetext.scale.set(0.2,0.2,0.2)

        node.rotation.x =3.1416/2
        node.position.set(0,0.1,0)
        node.layout ={
            header:header,
            sockets:{}
        }
        return node
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

        var node =createNode()
        state.scene.add(node)
        state.nodes.push(node)
        state.draggable.push(node.layout.header)

        var node =createNode()
        state.scene.add(node)
        state.nodes.push(node)
        state.draggable.push(node.layout.header)

        state.controls = new MapControls( state.camera, state.renderer.domElement );
        //set intersection plan
        state.raycasterPlan = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);


        const size = 1000;
        const divisions = 1000;

        const gridHelper = new THREE.GridHelper( size, divisions );
        state.scene.add( gridHelper );
        
    }

    var createDemo = function () {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const cube2 = new THREE.Mesh( geometry, material2 );
        cube2.position.set(1,0,3)
        state.nodes.push(cube)
        state.nodes.push(cube2)
        console.log(state.nodes);
        state.scene.add( cube );
        state.scene.add( cube2 );

        
    }

    var interactions = function(){
        function onClick(event) {
            event.preventDefault();
            state.selectedToMove =[] //clear move list
            state.draggingNodes=false,
            state.containerDim = state.canvas.getBoundingClientRect() //check if needed
            state.mouse.x = ( (event.clientX-state.containerDim.x) / state.containerDim.width ) * 2 - 1;
			state.mouse.y = - ( (event.clientY-state.containerDim.y) / state.containerDim.height ) * 2 + 1;
            state.raycaster.setFromCamera( state.mouse, state.camera );
            // console.log(state.raycaster.ray.direction);

            const intersections = state.raycaster.intersectObjects( state.draggable, true );
            console.log(intersections);
            if ( intersections.length > 0 ) {
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
            

        }
        function onMouseUp (){
            state.draggingNodes=false;
            state.controls.enabled = true;
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
    // alert("start")

    return self
}

export default createStellae