import { createAdler } from "../../vendor/adler.js";
import nanoid from "../../vendor/nanoid.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"
import projectManagement from "../common_project_management/project_management.js";
// import createEvaluatorsManagement from "../common_project_management/evaluators_management.js";

import table_viewport from "../viewports/table_viewport/table_ui.js"
import graph_viewport from "../viewports/graph_viewport/graph_ui.js"
import cardViewport from "../viewports/card_viewport/card_viewport.js";
import textEditorViewport from "../viewports/text_editor_viewport/text_editor_viewport.js";
// import state from "../common_state/state_manager.js";
import propertiesViewport from "../viewports/properties_viewport/properties_viewport.js";
import { renderPlaceholder } from "./view_grid_helpers.js";
import folder_viewport from "../viewports/folder_viewport/folder_viewport.js";

import gridViewHeaders from "./view_grid_headers.js";
import { getViewGridPlaceholder } from "./view_grid_placeholders.js";


function sortable(self, section, onUpdate){
    var dragEl, nextEl, newPos, dragGhost;
    console.log([...section.children]);
 
    let oldPos = [...section.children].map(item => {
        console.log(item);
      item.draggable = true
      let pos = self.query("#"+item.id).getBoundingClientRect();
      return pos;
    });
   
    function _onDragOver(e){
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        var target = e.target;
        if(!target.classList.contains("dragging_placeholder")){
            target = target.closest(".dragging_placeholder")
        }
        if( target && target !== dragEl && target.nodeName == 'DIV' ){
            if(target.classList.contains('inside')) {
                console.log("inside");
                e.stopPropagation();
            } else {
        
                var targetPos = target.getBoundingClientRect();//getBoundinClientRect contains location-info about the element (relative to the viewport)
                var next = (e.clientY - targetPos.top) / (targetPos.bottom - targetPos.top) > .5 || (e.clientX - targetPos.left) / (targetPos.right - targetPos.left) > .5;    //checking that dragEl is dragged over half the target y-axis or x-axis. (therefor the .5)
                console.log(dragEl);
                console.log(next && target.nextSibling);
                console.log(next && target.nextSibling || target);
                section.insertBefore(dragEl, next && target.nextSibling || target);
                
                /*  console.log("oldPos:" + JSON.stringify(oldPos));
                console.log("newPos:" + JSON.stringify(newPos)); */
                /* console.log(newPos.top === oldPos.top ? 'They are the same' : 'Not the same'); */
                console.log(oldPos);
            }
        }   
    }
    
    function _onDragEnd(evt){
        evt.preventDefault();
        newPos = [...section.children].map(child => {      
             let pos = self.query("#"+child.id).getBoundingClientRect();
             return pos;
           });
        console.log(newPos);
        dragEl.classList.remove('ghost');
        section.removeEventListener('dragover', _onDragOver, false);
        section.removeEventListener('dragend', _onDragEnd, false);

        nextEl !== dragEl.nextSibling ? onUpdate(dragEl) : false;
    }
       
      section.addEventListener('dragstart', function(e){     
        dragEl = e.target; 
        nextEl = dragEl.nextSibling;
    
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', dragEl.textContent);
      
        section.addEventListener('dragover', _onDragOver, false);
        section.addEventListener('dragend', _onDragEnd, false);
         
        setTimeout(function (){
            dragEl.classList.add('ghost');
        }, 0)
       
    });
}
                                        

var availableViewports = {
    instanceCard:cardViewport,
    table:table_viewport,
    graph:graph_viewport,
    propertiesList:propertiesViewport,
    textEditor:textEditorViewport,
    folder:folder_viewport,
}

var getComponents = function (self) {
    var components = []
    var layout = self.schema
    if (layout[0].cols) {
        for (let i = 0; i < layout.length; i++) {
            const rows = layout[i];
            for (let j = 0; j < rows.cols.length; j++) {
                const cols = rows.cols[j];
                if (cols.components) {
                    for (let k = 0; k < cols.components.length; k++) {
                        const comp = cols.components[k];
                        if(availableViewports[comp.componentType]){components.push(comp)}
                    }
                }
            }
        }
    }else{
        components = layout
    }
    return components
}

var renderItems = function (self) {
    var components = getComponents(self)
    if (self.currentArea == "left") { //change the grid
        self.query('.viewGridArea').classList.add("isLeft")   
    }
    for (let i = 0; i < components.length; i++) {
        const comp = components[i];
        
        var view = renderItem(self, comp)
        
        if (view && (comp.area==self.currentArea || ((comp.area==undefined || comp.area=='undefined') && (self.currentArea==undefined || self.currentArea=='undefined')) ) ) {
            var domElement = document.createElement("div")
            // domElement.id = "comp"+index
            var vsize = comp.vsize || 2
            var hsize = comp.hsize || 2
            domElement.style.gridArea =  `span ${vsize}/span ${hsize}`
            if (self.showHeaders) {
                var header = renderItemHeader(self, comp)
                domElement.append(header)
                domElement.classList.add("viewGridElementWithHeader")
            }
            view.mount(domElement) 
            // view.mount(self.query('.viewGridArea'))
            self.query('.viewGridArea').append(domElement)
        }
    }
}

var renderItemHeader = function (self, comp) {
    var viewHeader = gridViewHeaders.instance()
    viewHeader.component = comp
    viewHeader.editEvaluatorCallback = function (compId, evalId) {
        for (let i = 0; i < self.schema.length; i++) {
            if (self.schema[i].uuid == compId){
                self.schema[i].evaluatorUuid = evalId;
                pushLayoutToDb(self, self.schema)//modify and save new schema
                updateView(self)
            }
        }
    }
    viewHeader.editRenderSettingsCallback = function (compId, newSettings) {
        for (let i = 0; i < self.schema.length; i++) {
            if (self.schema[i].uuid == compId){
                self.schema[i].renderSettings = newSettings;
                console.log(newSettings);
                alert("fesfsefes")
                pushLayoutToDb(self, self.schema)//modify and save new schema
                updateView(self)
            }
        }
    }
    return viewHeader
}

var renderItem = function (self, comp) {
    var instanceType = availableViewports[comp.componentType]
    var evaluatorId = comp.settings?.evaluatorUuid || comp.evaluatorUuid
    var renderSettings = comp.renderSettings
    if (evaluatorId == "undefined") {
        evaluatorId = undefined //TODO, solve this issue. It's caused by the stringification of the dataset of the placeholder
    }
    var view = instanceType.instance({
        props:{
            settings:{evaluatorId:evaluatorId, calledFromInstance:self.calledFromInstance, renderSettings:renderSettings},
        }
    })
    return view
}

var updateSchema= function (self) {
    var newSchema = getSchemaFromGrid(self)
    self.schema = newSchema
    console.log(newSchema);
    updateView(self)
}

var renderPlaceholders = function (self) {
    var components = getComponents(self)
    for (let i = 0; i < components.length; i++) {
        const comp = components[i];
        var instanceType = availableViewports[comp.componentType]
        const compItem = Object.assign({},comp, {index:i, currentComp:comp, parent:self, deleteCallback:()=>updateSchema(self), });
        var view = renderPlaceholder(compItem)
        if (view) {
            if (comp.area == "left") {
                self.query('.viewGridAreaDemoLeft').append(view)
            }else{
                self.query('.viewGridArea').append(view)
            }
            // if (true) { //render preview
            //     var compView = renderItem(self, comp)
            //     compView.mount(view.querySelector(".box"))
            // }
            if (!self.showSettings) {
                var compView = renderItem(self, comp)
                compView.mount(view.querySelector(".box"))
            }else{
                var domPlacehoder = getViewGridPlaceholder(comp.componentType)
                view.querySelector(".box").append(domPlacehoder)
            }
            
        }
    }
}

var getSchemaFromGrid = function (self) {
    // self.schema[i].renderSettings 
    var newSchema = []
    let childArray = [ ...self.query('.viewGridArea').children ]
    childArray.forEach(function (item) {
        var baseDomDataset = item.dataset;
        var newDataset= JSON.parse(JSON.stringify(baseDomDataset));
        for (let i = 0; i < self.schema.length; i++) {
            if(self.schema[i].uuid == newDataset.uuid){
                newDataset.renderSettings = self.schema[i].renderSettings 
            }
        }
        newSchema.push(newDataset)
    })
    let childArrayLeft = [ ...self.query('.viewGridAreaDemoLeft').children ]
    childArrayLeft.forEach(function (item) {
        var baseDomDataset = item.dataset;
        var newDataset= JSON.parse(JSON.stringify(baseDomDataset));
        for (let i = 0; i < self.schema.length; i++) {
            if(self.schema[i].uuid == newDataset.uuid){
                newDataset.renderSettings = self.schema[i].renderSettings 
            }
        }
        newSchema.push(newDataset)
    })
    return newSchema
}

var saveNewLayout = function (event,self) {
    var newSchema = getSchemaFromGrid(self)
    pushLayoutToDb(self, newSchema)
    updateSchema(self)
}
var pushLayoutToDb = function (self, schema) {
    var projectId = projectManagement.getCurrent().id
    if (self.currentPageId) {
        projectManagement.getProjectStore(projectId,"views").add({uuid:self.currentPageId, layout:JSON.stringify(schema) ,theTime:Date.now()})
        console.log(projectManagement.getProjectStore(projectId,"views").getAll())
    }
}

var showAddMenu = function(event, self, area){
    var narrowPopup = mainPopup.instance({data:{narrow:true}})
    narrowPopup.mount()
    narrowPopup.append(select.instance({
        data:{
            list:[
                {uuid:"table", name:"Table", iconPath:"table.svg",},
                {uuid:"folder", name:"Folder", iconPath:"table.svg",},
                {uuid:"graph", name:"Graph", iconPath:"git-merge.svg",},
                {uuid:"instanceCard", name:"Instance Card", iconPath:"credit-card.svg",},
                {uuid:"propertiesList", name:"Properties List", iconPath:"credit-card.svg",},
                {uuid:"textEditor", name:"Text Editor", iconPath:"credit-card.svg",},
            ],
            callback:function(result){
                var newSchema = getSchemaFromGrid(self)
                newSchema.push({uuid:nanoid(), componentType:result.value.uuid, area:area})
                self.schema = newSchema
                console.log(newSchema);
                updateView(self)
                // narrowPopup.remove()
            }
        }
    }), "main-slot")
    narrowPopup.update();
}

var addComp = function(event, self){
    // mainPopup.mount()
    // mainPopup.append(thumbs, "main-slot")
    // mainPopup.update();
    showAddMenu(event, self)
}
var addCompLeft = function(event, self){
    // mainPopup.mount()
    // mainPopup.append(thumbs, "main-slot")
    // mainPopup.update();
    showAddMenu(event, self, "left")
}

var setGrid = function (self) {
    self.query(".viewGridArea").innerHTML = ""
    self.query(".viewGridAreaDemoLeft").innerHTML = ""
    self.query(".viewGridArea").style.gridTemplateColumns = `repeat(${self.cols}, 1fr)`
    self.query(".viewGridArea").style.gridTemplateRows = `repeat(${self.rows}, 1fr)`
}

var updateView = function (self) {
    setGrid(self)
    if (!self.showSettings) {
        // self.query(".action-grid-save").remove()
        // self.query(".action_grid_add").remove()
        // self.query(".action-grid-add-left").remove()
        // self.query(".viewGridAreaDemoLeft").remove() //this is shown only in settings mode. This part is handeled by the project view view itself in any other case
        // self.query(".action-grid-save").style.display="none"
        // self.query(".action_grid_add").style.display="none"
        // self.query(".action-grid-add-left").style.display="none"
        // self.query(".viewGridAreaDemoLeft").style.display="none" //this is shown only in settings mode. This part is handeled by the project view view itself in any other case
        self.queryAll(".only_settings", e=>e.style.display="none")
        
        renderItems(self)
    } else {
        self.queryAll(".only_settings", e=>e.style.removeProperty('display'))
        renderPlaceholders(self)
        sortable(self, self.query('.viewGridArea'), function (item){
            /* console.log(item); */
        });
    }
}
var toogleSettings = function (event, self) {
    self.showSettings = !self.showSettings
    updateView(self)
}
var toogleHeaders = function (event, self) {
    self.showHeaders = !self.showHeaders
    updateView(self)
}

var gridView = createAdler({
    tag:'eph-grid-view',
    props:{
        currentPageId:undefined,
        currentArea:undefined,
        calledFromInstance:undefined,
        cols:4,
        rows:4,
        schema:[],
        showSettings:false,
        showHeaders: true,
    },
    attributes:[
    ],
    events : [
        ["click", '.action_grid_add', addComp],
        ["click", '.action-grid-save', saveNewLayout],
        ["click", '.action-grid-add-left', addCompLeft],
        ["click", '.action-grid-toggle-edit', toogleSettings],
        ["click", '.action-grid-toggle-headers', toogleHeaders],
    ],
    html:()=>/*html*/`
        <link rel="stylesheet" href="css/bulma.min.css">
        <link rel="stylesheet" href="css/bulma.dark.css">

        <link rel="stylesheet" href="css/main.css">


        <div class="area container is-widescreen">
            <div class="button action-grid-toggle-edit">Reorganize</div>
            <div class="button action-grid-toggle-headers">edit</div>
            <button class="button action_grid_add only_settings">add</button>
            <div class="button action-grid-save only_settings">Save</div>
            <div class="button action-grid-add-left only_settings">Add to Left Panel</div>
            <div class="block"></div>
            <div class="viewGridArea"></div>

            <div class="viewGridAreaDemoLeft only_settings"></div>

        </div>
        
    `,
    onRender:(self) =>{
        updateView(self)
        
    },
    css:`
    .area{
        height: 100%;
    }
    .viewGridArea {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        gap: 10px;
        height: 100%;
    }
    .viewGridArea.isLeft {
        display: grid;
        grid-template-columns: repeat(2, 1fr) !important;
        grid-template-rows: repeat(2, 1fr) !important;
        position: relative;
        top: -25px;
        gap: 10px;
        height: 100%;
    }
    .viewGridAreaDemoLeft{
        display: grid;
        grid-template-columns: repeat(2, 1fr) !important;
        grid-template-rows: repeat(2, 1fr) !important;
        position: relative;
        top: -25px;
        gap: 10px;
    }
    .ghost {
        opacity:0.75;
        transform: rotate(-1deg) scale(0.9);
    }
    .scale_h {
        position: absolute;
        top: 20px;
        right:10px;
    }
    .scale_h div {
        background-color: #09938d;
        display: inline-block;
        width: 20px;
        height: 24px;
        text-align: center;
        text-anchor: middle;
        color:white;
        border-radius: 7px;
        cursor:pointer;
    }
    .scale_v {
        position: absolute;
        bottom: 0px;
        right:10px;
    }
    .scale_h div {
        background-color: #09938d;
        display: inline-block;
        width: 20px;
        height: 24px;
        text-align: center;
        text-anchor: middle;
        color:white;
        border-radius: 7px;
        cursor:pointer;
    }
    .adler_grid_comp_area{
        position:relative;
    }
    .viewGridAreaDemoLeft {
        position: absolute;
        height: 50%;
        background-color: rgba(166, 166, 166, 0.04);
        width: 25%;
        top: 64px;
        left: -26%;
      }
    .viewGridElementWithHeader {
        border-style: solid;
        border-color: #8a8a8a29;
        border-radius: 7px;
    }
    `,
})

export default gridView