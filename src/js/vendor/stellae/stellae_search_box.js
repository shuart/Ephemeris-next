import { fadeNode, unFadeNode , nodeVisibilityManager} from "./stellae_hide_fade_nodes.js";

var createStellaeSearchBox = function(container){
    var self = {}
    var domElement = undefined;
    var nodeList = []

    var glass = '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'

    var init = function(){
        domElement = document.createElement("div")
        domElement.classList +=" stellae_inj_css_search"
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
                        if (nodeList[i].edata.name.toLowerCase().search(currentValue.toLowerCase()) >= 0) {
                            // nodeList[i].visible = true
                            unFadeNode(nodeList[i])
                            nodeVisibilityManager.show(nodeList[i].edata.uuid)
                        }else{
                            // nodeList[i].visible = false
                            fadeNode(nodeList[i])
                            nodeVisibilityManager.hide(nodeList[i].edata.uuid)
                        }
                    }
                    
                }
            }else{
                for (let i = 0; i < nodeList.length; i++) {
                    // nodeList[i].visible = true
                    unFadeNode(nodeList[i])
                    nodeVisibilityManager.show(nodeList[i].edata.uuid)
                }
            }
        })
        container.appendChild(domElement)
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