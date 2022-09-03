import createAdler from "../../../vendor/adler.js";

var popup =createAdler({
    content: p => /*html*/`
        <div class="main_popup_area">
            <div class="main_popup_shield_area"></div>
            <div class="main_popup_menu_area container"></div>
        </div>
        `,
    params:{
        data:{
            test:"Hello",
            test2:"click",
        },
        on:[
            [".main_popup_shield_area","click", (event, data, instance)=> instance.unmount()],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
        ]
    },
    css:/*css*/`
        .main_popup_area {
            width:100%;
            height:100%;
            position: absolute;
            z-index:999999999999999999999999999999999999;
        }
        .main_popup_shield_area {
            background-color: rgba(0, 0, 0, 0.8);
            width:100%;
            height:100%;
            position: absolute;
            z-index:999999999999999999999999999999999999;
        }
        .main_popup_menu_area {
            background-color: rgba(255, 255, 255, 1);
            min-width:50px;
            height:80%;
            top:10%;
            position:relative;
            z-index:999999999999999999999999999999999999;
        }
      

        @media (prefers-color-scheme: dark) {
          }
    `,
    components:{
        
    }
})


export default popup