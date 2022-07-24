import createAdler from "../../vendor/adler.js";

var common_ui =createAdler({
    content: p => /*html*/`
        <div class="cui_lateral_area"></div>
        <div class="cui_main_area"></div>
        <div class="cui_toolbar_area"></div>
        
        
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
               
            background: linear-gradient(90deg, rgba(0,181,173,1) 8%, rgba(228,255,254,1) 8%, rgba(255,255,255,1) 75%);
            background: linear-gradient(165deg, rgba(0,181,173,1) 0%, rgba(149,235,231,1) 100%);    
            background: linear-gradient(165deg, rgb(0, 181, 173) 0%, rgb(33, 51, 50) 100%);
            width:55px;
            height:100%;
            position: absolute;
        }
        .cui_main_area {
            width: calc(100% - 50px);
            height: 100%;
            position: absolute;
            left: 50px;
            background-color: white;
            border-top-left-radius:5px;
            border-bottom-left-radius:5px;
            z-index: 1;
        }

        @media (prefers-color-scheme: dark) {
            .cui_main_area   { background:  #1b1b1b; color: white; }
          }
    `,
})

export default common_ui