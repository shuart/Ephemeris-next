import createAdler from "../../../vendor/adler.js";


var softUpdate= function (event, data, instance) {

}

var setUp = function (event, data, instance) {
    
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component">
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
        replaceComponents:{
            //set here components to replace
        },
    },
    components:{
        // table_component: table_component
    }
    // css:/*css*/` `,
})

export default component

////////////#########################################################""

import { createAdler } from "./adler3.js"
// import style from "https://unpkg.com/chota@latest"

var HelloWorld = createAdler({
    tag:'hello-world',
    props:{
        to_print:"foo",
        to_print_reac:"bar",
    },
    attributes:[
        "to_print",
        "to_print_reac",
    ],
    html:()=>/*html*/`
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">
        <div class="target2">target</div>
        <button class="pure-button"><div class="target">target</div></button>
    `,
    onRender:(self) =>{
        self.useEffect(
            ()=>{
                console.trace(self.shadowRoot);
              self.query('.target').innerText = self.to_print 
            }
        );
        self.useEffect(
            ()=>{
                console.trace(self.shadowRoot);
              self.query('.target2').innerText = self.to_print_reac 
            }
        );
        console.trace("whole restart why???");
        setTimeout(function (params) {
            self.to_print = 45
        },3000)
    },
})

export {HelloWorld}
////////////#########################################################""

var gridViewHeadersTEMP = createAdler({
    tag:'eph-grid-view-headers',
    props:{
        currentPageId:undefined,
        currentArea:undefined,
        calledFromInstance:undefined,
        cols:4,
        rows:4,
        schema:[],
        showSettings:false,
    },
    attributes:[
    ],
    events : [
        ["click", '.action_grid_add', addComp],
        ["click", '.action-grid-save', saveNewLayout],
        ["click", '.action-grid-add-left', addCompLeft],
        ["click", '.action-grid-toggle-edit', toogleSettings],
    ],
    html:()=>/*html*/`
        <link rel="stylesheet" href="css/bulma.min.css">
        <link rel="stylesheet" href="css/bulma.dark.css">

        <link rel="stylesheet" href="css/main.css">


        <div class="area container is-widescreen">
            <div class="button action-grid-toggle-edit">edit</div>
            <button class="button action_grid_add only_settings">add</button>
            <div class="button action-grid-save only_settings">Save</div>
            <div class="button action-grid-add-left only_settings">Add to Left Panel</div>
            <div class="block"></div>
            <div class="viewGridArea"></div>

            <div class="viewGridAreaDemoLeft only_settings"></div>

        </div>
        
    `,
    onRender:(self) =>{
        updateView(self)
        
    },
    css:`

    `,
})

export {gridViewHeadersTEMP}