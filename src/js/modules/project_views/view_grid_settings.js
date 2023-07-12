import createAdler from "../../vendor/adlerLegacy.js";
import nanoid from "../../vendor/nanoid.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"
import projectManagement from "../common_project_management/project_management.js";
import createEvaluatorsManagement from "../common_project_management/evaluators_management.js";
import thumbs from "./view_grid_settings_select_comp.js"
import table_viewport from "../viewports/table_viewport/table_ui.js"
import graph_viewport from "../viewports/graph_viewport/graph_ui.js"
import cardViewport from "../viewports/card_viewport/card_viewport.js";
import textEditorViewport from "../viewports/text_editor_viewport/text_editor_viewport.js";
import state from "../common_state/state_manager.js";
import propertiesViewport from "../viewports/properties_viewport/properties_viewport.js";

var softUpdate= function (event, data, instance) {

}

var mountModules = function (event, data, instance) {
    var schema = instance.props.schema.get()
    console.log(schema);
    for (let i = 0; i < schema.length; i++) {
        const row = schema[i];
        console.log(row);
        for (let j = 0; j < row.cols.length; j++) {
            const col = row.cols[j];
            for (let k = 0; k < col.components.length; k++) {
                const comp = col.components[k];
                console.log(comp);
                if (comp.componentType == "table" || comp.componentType == "undefined") {
                    instance.append(table_viewport.instance({
                        props:{
                            settings:{evaluatorId:comp.settings.evaluatorUuid, calledFromInstance:instance.props.get('calledFromInstance')},
                        }
                    },), `view_mount_point_${i}_${j}_${k}`);
                } else if(comp.componentType == "graph"){
                    instance.append(graph_viewport.instance({
                        props:{
                            settings:{evaluatorId:comp.settings.evaluatorUuid, calledFromInstance:instance.props.get('calledFromInstance')},
                        }
                    },), `view_mount_point_${i}_${j}_${k}`);
                } else if(comp.componentType == "instanceCard"){
                    instance.append(cardViewport.instance({
                        props:{
                            settings:{evaluatorId:comp.settings.evaluatorUuid, calledFromInstance:instance.props.get('calledFromInstance')},
                        }
                    },), `view_mount_point_${i}_${j}_${k}`);
                }else if(comp.componentType == "propertiesList"){
                    instance.append(propertiesViewport.instance({
                        props:{
                            settings:{evaluatorId:comp.settings.evaluatorUuid, calledFromInstance:instance.props.get('calledFromInstance')},
                        }
                    },), `view_mount_point_${i}_${j}_${k}`);
                }else if(comp.componentType == "textEditor"){
                    instance.append(textEditorViewport.instance({
                        props:{
                            settings:{evaluatorId:comp.settings.evaluatorUuid, calledFromInstance:instance.props.get('calledFromInstance')},
                        }
                    },), `view_mount_point_${i}_${j}_${k}`);
                }
                
            }
        }
    }
}

var renderTable= function ({
    schema=[],
    width = undefined,
    showSettings = false,
    height= "100%",
    uuid = nanoid()
}={}) {
    var settingClass = ""
    var area=""
    if (showSettings) { 
        settingClass="adler_grid_row_settings";
        area = '<div class="adler_grid_row_save button is-primary is-small block">save</div>'
    }
    for (let i = 0; i < schema.length; i++) {
        const rowItem = schema[i];
        area +=`<div class="adler_grid_row ${settingClass}"  >` + renderRow({rowId:i, cols:rowItem.cols, showSettings:showSettings}) +'</div>'
    }
    if (showSettings) { area += '<div class="adler_grid_row_add">+</div>'}
    
    return area
}

var renderRow = function ({
    cols=[],
    rowId = undefined,
    width = undefined,
    showSettings = false,
    height= "100%",
    uuid = nanoid()
}={}) {
    var area = ''
    var settingClass = ""
    if (showSettings) { settingClass="adler_grid_col_settings"}
    for (let i = 0; i < cols.length; i++) {
        const colItem = cols[i];
        area +=`<div class="adler_grid_col ${settingClass}" style="width:${100/cols.length}%">` + renderCol({components:colItem.components, rowId:rowId, colId:i, showSettings:showSettings}) +'</div>'
    }
    if (showSettings) {
        area += `<div data-row-id="${rowId}" class="adler_grid_row_remove">x</div>`
        area += `<div data-row-id="${rowId}" class="adler_grid_col_add">+</div>`
    }
    return area
}
var renderCol = function ({
    components=[],
    rowId = undefined,
    showSettings = false,
    colId= undefined,
    width = undefined,
    height= "100%",
    uuid = nanoid()
}={}) {
    var area = ''
    if (showSettings) {
        for (let i = 0; i < components.length; i++) {
            const compItem = Object.assign({},components[i], {rowId, colId, index:i});
            console.log(compItem);
            area +=renderComp(compItem)
            // area +=`<div a-slot="view_mount_point_${rowId}_${colId}_${i}" data-row-id="${rowId}" data-col-id="${colId}" data-comp-id="${i}"  class="adler_grid_comp_area" >` + renderComp(compItem) +'</div>'
        }
    }else{
        for (let i = 0; i < components.length; i++) {
            const compItem = components[i];
            area +=`<div a-slot="view_mount_point_${rowId}_${colId}_${i}" class="" ></div>`
        }
    }
    
    if (showSettings) { 
        area += `<div data-row-id="${rowId}" data-col-id="${colId}" class="adler_grid_col_remove">x</div>`
        area += `<div data-row-id="${rowId}" data-col-id="${colId}" class="adler_grid_comp_add">+</div>`
    }
    
    return area
}
var renderComp = function ({
    rowId=undefined,
    colId = undefined,
    width = undefined,
    index = undefined,
    height= "100%",
    uuid = undefined,
    componentType ="undefined",
    settings ={evaluatorUuid:undefined},
}={}) {
    var area = componentType
    var areaName = "No Type"
    var areaIcon  = "airplay"
    var evaluatorUuid = settings.evaluatorUuid
    var evaluatorName = " no evaluator"
    if (evaluatorUuid) {
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
    return `
    <div a-slot="view_mount_point_${rowId}_${colId}_${index}" data-row-id="${rowId}" data-col-id="${colId}" data-comp-id="${index}"  class="adler_grid_comp_area" >
        
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
    
}

var setUpSettingsEvent = function (event, data, instance){
    var compPos = [event.target.dataset.rowId,event.target.dataset.colId,event.target.dataset.compId,]
    var projectId = projectManagement.getCurrent().id
    var entities = projectManagement.getProjectStore(projectId,"evaluators").getAll()

    mainPopup.mount()
    mainPopup.append(select.instance({
        data:{
            list:entities,
            callback:function(event){
                var currentSchema = instance.props.schema.get(); 
                // currentSchema[ compPos[0] ].cols[ compPos[1] ].components[ compPos[2] ].settings={entityType:event.value.uuid};
                currentSchema[ compPos[0] ].cols[ compPos[1] ].components[ compPos[2] ].settings={evaluatorUuid:event.value.uuid};
                instance.props.schema.set(currentSchema); instance.update();
            }
        }
    }), "main-slot")
    mainPopup.update();
    



    // alert(JSON.stringify(currentSchema))
    // instance.props.schema.set(currentSchema); instance.update();
}
var goToEvaluator = function(event){
    var evaluator = event.target.dataset.id
    state.goTo("/:/evaluators/"+evaluator)
}

var saveLayout = function(event, data, instance){
    var projectId = projectManagement.getCurrent().id
    // console.log(projectId)
    // var name= prompt("Name")
    if (instance.props.currentPageId.get()) {
        // alert(instance.props.currentPageId.get())
        projectManagement.getProjectStore(projectId,"views").add({uuid:instance.props.currentPageId.get(), layout:JSON.stringify(instance.props.schema.get()) ,theTime:Date.now()})
        console.log(projectManagement.getProjectStore(projectId,"views").getAll())
        // alert()
        // instance.getNodes().table.do.softUpdate()
    }
}

var addRow = function(event, data, instance){
    
    var currentSchema = instance.props.schema.get(); currentSchema.push({ setting:{}, cols:[]});
    instance.props.schema.set(currentSchema); instance.update();
}
var removeRow = function(event, data, instance){
    var currentSchema = instance.props.schema.get();
    if (event.target.dataset.rowId > -1) { currentSchema.splice(event.target.dataset.rowId, 1) }
    instance.props.schema.set(currentSchema); instance.update();
}

var addCol = function(event, data, instance){
    var currentSchema = instance.props.schema.get(); currentSchema[event.target.dataset.rowId].cols.push({ setting:{}, components:[]});
    instance.props.schema.set(currentSchema); instance.update();
}
var removeCol = function(event, data, instance){
    var currentSchema = instance.props.schema.get();
    if (event.target.dataset.rowId > -1) { currentSchema[event.target.dataset.rowId].cols.splice(event.target.dataset.colId, 1) }
    instance.props.schema.set(currentSchema); instance.update();
}

var addComp = function(event, data, instance){
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
                var currentSchema = instance.props.schema.get(); currentSchema[event.target.dataset.rowId].cols[event.target.dataset.colId].components.push({ uuid:nanoid(),settings:{}, componentType:result.value.uuid});
                instance.props.schema.set(currentSchema); instance.update();
            }
        }
    }), "main-slot")
    narrowPopup.update();
    
}
var removeComp = function(event, data, instance){
    if (confirm("Delete component?")) {
        var currentSchema = instance.props.schema.get();
    var indexOfComp = currentSchema[event.target.dataset.rowId].cols[event.target.dataset.colId].components.findIndex(c=>c.uuid ==event.target.dataset.id)
    if (indexOfComp > -1) { currentSchema[event.target.dataset.rowId].cols[event.target.dataset.colId].components.splice(indexOfComp, 1) }
    instance.props.schema.set(currentSchema); instance.update();
    }
}

var setUp = function (event, data, instance) {
    // var schema = [
    //     { setting:{}, cols:[
    //         { setting:{}, components:[]},{ setting:{}, components:[]}
    //     ]},
    //     { setting:{}, cols:[
    //         { setting:{}, components:[]},
    //     ]}
    // ]
    var schema = instance.props.schema.get()

    var showSettings = instance.props.get('showSettings')
    var html = '<div class="Component container view_grid_row">' + renderTable({schema:schema, showSettings:showSettings}) +'</div>'
    // alert(html)
    instance.setContent((p)=> html)
    if (!showSettings) {
        mountModules(event, data, instance)
    }
    
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component container view_grid_row">
    GRID
        <div class="adler_grid_row" >
            <div class="adler_grid_col" >
                <div class="adler_grid_comp_add">+</div>
            </div>
            <div class="adler_grid_col" style="width:25%">
                <div class="adler_grid_comp_area">Component name</div>
                <div class="adler_grid_comp_add">+</div>
            </div>
            <div class="adler_grid_col_add">+</div>
        </div>
        <div class="adler_grid_row_add">+</div>
    </div>
        `,
    params:{
        props:{
            currentPageId:false,
            showSettings:false,
            calledFromInstance:false,
            schema:[
                { settings:{}, cols:[
                    { settings:{}, components:[]},{ settings:{}, components:[ { settings:{}, componentType:"test"} ]}
                ]},
                { settings:{}, cols:[
                    { settings:{}, components:[]},
                ]}
            ],
        },
        listen:{
            schema:function (event, data, instance) {
                //alert("schema")
            }
        },
        data:{
            value:"Hello",
            list:[],
            table:undefined,
            moduleMountPoints:[],
            // onClick:()=>console.log("click")
        },
        on:[
            [".adler_grid_row_add","click", addRow ],
            [".adler_grid_row_remove","click", removeRow ],
            [".adler_grid_col_add","click", addCol ],
            [".adler_grid_col_remove","click", removeCol ],
            [".adler_grid_comp_add","click", addComp ],
            [".adler_grid_row_save","click", saveLayout ],
            [".action-view-settings-goto-evaluator","click", goToEvaluator ],
            [".action-view-settings-edit-evaluator","click", setUpSettingsEvent ],
            [".action-view-settings-delete-comp","click", removeComp ],
            
        ],
        events:{
            onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            // onMount:(event, data, instance) => mountModules(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    components:{
        // table_component: table_component
    },
    css:/*css*/`
        .adler_grid_col{
            min-height:100px;
            min-width:50px;
            margin:5px;
            position:relative;
        }
        .adler_grid_col_settings{
            border-style: dashed;
            border-color: #bbb;
            border-radius: 11px;
            padding: 7px;
        }
        .adler_grid_row{
            min-height:100px;
            min-width:50px;
            display: flex; /* or inline-flex */
            margin-bottom: -3px;
            padding: 7px;
        }
        .adler_grid_row_settings{
            border-style: dashed;
            border-color: #646464;
            border-radius: 11px;
        }
        .adler_grid_row_add{
            width: 20px;
            margin: auto;
            font-size: 2em;
            cursor:pointer;
        }
        .adler_grid_row_remove, .adler_grid_col_remove {
            background-color: #fd7d7d61;
            height: 15px;
            width: 15px;
            border-radius: 20px;
            padding: -3px;
            padding-top: -21px;
            text-align: center;
            font-size: 9px;
            color: white;
            position: absolute;
            right: 0px;
            margin: 5px;
            cursor:pointer;
        }
        .adler_grid_col_remove{
            top: -4px;
        }
        .adler_grid_col_add{
            width: 20px;
            margin: auto;
            font-size: 2em;
            cursor:pointer;
        }
        .adler_grid_comp_add{
            width: 20px;
            margin: auto;
            font-size: 2em;
            cursor:pointer;
            position: relative;
            top: 5px;
            width: 50px;
            /* height: 37px; */
            text-align: center;
            border-radius: 9px;
            box-shadow: -1px 3px 5px 0px rgba(38, 38, 38, 0.2);
            font-size: 1.5em;
            border-top-style: solid;
            border-top-width: 3px;
            border-top-left-radius: 1px;
            border-top-right-radius: 1px;
            margin-bottom: 11px;
            margin-top: 12px;
        }
        .adler_grid_comp_area {
            width: 20px;
            margin: auto;
            font-size: 2em;
            cursor: pointer;
            position: relative;
            top: 5px;
            width: 100%;
            min-height: 83px;
            border-radius: 9px;
            box-shadow: -1px 3px 5px 0px rgba(38, 38, 38, 0.2);
            font-size: 1.5em;
            border-top-style: solid;
            border-top-width: 10px;
            border-top-left-radius: 1px;
            border-top-right-radius: 1px;
            border-top-color: #01b3ab;
        
            margin-top: 12px;
            padding: 7px;
        }

        @media (prefers-color-scheme: dark) {
            .view_grid_row{
                color:white;
            }
            .adler_grid_col_settings{
                border-color:#393939;
            }

            .adler_grid_comp_area, .adler_grid_comp_add{
                background-color:#303030;
            }
        }

    
    `,
})

export default component