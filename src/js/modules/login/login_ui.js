import createAdler from "../../vendor/adler.js";

//TO MOVE
import createdb from "../../vendor/superCluster.js";
var db = createdb({
    users:["id","test"]
})
var getUser = function () {
    return db.get("users").toArray().map(o=> o.name).toString()
}
var addUser =function(name){
    db.add("users", { name:name})
}
//END


var login_action_add_user = function(event, data, instance){
    addUser(prompt("user name?")); 
    instance.setData({users:getUser()});
}

var login_ui =createAdler({
    content: p => /*html*/`
        <div class="">LOGIN</div>
        <div class="">
            <button class="login_action_add_user">add User</button>
            ${p.users}
        </div>

        `,
    params:{
        data:{
            test:"Hello",
            users:getUser(),
        },
        on:[
            [".login_action_add_user","click", login_action_add_user ],
        ]
    },
    css:/*css*/`
        @media (prefers-color-scheme: dark) {
          }
    `,
})

export default login_ui