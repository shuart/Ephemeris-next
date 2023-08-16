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
    for (let i = 0; i < components.length; i++) {
        const comp = components[i];
        var instanceType = availableViewports[comp.componentType]
        var evaluatorId = comp.settings?.evaluatorUuid || comp.evaluatorUuid
        if (evaluatorId == "undefined") {
            evaluatorId = undefined //TODO, solve this issue. It's caused by the stringification of the dataset of the placeholder
        }
        var view = instanceType.instance({
            props:{
                settings:{evaluatorId:evaluatorId, calledFromInstance:self.calledFromInstance},
            }
        })
        if (view) {
            var domElement = document.createElement("div")
            // domElement.id = "comp"+index
            var vsize = comp.vsize || 2
            var hsize = comp.hsize || 2
            domElement.style.gridArea =  `span ${vsize}/span ${hsize}`
            view.mount(domElement)
            // view.mount(self.query('.viewGridArea'))
            self.query('.viewGridArea').append(domElement)
        }
    }
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
        const compItem = Object.assign({},comp, {index:i, parent:self, deleteCallback:()=>updateSchema(self), });
        var view = renderPlaceholder(compItem)
        if (view) {
            self.query('.viewGridArea').append(view)
        }
    }
}

var getSchemaFromGrid = function (self) {
    var newSchema = []
    let childArray = [ ...self.query('.viewGridArea').children ]
    childArray.forEach(function (item) {
        var itemDef= JSON.parse(JSON.stringify(item.dataset));
        newSchema.push(itemDef)
    })
    return newSchema
}

var saveNewLayout = function (event,self) {
    var newSchema = getSchemaFromGrid(self)
    var projectId = projectManagement.getCurrent().id
    if (self.currentPageId) {
        projectManagement.getProjectStore(projectId,"views").add({uuid:self.currentPageId, layout:JSON.stringify(newSchema) ,theTime:Date.now()})
        console.log(projectManagement.getProjectStore(projectId,"views").getAll())
    }
}

var addComp = function(event, self){
    // mainPopup.mount()
    // mainPopup.append(thumbs, "main-slot")
    // mainPopup.update();
    var narrowPopup = mainPopup.instance({data:{narrow:true}})
    narrowPopup.mount()
    narrowPopup.append(select.instance({
        data:{
            list:[
                {uuid:"table", name:"Table", iconPath:"table.svg",},
                {uuid:"graph", name:"Graph", iconPath:"git-merge.svg",},
                {uuid:"instanceCard", name:"Instance Card", iconPath:"credit-card.svg",},
                {uuid:"propertiesList", name:"Properties List", iconPath:"credit-card.svg",},
                {uuid:"textEditor", name:"Text Editor", iconPath:"credit-card.svg",},
            ],
            callback:function(result){
                var newSchema = getSchemaFromGrid(self)
                newSchema.push({uuid:nanoid(), componentType:result.value.uuid})
                self.schema = newSchema
                console.log(newSchema);
                updateView(self)
                // narrowPopup.remove()
            }
        }
    }), "main-slot")
    narrowPopup.update();
    
}

var setGrid = function (self) {
    self.query(".viewGridArea").innerHTML = ""
    self.query(".viewGridArea").style.gridTemplateColumns = `repeat(${self.cols}, 1fr)`
    self.query(".viewGridArea").style.gridTemplateRows = `repeat(${self.rows}, 1fr)`
}

var updateView = function (self) {
    setGrid(self)
    if (!self.showSettings) {
        self.query(".action-grid-save").remove()
        self.query(".action_grid_add").remove()
        renderItems(self)
    } else {
        renderPlaceholders(self)
        sortable(self, self.query('.viewGridArea'), function (item){
            /* console.log(item); */
        });
    }
}

var gridView = createAdler({
    tag:'eph-grid-view',
    props:{
        currentPageId:undefined,
        calledFromInstance:undefined,
        cols:4,
        rows:4,
        schema:[],
        showSettings:false,
    },
    attributes:[
    ],
    events : [
        ["click", '.action_grid_add', addComp],
        ["click", '.action-grid-save', saveNewLayout],
    ],
    html:()=>/*html*/`
        <link rel="stylesheet" href="css/bulma.min.css">
        <link rel="stylesheet" href="css/bulma.dark.css">

        <link rel="stylesheet" href="css/main.css">


        <div class="area container is-widescreen">
            <button class="button action_grid_add">add</button>
          <div class="button action-grid-save">Save</div>
          <div class="block"></div>
            <div class="viewGridArea"></div>
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
    `,
})

export default gridView