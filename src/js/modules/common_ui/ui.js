import createAdler from "../../vendor/adlerLegacy.js";
import login_ui from "../login/login_ui.js";

var common_ui =createAdler({
    content: p => /*html*/`
        <div class="cui_lateral_area"></div>
        <div class="cui_main_area">
            <div a-slot="main_area_mount_point" class="inherit_height"></div>
            <div adler="user_button" class="user_button_list"></div>
        </div>
        <div class="cui_toolbar_area_back">
        </div>
        <div class="cui_toolbar_area">
            <div a-slot="toolbar_area_mount_point" ></div>
        </div>

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
    css:/*css*/`
        .cui_toolbar_area_back {
            background: rgb(0,181,173);
               
            background: linear-gradient(90deg, rgba(0,181,173,1) 8%, rgba(228,255,254,1) 8%, rgba(255,255,255,1) 75%);
            background: linear-gradient(165deg, rgba(0,181,173,1) 0%, rgba(149,235,231,1) 100%);    
            background: linear-gradient(165deg, rgb(0, 181, 173) 0%, rgb(33, 51, 50) 100%);
            width:60px;
            height:100%;
            position: absolute;
        }
        .cui_toolbar_area {

            width:55px;
            height:100%;
            position: absolute;
            z-index: 9999999999999999999999999999999999999999999999999999999;
        }
        .cui_main_area {
            width: calc(100% - 50px);
            height: 100%;
            overflow:hidden;
            position: absolute;
            left: 50px;
            background-color: white;
            border-top-left-radius:13px;
            border-bottom-left-radius:13px;
            z-index: 1;
        }

        @media (prefers-color-scheme: dark) {
            .cui_main_area   { background:  #1b1b1b; color: white; }
          }
    `,
    components:{
        
    }
})

common_ui.append(login_ui.instance(), "main_area_mount_point")

export default common_ui