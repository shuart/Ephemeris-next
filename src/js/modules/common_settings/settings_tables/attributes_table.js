import createEntityManagement from "../../common_project_management/entity_management.js";
import projectManagement from "../../common_project_management/project_management.js";
import iconSelect from "../../common_ui_components/icon_picker/iconPicker.js"
import state_manager from "../../common_state/state_manager.js"
import createDialogue from "../../common_select_dialogue/common_dialogue.js";
import { showEntitiesSelector } from "../../common_selectors/entities_selector.js";
import createPropertyManagement from "../../common_project_management/properties_management.js";



var changeAssignedItems = function (attributeId, toAdd, toRemove) {
    var entitiesRepo =createEntityManagement()
    var entities = entitiesRepo.getAll()
    console.log(attributeId,toAdd,toRemove);
    for (let i = 0; i < entities.length; i++) {
        for (let j = 0; j < toAdd.length; j++) {
            if (entities[i].uuid == toAdd[j]) {
                entities[i].assignProperty( attributeId )
            }
        }
        for (let j = 0; j < toRemove.length; j++) {
            if (entities[i].uuid == toRemove[j]) {
                entities[i].unassignProperty( attributeId )
            }
        }
    }
}


export function createAttributeSettingsTable (projectId) {

    var entitiesRepo =createEntityManagement()
    var entities = entitiesRepo.getAll()

    var propRepo = createPropertyManagement()
    var list = propRepo.getAll()

    for (let i = 0; i < list.length; i++) {
        const attribute = list[i];
        attribute.assignedTo=[]
        for (let j = 0; j < entities.length; j++) {
            const entity = entities[j];
            console.log(entity);
            console.log(attribute);
            if (entity.attributes['prop_'+attribute.uuid]) {
                attribute.assignedTo.push(entity)
            }
        }
    }
    console.log(list);


    var cols = [
        // {title:"id", field:"uuid", },
        {customIcon:true, field:"iconPath", defaultPath:"book.svg",callback:(e,cell)=>{ 
            iconSelect({
                callback:e=>{console.log(cell.getData()); console.log(e);projectManagement.getProjectStore(projectId,"properties").add({uuid:cell.getRow().getData().uuid, iconPath:e.value.name})}
                })  
            }  
        },
        {title:"Name", field:"name", cellClick:(e,cell)=>{
                var newName = prompt("Set Name") 
                if (newName) {
                    cell.getData().setName(newName)
                }
            } 
        }, 
        {title:"Assigned To", customObjects:true, field:"assignedTo", 
            cellClick:(e,cell)=>showEntitiesSelector({
                selected : cell.getData()["assignedTo"].map(d=>d.uuid),
                onChange: (e,f)=> changeAssignedItems(cell.getData().uuid, f.added, f.removed)
            }),
            callback :(id)=>state_manager.goTo("/:/settings/details/entities/"+id)
        },  //"/:project/settings/views/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}
        // {formatter:e=>"x", width:40, hozAlign:"center", cellClick:function(e, cell){projectManagement.getProjectStore(projectId,data.modelElementType).remove(cell.getRow().getData().uuid)}},
        // {customButton: {value:"Icon", onClick:function(e, cell){
        //     iconSelect({
        //         callback:e=>{console.log(cell.getData()); console.log(e);projectManagement.getProjectStore(projectId,data.modelElementType).add({uuid:cell.getRow().getData().uuid, iconPath:e.value.name})}
        //         })  
        //     } } 
        // },
        
        // {customSwitch: {onClick:function(e, cell){projectManagement.getProjectStore(projectId,"properties").add({uuid:cell.getRow().getData().uuid, isVisible:e.value.checked})}}, field:"isVisible"  },
        {customButton: {value:"X", style:"smallCircle", onClick:function(e, cell){if(confirm("Delete?"))projectManagement.getProjectStore(projectId,"properties").remove(cell.getRow().getData().uuid)} } },
        
    ];
    return {list, cols}
}
    