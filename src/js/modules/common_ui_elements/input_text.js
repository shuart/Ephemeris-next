import createAdler from "../../vendor/adler.js";

var input_text =createAdler({
    content: p => /*html*/`
        <input class="input" type="text" placeholder="" value ="${p.value}">
        `,
    params:{
        data:{
            value:"Hello",
            onClick:()=>console.log("click")
        },
        on:[
            [".card_go_button","click", (event, data, instance)=> data.onClick(event, data, instance) ],
        ]
    },
    // css:/*css*/` `,
})

export default input_text