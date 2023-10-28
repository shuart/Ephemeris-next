import { settingsNodeColors as nodeColors } from "./settings_node_colors.js"

export var filter = {
    templateName : "filter",
    name : "Filter",
    style:{
        headerColor:nodeColors.inputObject,
    },
    category:"data",

    props :[
        {id:"output", expect:"data", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"paramName", expect:"text", label:"Param Name", type:"text", editable:true, socket:"input", value:"...."},
        // {id:"paramIndex", expect:"text", label:"Param Name", type:"text", editable:true, socket:"input", value:"...."},
        {id:"a", expect:"data", label:"Data", type:"text", editable:true, socket:"input", value:"0"},
        {id:"selection", expect:"array", label:"Selection", type:"hidden", editable:false, socket:"input", value:"...."},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props, globals) =>{
            // var instanceRepo = createInstancesManagement()
            // var currentInstance = instanceRepo.getById(globals.originInstance)
            // props.output.set(currentInstance)
            // var paramName = props.paramName.get()
            // if (paramName!="....") {
            //     props.output.set("false")
            //     let url = window.location.hash.slice(1) || '/';
            //     if (url.split("?")[1]) {//if there are already search params
            //         var splitedParams = url.split("?")[1].split("&")
            //         url = url.split("?")[0]
            //         for (let i = 0; i < splitedParams.length; i++) {
            //             const sparam = splitedParams[i].split("=");
            //             if (paramName == sparam[0]) {
            //                 props.output.set(sparam[1] || "flase")
            //             }
            //         }
            //     }
            // }
            if (Array.isArray(props.a.get()) && props.a.get()[0] &&  props.a.get()[0].attributes.type) {
                var oldDataSet = props.a.get()
                var newDataSet = []
                for (let i = 0; i < oldDataSet.length; i++) {
                    const element = oldDataSet[i];
                    var condition = props.selection.get(element)
                    console.log(condition);
                    // alert("eee")
                    if (condition == 1) {
                        newDataSet.push(element)
                    }
                }
                props.output.set(newDataSet)
            }
        },
        // onInit:(props) =>{
        // },
    },
}