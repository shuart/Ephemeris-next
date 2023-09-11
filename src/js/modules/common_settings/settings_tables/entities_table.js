import createRelationManagement from "../../common_project_management/relations_management.js";
import mainPopup from "../../common_ui_components/mainPopup/mainPopup.js"
import select from "../../common_ui_components/select/select.js"
import iconSelect from "../../common_ui_components/icon_picker/iconPicker.js"
import createEntityManagement from "../../common_project_management/entity_management.js";
import projectManagement from "../../common_project_management/project_management.js";
import state_manager from "../../common_state/state_manager.js"


export function createEntitiesSettingsTable (projectId, data) {

        // listData.list = projectManagement.getProjectStore(projectId,data.modelElementType).getAll()
        var entityRepo = createEntityManagement()
        var list = entityRepo.getAll()
        //Create extra fields
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            element.defaultView = element.getDefaultView()
            element.color = element.attributes.color
            element.iconPath = element.attributes.iconPath
        } 
        
        var cols = [
            // {title:"id", field:"uuid", },
            
            {customIcon:true, field:"iconPath",defaultPath:"box.svg", callback:(e,cell)=>{ 
                iconSelect({
                    callback:e=>{projectManagement.getProjectStore(projectId,data.modelElementType).add({uuid:cell.getRow().getData().uuid, iconPath:e.value.name})}
                    })  
                }  
            },
            {title:"Name", field:"name", cellClick:(e,cell)=>state_manager.goTo("/:/settings/details/"+data.modelElementType+"/"+cell.getData().uuid), }, //"/:project/settings/details/:entity/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}
            {customColor:true, field:"color", callback:(e,cell)=>{ projectManagement.getProjectStore(projectId,data.modelElementType).add({uuid:cell.getRow().getData().uuid, color:e.value.color}) }},
            {customObject:true, title:"default view", field:"defaultView", callback:(e,cell)=>{  }, cellClick:function(e, cell){
                var viewRepo = projectManagement.getProjectStore(projectId,"views").getAll()
                mainPopup.mount()
                mainPopup.append(select.instance({
                    data:{
                        list:viewRepo,
                        callback:function(event){ cell.getData().setDefaultViewId(event.value.uuid) }
                    }
                }), "main-slot")
                mainPopup.update();
            }},
        ];
    return {list, cols}
}