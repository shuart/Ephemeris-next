import createAdler from "../../../vendor/adler.js";
import userManagement from "../../common_user_management/user_management.js";

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
    <div class="user-macaron">${p.user.name}</div>
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
        },
        on:[
            [".user-macaron","click", (event, data, instance)=> data.onClick(event, data, instance) ],
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
            height: 42px;
            background-color: #686363;
            border-radius: 90px;
            position: relative;
            left: 3px;
            bottom: 5px;
        }
    `,
})

export default component