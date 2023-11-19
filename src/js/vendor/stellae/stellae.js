import createStellaeUi from "./stellae_ui.js";
import createNodeManager from "./stellae_nodes.js";
import injectCssStyles from "./stellae_css_styles.js";

injectCssStyles()

function createStellae({
    container = document.body,
    fullSize = false,
    canvasWidth =1500,
    canvasHeight = 500,
    darkMode = "auto",
    headless = false,
    simulateForces = false,
    uiCallbacks = {},
    showNodeList= false,
    showSearchBox= false,
    showToolbar =false,
    highlightConnections= false,
    addNodesFromCustomList= false,
    addListDefaultIconPath=false,
    addListCustomCategoriesIconPath=false,
    allowCustomNameForNodes= false,
    allowCustomNameForRelations = false,
    } = {}) {
    var self = {};
    var ui = undefined;
    var nodeManager = undefined;

    // var templateData= {
        
    //     name : "Node",
    //     props :[
    //         {id:"plif", label:"plif", type:"text", editable:true, socket:"input", value:"Default"},
    //         {id:"plaf", label:"plaf", type:"text", editable:true, socket:"input", value:"Default2"},
    //         {id:"plouf", label:"plouf", type:"text", editable:true, socket:"output", value:"Default3"},
    //         {id:"roio", label:"roio", type:"text", editable:true, socket:"none", value:"Default3"},
    //     ],
    //     methods:{
    //         mixString:(props) => {
    //             props.demoId3.set(props.plif.get() +props.plaf.get())
    //         }
    //     },
    //     event:{
    //         // onEvaluate:(props) =>{
    //         //     props.demoId3.set(props.plif.get() +props.plaf.get())
    //         // },
    //         // onInit:(props) => alert(props.plif.get()),
    //     },
    // }

    var init = function () {

        if (fullSize) {
            // var size = container.getBoundingClientRect()
            canvasWidth = container.clientWidth;
            canvasHeight = container.clientHeight;
            
        }
        // else{
        //     // ui = createStellaeUi({container:container,canvasWidth:canvasWidth,canvasHeight:canvasHeight,darkMode:darkMode})
        //     // nodeManager = createNodeManager({ui:ui})
        //     // nodeManager.useBaseTemplates()
        // }
        if (headless) {
            nodeManager = createNodeManager()
        }else{
            
            ui = createStellaeUi({
                container:container,
                canvasWidth:canvasWidth,
                canvasHeight:canvasHeight,
                darkMode:darkMode, 
                useSimulation:simulateForces, 
                uiCallbacks:uiCallbacks,
                showList:showNodeList,
                showSearchBox:showSearchBox,
                showToolbar:showToolbar,
                useConnectionHighlighter:highlightConnections,
                useCustomNodeAddList:addNodesFromCustomList,
                addListDefaultIconPath:addListDefaultIconPath,
                addListCustomCategoriesIconPath:addListCustomCategoriesIconPath,
                allowCustomNameForNodes:allowCustomNameForNodes,
                allowCustomNameForRelations:allowCustomNameForRelations,
            })
            nodeManager = createNodeManager({ui:ui})
            
        }
        
        nodeManager.useBaseTemplates()
        // nodeManager.addNodeTemplate("test", templateData)


        // nodeManager.addNode("math_add", {uuid:"100",name:"100 add",  position:{x:2,y:4}})
        // nodeManager.addNode("input_number", { uuid:"114", name:"114 input"})
        // nodeManager.addNode("math_compare", { uuid:"115", name:"114 compare"})
        // nodeManager.addNode("viewer_result")
        
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
    var getNodeManager = function () {
        return nodeManager
    }
    self.getNodeManager = getNodeManager
    return self
}
export default createStellae