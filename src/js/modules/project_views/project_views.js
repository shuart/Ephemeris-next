import createAdler from "../../vendor/adler.js";


var softUpdate= function (event, data, instance) {

}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component">
        ${p.viewId}
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
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            // onMount:(event, data, instance) => setUpTable(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    // css:/*css*/` `,
})

export default component