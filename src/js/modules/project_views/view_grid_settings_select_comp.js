import createAdler from "../../vendor/adler.js";
import thumbs from "../common_ui_components/select_thumbnails_view/select_thumbnails_view.js"


var softUpdate= function (event, data, instance) {

}

var setUp = function (event, data, instance) {
    
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component">
        <div adler="thumbs" class="Component"></div>
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
            // onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            // onMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    components:{
        thumbs: thumbs
    }
    // css:/*css*/` `,
})

export default component