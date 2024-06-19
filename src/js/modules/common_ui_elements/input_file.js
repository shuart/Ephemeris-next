import createAdler from "../../vendor/adlerLegacy.js";
import nanoid from "../../vendor/nanoid.js";


var updateValue = function(event, data, instance){
    console.log(event);
    alert("efesfgggggs")
    data.value = event.target.checked
    data.onChange(event, data, instance)
}

var configElement = function(event, data, instance){
    var target = instance.query(".tbl_file__input")
    target.addEventListener('change', function (ev) {
        data.value = target.files[0]
        data.onChange(event, data, instance)
    })
    // console.log(target);
    // alert("ees")
}

var input_file =createAdler({
    content: p => /*html*/`
    <div class="input_selection_container field">
            <label class="label">${p.label}</label>
            <label class="tbl_file" for="tg_${p.uuid}">
                <input class="tbl_file__input ${p.uuid}" name="" type="file" id="tg_${p.uuid}" />
                <div class="tbl_file__fill"></div>
            </label>
    </div>

        
        `,
    params:{
        data:{
            value:"Hello",
            uuid:"id_"+nanoid(),
            label:undefined,
            autofocus:false,
            hiddenInput:false,
            onClick:()=>console.log("click"),
            onFocusout:()=>console.log("unfocus"),
        },
        events:{
            // onBeforeMount:(event, data, instance) => configElement(event, data, instance),
            onMount:(event, data, instance) => configElement(event, data, instance),
            
        },
        on:[
            // [".tbl_toggle__input","change", (event, data, instance)=> updateValue(event, data, instance) ],
            // [".input","click", (event, data, instance)=> data.onClick(event, data, instance) ],
            // [".input","focusout", (event, data, instance)=> unFocus(event, data, instance) ],
            // [".input","keyup", (event, data, instance)=> updateValue(event, data, instance) ],
        ]
    },
    css:/*css*/`
    .tbl_file {
        --width: 40px;
        --height: calc(var(--width) / 2);
        --border-radius: calc(var(--height) / 2);
    
        display: inline-block;
        cursor: pointer;
    }
    @media (prefers-color-scheme: dark) {
       
      }
    `,
})

export default input_file