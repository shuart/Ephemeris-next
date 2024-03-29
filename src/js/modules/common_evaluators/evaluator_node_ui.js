import createAdler from "../../vendor/adlerLegacy.js";
import createStellae from "../../vendor/stellae/stellae.js";
import createEvaluatorsManagement from "../common_project_management/evaluators_management.js";
import evaluatorTemplates from "./evaluator_nodes_templates.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import table_viewport from "../viewports/table_viewport/table_ui.js"

var softUpdate= function (event, data, instance) {

}

var setUp = function (event, data, instance) {
    setTimeout(() => {
        var element= instance.query('.graph')
        element.innerHTML = ''//TODO GRAPH IS LOADED 2 TIMES. PREVENT THAT
        data.graph = createStellae({
            container:element, 
            fullSize:true, 
            addListDefaultIconPath:"./img/icons/hexagon.svg",
            addListCustomCategoriesIconPath:{
                input:"./img/icons/arrow-right-circle.svg",
                Input:"./img/icons/arrow-right-circle.svg",
                Mathematics:"./img/icons/plus-square.svg",
                data:"./img/icons/box.svg",
                attribute:"./img/icons/book.svg",
                relations:"./img/icons/share-2.svg",
                Actions:"./img/icons/play-circle.svg",
                output:"./img/icons/monitor.svg",
                Helpers:"./img/icons/coffee.svg",
            },
        })
    
        var repo = createEvaluatorsManagement()
        var currentGraph = repo.getById(instance.props.get("evaluatorId"))
        data.graph.getNodeManager().useTemplate(evaluatorTemplates)
        
        if (currentGraph.attributes.nodeLayout) {
            
            data.graph.getNodeManager().importGraph(JSON.parse(currentGraph.attributes.nodeLayout))
        }
    }, 500);

}

var saveNetwork = function (event, data, instance) {
    var exportGraph = data.graph.getNodeManager().exportNodes()
    console.log(exportGraph);
    var repo = createEvaluatorsManagement()
    repo.update({uuid:instance.props.get("evaluatorId"), nodeLayout:JSON.stringify(exportGraph)})
    console.log(repo.getAll())
    // alert(instance.props.get("evaluatorId"))
}

var showPreview = function (event,data,instance) {
    mainPopup.mount()
    mainPopup.append(table_viewport.instance({
        props:{
            settings:{evaluatorId:instance.props.get("evaluatorId")},
        }
    }), "main-slot")
    mainPopup.update();
}

var getSchema = function (event,data,instance) {
    var exportGraph = data.graph.getNodeManager().exportNodes()
    console.log(exportGraph);
    console.log(JSON.stringify(exportGraph));
}



var evaluator_node_ui =createAdler({
    content: p => /*html*/`
    <div class="Component">
        <nav class="navbar container" role="navigation" aria-label="main navigation">

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                <a class="navbar-item action_settings_add_entity">
                    Add
                </a>

                <a class="navbar-item action_settings_save_network">
                    Save
                </a>
                <a class="navbar-item action_settings_show_preview">
                    preview
                </a>
                <a class="navbar-item action_settings_get_schema">
                    Get Schema
                </a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link action_settings_show_preview">
                    More
                    </a>

                    <div class="navbar-dropdown">
                    <a class="navbar-item">
                        About
                    </a>
                    <a class="navbar-item">
                        Jobs
                    </a>
                    <a class="navbar-item">
                        Contact
                    </a>
                    <hr class="navbar-divider">
                    <a class="navbar-item">
                        Report an issue
                    </a>
                    </div>
                </div>
                </div>

                <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                    </div>
                </div>
                </div>
            </div>
        </nav>
        <div style="width:100%; height:800px; position:relative" class="graph" >GRAPH</div>
    </div>
        `,
    params:{
        props:{
            evaluatorId:false,
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
            evaluatorId:false,
            graph: undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            [".action_settings_save_network","click", saveNetwork ],
            [".action_settings_show_preview","click", showPreview ],
            [".action_settings_get_schema","click", getSchema ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            onMount:(event, data, instance) => setUp(event, data, instance),
            
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

export default evaluator_node_ui