import * as THREE from "../../vendor/three.module.js"

const textCanvas = document.createElement( 'canvas' );
textCanvas.height = 34;

function createCharacterLabel( textToRender, maxLength ) {
    var text = textToRender
    if (textToRender == undefined) {
        text = "Missing"
    }
    if (text.length > maxLength) {
        text = text.substring(0, maxLength-2)+"..";
    }
    const ctx = textCanvas.getContext( '2d' );
    const font = '32px arial';

    ctx.font = font;
    textCanvas.width = Math.ceil( ctx.measureText( text ).width + 16 );

    ctx.font = font;
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 4;
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 3;
    ctx.strokeText( text, 8, 26 );
    ctx.fillStyle = 'white';
    // ctx.textAlign = 'left';
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

export {createCharacterLabel}