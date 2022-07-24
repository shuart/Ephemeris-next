import createAdler from "../../vendor/adler.js";

var common_ui =createAdler({
    content: p => /*html*/`
        <div class="cui_toolbar_area"></div>
        <div class="cui_lateral_area"></div>
        <div class="cui_main_area"></div>

        `,
    params:{
        data:{
            test:"Hello",
            test2:"click",
        },
        on:[
            [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
        ]
    },
    css:/*html*/`
        .cui_toolbar_area {
            background: rgb(0,181,173);
            background: linear-gradient(165deg, rgba(0,181,173,1) 0%, rgba(149,235,231,1) 100%);    
            width:55px;
            height:100%;
            position: absolute;
        }
    `,
})

export default common_ui