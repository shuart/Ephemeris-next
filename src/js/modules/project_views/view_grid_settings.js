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
import writingBoardViewport from "../viewports/writing_board_viewport/writing_board_viewport.js";


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
    writingBoard:writingBoardViewport
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
        var view = renderItem(self, comp)
        if (view) {
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
            if (comp.area !="left") {
                self.query('.viewGridArea').append(domElement)
            }else{
                self.query('.viewGridAreaLeft').append(domElement)
                self.query('.viewGridAreaLeft').style.display="grid"
                // self.query('.viewGridArea').classList.add("hasLeft")
                self.query('.grid-main-area').classList.add("hasLeft")
            }
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
                // alert("fesfsefes")
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
                self.query('.viewGridAreaLeft').append(view)
                self.query('.viewGridAreaLeft').style.display="grid"
                // self.query('.viewGridArea').classList.add("hasLeft")
                self.query('.grid-main-area').classList.add("hasLeft")
            }else{
                self.query('.viewGridArea').append(view)
                self.query('.viewGridArea').classList.add("hasGuides")
                
            }
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
    let childArrayLeft = [ ...self.query('.viewGridAreaLeft').children ]
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
                {uuid:"writingBoard", name:"Writing Board", iconPath:"text.svg",},
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
    showAddMenu(event, self)
}

var setGrid = function (self) {
    self.query(".grid_title_area").innerHTML = self.currentPageName
    self.query(".grid_title_icon_area").innerHTML = `<img class="darkModeCompatibleIcons" src="./img/icons/${self.currentPageIcon || "monitor.svg"}">`
    self.query(".viewGridArea").innerHTML = ""
    self.query(".viewGridArea").classList.remove("hasGuides")
    self.query(".viewGridAreaLeft").innerHTML = ""
    self.query(".viewGridAreaLeft").style.display = "none"
    self.query(".viewGridArea").style.gridTemplateColumns = `repeat(${self.cols}, 1fr)`
    self.query(".viewGridArea").style.gridTemplateRows = `repeat(${self.rows}, 1fr)`
}

var updateView = function (self) {
    setGrid(self)
    if (!self.showSettings) {
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
        currentPageName:undefined,
        currentPageIcon:undefined,
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
        ["click", '.action-grid-toggle-edit', toogleSettings],
        ["click", '.action-grid-toggle-headers', toogleHeaders],
    ],
    html:()=>/*html*/`
        <link rel="stylesheet" href="css/bulma.min.css">
        <link rel="stylesheet" href="css/bulma.dark.css">

        <link rel="stylesheet" href="css/main.css">


        <div class="area">
            <div class="area grid-main-area ">
                <div class="grid_title_icon_area"></div>
                <div class="grid_title_area"></div>
                <div class="grid_menu_area">
                    <div class="grid_menu_button action-grid-toggle-edit"><img class="darkModeCompatibleIcons" src="./img/icons/gallery-horizontal.svg">Reorganize</div>
                    <div class="grid_menu_button action-grid-toggle-headers"><img class="darkModeCompatibleIcons" src="./img/icons/settings-2.svg">Edit</div>
                    <button class="button action_grid_add only_settings">add</button>
                    <div class="button action-grid-save only_settings">Save</div>
                </div>
                
                <div class="viewGridArea"></div>
                

             </div>
             <div class="viewGridAreaLeft"></div>
        </div>
        
    `,
    onRender:(self) =>{
        updateView(self)
        
    },//TODO remove the stellae CSS and add stellae to custom element
    css:`
    .area{
        height: 100%;
    }
    .grid_title_area{
        position: absolute;
        font-size: 18px;
        font-weight: bold;
        opacity: 0.7;
        left:71px;
        top:5px;
    }
    .grid_title_icon_area{
        position: absolute;
        opacity: 0.7;
        top:5px;
    }
    .switch-area{
        cursor: pointer;
        font-size: 13px;
        position: absolute;
        background-color: #09938d;
        padding: 3px;
        border-radius: 5px;
        top: -14px;
        left: 16px;
    }
    .grid_menu_area{
        justify-content: right;
        display: flex;
        opacity:0.6;
    }
    .grid_menu_button{
        padding: 8px 4px 2px 6px;
        display: inline-block;
        cursor:pointer;
        font-size: 13px;
    }
    .grid_menu_button img{
        height:20px;
        margin-right: 4px;
    }
    .viewGridArea {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        gap: 10px;
        height: calc(100% - 45px);
        margin-top: 12px;
    }
    .viewGridArea.hasGuides {
        background-repeat:no-repeat; 
        background-color: #2196F3;
        background: linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)) calc(1*(100% - 20px) / 4 + 10px) 10px / 2px calc(100% - 20px), 
        linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)) calc(2*((100% - 20px) / 4) + 10px) 10px / 2px calc(100% - 20px), 
        linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)) calc(3*((100% - 20px) / 4) + 10px) 10px / 2px calc(100% - 20px), 

        linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)) 10px calc(100% / 4 * 1 ) /calc(100% - 20px) 2px,
        linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)) 10px calc(100% / 4 * 2 ) /calc(100% - 20px) 2px,
        linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)) 10px calc(100% / 4 *3  ) /calc(100% - 20px) 2px,
        linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)) 10px calc(100% - 10px) /calc(100% - 20px) 2px;
        padding: 10px;
        background-repeat: no-repeat;
        background-color: rgba(223, 223, 223, 0.07);
    }
    .viewGridArea.hasLeft {
        width: calc(100% - 220px);
        position: relative;
        left: 110px;
    }
    .grid-main-area{
        max-width: 1500px;
        padding-left: 40px;
        padding-right: 40px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
    }
    .grid-main-area.hasLeft{
        width: calc(100% - 220px);
        position: relative;
        left: 110px;
    }
    .viewGridAreaLeft{
        height: 100%;
        width: 220px;
        position: absolute;
        top: 0px;
        display:none;
        grid-template-columns: repeat(2, 1fr) !important;
        grid-template-rows: repeat(2, 1fr) !important;
    }
    .ghost {
        opacity:0.75;
        transform: rotate(-1deg) scale(0.9);
    }
    .scale_h {
        position: absolute;
        top: 20px;
        right: 10px;
        background-color: #09938d;
        border-radius: 4px;
        padding-left: 2px;
        padding-right: 2px;
        padding-bottom: 2px;
    }
    .scale_h div {
        display: inline-block;
        width: 20px;
        height: 24px;
        text-align: center;
        text-anchor: middle;
        color:white;
        cursor:pointer;
    }
    .scale_v {
        position: absolute;
        bottom: 0px;
        right:10px;
        background-color: #09938d;
        border-radius: 4px;
        padding-left: 2px;
        padding-right: 2px;
        margin-bottom: 12px;
    }
    .scale_v div {
        width: 20px;
        height: 24px;
        text-align: center;
        text-anchor: middle;
        color:white;
        cursor:pointer;
    }
    .adler_grid_comp_area{
        position:relative;
    }
    .viewGridElementWithHeader {
        border-style: none;
        border-color: #8a8a8a29;
        border-radius: 7px;

        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.02);
        color: #4a4a4a;
        display: block;
        padding: 0.50rem;
        overflow: auto;
    }
    @media (prefers-color-scheme: dark) {
        .viewGridElementWithHeader {
          background-color: #1b1b1b;
          box-shadow: 0 2px 3px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1);
          color: #b5b5b5;
          box-shadow: rgba(0, 0, 0, 0.81) 0px 8px 8px, rgb(0, 0, 0) 0px 0px 0px 1px;
        }



    

    }
    .stellae_inj_css_search{
        background-color: rgb(244, 244, 244);
        height: 25px ;
        width: 222px;
        position: absolute ;
        top: 50px;
        right: 10px;
        opacity:0.8;
        color: black;
        overflow: hidden;
        border-radius: 10px;
    }
    .stellae_inj_css_search input{
        outline: none;
    }
    .stellae_inj_css_side_list {
        height: 100%;
        width: 200px;
        background-color: #e6e6e675;
        position: absolute;
        overflow: auto;
        backdrop-filter: blur(5px);
        padding: 9px;
    }
    .stellae_inj_css_side_list_item{
        padding: 5px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e2e3e3;
    }
    .stellae_inj_css_side_search{
        width: 100%;
        margin-top: 12px;
        border-radius: 11px;
        border-style: none;
        padding: 8px;
        outline: none;
    }

    .stellae_inj_css_toolbar {
        width: 40px;
        height: 50%;
        position: absolute;
        background-color: #ffffffed;
        right: 20px;
        top: 153px;
        border-radius: 8px;
        box-shadow: 0px 0px 5px #cecece;
        backdrop-filter: blur(5px);
        overflow:hidden;
    }
    .stellae_inj_css_side_toolbar_button_item {
        height: 45px;
        width: 100%;
        overflow: hidden;
        height: 45px;
        
        cursor:pointer;
    }
    .stellae_inj_css_side_toolbar_button_item svg {
        margin-top: 11px;
        margin-left: 8px;
    }
    .stellae_inj_css_side_toolbar_button_item:hover{
        background-color: #f2f2f2;
    }



    @media (prefers-color-scheme: dark) {
        .stellae_inj_css_search{
            background-color: #414142;
        }
        .stellae_inj_css_search{
            background-color: #414142;
            color:white;
        }
        .stellae_inj_css_search input{
            color:white;
        }
        .stellae_inj_css_side_list {
            background-color: #2b2a2a75;
        }
        .stellae_inj_css_side_list_item{
            color:white;
            border-bottom-color: #333;
        }
        .stellae_inj_css_side_search{
            background-color: #414142;
            color:white;
        }
        .stellae_inj_css_toolbar {
            background-color: #222;
            box-shadow: 0px 0px 5px #4f4f4f;
            
        }
        .stellae_inj_css_side_toolbar_button_item {
            color:white;
        }
        .stellae_inj_css_side_toolbar_button_item:hover{
            background-color: black;
        }
        
    }
    `,
})

export default gridView