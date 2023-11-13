import { settingsNodeColors as nodeColors } from "./settings_node_colors.js"

export var storeAttribute = {
    templateName : "storeAttribute",
    name : "Store Attribute",
    style:{
        headerColor:nodeColors.inputObject,
    },
    category:"attribute",

    props :[
        {id:"output", expect:"data", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"paramName", expect:"text", label:"Param Name", type:"text", editable:true, socket:"input", value:"...."},
        // {id:"paramIndex", expect:"text", label:"Param Name", type:"text", editable:true, socket:"input", value:"...."},
        {id:"a", expect:"data", label:"Data", type:"text", editable:true, socket:"input", value:"0"},
        // {id:"selection", expect:"array", label:"Selection", type:"hidden", editable:false, socket:"input", value:"...."},
        {id:"attributeName", expect:"text", label:"Name", type:"text", editable:true, socket:"input", value:"Attribue"},
        {id:"attribute", expect:"array", label:"Attribute", type:"hidden", editable:false, socket:"input", value:"...."},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props, globals) =>{

            if (Array.isArray(props.a.get()) && props.a.get()[0] &&  props.a.get()[0].attributes.type) {
                var oldDataSet = props.a.get()
                var newDataSet = []
                for (let i = 0; i < oldDataSet.length; i++) {
                    const element = oldDataSet[i];
                    // var condition = props.selection.get(element) //TODO read condition
                    // console.log(condition);
                    // // alert("eee")
                    // if (condition == 1) {
                    //     newDataSet.push(element)
                    // }
                    if (Array.isArray(props.attribute.get()) && props.attribute.get()[i]) { //if is an array
                        if (props.attribute.get()[i].relations) { //if field is type relation
                            element.attributes[props.attributeName.get()] = props.attribute.get()[i].relations
                        }else{
                            element.attributes[props.attributeName.get()] = props.attribute.get()[i]
                        }
                        
                    }
                    
                    newDataSet.push(element)
                }
                props.output.set(newDataSet)
            }
        },
        // onInit:(props) =>{
        // },
    },
}