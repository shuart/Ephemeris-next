import { Line2 } from "../three_addons/lines/Line2.js";
import { LineGeometry } from "../three_addons/lines/LineGeometry.js";
import { LineMaterial } from "../three_addons/lines/LineMaterial.js";

var createLine2 = function(){
    const geometry = new LineGeometry();
    geometry.setPositions( [1,1,1,5,5,5] );
    // geometry.setColors( colors );

    var matLine = new LineMaterial( {

        color: 0xa5abb6,
        linewidth: 0.0015, // in world units with size attenuation, pixels otherwise
        vertexColors: false,

        //resolution:  // to be set by renderer, eventually
        dashed: false,
        alphaToCoverage: true,

    } );


    var line = new Line2( geometry, matLine );
    line.computeLineDistances();
    // line.scale.set( 1, 1, 1 );
    geometry.setPositions( [0,0,0,1,1,1] )
    return line
}

export {createLine2}