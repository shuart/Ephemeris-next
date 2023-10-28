import { settingsNodeColors as nodeColors } from "./settings_node_colors.js"


function containsOnlyNumbers(str) {
    return /^[+-]?[0-9]+$/.test(str);
}
function containsOnlyFloat(str) {
    return /^[+-]?[0-9]+\.[0-9]+$/.test(str);
}

function checkForNumbers(str){
    if (containsOnlyNumbers(str)) {
        return parseInt(str)
    }else if(containsOnlyFloat(str)){
        return parseFloat(str)
    }else{
        return str
    }
}


export var mathDataCompare = {
    templateName : "math_data_compare",
    name : "Data Compare",
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
            {id:"Not Equal", value:"Not Equal"},
        ],editable:true, socket:"none", value:"Greater Than"},
        {id:"a", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"b", label:"B", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var condition = undefined

            if (props.method.get() == "Greater Than") {
                condition=(A,B)=> A > B
            }else if (props.method.get() == "Greater Than or Equal") {
                condition=(A,B)=> A >= B
            }else if (props.method.get() == "Less Than") {
                condition=(A,B)=> A < B
            }else if (props.method.get() == "Less Than or Equal") {
                condition=(A,B)=> A <= B
            }else if (props.method.get() == "Equal") {
                condition=(A,B)=> A == B
            }else if (props.method.get() == "Not Equal") {
                condition=(A,B)=> A != B
            }
           
            // if (props.method.get() == "Greater Than") {
                var func = function(data){
                    var A = props.a.get(data)
                    var B = props.b.get(data)
                    console.log(A, B);
                    console.log(condition(A,B));
                    if (condition(A,B)) {
                        return 1
                    } else {
                        return 0
                    }
                }
                props.output.set(func)
            // }

            // if (props.method.get() == "Equal") {
            //     var func = function(data){
            //         var A = props.a.get(data)
            //         var B = props.b.get(data)
            //         console.log(A, B);
            //         console.log(A  == B);
            //         if (A == B) {
            //             return 1
            //         } else {
            //             return 0
            //         }
            //     }
            //     props.output.set(func)
            // }

            // else if (props.method.get() == "Less Than"){
            //     if (parseInt(props.a.get())  < parseInt(props.b.get())) {
            //         props.output.set(1)
            //     } else {
            //         props.output.set(0)
            //         }
            // }else if (props.method.get() == "Equal"){
            //     if (parseInt(props.a.get()) == parseInt(props.b.get())) {
            //         props.output.set(1)
            //     } else {
            //         props.output.set(0)
            //     }
            // }else if (props.method.get() == "Greater Than or Equal"){
            //     if (parseInt(props.a.get()) >= parseInt(props.b.get())) {
            //         props.output.set(1)
            //     } else {
            //         props.output.set(0)
            //     }
            // }else if (props.method.get() == "Less Than or Equal"){
            //     if (parseInt(props.a.get()) <= parseInt(props.b.get())) {
            //         props.output.set(1)
            //     } else {
            //         props.output.set(0)
            //     }
            // }
            
        },
    },
}