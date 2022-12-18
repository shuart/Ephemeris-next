import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"
import createInstancesManagement from "../common_project_management/instances_management.js"
import project_views from "../project_views/project_views.js";

var showPopupInstancePreview = function(instanceId){
    var instanceRepo = createInstancesManagement()
    var currentInstance = instanceRepo.getById(instanceId)
    var sourceEntity = currentInstance.sourceEntity
    mainPopup.mount()
    mainPopup.append(project_views.instance({data:{viewId:sourceEntity.defaultViewId, calledFromInstance:instanceId}}), "main-slot")
    
    // mainPopup.append(select.instance({
    //     data:{
    //         list:[{name:instanceId, value:instanceId, uuid:instanceId}],
    //         // callback:function(event){ cell.getData().setDefaultViewId(event.value.uuid) }
    //     }
    // }), "main-slot")
    mainPopup.update();
}

export default showPopupInstancePreview