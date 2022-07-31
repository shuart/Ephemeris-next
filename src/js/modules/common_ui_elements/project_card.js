import createAdler from "../../vendor/adler.js";

var user_button =createAdler({
    content: p => /*html*/`
    <div class="brick">
    <div class="card">
            <header class="card-header">
            <p class="card-header-title">
                ${p.value}
            </p>
            <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
            </header>
        </div>
    </div>
        `,
    params:{
        data:{
            value:"Hello",
            onClick:()=>console.log("click")
        },
        on:[
            [".user_button","click", (event, data, instance)=> data.onClick(event, data, instance) ],
        ]
    },
    // css:/*css*/` `,
})

export default user_button