import createAdler from "../../../vendor/adlerLegacy.js";


var softUpdate= function (event, data, instance) {

}

var setUp = function (event, data, instance) {
    var options = instance.props.options.get()
    for (let i = 0; i < options.length; i++) {
        const element = options[i];
        var htmlElement = document.createElement("div")
        htmlElement.classList="select_thumbnails_thumb";
        htmlElement.innerHTML =element.value;
        htmlElement.addEventListener('click', element.callback)
        instance.getDOMElement().appendChild(htmlElement)
    }
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component">
    </div>
        `,
    params:{
        props:{
            options:[
                {id:1, value:"test", imgSrc:undefined, callback:(event)=>{alert("test")} },
                {id:2, value:"test2", imgSrc:undefined, callback:(event)=>{alert("test2")} },
            ],
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