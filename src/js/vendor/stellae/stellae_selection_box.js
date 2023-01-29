import * as THREE from "../three.module.js"

var createSelectionBox = function (state) {
    var self ={}
    var box = undefined
    var lastStartingPosition = undefined
    var lastEndPosition = undefined

    const hwidth = 1;
    const hheight = 1;

    const squareShape = new THREE.Shape()
        .moveTo( 0, 0 )
        .lineTo( 0, hheight )
        .lineTo( hwidth, hheight )
        .lineTo( hwidth, 0 )
        .lineTo( 0, 0 );
    
       
    var init=function () {
        const materialBack = new THREE.MeshBasicMaterial( { color: 0x1766aa,side: THREE.DoubleSide  } );
        var geometry = new THREE.ShapeGeometry( squareShape );
        box =  new THREE.Mesh( geometry, materialBack );
        box.rotation.x =3.1416/2
        box.scale.set(0,0, 0)
        state.scene.add(box)
    }


    var getGroupBoundaries = function(){
        var boundaries ={}
        boundaries.left = lastStartingPosition.x
        boundaries.right = lastEndPosition.x
        boundaries.top = lastStartingPosition.z
        boundaries.bottom = lastEndPosition.z

        return boundaries
    }

    var startSelection = function(data){
        box.position.set(data.x,0, data.z)
        lastStartingPosition =data
        box.scale.set(0,0, 0)
    }
    var moveWhileSelecting = function(data){
        // box.position.set(data.x,0, data.z)
        let positions = box.geometry.attributes.position.array;
        // positions[4] =data.x
        // positions[6] =data.z
        lastEndPosition = data
        let xscale = (data.x - lastStartingPosition.x)
        let zscale = (data.z - lastStartingPosition.z)
        box.scale.set(xscale,zscale, 0)

        // var selected = recalculateSelection() //TODO check if perf is ok with realtime selection before using
        // console.log(selected);
        // box.geometry.attributes.position.needsUpdate = true; // required after the first render
    }

    var stopSelecting = function(data){
        box.scale.set(0,0, 0)
        var selected = recalculateSelection()
        console.log(selected);
        return selected
    }

    var recalculateSelection = function () {
        var currentBoundaries = getGroupBoundaries()
        var inSelection=[]
        for (let i = 0; i < state.nodes.length; i++) {
            const node = state.nodes[i];
            if (node.position.x > currentBoundaries.left  &&  node.position.x < currentBoundaries.right   &&  node.position.z > currentBoundaries.top   && node.position.z < currentBoundaries.bottom  ) {
                inSelection.push(node)
            }
        }
        return inSelection
    }

    setTimeout(init,1000)
    // init()

    self.stopSelecting = stopSelecting
    self.startSelection = startSelection
    self.moveWhileSelecting = moveWhileSelecting
    return self
}

export default createSelectionBox