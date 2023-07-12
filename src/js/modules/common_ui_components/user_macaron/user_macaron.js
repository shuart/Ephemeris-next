import createAdler from "../../../vendor/adlerLegacy.js";
import userManagement from "../../common_user_management/user_management.js";
import state_manager from "../../common_state/state_manager.js";
import { nameToGradient } from "../../../vendor/coloredNames.js";

var getCurrentUser = function () {
    return userManagement.getCurrentUser()
}

var signOutUser = function () {
    userManagement.signOutUser()
    state_manager.goTo("/")
}

var setUpData = function(event, data, instance){
    data.user = getCurrentUser() || "no user"
}

var softUpdate= function (event, data, instance) {

}
var showUserMenu= function (event, data, instance) {
    instance.query(".user-macaron-menu").style.display='block'
}
var hideUserMenu= function (event, data, instance) {
    instance.query(".user-macaron-menu").style.display='none'
}

var showUserIcon = function (event, data, instance) {
    instance.query(".user-macaron-pic").style.background = nameToGradient(data.user.name)
    instance.query(".user-macaron-pic").style.paddingLeft= '14px';
    instance.query(".user-macaron-pic").style.fontSize= '28px';
    instance.query(".user-macaron-pic").style.color= 'white';
    instance.query(".user-macaron-pic").innerText = data.user.name[0]
    // instance.query(".user-macaron-pic").style.backgroundColor = nameToGradient(data.user.name)
}

{/* <div class="user-macaron-verifications"><img src="./img/icons/clipboard.svg" style="filter: invert(100%);"></div> */}

var component =createAdler({
    content: p => /*html*/`
    <div class="user-macaron">
        <div class="user-macaron-pic">${p.user.name}</div>
        <div class="user-macaron-menu">
            <div class="user-macaron-menu-item action-macaron-logout">
                Log-out
            </div>
        </div>
    </div>
        `,
    params:{
        // props:{
        //     test:15,
        // },
        // listen:{
        //     test:function (event, data, instance) {
        //         //alert("test")
        //     }
        // },
        data:{
            user:"Hello",
            onClick:()=>signOutUser(),
            // onClickSettings:()=>state_manager.goTo("/:/settings/model/entities"),
            // // onClickSimulations:()=>state_manager.goTo("/:/settings/workflow/simulations"),
            // onClickSimulations:()=>state_manager.goTo("/:/simulations/home"),
        },
        on:[
            [".action-macaron-logout","click", (event, data, instance)=> data.onClick(event, data, instance) ],
            // [".user-macaron-settings","click", (event, data, instance)=> data.onClickSettings(event, data, instance) ],
            // [".user-macaron-simulations","click", (event, data, instance)=> data.onClickSimulations(event, data, instance) ],
            [".user-macaron-pic","click", (event, data, instance)=> showUserMenu(event, data, instance) ],
            [".user-macaron-menu","mouseleave", (event, data, instance)=> hideUserMenu(event, data, instance) ],
        ],
        events:{
            onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => showUserIcon(event, data, instance),
            
        },
        methods:{
            // softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    css:/*css*/`
        .user-macaron{
            width: 42px;
            height: 70px;
            position: relative;
            left: 3px;
            bottom: 5px;
            cursor:pointer;
        }
        .user-macaron-settings{
            width: 42px;
            height: 84px;
            position: absolute;
            left: 10px;
            bottom: 10px;
            cursor:pointer;
        }
        .user-macaron-simulations{
            width: 42px;
            height: 84px;
            position: absolute;
            left: 10px;
            bottom: 50px;
            cursor:pointer;
        }
        .user-macaron-verifications{
            width: 42px;
            height: 84px;
            position: absolute;
            left: 10px;
            bottom: 90px;
            cursor:pointer;
        }
        .user-macaron-pic{
            width: 42px;
            height: 42px;
            background-color: #686363;
            border-radius: 90px;
            position: absolute;
            cursor: pointer;
            bottom: 8px;
            left: 2px;
        }
        .user-macaron-menu{
            display:none;
            width: 200px;
            height: 200px;
            position: absolute;
            background: #000000d9;
            left: 47px;
            bottom: 7px;
        }
        .user-macaron-menu-item{
            color:white;
            height: 42px;
            padding: 9px;
        }
        .user-macaron-menu-item:hover{
            background: #444646;
        }
    `,
})

export default component