import createAdler from "../../vendor/adler.js";
import user_macaron from "../common_ui_components/user_macaron/user_macaron.js";
import common_side_bar from "./page_links.js";


var softUpdate= function (event, data, instance) {

}

var component =createAdler({
    content: p => /*html*/`
    <div class="toolbar">
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
            // [".tableCddomponent","click", (event, data, instance)=> data.onClick(event, data, instance) ],
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
    .user-area{
        position: absolute;
        bottom: 0px;
    }
    .side-bar-page-area{
        position: absolute;
        top: 60px;
    }
    `,
    components:{
        user_macaron: user_macaron,
        common_side_bar: common_side_bar,
    }
})

export default component