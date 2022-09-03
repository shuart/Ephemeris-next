import createAdler from "../../vendor/adler.js";
import table_viewport from "../viewports/table_viewport/table_ui.js"
import graph from "../common_graph/graph.js"
import viewGridSettings from "./view_grid_settings.js"

var softUpdate= function (event, data, instance) {

}

function setUp(event, data, instance){
    instance.append(viewGridSettings.instance(), "view_mount_point_grid");
    instance.append(graph.instance(), "view_mount_point0");
    instance.append(table_viewport.instance(), "view_mount_point1");
}

function addEntity(event, data, instance){
    instance.append(table_viewport.instance(), "view_mount_point1");
}



var component =createAdler({
    content: p => /*html*/`
    <div class="Component">
        ${p.viewId}
        <div a-slot="view_mount_point_grid"></div>
        <div a-slot="view_mount_point0"></div>
        <div a-slot="view_mount_point1"></div>
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
            viewId:"Hello",
            list:[],
            table:undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            // [".tableCddomponent","click", (event, data, instance)=> data.onClick(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => alert("eeee"),
            onMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    // css:/*css*/` `,
})

export default component