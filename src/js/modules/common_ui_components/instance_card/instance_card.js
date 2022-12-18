import createAdler from "../../../vendor/adler.js";
import userManagement from "../../common_user_management/user_management.js";
import state_manager from "../../common_state/state_manager.js";

// var getCurrentUser = function () {
//     return userManagement.getCurrentUser()
// }

// var signOutUser = function () {
//     return userManagement.signOutUser()
// }

// var setUpData = function(event, data, instance){
//     data.user = getCurrentUser()
// }

// var softUpdate= function (event, data, instance) {

// }

var instanceCard =createAdler({
    content: p => /*html*/`
    <div class="instance-card">
        <div class="card">
            
            <div class="card-content">
            <div class="media">
                <div class="media-left">
                <figure class="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
                </div>
                <div class="media-content">
                <p class="title is-4">${p.instance.name}</p>
                
                <p class="subtitle is-6">
                    <div class="tags has-addons">
                        <span class="tag">Type</span>
                        <span style="background-color:${p.instance?.color};" class="tag is-primary">${p.instance.sourceEntity?.name}</span>
                    </div>
                </p>
                </div>
            </div>
        
            <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
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
            instance:{name:"no name"},
            // onClick:()=>signOutUser(),
            // onClickSettings:()=>state_manager.goTo("/:/settings/model/entities")
        },
        on:[
            // [".user-macaron-pic","click", (event, data, instance)=> data.onClick(event, data, instance) ],
            // [".user-macaron-settings","click", (event, data, instance)=> data.onClickSettings(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            // onMount:(event, data, instance) => setUpTable(event, data, instance),
            
        },
        methods:{
            // softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    css:/*css*/`

    `,
})

export default instanceCard