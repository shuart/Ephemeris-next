import nuuid from "./stellae_utils_uuid.js"

var createToolbar = function(container){
    var self = {}
    var domElement = undefined;
    var buttonList = []
    var dataManager = undefined

    var eyeSvg = '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
    var eyeClosedSvg = '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
    var groupSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect></svg>'

    var init = function(){
        domElement = document.createElement("div")
        domElement.classList = ' stellae_inj_css_toolbar'
        // domElement.style.height= "100%" 
        // domElement.style.width= "200px" 
        // domElement.style.backgroundColor= "white" 
        // domElement.style.position= "absolute" 
        // domElement.style.opacity= "0.8" 
        // domElement.style.overflow= "auto" 
        container.appendChild(domElement)
        addButtons()
    }


    var createButtonLabel = function(data){
        var element = document.createElement("div")
        element.classList=" stellae_inj_css_side_toolbar_button_item"
        element.dataset.value = data.name
        // element.innerHTML= `<span style="cursor:pointer" class="stella_visibility" >${data.visible? eyeSvg: eyeClosedSvg}</span> ${data.edata.name} `
        // element.innerHTML= ` ${data.label} `
        element.innerHTML= ` ${groupSvg} `
        element.addEventListener("click", function (e) {
            data.callback({dataManager})
        })
        return element
    }

    // var createSearchArea = function (list) {
    //     // var search = document.createElement("div")
    //     var input = document.createElement("input")
    //     input.type="text"
    //     input.placeholder="Search.."
    //     input.classList ="stellae_inj_css_side_search"
    //     // search.innerHTML=`<input class="stellae_inj_css_side_search" type="text" placeholder="Search..">`
    //     input.addEventListener("click", function(e) {
    //         e.preventDefault()
    //         input.focus()
    //     })
    //     input.addEventListener("keyup", function(e) {
    //         e.preventDefault()
    //         var items = list.children
    //         for (let i = 0; i < items.length; i++) {
    //             if (items[i].dataset.value.toLowerCase().search(input.value.toLowerCase()) >= 0 || input.value=="") {
    //                 items[i].style.display ="block"
    //             }else{
    //                 items[i].style.display ="none"
    //             }
                
    //         }
    //     })
    //     return input
    // }

    var populate = function(){
        var list = document.createElement("div")
        list.style.height= "100%" 
        list.style.width= "100%" 
        list.style.color= "black" 
        list.style.overflow= "scroll" 
        
        for (let i = 0; i < buttonList.length; i++) {
            const element = buttonList[i];
            list.appendChild( createButtonLabel(element) )
        }
        domElement.innerHTML =""
        // domElement.appendChild(createSearchArea(list))
        domElement.appendChild(list)
    }

    var addButtons = function(){
        
        buttonList= [
            {label:"Group", callback:(e)=>{
                    e.dataManager.addNode("in_out", { nodeLayout:"group",uuid:nuuid(), name:"group", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'})
                }
            },
        ]
        populate()
    }
    var setDataManager = function (dm) {
        dataManager = dm
    }

    init()
    self.addButtons = addButtons
    self.setDataManager = setDataManager

    return self
}

export default createToolbar