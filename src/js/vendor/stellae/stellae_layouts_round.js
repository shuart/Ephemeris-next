import * as THREE from "../three.module.js"
import inputElements from "./stellae_inputs.js"

var imageCache = {}

let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

const textCanvas = document.createElement( 'canvas' );
textCanvas.height = 34;

const shadowCanvas = document.createElement( 'canvas' );

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
    .lineTo( 0, hheight+0.5 )
    .lineTo( hwidth, hheight+0.5 )
    .lineTo( hwidth, 0 )
    .lineTo( 0, 0 );
var circleRadius =5
const circleShape = new THREE.Shape()
    .moveTo( 0, circleRadius )
    .quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 )
    .quadraticCurveTo( circleRadius, - circleRadius, 0, - circleRadius )
    .quadraticCurveTo( - circleRadius, - circleRadius, - circleRadius, 0 )
    .quadraticCurveTo( - circleRadius, circleRadius, 0, circleRadius );
var headerGeometry = new THREE.ShapeGeometry( circleShape );
var roundSocketGeometry = new THREE.ShapeGeometry( circleShape );

var propsHeightMap={
    hidden:0.5,
    text:0.3,
    select:0.3,
}

// const pSBC=(p,c0,c1,l)=>{
//     let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
//     if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
//     if(!this.pSBCr)this.pSBCr=(d)=>{
//         let n=d.length,x={};
//         if(n>9){
//             [r,g,b,a]=d=d.split(","),n=d.length;
//             if(n<3||n>4)return null;
//             x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
//         }else{
//             if(n==8||n==6||n<4)return null;
//             if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
//             d=i(d.slice(1),16);
//             if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
//             else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
//         }return x};
//     h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
//     if(!f||!t)return null;
//     if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
//     else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
//     a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
//     if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
//     else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
// }
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


var createNodeRound  = function({
    color = "#000000",
    headerColor = 0x00b5ad,
    nodeAttributes={},
    imgPath = undefined,
    name = "Node",
    position={x:0,y:0},
    uuid = nanoid(),
    nodeData = {},
    props =[
        {id:nanoid(), label:"demo", type:"text", editable:true, socket:"output", value:"Default"},
        {id:nanoid(), label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
        {id:nanoid(), label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
    ],
    } = {}){
    var layoutItems={
        header:undefined,
        sockets:{},
        props:{},
    }
    // alert(color)
    function createShadow (){
        //do it only one time
        const ctx = shadowCanvas.getContext('2d');
        shadowCanvas.height=200;
        shadowCanvas.width=200;

        // Shadow
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 15;

        // Rectangle
        ctx.fillStyle = 'white';
        ctx.fillRect(25, 25, 75, 75);
        // ctx.beginPath();
        // ctx.arc(100, 100, 200, 0, 2 * Math.PI);
        // ctx.fill();
        const spriteMap = new THREE.Texture( ctx.getImageData( 0, 0, shadowCanvas.width, shadowCanvas.height ) );
        spriteMap.minFilter = THREE.LinearFilter;
        spriteMap.generateMipmaps = false;
        spriteMap.needsUpdate = true;
        const sprite = new THREE.Sprite( new THREE.SpriteMaterial( { map: spriteMap } ) );
        var mult = 2
        // sprite.scale.set( mult * 0.12 * shadowCanvas.width / shadowCanvas.height , mult *0.12, 1 );
        // sprite.position.y = 0.7 ;

        return sprite;
    }
    function svgToTexture(imgPath) {
        // Create a new canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set the canvas size
        canvas.width = 75; // You can adjust the size as needed
        canvas.height = 75;

        if (imageCache[imgPath]) {
            const spriteImage = new THREE.Sprite( new THREE.SpriteMaterial( { map: imageCache[imgPath] } ) );
            return spriteImage
        }else{
            var imageMap = new THREE.Texture(canvas);
            imageCache[imgPath] = imageMap
            var img = new Image();
            imageMap.minFilter = THREE.LinearFilter;
            // spriteMap.generateMipmaps = false;
            imageMap.needsUpdate = true;
            const spriteImage = new THREE.Sprite( new THREE.SpriteMaterial( { map: imageMap } ) );
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
            return spriteImage
        }
        
    }
    function createImage(){
        //do it only one time
        var ext = imgPath.slice(-3);
        if (ext == "svg") {
            // imgPath= imgPath.slice(0, -3) + "png";
            const spriteImage = svgToTexture(imgPath)
            return spriteImage
        }else{
            const textureLoader = new THREE.TextureLoader();
            var imageMap = textureLoader.load( imgPath );
            const spriteImage = new THREE.Sprite( new THREE.SpriteMaterial( { map: imageMap } ) );
            return spriteImage;
        }
        
        
        // imageMap.minFilter = THREE.LinearFilter;
        // spriteMap.generateMipmaps = false;
        // spriteMap.needsUpdate = true;
        const spriteImage = new THREE.Sprite( new THREE.SpriteMaterial( { map: imageMap } ) );
        // var mult = 2
        // sprite.scale.set( mult * 0.12 * shadowCanvas.width / shadowCanvas.height , mult *0.12, 1 );
        // sprite.position.y = 0.7 ;
        
        // return spriteImage;
    }

    function createCharacterLabel( text, maxLength ) {

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

    function createHeader(node, name, color){
        const materialHeader = new THREE.MeshBasicMaterial( { color: headerColor,side: THREE.DoubleSide  } );
        
        var header = new THREE.Mesh( headerGeometry, materialHeader );
        header.layoutItemType ="header"
        header.layoutItemRoot =node
        header.scale.set(0.08,0.08,0.08)
        header.position.set(0,0,-0.01)
        //text
        var spritetext = createCharacterLabel(name)
        node.add(spritetext)
        spritetext.position.set(0,0.7,-0.01)

        node.add(header)
        layoutItems.header = header
        if (imgPath && ( imgPath.slice(-3)=="svg"||imgPath.slice(-3)=="png" ) ) {
            var headerImage = createImage()
            headerImage.layoutItemType ="headerImage"
            headerImage.layoutItemRoot =node
            node.add(headerImage)
            layoutItems.headerImage = headerImage
            headerImage.position.set(0,0,-0.02)
            headerImage.scale.set(0.5,0.5,0.5)
        }
        return header
    }
    function createSelectionMarker(node){
        const materialSelectionMarker = new THREE.MeshBasicMaterial( { color: 0x769ae7,side: THREE.DoubleSide  } );
        
        var selectionMarker = new THREE.Mesh( headerGeometry, materialSelectionMarker );
        selectionMarker.layoutItemType ="selectionMarker"
        selectionMarker.layoutItemRoot =node
        selectionMarker.visible = false
        selectionMarker.scale.set(0.109,0.109,0.109)
        selectionMarker.position.set(0,0,0.01)
        node.add(selectionMarker)
        return selectionMarker
    }

    function createBack(node, props){
        // const materialBack = new THREE.MeshBasicMaterial( { color: 0x303030,side: THREE.DoubleSide  } );
        // var geometryBack = new THREE.ShapeGeometry( circleShape );
        // var background = new THREE.Mesh( geometryBack, materialBack );
        // background.layoutItemType ="header"
        // background.layoutItemRoot =node
        // // background.scale.y = (props.length+1)/2
        // background.scale.set(0.1,0.1,0.1)
        // background.position.set(0,0,0.002)
        // node.add(background)

        //createShadow
        var spriteShadow = createShadow()
        spriteShadow.layoutItemType ="shadow"
        node.add(spriteShadow)
        // spriteShadow.position.set(0,1.7,0.008)
        // spriteShadow.scale.set(3.5,4.5/3,1)
        // background.scale.y = (props.length+1)/2
        var scaler = 1
        spriteShadow.position.set(0.4,0.3 ,0.008)
        spriteShadow.scale.set(2,1.5,1)
        // spriteShadow.scale.y = (props.length+1)
    }

    function createSocket(group, prop){
        var socketColor = 0x00d6a3
        // if (Array.isArray(prop.value)) {
        //     socketColor = 0x6767d1
        // }
        // if (typeof headerColor =="string") {
        // //    socketColor = pSBC(-0.4, "#6767d1") 
        //    socketColor = colorShade(headerColor, -30)
        // }
        socketColor = colorShade(headerColor, -30)
        const materialSocketFlow = new THREE.MeshBasicMaterial( { color: socketColor,side: THREE.DoubleSide  } );
        var socket = new THREE.Mesh( roundSocketGeometry, materialSocketFlow );
        
        group.add(socket)
        // if (prop.socket == "output") {
        //     socket.position.set(1.47,0,0)
        // }else{
        //     socket.position.set(-1.47,0,0)
        // }

        // if (prop.multiple) { //set aspect
        //     socket.scale.set(0.02,0.03,0.02)
        // }else{
        //     socket.scale.set(0.02,0.02,0.02)
        // }
        socket.scale.set(0.1,0.1,0.1)
        socket.position.set(0,0,0.007)
        return socket
    }

    function createPropAction(prop){
        var action = undefined

        if (Array.isArray(prop.value)) {
            action = function (param) {
                // inputElements.createFieldView({field:prop.value})
                console.log(prop.value);
                alert(JSON.stringify(prop.value ))
            }
            return action
        }
        if (prop.type == "text") {
            action = function (param) {
                var newValue = prompt("Set "+prop.label,prop.value)
                if (newValue && newValue != "") {
                    var propId = prop.id
                    nodeData.setProp(propId, newValue)
                    // dataManager.evaluateTree();
                    if (param && param.callback) {param.callback()}
                }
            }
        }
        if (prop.type == "select") {
            action = function (param) {
                inputElements.createListInput({options:prop.options, callback:(event)=> {nodeData.setProp(prop.id, event.value);param.callback(); }})
            }
        }
        return action
    }

    function createProp (node,position, prop){
        //text
        var propGroup = new THREE.Group()
        var spritetext = createCharacterLabel(prop.label,15)
        var isField = false;
        // propGroup.add(spritetext)
        // if (prop.type == "hidden") {
        //     spritetext.position.set(+0.5,0,0)
        // }else if (prop.type == "text" || prop.type == "select") {
        //     spritetext.position.set(-0.5,0,0)
        //     var textToDisplay = prop.value
        //     if (Array.isArray(textToDisplay)) {
        //         textToDisplay = "Field"
        //         isField =true
        //     }
        //     var spritetextValue = createCharacterLabel(textToDisplay, 8)
        //     propGroup.add(spritetextValue)
        //     spritetextValue.position.set(0.5,0,0)
        //     layoutItems.props[spritetextValue.uuid] = {mesh:spritetextValue}
        //     spritetextValue.edata = { root:node, uuid:prop.id, value:prop.value, prop:prop, nodeData: nodeData, isField:isField, action:createPropAction(prop), }
        // }
        
        if(prop.socket && prop.socket != "none"){
            var socket = createSocket(propGroup, prop)
            socket.layoutItemRoot =node
            socket.edata = { root:node, nodeData: nodeData, uuid:prop.id, positionOffset:{x:0,y:0,z:0} }
            layoutItems.sockets[socket.uuid] = {mesh:socket, positionOffset:{x:0,y:0,z:0}}
        }
        
        node.add(propGroup)
        // propGroup.position.set(0,0.5+position,0)
        
        return propGroup

    }

    function createRows (node,props){
        var currentPosition =0;
        for (let i = 0; i < props.length; i++) {
            var propLayout = createProp(node, currentPosition, props[i])
            currentPosition +=propsHeightMap[props[i].type]
        }
    }
     
    var node= new THREE.Group();
    // headerColor = 0x00b5ad
    // alert(headerColor)
    var header = createHeader(node,name,color)
    createBack(node,props)

    // createSocket(node)
    createRows (node, props)
    createSelectionMarker(node)

    // var spritetext = createCharacterLabel("testtest test")
    // node.add(spritetext)
    // spritetext.position.set(0,0,-0.1)
    // // spritetext.scale.set(0.2,0.2,0.2)

    

    node.rotation.x =3.1416/2
    node.position.set(position.x,0.1,position.y)
    node.layout =layoutItems
    if (nodeAttributes?.visible != undefined) { //if an attribute was saved, apply it
        node.visible = nodeAttributes.visible
    }
    return node
}


export default createNodeRound