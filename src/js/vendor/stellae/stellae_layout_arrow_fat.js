
import * as THREE from "../three.module.js"
import { Line2 } from "../three_addons/lines/Line2.js";
import { LineGeometry } from "../three_addons/lines/LineGeometry.js";
import { LineMaterial } from "../three_addons/lines/LineMaterial.js";



var circleRadius =0.5
const circleShape = new THREE.Shape()
    .moveTo( 0, circleRadius )
    .quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 )
    .quadraticCurveTo( circleRadius, - circleRadius, 0, - circleRadius )
    .quadraticCurveTo( - circleRadius, - circleRadius, - circleRadius, 0 )
    .quadraticCurveTo( - circleRadius, circleRadius, 0, circleRadius );
circleShape.autoClose = true;
// const points = circleShape.getPoints();
const circleShapeSpacedPoints = circleShape.getSpacedPoints( 20 );

const positionsCircular = [];


for (let i = 0; i < circleShapeSpacedPoints.length; i++) {
    const point = circleShapeSpacedPoints[i];
    positionsCircular.push( point.x, 0, point.y );
}

var createLine2 = function({
    dashed = false,
    circular = false,
    } = {}){
        
    const geometry = new LineGeometry();
    geometry.setPositions( [1,1,1,5,5,5] );
    if (circular) {
        geometry.setPositions( positionsCircular );
    }
    
    // geometry.setColors( colors );
    
    var matLine = new LineMaterial( {

        color: 0xa5abb6,
        linewidth: 0.0015, // in world units with size attenuation, pixels otherwise
        vertexColors: false,

        //resolution:  // to be set by renderer, eventually
        dashed: dashed,
        dashScale:10,
        alphaToCoverage: true,

    } );


    var line = new Line2( geometry, matLine );
    line.computeLineDistances();
    // line.scale.set( 1, 1, 1 );
    // geometry.setPositions( [0,0,0,1,1,1] )
    return line
}

export {createLine2}