import createAdler from "../../vendor/adlerLegacy.js";

var fillElement = function(event, data, instance){
    // if (!data.label) {
    //     instance.query(".label").style.display ="none"
    // }
}

var updateValue = function(event, data, instance){
    data.value = instance.query(".input").value
}

var common_dialogue_footer =createAdler({
    content: p => /*html*/`
        <div class="field is-grouped is-grouped-centered">
            <p class="control">
            <a class="action_common_dialogue_confirm button is-primary">
                Submit
            </a>
            </p>
            <p class="control">
            <a class="action_common_dialogue_cancel button is-light">
                Cancel
            </a>
            </p>
        </div>
        
        `,
    params:{
        data:{
            label:undefined,
            onConfirm :()=>console.log("confirm"),
            onCancel :()=>console.log("cancel"),
            // onClick:()=>console.log("click"),
            // onFocusout:()=>console.log("unfocus"),
        },
        events:{
            // onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            onMount:(event, data, instance) => fillElement(event, data, instance),
            
        },
        on:[
            [".action_common_dialogue_confirm","click", (event, data, instance)=> data.onConfirm(event, data, instance) ],
            [".action_common_dialogue_cancel","click", (event, data, instance)=> data.onCancel(event, data, instance) ],
            // [".input","focusout", (event, data, instance)=> data.onFocusout(event, data, instance) ],
            // [".input","keyup", (event, data, instance)=> updateValue(event, data, instance) ],
        ]
    },
    // css:/*css*/` `,
})

export default common_dialogue_footer