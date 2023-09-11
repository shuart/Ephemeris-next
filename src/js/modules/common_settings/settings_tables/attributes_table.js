import createEntityManagement from "../../common_project_management/entity_management.js";
import projectManagement from "../../common_project_management/project_management.js";
import iconSelect from "../../common_ui_components/icon_picker/iconPicker.js"
import state_manager from "../../common_state/state_manager.js"

export function createAttributeSettingsTable (projectId) {

    var entitiesRepo =createEntityManagement()
    var entities = entitiesRepo.getAll()

    var list = projectManagement.getProjectStore(projectId,"properties").getAll()

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
        {title:"Name", field:"name", cellClick:(e,cell)=>state_manager.goTo("/:/settings/"+instance.props.modelElementType.get()+"/"+cell.getData().uuid) },  //"/:project/settings/views/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}
        {title:"Assigned To", customObjects:true, field:"assignedTo", cellClick:(e,cell)=>state_manager.goTo("/:/settings/"+instance.props.modelElementType.get()+"/"+cell.getData().uuid),
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
        {customButton: {value:"X", onClick:function(e, cell){projectManagement.getProjectStore(projectId,"properties").remove(cell.getRow().getData().uuid)} } },
        
    ];
    return {list, cols}
}
    