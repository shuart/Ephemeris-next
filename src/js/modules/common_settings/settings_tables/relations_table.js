import createRelationManagement from "../../common_project_management/relations_management.js";
import mainPopup from "../../common_ui_components/mainPopup/mainPopup.js"
import select from "../../common_ui_components/select/select.js"
import iconSelect from "../../common_ui_components/icon_picker/iconPicker.js"
import createEntityManagement from "../../common_project_management/entity_management.js";
import projectManagement from "../../common_project_management/project_management.js";



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
        {title:"Name", field:"name", },
        {title:"From", field:"fromList", customObjects:true, cellClick:function(e, cell){
            var entityRepo = createEntityManagement()
            mainPopup.mount()
            mainPopup.append(select.instance({
                data:{
                    list:entityRepo.getAll(),
                    callback:function(event){ cell.getData().addSource(event.value.uuid) }
                }
            }), "main-slot")
            mainPopup.update();
        }, },
        {title:"To", field:"toList", customObjects:true, cellClick:function(e, cell){
            var entityRepo = createEntityManagement()
            mainPopup.mount()
            mainPopup.append(select.instance({
                data:{
                    list:entityRepo.getAll(),
                    callback:function(event){ cell.getData().addTarget(event.value.uuid) }
                }
            }), "main-slot")
            mainPopup.update();
        },},
    ];
    return {list, cols}
}