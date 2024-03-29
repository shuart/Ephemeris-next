import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"
import createInstancesManagement from "../common_project_management/instances_management.js"
import project_views from "../project_views/project_views.js";
import state from "../common_state/state_manager.js";
import instanceCard from "../common_ui_components/instance_card/instance_card.js";
var showPopupInstancePreview = function(instanceId){
    var instanceRepo = createInstancesManagement()
    var currentInstance = instanceRepo.getById(instanceId)
    var sourceEntity = currentInstance.sourceEntity
    var mountArea = mainPopup.with({data:{
        title:"Preview of "+currentInstance.name,
        closeButton:true,
        goToButton:(event, data, instance)=>{
            instance.unmount()
            state.goTo("/:/instances/"+instanceId)
        },
    }})
    mountArea.mount()
    if (!sourceEntity.defaultViewId) {
        var instanceManagement = createInstancesManagement()
        var currentInstance = instanceManagement.getById(instanceId)
        var card = instanceCard.instance({data:{instance:currentInstance } })
        mountArea.append(card, "main-slot")
    } else {
        mountArea.append(project_views.instance({data:{
            viewId:sourceEntity.defaultViewId, 
            calledFromInstance:instanceId,
            title:false,
            
        }}), "main-slot")
    }
    
    
    // mainPopup.append(select.instance({
    //     data:{
    //         list:[{name:instanceId, value:instanceId, uuid:instanceId}],
    //         // callback:function(event){ cell.getData().setDefaultViewId(event.value.uuid) }
    //     }
    // }), "main-slot")
    mountArea.update();
}

export default showPopupInstancePreview