import inputElements from "./stellae_inputs.js"

var createNodeRCM = function (object, dataManager, state) {
    setTimeout(() => {//timeout to avoid normal RCM

        inputElements.createListInput({
            inputTitle:object.layoutItemRoot.edata.name,
            showSearch:false,
            options :[
                {id:"delete", value:"Delete node", params:{}},
                // {id:"2", value:"Default"},
                // {id:"3",  value:"Default"},
            ],
            callback:function (event) {
                if (event.id =="delete") {
                    console.log(object.layoutItemRoot);
                    if (confirm("Delete node?")) {
                        dataManager.removeNode(state.lastSelectedHeader.edata.uuid)
                    }
                }
            },
        })
        
    }, 150);
}

var createLinksRCM = function (object, dataManager, state) {
    setTimeout(() => {//timeout to avoid normal RCM

        inputElements.createListInput({
            showSearch:false,
            inputTitle:"Link",
            options :[
                {id:"delete", value:"Delete link", params:{}},
                // {id:"2", value:"Default"},
                // {id:"3",  value:"Default"},
            ],
            callback:function (event) {
                if (event.id =="delete") {
                    // console.log(object.layoutItemRoot);
                    console.log(state.selectedLine);
                    if (confirm("Delete Link?")) {
                        console.log(state.links);
                        if (object.layoutItemRoot) {
                            dataManager.removeLinks(object.layoutItemRoot.edata.uuid)
                        }else{
                            dataManager.removeLinks(object.parent.layoutItemRoot.edata.uuid)//TODO sometimes have to go to parent, should avoid
                        }
                    }
                }
            },
        })
        
    }, 150);
}

export {createNodeRCM, createLinksRCM}