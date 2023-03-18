import createAdler from "../../vendor/adler.js";
import user_macaron from "../common_ui_components/user_macaron/user_macaron.js";
import common_side_bar from "./page_links.js";
import state from "../common_state/state_manager.js";


var softUpdate= function (event, data, instance) {

}

var component =createAdler({
    content: p => /*html*/`
    <div class="toolbar">
        <div class="common_side_bar_logo" ></div>
        <div class="side-bar-page-area">
            <div adler="common_side_bar" ></div>
        </div>
        <div class="user-area">
         <div adler="user_macaron" ></div>
        </div>
    </div>
        `,
    params:{
        props:{
            test:15,
        },
        listen:{
            test:function (event, data, instance) {
                //alert("test")
            }
        },
        data:{
            value:"Hello",
            list:[],
            table:undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            [".common_side_bar_logo","click", (event, data, instance)=> state.goTo("/") ],
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
    .common_side_bar_logo{
        position: absolute;
        cursor:pointer;
        top: 5px;
        left: 3px;
        width:45px;
        height:45px;
        background-image: url("img/logo.png");
        background-position: center; /* Center the image */
        background-repeat: no-repeat; /* Do not repeat the image */
        background-size: cover; /* Resize the background image to cover the entire container */
    }
    .user-area{
        position: absolute;
        bottom: 0px;
    }
    .side-bar-page-area{

        padding-top: 60px;
    }
    `,
    components:{
        user_macaron: user_macaron,
        common_side_bar: common_side_bar,
    }
})

export default component