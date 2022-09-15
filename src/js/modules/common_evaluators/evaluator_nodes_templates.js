import createInstancesManagement from "../common_project_management/instances_management.js";
import createEntityManagement from "../common_project_management/entity_management.js";

var basicEvaluation = function(){
    // var result = {}
    // var instancesRepo = createInstancesManagement()
    // console.log(instancesRepo.getByType(type));
    // result.list = instancesRepo.getByType(type)
    // result.addAction = instancesRepo.add
    // return result;

    var entityRepo = createEntityManagement()
}

var evaluatorTemplates = {}


// baseTemplates.input_number = {
//     templateName : "input_number",
//     name : "Number",
//     props :[
//         {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
//         {id:"number", label:"Number", type:"text", editable:true, socket:"none", value:"0"},
//     ],
//     methods:{
//         // mixString:(props) => {
//         //     props.demoId3.set(props.plif.get() +props.plaf.get())
//         // }
//     },
//     event:{
//         // onEvaluate:(props) =>{
//         //     props.demoId3.set(props.plif.get() +props.plaf.get())
//         // },
//         onEvaluate:(props) =>{
//             props.output.set(props.number.get())
//         },
//         // onInit:(props) => alert(props.plif.get()),
//     },
// }

// baseTemplates.math_add = {
//     templateName : "math_add",
//     name : "Add",
//     props :[
//         {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
//         {id:"number1", label:"Number", type:"text", editable:true, socket:"input", value:"0"},
//         {id:"number2", label:"Number", type:"text", editable:true, socket:"input", value:"0"},
//     ],
//     methods:{
//     },
//     event:{
//         onEvaluate:(props) =>{
//             props.output.set(parseInt( props.number1.get() ) +parseInt( props.number2.get() ) )
//         },
//     },
// }


evaluatorTemplates.sourceEntity = {
    templateName : "source_entity",
    name : "Source",
    props :[
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"method", label:"", type:"select", options:[
            {id:"Greater_Than", value:"Greater Than"},
            {id:"Greater_Than_Or_Equal", value:"Greater Than or Equal"},
            {id:"Less_Than", value:"Less Than"},
            {id:"Less_Than_Or_Equal", value:"Less Than or Equal"},
            {id:"Equal", value:"Equal"},
        ],editable:true, socket:"none", value:"Greater Than"},
        {id:"a", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"b", label:"B", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var entityRepo = createEntityManagement()
            var instanceRepo = createInstancesManagement()
            console.log(instanceRepo.getByType());
            // alert()
            if (props.method.get() == "Greater Than") {
                if (parseInt(props.a.get())  > parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
            }else if (props.method.get() == "Less Than"){
                if (parseInt(props.a.get())  < parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
            }else if (props.method.get() == "Equal"){
                if (parseInt(props.a.get()) == parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
            }else if (props.method.get() == "Greater Than or Equal"){
                if (parseInt(props.a.get()) >= parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
            }else if (props.method.get() == "Less Than or Equal"){
                if (parseInt(props.a.get()) <= parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
            }
            // props.output.set(entityRepo.getAll()[0].uuid)
            props.output.set(instanceRepo.getByType(props.method.getOptionId()))
        },
        onInit:(props) =>{
            var entityRepo = createEntityManagement()
            console.log(entityRepo.getAll());
            // alert()
            props.method.setOptions(entityRepo.getAll().map(function (e) {
                return {id:e.uuid, value:e.name}
            }))
            
            
        },
    },
}

evaluatorTemplates.extractProperty = {
    templateName : "extract_property",
    name : "extract_property",
    props :[
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"method", label:"", type:"select", options:[
            {id:"Greater_Than", value:"Greater Than"},
            {id:"Greater_Than_Or_Equal", value:"Greater Than or Equal"},
            {id:"Less_Than", value:"Less Than"},
            {id:"Less_Than_Or_Equal", value:"Less Than or Equal"},
            {id:"Equal", value:"Equal"},
        ],editable:true, socket:"none", value:"Greater Than"},
        {id:"a", label:"A", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            // var entityRepo = createEntityManagement()
            // console.log(entityRepo.getAll());
            
            // props.method.setOptions(props.a.get().map(function (e) {
            //         var currentKey = e.parameters.keys
            //         return {id:e.uuid, value:e.name}
            // }))
            if (props.a.get()[0] && props.a.get()[0].properties) {
                props.method.setOptions(Object.keys(props.a.get()[0].properties).map(function (e) {
                    return {id:e, value:e}
                }))
                // props.output.set("undefined")
                if (props.method.get()) {
                    props.output.set(props.a.get().map(function (e) {
                        console.log(e.properties);
                        return {[props.method.get()]:e.properties[props.method.get()]}
                    }))
                }
            }else{
                props.output.set("undefined")
            }

            
            
            // alert(props.a.get())
            // if (props.method.get() == "Greater Than") {
            //     if (parseInt(props.a.get())  > parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
            // }else if (props.method.get() == "Less Than"){
            //     if (parseInt(props.a.get())  < parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
            // }else if (props.method.get() == "Equal"){
            //     if (parseInt(props.a.get()) == parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
            // }else if (props.method.get() == "Greater Than or Equal"){
            //     if (parseInt(props.a.get()) >= parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
            // }else if (props.method.get() == "Less Than or Equal"){
            //     if (parseInt(props.a.get()) <= parseInt(props.b.get())) {props.output.set(1)} else {props.output.set(0)}
            // }
            // var entityRepo = createEntityManagement()
            // var prop = entityRepo.getById(props.a.get())
            // console.log(prop);
            // console.log(entityRepo.getAll());
            // alert()
            // props.method.setOptions(entityRepo.getAll().map(function (e) {
            //     return {id:e.uuid, value:e.name}
            // }))
            
        },
        onInit:(props) =>{
            // var entityRepo = createEntityManagement()
            // console.log(entityRepo.getAll());
            // alert()
            // props.method.setOptions(entityRepo.getAll().map(function (e) {
            //     return {id:e.uuid, value:e.name}
            // }))
            
            
        },
    },
}

evaluatorTemplates.outputTable = {
    templateName : "output_table",
    name : "output_table",
    props :[
        // {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"rows", label:"rows", type:"text", editable:true, socket:"input", value:"0"},
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

// baseTemplates.viewer_result = {
//     templateName : "viewer_result",
//     name : "viewer",
//     props :[
//         {id:"result", label:"result", type:"text", editable:true, socket:"input", value:"0"},
//     ],
//     methods:{
//     },
//     // event:{
//     //     onEvaluate:(props) =>{
//     //         props.output.set(parseInt( props.number1.get() ) +parseInt( props.number2.get() ) )
//     //     },
//     // },
// }

export default evaluatorTemplates