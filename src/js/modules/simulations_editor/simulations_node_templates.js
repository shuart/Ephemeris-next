import createInstancesManagement from "../common_project_management/instances_management.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import createRelationsManagement from "../common_project_management/relations_management.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"
import showPopupInstancePreview from "../popup_instance_preview/popup_instance_preview.js";

var getProp = function(props,propName, data){
    var valuePassed = props[propName].get()
    if (data && valuePassed instanceof Function) {
        valuePassed = valuePassed(data)
    }
    return valuePassed
}


var simulationNodesTemplates = {}

var nodeColors = {
    input:0x83314a,
    inputData:0x00d6a3,
    inputObject:0xed9e5c,
    output:0x1d1d1d,
    attribute:0xa35abd,
    flux:0x3072d6,
    process:0xed9e5c,
}


simulationNodesTemplates.source = {
    templateName : "source",
    name : "Source",
    style:{
        headerColor:nodeColors.inputData,
    },
    category:"Simulation",
    props :[
        {id:"output", expect:"data", isSquare:false, label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"input", expect:"data", isSquare:false, label:"Input", type:"hidden", editable:false, socket:"input", value:"output"},
        {id:"qt", expect:undefined, label:"Quantity", type:"text", editable:false, socket:"input", value:5},
        {id:"outValue", expect:undefined, label:"Contains", type:"secret", editable:false, socket:"none", value:0},
        {id:"outObjects", expect:undefined, label:"Quantity", type:"secret", editable:false, socket:"none", value:[]},

    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            // debugger
            // var test = props.qt.get()
            // console.log(test);
        },
        onInit:(props) =>{
            // var entityRepo = createEntityManagement()
            // console.log(entityRepo.getAll());
            // // alert()
            // props.method.setOptions(entityRepo.getAll().map(function (e) {
            //     return {id:e.uuid, value:e.name}
            // }))
            
            
        },
    },
}


simulationNodesTemplates.flux = {
    templateName : "flux",
    name : "Flux",
    style:{
        headerColor:nodeColors.flux,
    },
    category:"Simulation",
    props :[
        {id:"output", expect:"data", isSquare:false, label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"input", expect:"data", isSquare:false, label:"Input", type:"hidden", editable:false, socket:"input", value:"output"},
        {id:"flux", expect:"string", label:"Quantity", type:"text", editable:false, socket:"input", value:5},

    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{

        },
        onInit:(props) =>{
            // var entityRepo = createEntityManagement()
            // console.log(entityRepo.getAll());
            // // alert()
            // props.method.setOptions(entityRepo.getAll().map(function (e) {
            //     return {id:e.uuid, value:e.name}
            // }))
            
            
        },
    },
}

simulationNodesTemplates.stock = {
    templateName : "stock",
    name : "Stock",
    style:{
        headerColor:nodeColors.attribute,
    },
    category:"Simulation",
    props :[
        {id:"output", expect:"data", isSquare:false, label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"input", expect:"data", isSquare:false, label:"Input", type:"hidden", editable:false, socket:"input", value:"output"},
        {id:"inObjects", expect:undefined, label:"Value", type:"secret", editable:false, socket:"none", value:[]},
        {id:"outValue", expect:undefined, label:"Value", type:"secret", editable:false, socket:"none", value:0},
        {id:"outObjects", expect:undefined, label:"Quantity", type:"secret", editable:false, socket:"none", value:[]},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{

        },
        onInit:(props) =>{
        },
    },
}

simulationNodesTemplates.variable = {
    templateName : "variable",
    name : "Variable",
    style:{
        headerColor:nodeColors.inputData,
    },
    category:"Simulation",
    props :[
        {id:"output", expect:"data", isSquare:false, label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"variable",expect:"string", label:"Message", type:"text", editable:true, socket:"none", value:1},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            props.output.set(props.variable.get() ) 
        },
        onInit:(props) =>{
        },
    },
}



simulationNodesTemplates.process = {
    templateName : "process",
    name : "Process",
    style:{
        headerColor:nodeColors.process,
    },
    category:"Simulation",
    props :[
        {id:"output", expect:"data", isSquare:false, label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"input", expect:"data", isSquare:false, label:"Input", type:"hidden", editable:false, socket:"input", value:"output"},
        {id:"duration", expect:undefined, label:"Duration", type:"text", editable:false, socket:"input", value:5},
        {id:"outValue", expect:undefined, label:"Value", type:"secret", editable:false, socket:"none", value:0},
        {id:"inObjects", expect:undefined, label:"Value", type:"secret", editable:false, socket:"none", value:[]},
        {id:"bufferObjects", expect:undefined, label:"Quantity", type:"secret", editable:false, socket:"none", value:{}},
        {id:"outObjects", expect:undefined, label:"Quantity", type:"secret", editable:false, socket:"none", value:[]},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{

        },
        onInit:(props) =>{
        },
    },
}

simulationNodesTemplates.frame = {
    templateName : "simulation_frame",
    name : "Frame",
    style:{
        headerColor:nodeColors.input,
    },
    category:"Simulation",
    props :[
        {id:"output", expect:"string", isSquare:false, label:"output", type:"hidden", editable:false, socket:"output", value:1},
        {id:"outValue", expect:undefined, label:"Value", type:"secret", editable:false, socket:"none", value:0},
        {id:"frame", expect:undefined, label:"Value", type:"text", editable:false, socket:"none", value:1},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            props.output.set(props.frame.get())
        },
        onInit:(props) =>{
        },
    },
}


// simulationNodesTemplates.sourceEntity = {
//     templateName : "source_entity",
//     name : "Source2",
//     style:{
//         headerColor:nodeColors.inputData,
//     },
//     category:"Simulation",
//     props :[
//         {id:"output", expect:"data", isSquare:false, label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
//         {id:"outputReference", expect:"string", label:"Type Reference", type:"hidden", editable:false, socket:"output", value:""},
//         // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
//         {id:"method", label:"", type:"select", options:[
//             {id:"Greater_Than", value:"Greater Than"},
//             {id:"Greater_Than_Or_Equal", value:"Greater Than or Equal"},
//             {id:"Less_Than", value:"Less Than"},
//             {id:"Less_Than_Or_Equal", value:"Less Than or Equal"},
//             {id:"Equal", value:"Equal"},
//         ],editable:true, socket:"none", value:"Greater Than"},
//         // {id:"a", label:"A", type:"text", editable:true, socket:"input", value:"0"},
//         // {id:"b", label:"B", type:"text", editable:true, socket:"input", value:"0"},
//     ],
//     methods:{
//     },
//     event:{
//         onEvaluate:(props) =>{
//             var entityRepo = createEntityManagement()
//             var instanceRepo = createInstancesManagement()
//             console.log(instanceRepo.getByType());
//             // alert()
//             // if (props.method.get() == "Greater Than") {
//             //     if (parseInt(props.a.get())  > parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
//             // }else if (props.method.get() == "Less Than"){
//             //     if (parseInt(props.a.get())  < parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
//             // }else if (props.method.get() == "Equal"){
//             //     if (parseInt(props.a.get()) == parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
//             // }else if (props.method.get() == "Greater Than or Equal"){
//             //     if (parseInt(props.a.get()) >= parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
//             // }else if (props.method.get() == "Less Than or Equal"){
//             //     if (parseInt(props.a.get()) <= parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
//             // }
//             // props.output.set(entityRepo.getAll()[0].uuid)
//             props.output.set(instanceRepo.getByType(props.method.getOptionId()))
//             props.outputReference.set(props.method.getOptionId())
//         },
//         onInit:(props) =>{
//             var entityRepo = createEntityManagement()
//             console.log(entityRepo.getAll());
//             // alert()
//             props.method.setOptions(entityRepo.getAll().map(function (e) {
//                 return {id:e.uuid, value:e.name}
//             }))
            
            
//         },
//     },
// }


export default simulationNodesTemplates