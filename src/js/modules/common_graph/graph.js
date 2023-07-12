import createAdler from "../../vendor/adlerLegacy.js";
import createStellae from "../../vendor/stellae/stellae.js";


var softUpdate= function (event, data, instance) {

}

var setUp = function (event, data, instance) {
    var element= instance.query('.graph')
    createStellae({container:element})
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component">
        <div style="width:100%; height:800px;" class="graph" >GRAPH</div>
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
            onMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    components:{
        // table_component: table_component
    }
    // css:/*css*/` `,
})

export default component