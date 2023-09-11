import createRelationManagement from "../../common_project_management/relations_management.js";
import mainPopup from "../../common_ui_components/mainPopup/mainPopup.js"
import select from "../../common_ui_components/select/select.js"
import iconSelect from "../../common_ui_components/icon_picker/iconPicker.js"
import createEntityManagement from "../../common_project_management/entity_management.js";
import projectManagement from "../../common_project_management/project_management.js";
import { showEntitiesSelector } from "../../common_selectors/entities_selector.js";

import state_manager from "../../common_state/state_manager.js"


var changeAssignedItems = function (relationId,direction, toAdd, toRemove) {
    var relationRepo =createRelationManagement()
    var relation = relationRepo.getById(relationId)
    console.log(relationId,direction,toAdd,toRemove);
    
    
    for (let j = 0; j < toAdd.length; j++) {
        if (direction == "source") {
            relation.addSource(toAdd[j]) 
        }else{
            relation.addTarget(toAdd[j]) 
        }
        
    }
    for (let j = 0; j < toRemove.length; j++) {
        if (direction == "source") {
            relation.removeSource(toRemove[j]) 
        }else{
            relation.removeTarget(toRemove[j]) 
        }
    }
    
}

export function createRelationsSettingsTable (projectId) {

    var relationManagement = createRelationManagement()
    var list = relationManagement.getAll()
    // list.forEach(element => {
    //     console.log(element);
    //     if (element.fromList) {
            
    //         // element.fromList = element.fromList.map(i=>i.name).join(',')
    //         console.log(element.fromList);
    //     }
    //     if (element.toList) {
            
    //         // element.toList = element.toList.map(i=>i.name).join(',')
    //         console.log(element.toList);
    //     }
        
    // });
    
    var cols = [
        {title:"Name", field:"name", cellClick:(e,cell)=>{
                var newName = prompt("Set Name") 
                if (newName) {
                    cell.getData().setName(newName)
                }
            } 
        }, 
        {title:"From", field:"fromList", customObjects:true,
            cellClick:(e,cell)=>showEntitiesSelector({
                selected : cell.getData()["fromList"].map(d=>d.uuid),
                onChange: (e,f)=> changeAssignedItems(cell.getData().uuid,"source", f.added, f.removed )
            }),
            callback :(id)=>state_manager.goTo("/:/settings/details/entities/"+id)
        },
        // {title:"From", field:"fromList", customObjects:true, cellClick:function(e, cell){
        //     var entityRepo = createEntityManagement()
        //     mainPopup.mount()
        //     mainPopup.append(select.instance({
        //         data:{
        //             list:entityRepo.getAll(),
        //             // callback:function(event){ cell.getData().addSource(event.value.uuid) }
        //             callback:function(event,f){ changeAssignedItems(cell.getData().uuid,"source", f.added, f.removed )}
        //         }
        //     }), "main-slot")
        //     mainPopup.update();
        // }, },
        {title:"To", field:"toList", customObjects:true,
            cellClick:(e,cell)=>showEntitiesSelector({
                selected : cell.getData()["toList"].map(d=>d.uuid),
                onChange: (e,f)=> changeAssignedItems(cell.getData().uuid,"target", f.added, f.removed )
            }),
            callback :(id)=>state_manager.goTo("/:/settings/details/entities/"+id)
        },
        {customButton: {value:"X", onClick:function(e, cell){if(confirm("Delete?"))projectManagement.getProjectStore(projectId,"relations").remove(cell.getRow().getData().uuid)} } },
        // {title:"To", field:"toList", customObjects:true, cellClick:function(e, cell){
        //     var entityRepo = createEntityManagement()
        //     mainPopup.mount()
        //     mainPopup.append(select.instance({
        //         data:{
        //             list:entityRepo.getAll(),
        //             callback:function(event){ cell.getData().addTarget(event.value.uuid) }
        //         }
        //     }), "main-slot")
        //     mainPopup.update();
        // },},
    ];
    return {list, cols}
}