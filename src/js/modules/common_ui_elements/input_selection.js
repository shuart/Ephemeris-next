import createAdler from "../../vendor/adler.js";
import mainPopup from "../../modules/common_ui_components/mainPopup/mainPopup.js"
import select from "../../modules/common_ui_components/select/select.js"

var showPopup = function (event, data, instance) {
    var mainPopupNarrow = mainPopup.with({data:{narrow:true,title:"Select Items"}})
        // mainPopupNarrow.mount()
        var currentList = data.list
        var selected =data.selected
        var generateList = function () {
            return currentList
        }
        var generateSelectedList = function () {
            return currentList.filter(i=>selected[i.uuid])
        }
        var selectInstance = select.instance({
            data:{
                list:generateList,
                selectedlist:generateSelectedList,
                callbackConfirm:(e)=>{
                    // data.value = currentList.filter(i=>selected[i.uuid]).map(i=>i.name).join(",")
                    instance.update()
                    mainPopupNarrow.unmount()
                },
                callback:function(event){
                    console.log(event);
                    selected[event.value.uuid]= true
                    //Display a new popup to choose the relation type
                    // currentSelectedInstance.addRelation(props.relationType.get(),event.value.uuid)
                    selectInstance.do.softUpdate();
                },
                closeSelectedCallback:function(event){
                    console.log(event);
                    selected[event.uuid]= false
                    // alert(event.uuid)
                    // currentSelectedInstance.removeRelation(props.relationType.get(),event.uuid)
                    selectInstance.do.softUpdate();
                }
                
            }
        })
        mainPopupNarrow.append(selectInstance, "main-slot")
        mainPopupNarrow.mount();
}

var fillElement = function(event, data, instance){
    console.log(instance.query(".start_select"));
    // instance.query(".start_select").innerHTML = data.list.filter(i=>data.selected[i.uuid]).map(i=>i.name).join(",")
    var content = data.list.filter(i=>data.selected[i.uuid]).map(i=>i.name).join(",")
    if (content !="") {
        instance.query(".start_select").innerHTML = content
    }
    
 
}

var input_selection =createAdler({
    content: p => /*html*/`
        <div class="start_select ephSelectionarea">${p.value}</div>
        `,
    params:{
        data:{
            value:"Hello",
            list: [{name:"test", uuid:"1"},{name:"tessqdqsdsqt", uuid:"2"}],
            selected:{},
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
        background-color: #262626;
        border-color: #363636;
        color: #dbdbdb;
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
        padding: 15px;
    }`,
})

export default input_selection