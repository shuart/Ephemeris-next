import * as THREE from "../three.module.js"
import nanoid  from "./stellae_utils_uuid.js"

var imageCache ={}

export function createInstanceEngine(scene, nodes) {
    var self ={};
    var count =200
    var amount =200
    var lastAdded ={}
    var nodesClusters ={}
    var nodeList ={}
    var layoutList ={}
    var textureLibrary ={}
    
    const dummy = new THREE.Object3D();

    function addNode(data){ 
        // console.log(data.name);
        // alert()
        if (!nodeList[data.uuid]) {
            createRoundLayout(data)
            
        }
        
    }

    function createRoundLayout(data) {
        var layout = create2DLayout(data.uuid)
        // console.log(data);
        // alert()
        var type = data.headerColor+data.imgPath
        var socket = createRoundSocketLayout(data, type)
        var header = createRoundHeaderLayout(data, type)
        var imageHeader =createRoundImageHeaderLayout(data, type)
        var shadowBack =createRoundshadowBackLayout(data, 'allShadows') //no need for type as shadows are all the same

        layout.add(header)
        layout.add(socket)
        layout.add(imageHeader)
        layout.add(shadowBack)
        // var back = createNode(data)
        
    }

    // function addGroup(data){ 
    //     // console.log(data.name);
    //     // alert()
    //     if (!nodeList[data.uuid]) {
    //         var newNode =createNode(data, type, material, geometry)
    //         nodeList[data.uuid] =newNode
    //     }
        
    // }

    function getNode(uuid) {

        return nodeList[uuid]
    }

    function createDeferedNode(instanceReference){
        var node ={}
        var uuid = nanoid()
        var reference = instanceReference
        var lastPosition = {x:0,y:0,z:0}
        var lastRotation = {x:0,y:0,z:0}
        var lastScale = {x:0,y:0,z:0}

        function getInstancedMesh(){
            return nodesClusters[reference[0]][reference[1]]
        }

        function setPosition(x,y,z) {
            var x = x ||lastPosition.x
            var y = y ||lastPosition.y
            var z = z ||lastPosition.z
            
            const matrix = new THREE.Matrix4();
            getInstancedMesh().getMatrixAt( reference[2], matrix );
            matrix.setPosition( x,y,z );
            getInstancedMesh().setMatrixAt( reference[2], matrix );
            getInstancedMesh().instanceMatrix.needsUpdate = true;
            
            lastPosition.x=x;lastPosition.y=y;lastPosition.z=z;
        }

        function setRotation(x,y,z) {
            var x = x ||lastRotation.x
            var y = y ||lastRotation.y
            var z = z ||lastRotation.z

            const matrix = new THREE.Matrix4();
            getInstancedMesh().getMatrixAt( reference[2], matrix );
            // dummy.position.set( lastPosition.x, lastPosition.y, lastPosition.y);
            dummy.matrix = matrix 
            dummy.rotation.x = x
            dummy.rotation.y = y
            dummy.rotation.z = z
            dummy.updateMatrix();
            getInstancedMesh().setMatrixAt( reference[2], dummy.matrix );
            // matrix.setPosition( x,y,z );
            // getInstancedMesh().setMatrixAt( reference[2], matrix );
            // getInstancedMesh().instanceMatrix.needsUpdate = true;
            lastRotation.x=x;lastRotation.y=y;lastRotation.z=z;
        }
        function setScale(x,y,z) {
            var x = x ||lastScale.x
            var y = y ||lastScale.y
            var z = z ||lastScale.z

            const matrix = new THREE.Matrix4();
            getInstancedMesh().getMatrixAt( reference[2], matrix );
            // dummy.position.set( lastPosition.x, lastPosition.y, lastPosition.y);
            dummy.matrix = matrix 
            dummy.scale.x = x
            dummy.scale.y = y
            dummy.scale.z = z
            dummy.updateMatrix();
            getInstancedMesh().setMatrixAt( reference[2], dummy.matrix );
            // matrix.setPosition( x,y,z );
            // getInstancedMesh().setMatrixAt( reference[2], matrix );
            // getInstancedMesh().instanceMatrix.needsUpdate = true;
            lastScale.x=x;lastScale.y=y;lastScale.z=z;
        }

        node.setScale =setScale
        node.setPosition =setPosition
        node.setRotation =setRotation
        nodeList[uuid] =node
        return node
    }
    function create2DLayout(uuid){
        var layout ={}
        var children = []

        // function forEachInstancedMeshes(callback){
        //     for (let i = 0; i < references.length; i++) {
        //         const element = references[i];
        //         nodesClusters[reference[0]][reference[1]]
        //     }
        // }

        function add(deferedNode, offset){
            children.push({node:deferedNode, offset:offset||undefined})
        }

        function setPosition(x,y,z) {
            
            for (let i = 0; i < children.length; i++) {
                const element = children[i].node;
                element.setPosition(x,undefined,z)
                // const instance = nodesClusters[reference[0]][reference[1]]
                // const matrix = new THREE.Matrix4();
                // instance.getMatrixAt( reference[2], matrix );
                // // const currentPosition = new THREE.Vector3( );
                // // currentPosition.setFromMatrixPosition ( matrix )
                // matrix.setPosition( x,y,z );
                // instance.setMatrixAt( reference[2], matrix );
                // instance.instanceMatrix.needsUpdate = true;
            }
        }


        layout.add =add
        layout.setPosition =setPosition
        layoutList[uuid]=layout
        nodeList[uuid]=layout
        return layout
    }

    function createRoundHeaderLayout(data, type) {
        const material = new THREE.MeshBasicMaterial( { color: data.headerColor } );

        // const materialHeader = new THREE.MeshBasicMaterial( { color: headerColor,side: THREE.DoubleSide  } );
        
        var headerGeometry = new THREE.ShapeGeometry( circleShape );
        var node = createNode(data, type+'_round_header', headerGeometry, material) 
        node.setRotation(-3.1416/2,0,0)
        node.setScale(0.08,0.08,0.08)
        node.setPosition(0,0.12,0)
        
        return node
    }
    function createRoundImageHeaderLayout(data, type) {
        const material = svgToTexture(data.imgPath);

        // const materialHeader = new THREE.MeshBasicMaterial( { color: headerColor,side: THREE.DoubleSide  } );
        
        const geometry = new THREE.PlaneGeometry();
        var node = createNode(data, type+'_round_image_header', geometry, material) 
        node.setRotation(-3.1416/2,0,0)
        node.setScale(0.6,0.6,0.6)
        node.setPosition(0,0.13,0)
        
        return node
    }
    function createRoundshadowBackLayout(data, type) {
        const material = shadowToTexture(data.imgPath);

        // const materialHeader = new THREE.MeshBasicMaterial( { color: headerColor,side: THREE.DoubleSide  } );
        
        const geometry = new THREE.PlaneGeometry();
        var node = createNode(data, type+'_round_shadow_back', geometry, material) 
        node.setRotation(-3.1416/2,0,0)
        node.setScale(1.2,1.2,1.2)
        node.setPosition(0,0.06,0)
        
        return node
    }
    function createRoundSocketLayout(data, type) {

        var socketColor = 0x00d6a3

        socketColor = colorShade(data.headerColor, -30)
        const materialSocketFlow = new THREE.MeshBasicMaterial( { color: socketColor } );
        var socketGeometry = new THREE.ShapeGeometry( circleShape );

        var socket = createNode(data, type+'_round_socket', socketGeometry, materialSocketFlow) 

        socket.setScale(0.1,0.1,0.1)
        socket.setRotation(-3.1416/2,0,0)
        socket.setPosition(0,0.11,0)
        
        return socket
    }

    function createNode(data, type, geometry, material) {
            var type =type || data.imgPath
        // data.imgPath
            
            var nodeInstance =undefined;
            if (!nodesClusters[type]) {
            

            var mesh = new THREE.InstancedMesh( geometry, material, 2000 );

            let i = 0;
            const offset = 0;
            // const offset = ( amount - 1 ) / 2;

            const matrix = new THREE.Matrix4();

            for ( let x = 0; x < amount; x ++ ) {

                for ( let y = 0; y < amount; y ++ ) {

                    for ( let z = 0; z < amount; z ++ ) {

                        // dummy.position.set( x, y, z );
                        // // dummy.scale.set(0.08,0.08,0.08)
						// 		// // dummy.rotation.y = ( Math.sin( x / 4 + time ) + Math.sin( y / 4 + time ) + Math.sin( z / 4 + time ) );
						// 		// // dummy.rotation.z = 0;
						// 		// dummy.rotation.x = -3.1416/5;
						// 		// // dummy.rotation.x = -2;
						// 		// // dummy.rotation.z = 0;
                        //         // // dummy.matrix.makeRotationX(-3.1416/5)

						// 		dummy.updateMatrix();

						// 		mesh.setMatrixAt( i , dummy.matrix );

                        // matrix.setPosition( offset - x, offset - y, offset - z );
                        // matrix.setRotation( 0, 0, 0.7 );

                        // mesh.setMatrixAt( i, matrix );
                        // mesh.setColorAt( i, color );

                        i ++;

                    }

                }

            }
            nodesClusters[type]=[mesh]
            nodesClusters[type][0].count =1
            mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
            scene.add( mesh );
            nodeInstance =createDeferedNode([type,0,0])
            
        }else if(nodesClusters[type]){
           
            nodesClusters[type][0].count ++
            nodesClusters[type][0].instanceMatrix.needsUpdate = true;

            nodeInstance =createDeferedNode([type,0,nodesClusters[type][0].count-1 ], data.uuid)
        }
        return nodeInstance
        
    }
    
    self.addNode = addNode
    self.getNode = getNode
    return self
}

var circleRadius =5
const circleShape = new THREE.Shape()
    .moveTo( 0, circleRadius )
    .quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 )
    .quadraticCurveTo( circleRadius, - circleRadius, 0, - circleRadius )
    .quadraticCurveTo( - circleRadius, - circleRadius, - circleRadius, 0 )
    .quadraticCurveTo( - circleRadius, circleRadius, 0, circleRadius );

const colorShade = (color, amt) => {
    // col = col.replace(/^#/, '')
    var col = color
    if (col[0]!='#') { //is decimal
        // col = "#"+col.toString(16);
        let r = (col & 0xff0000) >> 16;
        let g = (col & 0x00ff00) >> 8;
        let b = (col & 0x0000ff);
        // var r = Math.floor(col / (256*256));
        // var g = Math.floor(col / 256) % 256;
        // var b = col % 256;
        ([r, g, b] = [r + amt, g+ amt, b + amt])
        r = Math.max(Math.min(255, r), 0).toString(16)
        g = Math.max(Math.min(255, g), 0).toString(16)
        b = Math.max(Math.min(255, b), 0).toString(16)
    
        const rr = (r.length < 2 ? '0' : '') + r
        const gg = (g.length < 2 ? '0' : '') + g
        const bb = (b.length < 2 ? '0' : '') + b
    
        return `#${rr}${gg}${bb}`
    }else{
        col = col.substring(1)
        if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]
    
        let [r, g, b] = col.match(/.{2}/g);
        ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])
    
        r = Math.max(Math.min(255, r), 0).toString(16)
        g = Math.max(Math.min(255, g), 0).toString(16)
        b = Math.max(Math.min(255, b), 0).toString(16)
    
        const rr = (r.length < 2 ? '0' : '') + r
        const gg = (g.length < 2 ? '0' : '') + g
        const bb = (b.length < 2 ? '0' : '') + b
    
        return `#${rr}${gg}${bb}`
    }
}

function svgToTexture(imgPath) {
    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set the canvas size
    canvas.width = 75; // You can adjust the size as needed
    canvas.height = 75;

    if (imageCache[imgPath]) {
        const headerImage =  new THREE.MeshBasicMaterial( { map: imageCache[imgPath],  transparent: true } );
        return headerImage
    }else{
        var imageMap = new THREE.Texture(canvas);
        imageCache[imgPath] = imageMap
        var img = new Image();
        imageMap.minFilter = THREE.LinearFilter;
        // spriteMap.generateMipmaps = false;
        imageMap.needsUpdate = true;
        const headerImage =  new THREE.MeshBasicMaterial( { map: imageCache[imgPath], transparent: true  } );
        img.onload = function() {
            ctx.drawImage(img,0,0,img.width,img.height,0,0,75,75);
            var imageData = ctx.getImageData(0, 0, 75, 75);
            var dataArr = imageData.data;
            for(var i = 0; i < dataArr.length; i += 4)
            {
                var r = dataArr[i]; // Red color lies between 0 and 255
                var g = dataArr[i + 1]; // Green color lies between 0 and 255
                var b = dataArr[i + 2]; // Blue color lies between 0 and 255
                // var a = dataArr[i + 3]; // Transparency lies between 0 and 255
                var invertedRed = 255 - r;
                var invertedGreen = 255 - g;
                var invertedBlue = 255 - b;

                dataArr[i] = invertedRed;
                dataArr[i + 1] = invertedGreen;
                dataArr[i + 2] = invertedBlue;
            }
            ctx.putImageData(imageData, 0, 0);
            imageMap.needsUpdate = true;
        }
        img.src = "./"+imgPath;
        return headerImage
    }
    
}

function shadowToTexture() {
    var imgPath ='local_shadow'
    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set the canvas size
    canvas.width = 120; // You can adjust the size as needed
    canvas.height = 120;

    var radgrad = ctx.createRadialGradient(60,60,0,60,60,60);
    radgrad.addColorStop(0, 'rgba(0,0,0,.6)');
    radgrad.addColorStop(0.5, 'rgba(0,0,0,.3)');
    radgrad.addColorStop(1, 'rgba(0,0,0,0)');
    
    // draw shape
    ctx.fillStyle = radgrad;
    ctx.fillRect(0,0,120,120);


    if (imageCache[imgPath]) {
        const shadowImage =  new THREE.MeshBasicMaterial( { map: imageCache[imgPath],  transparent: true } );
        return shadowImage
    }else{
        var imageMap =new THREE.Texture( ctx.getImageData( 0, 0, 120, 120 ) );
        imageCache[imgPath] = imageMap
        imageMap.minFilter = THREE.LinearFilter;
        // spriteMap.generateMipmaps = false;
        imageMap.needsUpdate = true;
        const shadowImage =  new THREE.MeshBasicMaterial( { map: imageCache[imgPath], transparent: true  } );

        return shadowImage
    }
    
}

