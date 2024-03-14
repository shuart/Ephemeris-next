import createAdler from "../../vendor/adlerLegacy.js";
import mainPopup from "../../modules/common_ui_components/mainPopup/mainPopup.js"
import select from "../../modules/common_ui_components/select/select.js"
import createStellae from "../../vendor/stellae/stellae.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import createRelationManagement from "../common_project_management/relations_management.js";
import createPropertyManagement from "../common_project_management/properties_management.js";



var showPopup = function (event, data, instance) {
    var mainPopupNarrow = mainPopup.with({data:{narrow:false,title:"Select Items"}})
        // mainPopupNarrow.mount()
        var currentList = data.list
        var selected =data.selected
        var generateList = function () {
            return currentList
        }
        var generateSelectedList = function () {
            return currentList.filter(i=>selected[i.uuid])
        }

        // mainPopupNarrow.append(selectInstance, "main-slot")
        mainPopupNarrow.mount();
        var graphDomElement = document.createElement("div")
        graphDomElement.style.height = "500px";
        graphDomElement.style.width = "100%"
        var graphSaveElement = document.createElement("div")
        graphSaveElement.style.height = "50px";
        graphSaveElement.style.width = "100%"
        graphSaveElement.innerHTML = "save"
        mainPopupNarrow.query(".container").append(graphDomElement)
        mainPopupNarrow.query(".container").append(graphSaveElement)

        setTimeout(() => {
            // var element= instance.query('.graph')
            graphDomElement.innerHTML = ''//TODO GRAPH IS LOADED 2 TIMES. PREVENT THAT
            var customNewNodeList = function(data){
                return [
                    {id:"in_out", value:"Entity", params:{ nodeLayout:"round",uuid:nanoid(), userData:{type:"entity"}, name:"Entity", headerColor:"#069c95", imgPath:'img/iconsPNG/box.svg'}},
                    {id:"in_out", value:"Property", params:{ nodeLayout:"round",uuid:nanoid(), userData:{type:"property"}, name:"Property", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'}},
                    {id:"in_out", value:"Group", params:{ nodeLayout:"group",uuid:nanoid(), userData:{type:"group"}, name:"Group", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'}},
                ]
            }
            data.graph = createStellae({
                container:graphDomElement, 
                fullSize:true,
                simulateForces:true, 
                uiCallbacks:undefined,
                autoDeselect:false,
                showNodeList: false,
                showSearchBox: true,
                highlightConnections: false,
                addNodesFromCustomList: customNewNodeList,
                allowCustomNameForNodes:true,
                allowCustomNameForRelations:true,
            })
        
            // var repo = createEvaluatorsManagement()
            var repoEntities = createEntityManagement()
            var repoRelations = createRelationManagement()
            // var repoEntities = createEntityManagement()
            var currentNodeLayout = undefined
            // data.graph.getNodeManager().useTemplate(evaluatorTemplates)
            var entities = repoEntities.getAll()
            var relations = repoRelations.getAll()
            for (let i = 0; i < entities.length; i++) {
                const element = entities[i];
                var currentPosition = undefined
                if (currentNodeLayout && currentNodeLayout.nodes.find(n=> n.params.uuid == element.uuid)) {
                    currentPosition = currentNodeLayout.nodes.find(n=> n.params.uuid == element.uuid).params.position
                }
                // data.graph.getNodeManager().addNode(element)
                data.graph.getNodeManager().addNode("in_out", { nodeLayout:"round",uuid:element.uuid, position: currentPosition||undefined, userData:{type:"entity"}, name:element.name, headerColor:element.attributes.color, imgPath:'img/icons/'+element.attributes.iconPath})
            }
            //unpack properties //TODO see how to deak with props
            // debugger
            // var repoProperties = createPropertyManagement()
            // var properties = repoProperties.getAll()
            // var propertyToEntityRelations = []
            // for (let i = 0; i < properties.length; i++) {
            //     const property = properties[i];
            //     // data.graph.getNodeManager().addNode(element)
            //     data.graph.getNodeManager().addNode("in_out", { nodeLayout:"round",uuid:property.uuid,userData:{type:"property"},  name:property.name, headerColor:"#c0bfbc", imgPath:'img/icons/info.svg'})
            //     //unpack properties relations
            //     var relatedEntities = property.getRelatedEntities()
            //     for (let j = 0; j < relatedEntities.length; j++) {
            //         const relatedEntity = relatedEntities[j];
            //         propertyToEntityRelations.push({name:"is property of",userData:{}, dashed:true, from:property.uuid, from_socket:"output", to:relatedEntity.uuid, to_socket:"input"});
            //     }
            // }
    
            // data.graph.getNodeManager().addNode("in_out", { nodeLayout:"group",uuid:"feefsfesfsefsdfsd", name:"group", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'})
            var unpackedRelations = [] //unpack relations in smaller relations for the graph
            for (let i = 0; i < relations.length; i++) {
                const relation = relations[i];
                for (let j = 0; j < relation.fromList.length; j++) {
                    const unpackedSource = relation.fromList[j];
                    for (let k = 0; k < relation.toList.length; k++) {
                        const unpackedTarget = relation.toList[k];
                        unpackedRelations.push({uuid:relation.uuid, name:relation.name, from:unpackedSource.uuid, from_socket:"output", to:unpackedTarget.uuid, to_socket:"input"});
                    }
                }
            }
            
            data.graph.getNodeManager().addLinks(unpackedRelations)
            // data.graph.getNodeManager().addLinks(propertyToEntityRelations) //TODO see how to deak with props

            data.graph.getNodeManager().setSelected(data.selected)
            
            graphSaveElement.addEventListener('click', function () {
                var exported = data.graph.exportSelected()
                console.log(exported);
                data.onChange(exported)
                mainPopupNarrow.unmount()
                // alert("fefsekkmm")
            })
            
        }, 500);
}


var fillElement = function(event, data, instance){
    console.log(instance.query(".start_select"));
    // instance.query(".start_select").innerHTML = data.list.filter(i=>data.selected[i.uuid]).map(i=>i.name).join(",")
    // var content = data.list.filter(i=>data.selected[i.uuid]).map(i=>'<span class="selectTag">'+i.name+'<span data-uuid="'+i.uuid+'" class="selectCloseTag"> | X</span></span>').join('')
    var repoEntities = createEntityManagement()
    var repoRelations = createRelationManagement()
    var entities = repoEntities.getAll()
    var relations = repoRelations.getAll()
    var list = [].concat(entities).concat(relations)
    var nodesToSelect = data.selected.nodes || []
    var arrowsToSelect = data.selected.arrows || []
    var nodesToSelectMap = selectedArrayToObject(nodesToSelect)
    var arrowsToSelectMap = selectedArrayToObject(arrowsToSelect)
    console.log(nodesToSelectMap);
    console.log(arrowsToSelectMap);
    var selectedMap = Object.assign({},nodesToSelectMap, arrowsToSelectMap )
    var content = list.filter(i=>selectedMap[i.uuid]).map(i=>{
            var iconPart =""
            var colorPart =""
            if (i.attributes?.iconPath) {
                iconPart = '<span class=""><img class="selectionareaSelectTagIcon" src="./img/icons/'+i.attributes.iconPath+'"></img></span>'
            }
            if (i.attributes?.color) {
                colorPart = 'background-color:'+i.attributes?.color+";"
            }
            return'<span class="selectionareaSelectTag" style="' +colorPart+ '">' +iconPart+ ' ' +i.name+ '</span>'
        }).join('')
    if (content !="") {
        instance.query(".start_select").innerHTML = content
    }
    if (!data.label) {
        instance.query(".label").style.display ="none"
    }
    
 
}

var selectedArrayToObject = function (selectedArray) {
    var obj = {}
    console.log(selectedArray);
    for (let i = 0; i < selectedArray.length; i++) {
        obj[ selectedArray[i].uuid || selectedArray[i]  ] =true; //works if an object or an id
    }
    return obj
}

var input_graph =createAdler({
    content: p => /*html*/`
        <div class="input_selection_container field">
            <label class="label">${p.label}</label>
            <div class="start_select ephSelectionarea">${p.value}</div>
        </div>
        
        `,
    params:{
        data:{
            value:"Nothing Selected",
            label:undefined,
            list: [{name:"test", uuid:"1"},{name:"tessqdqsdsqt", uuid:"2"}],
            selected:[],
            multipleSelection:false,
            onChange:(e)=>console.log(e),
            onClick:showPopup
        },
        on:[
            [".start_select","click", (event, data, instance)=> data.onClick(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            onMount:(event, data, instance) => fillElement(event, data, instance),
            
        },
    },
    css:/*css*/`
    .ephSelectionarea{
        background-color: #fff;
        border-color: #363636;
        color: #363636;
        box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.1);
        padding: 15px;
        border-radius:8px;
    }
    .selectionareaSelectTag {
        color: #ffffff;
        align-items: center;
        background-color: #f5f5f5;
        border-radius: .375em;
        display: inline-flex;
        font-size: .75rem;
        height: 2em;
        justify-content: center;
        line-height: 1.5;
        padding-left: .75em;
        padding-right: .75em;
        white-space: nowrap;
        background-color: #00d1b2;
        margin-right:5px;
        font-weight: bold;
    }
    .selectionareaSelectTagIcon{
        filter: invert(100%);
        height:17px;
        margin-right:5px;
    }
    @media (prefers-color-scheme: dark) {
        .ephSelectionarea{
            background-color: #262626;
            border-color: #363636;
            color: #dbdbdb;
            box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
        }
        .selectionareaSelectTag {
            color: #000000;
        }
        .selectionareaSelectTagIcon{
            filter: invert(0%);
        }
        
    }
    
    `,
})

export default input_graph