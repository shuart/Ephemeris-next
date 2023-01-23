import createAdler from "../../../vendor/adler.js";

var popup =createAdler({
    content: p => /*html*/`
        <div class="main_popup_area">
            <div class="main_popup_shield_area"></div>
            <div a-if="narrow" a-slot="main-slot" class="container main_popup_menu_area main_popup_menu_area_narrow">
                <div class="main_popup_header_area" >
                    <div a-if="closeButton" class="delete  is-medium main_popup_close action_main_popup_close">Close</div>
                    <div a-if="goToButton" class="main_popup_go_to action_main_popup_go_to"><img class="darkModeCompatibleIcons" src="./img/icons/maximize-2.svg"></div>
                   
                </div>
                <div a-if="title" class="main_popup_title title">${p.title}</div>
            </div>
            <div a-if-not="narrow" a-slot="main-slot" class="container main_popup_menu_area ">
                <div class="main_popup_header_area" >
                    <div a-if="closeButton" class="delete  is-medium main_popup_close action_main_popup_close">Close</div>
                    <div a-if="goToButton" class="main_popup_go_to action_main_popup_go_to"><img class="darkModeCompatibleIcons" src="./img/icons/maximize-2.svg"></div>
                    <div a-if="title" class="main_popup_title title">${p.title}</div>
                </div>
                <div a-if="title" class="main_popup_title title">${p.title}</div>
            </div>
        </div>
        `,
    params:{
        data:{
            test:"Hello",
            test2:"click",
            narrow:false,
            title:false,
            closeButton:false,
            goToButton:false,
        },
        on:[
            [".main_popup_shield_area","mousedown", (event, data, instance)=> instance.unmount()],
            [".action_main_popup_close","mousedown", (event, data, instance)=> instance.unmount()],
            [".action_main_popup_go_to","mousedown", (event, data, instance)=> data.goToButton(event, data, instance)],
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
        .main_popup_header_area{
            height: 0px;
            position: sticky;
            top: 0px;
            left: 0px;
            width: 100%;
            z-index: 999999;
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
            top:10%;
            position:relative;
            border-radius: 12px;
            padding: 19px;
            padding-top: 45px;
            z-index:999999999999999999999999999999999999;
            max-height: 80%;
            overflow-y: scroll;
        }
        .main_popup_menu_area_narrow {
            background-color: rgba(255, 255, 255, 1);
            min-width:50px;
            max-width:500px !important;
            top:10%;
            position:relative;
            border-radius: 12px;
            padding: 19px;
            padding-top: 45px;
            z-index:999999999999999999999999999999999999;
        }

        .main_popup_close {
            position: absolute;
            right: 10px;
            top: -18px;
        }
        .main_popup_go_to {
            /* display: block; */
            width: 25px;
            position: absolute;
            right: 50px;
            top: -21px;
            cursor:pointer;
        }

        @media (prefers-color-scheme: dark) {
            .main_popup_menu_area {
                background-color: #303030;
                background-color: #1b1b1b;
                color:white;
            }
          }
    `,
    components:{
        
    }
})


export default popup