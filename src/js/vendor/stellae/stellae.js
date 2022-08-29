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
            {id:"plif", label:"plif", type:"text", editable:true, socket:"input", value:"Default"},
            {id:"plaf", label:"plaf", type:"text", editable:true, socket:"input", value:"Default2"},
            {id:"plouf", label:"plouf", type:"text", editable:true, socket:"output", value:"Default3"},
            {id:"roio", label:"roio", type:"text", editable:true, socket:"none", value:"Default3"},
        ],
        methods:{
            mixString:(props) => {
                props.demoId3.set(props.plif.get() +props.plaf.get())
            }
        },
        event:{
            // onEvaluate:(props) =>{
            //     props.demoId3.set(props.plif.get() +props.plaf.get())
            // },
            // onInit:(props) => alert(props.plif.get()),
        },
    }

    var init = function () {
        ui = createStellaeUi({container:container,canvasWidth:canvasWidth,canvasHeight:canvasHeight,darkMode:darkMode})
        nodeManager = createNodeManager({ui:ui})
        nodeManager.useBaseTemplates()
        nodeManager.addNodeTemplate("test", templateData)
        nodeManager.addNode("math_add", {uuid:"100",name:"100 add",  position:{x:2,y:4}})
        nodeManager.addNode("input_number", { uuid:"114", name:"114 input"})
        nodeManager.addLinks([
            // {from:"100", from_socket:"plouf", to:"110", to_socket:"plif"},
            // {from:"110", from_socket:"plouf", to:"111", to_socket:"plif"},
        ])

        // setTimeout(function(){
        //     nodeManager.getNode(111).setProp("plif","newvalue")
        //     alert()
        // },5000)
    }
    init()
    return self
}
export default createStellae