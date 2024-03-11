import createAdler from "../../vendor/adlerLegacy.js";

var fillElement = function(event, data, instance){
    if (!data.label) {
        instance.query(".label").style.display ="none"
    }
    if (data.autofocus) {
        setTimeout(function () { //TODO Check why a timeout is needed
            instance.query(".input").focus();
            instance.query(".input").select();
        }, 200)
        
    }
    if (data.onEnter) {
        setTimeout(function () { //TODO Check why a timeout is needed
            instance.query(".input").addEventListener("keyup", function(event) {
                if (event.key === "Enter") {
                    data.onEnter(event, data, instance)
                }
            });
        }, 200)
        
    }
    if (data.hiddenInput) {
        instance.query(".input").style.display ="none"
        instance.query(".input_hidder").style.display ="block"
        instance.query(".input_hidder").addEventListener("mouseenter",function(){
            instance.query(".input_text_edit").style.display ="inline-block"
            
        })
        instance.query(".input_hidder").addEventListener("mouseleave",function(){
            instance.query(".input_text_edit").style.display ="none"
            
        })
        instance.query(".input_text_edit").addEventListener("click",function(){
            instance.query(".input").style.display ="block"
            instance.query(".input_hidder").style.display ="none"
            instance.query(".input").focus();
            instance.query(".input").select();
            
        })
    }
}

var updateValue = function(event, data, instance){
    data.value = instance.query(".input").value
}
var unFocus = function(event, data, instance){
    if (data.hiddenInput) {
        instance.query(".input").style.display ="none"
        instance.query(".input_hidder").style.display ="block"
        instance.query(".hidder_value").innerText= data.value
    }
    data.onFocusout(event, data, instance)
}

var input_text =createAdler({
    content: p => /*html*/`
        <div class="input_selection_container field">
            <label class="label">${p.label}</label>
            <div class="input_hidder"><span class="hidder_value">${p.value}</span> <span class="input_text_edit">Edit</span></div>
            <input class="input" type="text" placeholder="" value ="${p.value}">
        </div>
        
        `,
    params:{
        data:{
            value:"Hello",
            label:undefined,
            autofocus:false,
            hiddenInput:false,
            onClick:()=>console.log("click"),
            onFocusout:()=>console.log("unfocus"),
            onEnter:undefined,
        },
        events:{
            // onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            onMount:(event, data, instance) => fillElement(event, data, instance),
            
        },
        on:[
            [".input","click", (event, data, instance)=> data.onClick(event, data, instance) ],
            [".input","focusout", (event, data, instance)=> unFocus(event, data, instance) ],
            [".input","keyup", (event, data, instance)=> updateValue(event, data, instance) ],
        ]
    },
    css:/*css*/`
    .input_text_edit{
        font-size: 0.7em;
        margin-left: 9px;
        color: #069c95;
        cursor:pointer;
        display:none;
    }
    .input_hidder{
        display:none;
    }
    `,
})

export default input_text