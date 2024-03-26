import createEvaluatorsManagement from "../common_project_management/evaluators_management.js";
import state from "../common_state/state_manager.js";
import projectManagement from "../common_project_management/project_management.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"

var goToEvaluator = function(event){
    var evaluator = event.target.dataset.id
    state.goTo("/:/evaluators/"+evaluator)
}



var setUpSettingsEvent = function (event, domElement, callback){
    var compPos = [event.target.dataset.rowId,event.target.dataset.colId,event.target.dataset.compId,]
    var projectId = projectManagement.getCurrent().id
    var entities = projectManagement.getProjectStore(projectId,"evaluators").getAll()

    mainPopup.mount()
    mainPopup.append(select.instance({
        data:{
            list:entities,
            callback:function(event){
                domElement.dataset.evaluatorUuid = event.value.uuid
                callback()
            }
        }
    }), "main-slot")
    mainPopup.update();
    



    // alert(JSON.stringify(currentSchema))
    // instance.props.schema.set(currentSchema); instance.update();
}

// var renderPreview = function (params) {
//     const comp = components[i];
//     var instanceType = availableViewports[comp.componentType]
//     var evaluatorId = comp.settings?.evaluatorUuid || comp.evaluatorUuid
//     if (evaluatorId == "undefined") {
//         evaluatorId = undefined //TODO, solve this issue. It's caused by the stringification of the dataset of the placeholder
//     }
//     var view = instanceType.instance({
//         props:{
//             settings:{evaluatorId:evaluatorId, calledFromInstance:self.calledFromInstance},
//         }
//     })
    
//     if (view && (comp.area==self.currentArea || ((comp.area==undefined || comp.area=='undefined') && (self.currentArea==undefined || self.currentArea=='undefined')) ) ) {
//         var domElement = document.createElement("div")
//         // domElement.id = "comp"+index
//         var vsize = comp.vsize || 2
//         var hsize = comp.hsize || 2
//         domElement.style.gridArea =  `span ${vsize}/span ${hsize}`
//         view.mount(domElement)
//         // view.mount(self.query('.viewGridArea'))
//         self.query('.viewGridArea').append(domElement)
//     }
// }

var renderPlaceholder = function ({
    rowId=undefined,
    colId = undefined,
    width = undefined,
    index = undefined,
    height= "100%",
    parent=undefined,
    hsize = 2,
    vsize= 2,
    area=undefined,
    uuid = undefined,
    deleteCallback = (e)=>console.log("no action"),
    refreshCallback = (e)=>console.log("no action"),
    componentType ="undefined",
    evaluatorUuid =undefined,
    currentComp = undefined,
    settings ={evaluatorUuid:undefined},
}={}) {
    var areaName = "No Type"
    var areaIcon  = "airplay"
    var evaluatorUuid = evaluatorUuid || settings.evaluatorUuid
    var evaluatorName = " no evaluator"
    if (evaluatorUuid && evaluatorUuid !="undefined") {
        console.log(evaluatorUuid);
        var evaluatorRepo = createEvaluatorsManagement()
        evaluatorName =evaluatorRepo.getById(evaluatorUuid).name
    }
    if (componentType == "table") {
        areaName = "Table";
        areaIcon = "table"
    }
    if (componentType == "folder") {
        areaName = "Folder";
        areaIcon = "folder-tree"
    }
    if (componentType == "graph") {
        areaName = "Graph";
        areaIcon = "git-merge"
    }
    if (componentType == "instanceCard") {
        areaName = "Title Card";
        areaIcon = "credit-card"
    }
    if (componentType == "propertiesList") {
        areaName = "Properties";
        areaIcon = "credit-card"
    }
    if (componentType == "writingBoard") {
        areaName = "Text Editor";
        areaIcon = "text";
    }
    var domElement = document.createElement("div")
    domElement.id = "comp"+index
    domElement.style.gridArea = "span 2/span 2"
    domElement.style.height = "100%"
    domElement.classList ='dragging_placeholder'

    domElement.dataset.uuid = uuid
    domElement.dataset.componentType = componentType
    domElement.dataset.evaluatorUuid = evaluatorUuid
    domElement.dataset.vsize = vsize
    domElement.dataset.hsize = hsize
    domElement.dataset.area = area

    domElement.innerHTML =`
    
    <div id="${index}" style="height:100%;" a-slot="view_mount_point_${rowId}_${colId}_${index}" data-row-id="${rowId}" data-col-id="${colId}" data-comp-id="${index}"  class="adler_grid_comp_area inside" >
        <div class="switch-area" ><img class="darkModeCompatibleIcons" src="./img/icons/switch-camera.svg" alt="Placeholder image"> Switch Area</div>
        <div class="scale_h">
            <div class="minus_h"><img class="darkModeCompatibleIcons" src="./img/icons/arrow-left-from-line.svg" alt="Placeholder image"></div>
            <div class="plus_h"><img class="darkModeCompatibleIcons" src="./img/icons/arrow-right-from-line.svg" alt="Placeholder image"></div>
        </div>
        <div class="scale_v">
            <div class="minus_v"><img class="darkModeCompatibleIcons" src="./img/icons/arrow-up-from-line.svg" alt="Placeholder image"></div>
            <div class="plus_v"><img class="darkModeCompatibleIcons" src="./img/icons/arrow-down-from-line.svg" alt="Placeholder image"></div>
            
        </div>
        <div class="box" style="height:100%;">
                <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                    <img class="darkModeCompatibleIcons" src="./img/icons/${areaIcon}.svg" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="is-4">${areaName} <button data-row-id="${rowId}" data-col-id="${colId}" data-comp-id="${index}" data-id="${uuid}" class="delete is-danger action-view-settings-delete-comp"></button> </p>
                    <div class="tags has-addons">
                        <span data-id="${evaluatorUuid}" class="tag is-link action-view-settings-goto-evaluator">Using ${evaluatorName }</span>
                        <a data-row-id="${rowId}" data-col-id="${colId}" data-comp-id="${index}" data-id="${uuid}" class="tag action-view-settings-edit-evaluator"><img data-row-id="${rowId}" data-col-id="${colId}" data-comp-id="${index}" data-id="${uuid}" style="height:15px" class="darkModeCompatibleIcons" src="./img/icons/edit-2.svg" alt="Placeholder image"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    domElement.querySelector(".switch-area").addEventListener("click",function (event) {
        // domElement.remove()
        if (domElement.dataset.area =="left") {
            domElement.dataset.area ="center"
        }else{
            domElement.dataset.area ="left"
        }
        deleteCallback()
    } )
    
    domElement.querySelector(".action-view-settings-delete-comp").addEventListener("click",function (event) {
        domElement.remove()
        deleteCallback()
    } )
    domElement.querySelector(".action-view-settings-goto-evaluator").addEventListener("click",goToEvaluator )
    domElement.querySelector(".action-view-settings-edit-evaluator").addEventListener("click",function (event) {
        setUpSettingsEvent(event,domElement, deleteCallback )
        
    } )
    domElement.querySelector(".plus_h").addEventListener("click",function (event) {
        hsize++
        domElement.style.gridArea = `span ${vsize}/span ${hsize}`
        domElement.dataset.hsize = hsize
    } )
    domElement.querySelector(".minus_h").addEventListener("click",function (event) {
        hsize--
        domElement.style.gridArea = `span ${vsize}/span ${hsize}`
        domElement.dataset.hsize = hsize
    } )
    domElement.querySelector(".plus_v").addEventListener("click",function (event) {
        vsize++
        domElement.style.gridArea = `span ${vsize}/span ${hsize}`
        domElement.dataset.vsize = vsize
    } )
    domElement.querySelector(".minus_v").addEventListener("click",function (event) {
        vsize--
        domElement.style.gridArea = `span ${vsize}/span ${hsize}`
        domElement.dataset.vsize = vsize
    } )
    domElement.style.gridArea = `span ${vsize}/span ${hsize}`
    return domElement
    
}

export {renderPlaceholder}