import createStellaeUi from "./stellae_ui.js";
import createNodeManager from "./stellae_nodes.js";

function createStellae({
    container = document.body,
    canvasWidth =800,
    canvasHeight = 500,
    darkMode = "auto",
    } = {}) {
    var self = {};
    var ui = undefined;
    var nodeManager = undefined;

    var templateData= {
        name : "Node",
        props :[
            {id:"plif", label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
            {id:"plaf", label:"demo2", type:"text", editable:true, socket:"input", value:"Default2"},
            {id:"plouf", label:"demo2", type:"text", editable:true, socket:"output", value:"Default3"},
            {id:"roio", label:"demo4", type:"text", editable:true, socket:"none", value:"Default3"},
        ],
        links:{
            plif:undefined,
            plaf:undefined,
            plouf:undefined,
        },
        methods:{
            mixString:(props) => {
                props.demoId3.set(props.plif.get() +props.plaf.get())
            }
        },
        event:{
            onEvaluate:(props) =>{
                props.demoId3.set(props.plif.get() +props.plaf.get())
            },
            onInit:(props) => alert(props.plif.get()),
        },
    }

    var init = function () {
        ui = createStellaeUi({container:container,canvasWidth:canvasWidth,canvasHeight:canvasHeight,darkMode:darkMode})
        nodeManager = createNodeManager({ui:ui})
        nodeManager.addNodeTemplate("test", templateData)
        nodeManager.addNode("test", {name:"partouf", uuid:"100"})
        nodeManager.addNode("test", {name:"part", uuid:"110"})
        nodeManager.addNode("test")
        nodeManager.addLinks([
            {from:"partouf", from_socket:"plouf", to:"part", to_socket:"plif"}
        ])
    }
    init()
    return self
}
export default createStellae