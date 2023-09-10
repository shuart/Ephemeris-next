import projectManagement from "../../common_project_management/project_management.js";
import iconSelect from "../../common_ui_components/icon_picker/iconPicker.js"


export function createAttributeSettingsTable (projectId) {

    var list = projectManagement.getProjectStore(projectId,"properties").getAll()
    var cols = [
        // {title:"id", field:"uuid", },
        {customIcon:true, field:"iconPath", defaultPath:"book.svg",callback:(e,cell)=>{ 
            iconSelect({
                callback:e=>{console.log(cell.getData()); console.log(e);projectManagement.getProjectStore(projectId,"properties").add({uuid:cell.getRow().getData().uuid, iconPath:e.value.name})}
                })  
            }  
        },
        {title:"Name", field:"name", cellClick:(e,cell)=>state_manager.goTo("/:/settings/"+instance.props.modelElementType.get()+"/"+cell.getData().uuid) },  //"/:project/settings/views/:entityId" state_manager.goTo({mode:"replace", url:"interface/views"}
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
    