var baseTemplates = {}


baseTemplates.input_number = {
    templateName : "input_number",
    name : "Number",
    props :[
        {id:"output", label:"output", type:"text", editable:false, socket:"output", value:"output"},
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

baseTemplates.math_add = {
    templateName : "math_add",
    name : "Add",
    props :[
        {id:"output", label:"output", type:"text", editable:false, socket:"output", value:"output"},
        {id:"number1", label:"Number", type:"text", editable:true, socket:"input", value:"0"},
        {id:"number2", label:"Number", type:"text", editable:true, socket:"input", value:"0"},
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
            props.output.set(parseInt( props.number1.get() ) +parseInt( props.number2.get() ) )
        },
        // onInit:(props) => alert(props.plif.get()),
    },
}

export default baseTemplates