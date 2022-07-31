import createAdler from "../../vendor/adler.js";
import userManagement from "../common_user_management/user_management.js";

var getCurrentUser = function () {
    return userManagement.getCurrentUser()
}

var project_selection =createAdler({
    content: p => `<button class="action1 adlerButton">${p.currentUserName} world</button><p class="action2">${p.test2} here</p>`,
    params:{
        data:{
            test:"project seelction",
            test2:"seelction",
            currentUserName:"Undefined",
        },
        on:[
            [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            onBeforeMount:(event, data, instance) => instance.setData({currentUserName:getCurrentUser().name}, false),
        },
    },
    css:`
        .adlerButton {
            background-color: blue;
            padding: 5px;
            border: none;
            color: white;
            margin: 3px;
        }
    `,
})

export default project_selection