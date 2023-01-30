import createAdler from "../../vendor/adler.js";

var user_button =createAdler({
    content: p => /*html*/`
    <div class="brick no_break_inside">
    <div style="cursor:pointer;" class="card card_go_button">
            <div class="card-image">
                <figure class="image is-3by1">
                    <img src="./img/projectPreviewRect.jpg" alt="Placeholder image">
                </figure>
            </div>
            <header class="card-header">
            <p class="card-header-title card_go_button">
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
            [".card_go_button","click", (event, data, instance)=> data.onClick(event, data, instance) ],
        ]
    },
    // css:/*css*/` `,
})

export default user_button