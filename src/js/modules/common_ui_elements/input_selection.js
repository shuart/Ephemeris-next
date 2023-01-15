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
    // var content = data.list.filter(i=>data.selected[i.uuid]).map(i=>'<span class="selectTag">'+i.name+'<span data-uuid="'+i.uuid+'" class="selectCloseTag"> | X</span></span>').join('')
    var content = data.list.filter(i=>data.selected[i.uuid]).map(i=>'<span class="selectionareaSelectTag">'+i.name+'</span>').join('')
    if (content !="") {
        instance.query(".start_select").innerHTML = content
    }
    if (!data.label) {
        instance.query(".label").style.display ="none"
    }
    
 
}

var input_selection =createAdler({
    content: p => /*html*/`
        <div class="input_selection_container field">
            <label class="label">${p.label}</label>
            <div class="start_select ephSelectionarea">${p.value}</div>
        </div>
        
        `,
    params:{
        data:{
            value:"Nothing Selected",
            label:undefined,
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
        background-color: #fff;
        border-color: #363636;
        color: #363636;
        box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.1);
        padding: 15px;
        border-radius:8px;
    }
    .selectionareaSelectTag {
        color: #ffffff;
        align-items: center;
        background-color: #f5f5f5;
        border-radius: .375em;
        display: inline-flex;
        font-size: .75rem;
        height: 2em;
        justify-content: center;
        line-height: 1.5;
        padding-left: .75em;
        padding-right: .75em;
        white-space: nowrap;
        background-color: #00d1b2;
        margin-right:5px;
        font-weight: bold;
    }
    @media (prefers-color-scheme: dark) {
        .ephSelectionarea{
            background-color: #262626;
            border-color: #363636;
            color: #dbdbdb;
            box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
        }
        .selectionareaSelectTag {
            color: #000000;
        }
        
    }
    
    `,
})

export default input_selection