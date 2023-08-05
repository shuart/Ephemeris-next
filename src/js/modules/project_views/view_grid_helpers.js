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

var renderPlaceholder = function ({
    rowId=undefined,
    colId = undefined,
    width = undefined,
    index = undefined,
    height= "100%",
    parent=undefined,
    uuid = undefined,
    deleteCallback = (e)=>console.log("no action"),
    componentType ="undefined",
    evaluatorUuid =undefined,
    settings ={evaluatorUuid:undefined},
}={}) {
    var area = componentType
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
    if (componentType == "textEditor") {
        areaName = "Text Editor";
        areaIcon = "credit-card";
        alert("e")
    }
    var domElement = document.createElement("div")
    domElement.id = "comp"+index
    domElement.style.gridArea = "span 2/span 2"
    domElement.classList ='dragging_placeholder'

    domElement.dataset.uuid = uuid
    domElement.dataset.componentType = componentType
    domElement.dataset.evaluatorUuid = evaluatorUuid

    domElement.innerHTML =`
    <div id="${index}" a-slot="view_mount_point_${rowId}_${colId}_${index}" data-row-id="${rowId}" data-col-id="${colId}" data-comp-id="${index}"  class="adler_grid_comp_area inside" >
        
        <div class="box">
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
    
    domElement.querySelector(".action-view-settings-delete-comp").addEventListener("click",function (event) {
        domElement.remove()
        deleteCallback()
    } )
    domElement.querySelector(".action-view-settings-goto-evaluator").addEventListener("click",goToEvaluator )
    domElement.querySelector(".action-view-settings-edit-evaluator").addEventListener("click",function (event) {
        setUpSettingsEvent(event,domElement, deleteCallback )
        
    } )
    return domElement
    
}

export {renderPlaceholder}