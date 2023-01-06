var baseTemplates = {}


baseTemplates.input_number = {
    templateName : "input_number",
    name : "Number",
    category:"Input",
    props :[
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"number", label:"Number", type:"text", editable:true, socket:"none", value:"0"},
    ],
    methods:{
        // mixString:(props) => {
        //     props.demoId3.set(props.plif.get() +props.plaf.get())
        // }
    },
    event:{
        // onEvaluate:(props) =>{
        //     props.demoId3.set(props.plif.get() +props.plaf.get())
        // },
        onEvaluate:(props) =>{
            props.output.set(props.number.get())
        },
        // onInit:(props) => alert(props.plif.get()),
    },
}

baseTemplates.passtrough = {
    templateName : "in_out",
    name : "in_out",
    category:"Helpers",
    props :[
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"input", label:"input", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
        // mixString:(props) => {
        //     props.demoId3.set(props.plif.get() +props.plaf.get())
        // }
    },
    event:{
        // onEvaluate:(props) =>{
        //     props.demoId3.set(props.plif.get() +props.plaf.get())
        // },
        onEvaluate:(props) =>{
            props.output.set(props.input.get())
        },
        // onInit:(props) => alert(props.plif.get()),
    },
}

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

baseTemplates.math = {
    templateName : "math",
    name : "Math",
    // style:{
    //     headerColor:nodeColors.inputData,
    // },
    category:"Mathematics",
    props :[
        {id:"output", expect:"data", isSquare:false, label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"method", label:"", type:"select", options:[
            {id:"add", value:"Add"},
            {id:"substract", value:"Substract"},
            {id:"multiply", value:"Multiply"},
            {id:"divide", value:"Divide"},
        ],editable:true, socket:"none", value:"Add"},
        {id:"a",expect:"string", label:"a", type:"text", editable:true, socket:"input", value:1},
        {id:"b",expect:"string", label:"b", type:"text", editable:true, socket:"input", value:1},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var method = props.method.getOptionId()
            if (method =="add") {
                props.output.set( parseInt( props.a.get() ) +parseInt( props.b.get() )  )   
            } else if (method =="substract") {
                props.output.set( props.a.get() ) - parseInt( props.b.get() ) 
            } else if (method =="multiply") {
                props.output.set( props.a.get() ) * parseInt( props.b.get() ) 
            } else if (method =="divide") {
                props.output.set( props.a.get() ) / parseInt( props.b.get() )  
            }
            
        },
        onInit:(props) =>{
        },
    },
}

baseTemplates.math_compare = {
    templateName : "math_compare",
    name : "Compare",
    category:"Mathematics",
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
            
        },
    },
}

baseTemplates.viewer_result = {
    templateName : "viewer_result",
    name : "viewer",
    category:"Helpers",
    props :[
        {id:"result", label:"result", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    // event:{
    //     onEvaluate:(props) =>{
    //         props.output.set(parseInt( props.number1.get() ) +parseInt( props.number2.get() ) )
    //     },
    // },
}

export default baseTemplates