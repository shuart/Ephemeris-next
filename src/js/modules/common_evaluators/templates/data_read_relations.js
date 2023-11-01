import { settingsNodeColors as nodeColors } from "./settings_node_colors.js"
import createAttributeManagement from "../../common_project_management/attributes_management.js";
import createRelationManagement from "../../common_project_management/relations_management.js";

export var readRelations = {
    templateName : "read_relations",
    name : "Read Relations",
    category:"data",
    props :[
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"id", label:"prop id", type:"hidden", editable:false, socket:"output", value:false},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"method", label:"Relations", type:"select", options:[
            {id:"None", value:"..."},
        ],editable:true, socket:"none", value:"....."},
        // {id:"a", label:"Field", type:"text", editable:true, socket:"input", value:"0"},
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

            // if (props.a.get()[0] && props.a.get()[0].properties) {
            //     props.method.setOptions(Object.keys(props.a.get()[0].properties).map(function (e) {
            //         return {id:e, value:e}
            //     }))
            //     // props.output.set("undefined")
            //     if (props.method.get()) {
            //         props.output.set(props.a.get().map(function (e) {
            //             console.log(e.properties);
            //             return {[props.method.get()]:e.properties[props.method.get()]}
            //         }))
            //         props.id.set(props.method.getOptionId())
            //     }
            // }else{
            //     props.output.set("undefined")
            // }
            

            var func = (data)=>{
                var value = props.method.get()
                if (value != ".....") {
                    if (value == "name") {
                        return data.name
                    }else{
                        return data.properties[value]
                    }
                }else{
                    return "undefined"
                }
            }

            props.output.set(func)
            
            
        },
        onInit:(props) =>{
            // var attributeRepo = createAttributeManagement()
            // console.log(attributeRepo.getAll());
            // var options=attributeRepo.getAll().map(function (e) {
            //     return {id:e.uuid, value:e.name}
            // })
            // options.push({id:"name2", value:"name"})
            // props.method.setOptions(options) 
            


            var relationsRepo = createRelationManagement()
            console.log(relationsRepo.getAll());
            var options=relationsRepo.getAll().map(function (e) {
                return {id:e.uuid, value:e.name}
            })
            // options.push({id:"name2", value:"name"})
            props.method.setOptions(options) 
        },
    },
}