
import * as THREE from "../three.module.js"

var createLine = function(){
    const lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xa5abb6,
        linewidth: 0.01,
    } );
    const linePoints = [];
    linePoints.push( new THREE.Vector3( - 1, -1, -0.15 ) );
    linePoints.push( new THREE.Vector3( -1.01, -1.01, -0.15 ) );
    const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
    var line = new THREE.Line( lineGeometry, lineMaterial );
    return line
}

export {createLine}