import createAdler from "../../vendor/adler.js";
import userManagement from "../common_user_management/user_management.js";
import user_button from "../common_ui_elements/user_button.js";

//Functions

var getAllUsers = ()=> userManagement.getAllUsers() //.map(o=> o.name).toString()
var setButtonList = ()=>{
    console.log(getAllUsers());
    return getAllUsers().map((i)=> {return {value:i.name, onClick:(event, data, instance)=> setUser(i.id, instance)} } )
}

var setUser = function(id,instance){
    userManagement.setCurrentUser(id);
    //login_ui.unmount()
}

var login_action_add_user = function(event, data, instance){
    event.preventDefault()
    //showRegisterForm(event, data, instance)
    userManagement.addUser( {name:prompt("user name?")} ); 
    instance.setData({users:setButtonList()});
}

var showRegisterForm = function(event, data, instance){
    instance.query(".register").style.display="block"
    // console.log( instance.query(".register"));
    // userManagement.addUser(prompt("user name?")); 
    // instance.setData({users:setButtonList()});
}
//UI

var login_ui =createAdler({
    content: p => /*html*/`
        <div class="login_main_area">
            <div class="login_logo"></div>
            
            <form style="display:none;" class="register box">
                <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" placeholder="e.g. alex@example.com">
                </div>
                </div>
            
                <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" placeholder="********">
                </div>
                </div>
            
                <button class="login_action_add_user button is-primary">Sign in</button>
            </form>

            <div a-for="users" adler="user_button" class="user_button_list"></div>
            <div class="">
                <button class="login_action_show_register">add User</button>
                ${p.users}
            </div>
        </div>
        

        `,
    params:{
        data:{
            test:"Hello",
            users:setButtonList(),
        },
        on:[
            [".login_action_add_user","click", login_action_add_user ],
            [".login_action_show_register","click", showRegisterForm ],
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