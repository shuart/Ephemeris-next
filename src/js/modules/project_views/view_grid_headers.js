import {createAdler} from "../../vendor/adler.js"
import { componentList } from "./project_views_components_list.js"
import createEvaluatorsManagement from "../common_project_management/evaluators_management.js"
import state from "../common_state/state_manager.js"
import projectManagement from "../common_project_management/project_management.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"
import { showEvaluatorsSelector } from "../common_selectors/evaluators_selector.js";
import createDialogue from "../common_select_dialogue/common_dialogue.js";
import { createEntitiesSelectionOptions } from "../common_selectors/entities_selector.js";
import { createTableSettings } from "./settings/view_grid_settings_table.js";
import { createCardSettings } from "./settings/view_grid_settings_card.js";
import { createGraphSettings } from "./settings/view_grid_settings_graph.js";
import { createWritingBoardSettings } from "./settings/view_grid_settings_writing_board.js";
import { createFolderSettings } from "./settings/view_grid_settings_folder.js";
import {createDiagramSettings} from "./settings/view_grid_settings_diagram.js";
var goToEvaluator = function(event){
    var evaluator = event.target.dataset.id
    state.goTo("/:/evaluators/"+evaluator)
}

var setUpSettingsEvent = function (self, event, domElement, currentUuid, uuid, callback){
    var compPos = [event.target.dataset.rowId,event.target.dataset.colId,event.target.dataset.compId,]
    var projectId = projectManagement.getCurrent().id
    var entities = projectManagement.getProjectStore(projectId,"evaluators").getAll()

    showEvaluatorsSelector({
        multipleSelection:false,
        selected : [currentUuid],
        onChange: (e,f)=> {
            // console.log(f.added);
            // alert(f.added)
            if (f.added) {
                self.editEvaluatorCallback(uuid, f.added) 
            }
            
            // data.addEntities(f.added)
            // data.removeEntities(f.removed)
            // showCollections(self)
        },
    })


    
    // alert(JSON.stringify(currentSchema))
    // instance.props.schema.set(currentSchema); instance.update();
}

var setUpOptionsEvent = function (self, event, domElement, currentUuid, uuid, comp){
    var projectId = projectManagement.getCurrent().id

    if (comp.componentType =="table") {
        createTableSettings(comp, function(data) {
            self.editRenderSettingsCallback(uuid, data)
        })
    } else if(comp.componentType =="instanceCard") {
        createCardSettings(comp, function(data) {
            self.editRenderSettingsCallback(uuid, data)
        })
    } else if(comp.componentType =="graph") {
        createGraphSettings(comp, function(data) {
            self.editRenderSettingsCallback(uuid, data)
        })
    }else if(comp.componentType =="writingBoard") {
        createWritingBoardSettings(comp, function(data) {
            self.editRenderSettingsCallback(uuid, data)
        })
    }else if(comp.componentType =="folder") {
        createFolderSettings(comp, function(data) {
            self.editRenderSettingsCallback(uuid, data)
        })
    } else if(comp.componentType =="diagram") {
        createDiagramSettings(comp, function(data) {
            self.editRenderSettingsCallback(uuid, data)
        })
    } 
    

    


    
    // alert(JSON.stringify(currentSchema))
    // instance.props.schema.set(currentSchema); instance.update();
}

var renderMenu = function (self, comp) {
    var areaIcon = componentList[comp.componentType].icon
    var areaName = componentList[comp.componentType].name
    var rowId =1
    var colId =1
    var index =1
    var uuid =comp.uuid

    var evaluatorUuid = comp.evaluatorUuid || undefined
    var evaluatorName = " no evaluator"
    if (evaluatorUuid && evaluatorUuid !="undefined") {
        console.log(evaluatorUuid);
        var evaluatorRepo = createEvaluatorsManagement()
        evaluatorName =evaluatorRepo.getById(evaluatorUuid).name
    }

    var menuHtml = /*html*/`
    <div class="media">
        <div class="media-left">
            <figure class="image is-32x32" style="margin:23%">
            <img class="darkModeCompatibleIcons" src="./img/icons/${areaIcon}.svg" alt="Placeholder image">
            </figure>
        </div>
        <div class="media-content viewport-header-title">
            <p class="is-4">${areaName} <button data-row-id="${rowId}" data-col-id="${colId}" data-comp-id="${index}" data-id="${uuid}" class="delete is-danger action-view-settings-delete-comp"></button> </p>
            
        </div>
        <div class="tags has-addons viewport-header-evaluator-tag">
            <span data-id="${evaluatorUuid}" class="tag is-link action-view-settings-goto-evaluator">Using ${evaluatorName }</span>
            <a data-row-id="${rowId}" data-col-id="${colId}" data-comp-id="${index}" data-id="${uuid}" class="tag action-view-settings-edit-evaluator"><img data-row-id="${rowId}" data-col-id="${colId}" data-comp-id="${index}" data-id="${uuid}" style="height:15px" class="darkModeCompatibleIcons" src="./img/icons/edit-2.svg" alt="Placeholder image"></a>
        </div>
        <div class="media viewport-header-settings-action">
            <figure class="image is-32x32" style="margin:23%">
            <img class="darkModeCompatibleIcons" src="./img/icons/settings.svg" alt="Settings">
            </figure>
        </div>
    </div>
    
    `
    var domElement = document.createElement("div")
    domElement.innerHTML =menuHtml
    domElement.querySelector(".action-view-settings-goto-evaluator").addEventListener("click",goToEvaluator )
    domElement.querySelector(".action-view-settings-edit-evaluator").addEventListener("click",function (event) {
        setUpSettingsEvent(self,event,domElement, evaluatorUuid, uuid )
        
    } )
    domElement.querySelector(".viewport-header-settings-action").addEventListener("click",function (event) {
        setUpOptionsEvent(self,event,domElement, evaluatorUuid, uuid, comp )
        
    } )
    
    return domElement
    
}

var gridViewHeaders = createAdler({
    tag:'eph-grid-view-headers',
    props:{
        component: undefined,
        editEvaluatorCallback: ()=> alert("eval"),
        editRenderSettingsCallback : ()=> alert("settings")
        // currentPageId:undefined,
        // currentArea:undefined,
        // calledFromInstance:undefined,
        // cols:4,
        // rows:4,
        // schema:[],
        // showSettings:false,
    },
    attributes:[
    ],
    events : [
        // ["click", '.action_grid_add', addComp],
        // ["click", '.action-grid-save', saveNewLayout],
        // ["click", '.action-grid-add-left', addCompLeft],
        // ["click", '.action-grid-toggle-edit', toogleSettings],
    ],
    html:()=>/*html*/`
        <link rel="stylesheet" href="css/bulma.min.css">
        <link rel="stylesheet" href="css/bulma.dark.css">

        <link rel="stylesheet" href="css/main.css">


        <div class="card viewport-header">
            <header class="card-header">
                <div class="card-menu"></div>
                </button>
            </header>
        </div>
        
    `,
    onRender:(self) =>{
        // updateView(self)

        var editMenu = renderMenu(self, self.component)
        self.query(".card-menu").append(editMenu)
    },
    css:`
        .viewport-header-settings-action{
            position: absolute;
            right: 5px;
            top:-5px;
            cursor:pointer;
            border-style:none !important;
        }
        .viewport-header-title{
            top: 11px;
            position: relative;
        }
        .viewport-header-evaluator-tag{
            top: 11px;
            left:10px;
            position: relative;
        }
        .viewport-header{
            margin-bottom: 3px;
        }
    `,
})

export default gridViewHeaders