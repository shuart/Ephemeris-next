import createRelationManagement from "../../common_project_management/relations_management.js";
import mainPopup from "../../common_ui_components/mainPopup/mainPopup.js"
import select from "../../common_ui_components/select/select.js"
import iconSelect from "../../common_ui_components/icon_picker/iconPicker.js"
import createEntityManagement from "../../common_project_management/entity_management.js";
import projectManagement from "../../common_project_management/project_management.js";
import state_manager from "../../common_state/state_manager.js"
import { showEntitiesSelector } from "../../common_selectors/entities_selector.js";

var changeAssignedItems = function (attributeId, result) {
    var entitiesRepo =createEntityManagement()
    var entity = entitiesRepo.getById(attributeId)
    console.log(attributeId, result);
    if (result.selection && result.selection[0]) {
        entity.setParent(result.selection[0].uuid)
    }else{
        entity.setParent(undefined)
    }

}

var sortAsTree = function (list) {
    var parentAtt = "parent"
    var newList = []
    var childObjects = {}

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (!childObjects[item.uuid]) { //if has no child object yet
                childObjects[item.uuid] = []
            }
            item._children = childObjects[item.uuid]

            if ( item[parentAtt] && item[parentAtt][0] ) { //has parent
                var parentObj = item[parentAtt]
                if (Array.isArray(item[parentAtt])) {
                    parentObj = item[parentAtt][0]
                }
                if (parentObj && !(parentObj.uuid == item.uuid)) {
                    if (!childObjects[parentObj.uuid]) { //if no parent child object yet
                        childObjects[parentObj.uuid] = []
                    }
                    childObjects[parentObj.uuid].push(item)
                    
                }
                if (parentObj.uuid == item.uuid) {
                    newList.push(item) //push as root if own parent
                }
                
            }else{
                newList.push(item) //push as root
            }
            
        }

    return newList
    
}

export function createEntitiesSettingsTable (projectId, data) {

        // listData.list = projectManagement.getProjectStore(projectId,data.modelElementType).getAll()
        var entityRepo = createEntityManagement()
        var list = entityRepo.getAll()
        //Create extra fields
        var hasHierarchy = false
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            element.defaultView = element.getDefaultView()
            element.color = element.attributes.color
            element.iconPath = element.attributes.iconPath
            element.parent = [element.getParent()]
            if (element.parent[0] === undefined) {
                element.parent = []
            }else{
                hasHierarchy = true
            }

        }
        // list.forEach(l=> console.log( l.getAllProperties() ))
        if (hasHierarchy) {
            list = sortAsTree(list)
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
            {title:"Parent", field:"parent", customObjects:true,
                cellClick:(e,cell)=>showEntitiesSelector({
                    selected : cell.getData()["parent"].map(d=>d.uuid),
                    multipleSelection:false,
                    onChange: (e,f)=> changeAssignedItems(cell.getData().uuid,e, f.added, f.removed )
                }),
                callback :(id)=>state_manager.goTo("/:/settings/details/entities/"+id)
            },
            {customButton: {value:"Rename", onClick:function(e, cell){ 
                    var newName = prompt("Set Name") 
                    if (newName) {
                        cell.getData().setName(newName)
                    }
            } } },
            {customButton: {value:"X", onClick:function(e, cell){ if(confirm("Delete?"))projectManagement.getProjectStore(projectId,"entities").remove(cell.getRow().getData().uuid) } } },
        ];
    return {list, cols}
}
