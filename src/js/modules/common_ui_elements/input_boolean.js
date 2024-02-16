import createAdler from "../../vendor/adlerLegacy.js";


var updateValue = function(event, data, instance){
    console.log(event);
    data.value = event.target.checked
    data.onChange(event, data, instance)
}

var input_boolean =createAdler({
    content: p => /*html*/`
    <div class="input_selection_container field">
            <label class="label">${p.label}</label>
            <label class="tbl_toggle" for="tg_${undefined}">
                <input class="tbl_toggle__input" name="" type="checkbox" id="tg_${undefined}" ${p.value ? "checked":""}/>
                <div class="tbl_toggle__fill"></div>
            </label>
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
        },
        events:{
            // onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            // onMount:(event, data, instance) => fillElement(event, data, instance),
            
        },
        on:[
            [".tbl_toggle__input","change", (event, data, instance)=> updateValue(event, data, instance) ],
            // [".input","click", (event, data, instance)=> data.onClick(event, data, instance) ],
            // [".input","focusout", (event, data, instance)=> unFocus(event, data, instance) ],
            // [".input","keyup", (event, data, instance)=> updateValue(event, data, instance) ],
        ]
    },
    css:/*css*/`
    .tbl_toggle {
        --width: 40px;
        --height: calc(var(--width) / 2);
        --border-radius: calc(var(--height) / 2);
    
        display: inline-block;
        cursor: pointer;
    }
    .tbl_toggle__input {
        display: none;
    }
    .tbl_toggle__fill {
        position: relative;
        width: var(--width);
        height: var(--height);
        border-radius: var(--border-radius);
        background: #dddddd;
        
        transition: background 0.2s;
    }
    .tbl_toggle__fill::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: var(--height);
        width: var(--height);
        background: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
        border-radius: var(--border-radius);
        transition: transform 0.2s;
    }
    .tbl_toggle__input:checked ~ .tbl_toggle__fill {
        background: #00b5ad;
    }
    
    .tbl_toggle__input:checked ~ .tbl_toggle__fill::after {
        transform: translateX(var(--height));
    }
    @media (prefers-color-scheme: dark) {
        .table-tag{
            color:white
        }
        .tbl_toggle__fill::after {
            background: #464545;
        }
        .tbl_toggle__fill {
            background: #3c3b3b;
        }
      }
    `,
})

export default input_boolean