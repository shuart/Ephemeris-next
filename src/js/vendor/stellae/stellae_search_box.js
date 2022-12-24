var createStellaeSearchBox = function(container){
    var self = {}
    var domElement = undefined;
    var nodeList = []

    var glass = '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'

    var init = function(){
        domElement = document.createElement("div")
        domElement.style.height= "25px" 
        domElement.style.width= "222px" 
        domElement.style.backgroundColor= "#919191" 
        domElement.style.position= "absolute" 
        domElement.style.top= "50px" 
        domElement.style.right= "10px"
        domElement.style.opacity= "0.8" 
        domElement.style.color= "black"
        domElement.style.overflow= "hidden"
        domElement.style.borderRadius= "10px"
        domElement.innerHTML = `<input type="text" style="width:198px; border-style:none; background-color:transparent" class="stellae_search"></input> ${glass}`
        domElement.addEventListener("click", function (e) {
            // data.visible = !data.visible
            domElement.querySelector(".stellae_search").focus()
        })
        domElement.querySelector(".stellae_search").addEventListener("keyup", function (e) {
            // data.visible = !data.visible
            var currentValue = domElement.querySelector(".stellae_search").value;
            if (currentValue !="") {
                for (let i = 0; i < nodeList.length; i++) {
                    if (currentValue.length>1) {
                        if (nodeList[i].edata.name.search(currentValue) >= 0) {
                            // nodeList[i].visible = true
                            unFadeNode(nodeList[i])
                        }else{
                            // nodeList[i].visible = false
                            fadeNode(nodeList[i])
                        }
                    }
                    
                }
            }else{
                for (let i = 0; i < nodeList.length; i++) {
                    // nodeList[i].visible = true
                    unFadeNode(nodeList[i])
                }
            }
        })
        container.appendChild(domElement)
    }

    var fadeNode = function(node){
        node.children[2].visible = false
            node.traverse(o=>{
                if (o.material) {
                    o.material.transparent = true;
                    o.material.opacity = 0.1;
                }
            })
    }
    var unFadeNode = function(node){
        node.children[2].visible = false
            node.traverse(o=>{
                if (o.material) {
                    o.material.transparent = false;
                    o.material.opacity = 1;
                }
            })
    }


    // var createNodeLabel = function(data){
    //     var element = document.createElement("div")
    //     element.style.padding= "6px";
    //     element.innerHTML= `<span style="cursor:pointer" class="stella_visibility" >${data.visible? eyeSvg: eyeClosedSvg}</span> ${data.edata.name} `
    //     element.querySelector(".stella_visibility").addEventListener("click", function (e) {
    //         data.visible = !data.visible
    //         data.visible? element.querySelector(".stella_visibility").innerHTML=eyeSvg : element.querySelector(".stella_visibility").innerHTML= eyeClosedSvg
    //     })
    //     return element
    // }

    // var populate = function(){
    //     var list = document.createElement("div")
    //     list.style.height= "100%" 
    //     list.style.width= "100%" 
    //     list.style.color= "black" 
    //     for (let i = 0; i < nodeList.length; i++) {
    //         const element = nodeList[i];
    //         list.appendChild( createNodeLabel(element) )
    //     }
    //     domElement.innerHTML =""
    //     domElement.appendChild(list)
    // }

    var addNodes = function(nodes){
        
        nodeList= nodes
        // populate()
    }

    init()
    self.addNodes = addNodes

    return self
}

export default createStellaeSearchBox