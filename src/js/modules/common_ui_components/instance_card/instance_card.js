import createAdler from "../../../vendor/adler.js";
import userManagement from "../../common_user_management/user_management.js";
import state_manager from "../../common_state/state_manager.js";

import createTexteArea from "../textEditor.js/textEditor.js";

// var getCurrentUser = function () {
//     return userManagement.getCurrentUser()
// }

// var signOutUser = function () {
//     return userManagement.signOutUser()
// }

var setUp = function(event, data, instance){
    // data.user = getCurrentUser()
    var textContainer = instance.query(".textEditorDesc")
    data.editor = createTexteArea({
        container:textContainer,
        customClass:"textarea",
    })
    instance.query(".ProseMirror").classList += " ephtextarea"
}

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
                    <img class="darkModeCompatibleIcons" src="./img/icons/${p.instance.sourceEntity?.iconPath}" alt="Placeholder image">
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
                <div class="textEditorDesc"></div>
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
            onMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            // softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    css:/*css*/`
        .ephtextarea{
            background-color: #262626;
            border-color: #363636;
            color: #dbdbdb;
            box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
            padding: 15px;
        }
        .ephtextarea:focus{
            outline: none;
            
        }
    `,
})

export default instanceCard