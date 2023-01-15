import createAdler from "../../vendor/adler.js";

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
}

var updateValue = function(event, data, instance){
    data.value = instance.query(".input").value
}

var input_text =createAdler({
    content: p => /*html*/`
        <div class="input_selection_container field">
            <label class="label">${p.label}</label>
            <input class="input" type="text" placeholder="" value ="${p.value}">
        </div>
        
        `,
    params:{
        data:{
            value:"Hello",
            label:undefined,
            autofocus:false,
            onClick:()=>console.log("click"),
            onFocusout:()=>console.log("unfocus"),
        },
        events:{
            // onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            onMount:(event, data, instance) => fillElement(event, data, instance),
            
        },
        on:[
            [".input","click", (event, data, instance)=> data.onClick(event, data, instance) ],
            [".input","focusout", (event, data, instance)=> data.onFocusout(event, data, instance) ],
            [".input","keyup", (event, data, instance)=> updateValue(event, data, instance) ],
        ]
    },
    // css:/*css*/` `,
})

export default input_text