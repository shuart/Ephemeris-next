import createAdler from "../../../vendor/adler.js";
import userManagement from "../../common_user_management/user_management.js";
import state_manager from "../../common_state/state_manager.js";

var getCurrentUser = function () {
    return userManagement.getCurrentUser()
}

var signOutUser = function () {
    return userManagement.signOutUser()
}

var setUpData = function(event, data, instance){
    data.user = getCurrentUser()
}

var softUpdate= function (event, data, instance) {

}

var component =createAdler({
    content: p => /*html*/`
    <div class="user-macaron">
        <div class="user-macaron-settings"><img src="./img/icons/settings.svg" style="filter: invert(100%);"></div>
        <div class="user-macaron-pic">${p.user.name}</div>
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
            onClickSettings:()=>state_manager.goTo("/:/settings/model/entities")
        },
        on:[
            [".user-macaron-pic","click", (event, data, instance)=> data.onClick(event, data, instance) ],
            [".user-macaron-settings","click", (event, data, instance)=> data.onClickSettings(event, data, instance) ],
        ],
        events:{
            onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            // onMount:(event, data, instance) => setUpTable(event, data, instance),
            
        },
        methods:{
            // softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    css:/*css*/`
        .user-macaron{
            width: 42px;
            height: 84px;
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
    `,
})

export default component