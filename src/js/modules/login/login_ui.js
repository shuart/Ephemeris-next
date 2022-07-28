import createAdler from "../../vendor/adler.js";
import userManagement from "../common_user_management/user_management.js";
import user_button from "../common_ui_elements/user_button.js";


//Functions

var login_action_add_user = function(event, data, instance){
    userManagement.addUser(prompt("user name?")); 
    instance.setData({users:userManagement.getAllUsers()});
}

var getAllUsers = ()=> userManagement.getAllUsers() //.map(o=> o.name).toString()

//UI

var login_ui =createAdler({
    content: p => /*html*/`
        <div class="login_main_area">
            <div class="login_logo"></div>
            <div a-for="users" adler="user_button" class="user_button_list"></div>
            <div class="">
                <button class="login_action_add_user">add User</button>
                ${p.users}
            </div>
        </div>
        

        `,
    params:{
        data:{
            test:"Hello",
            users:getAllUsers(),
        },
        on:[
            [".login_action_add_user","click", login_action_add_user ],
        ]
    },
    css:/*css*/`
        .login_logo{
            width: 100%;
            margin: auto;
            height: 301px;
            background-image: url("./img/login.jpg");
            background-size: contain;
            background-repeat: no-repeat;
        }
        .login_main_area{
            max-width: 613px;
            width: 100%;
            margin: auto;
        }
        @media (prefers-color-scheme: dark) {
            .login_logo{
                background-image: url("./img/login_dark.jpg");
            }
          }
    `,
    components:{
        user_button: user_button
    }
})

export default login_ui