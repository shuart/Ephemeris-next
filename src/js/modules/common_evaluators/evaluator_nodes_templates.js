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


var evaluatorTemplates = {}

var nodeColors = {
    input:0x83314a,
    inputData:0x00d6a3,
    inputObject:0xed9e5c,
    output:0x1d1d1d,
    attribute:0xa35abd,
}

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
    style:{
        headerColor:nodeColors.inputData,
    },
    category:"input",
    props :[
        {id:"output", expect:"data", isSquare:false, label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"outputReference", expect:"string", label:"Type Reference", type:"hidden", editable:false, socket:"output", value:""},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"method", label:"", type:"select", options:[
            {id:"Greater_Than", value:"Greater Than"},
            {id:"Greater_Than_Or_Equal", value:"Greater Than or Equal"},
            {id:"Less_Than", value:"Less Than"},
            {id:"Less_Than_Or_Equal", value:"Less Than or Equal"},
            {id:"Equal", value:"Equal"},
        ],editable:true, socket:"none", value:"Greater Than"},
        // {id:"a", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        // {id:"b", label:"B", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var entityRepo = createEntityManagement()
            var instanceRepo = createInstancesManagement()
            console.log(instanceRepo.getByType());
            // alert()
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
            // props.output.set(entityRepo.getAll()[0].uuid)
            props.output.set(instanceRepo.getByType(props.method.getOptionId()))
            props.outputReference.set(props.method.getOptionId())
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

evaluatorTemplates.sourceInstance = {
    templateName : "source_instance",
    name : "Source Instance",
    style:{
        headerColor:nodeColors.inputObject,
    },
    category:"input",

    props :[
        {id:"output", expect:"object", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props, globals) =>{
            var instanceRepo = createInstancesManagement()
            var currentInstance = instanceRepo.getById(globals.originInstance)
            props.output.set(currentInstance)
        },
        // onInit:(props) =>{
        // },
    },
}

evaluatorTemplates.debugAlert = {
    templateName : "debug_alert",
    name : "debug alert",
    props :[
        {id:"message", expect:"string", label:"Message", type:"text", editable:true, socket:"input", value:"This is a debug alert"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            alert("Debug:" + props.message.get())
        },
        // onInit:(props) =>{
        // },
    },
}


evaluatorTemplates.extractProperty = {
    templateName : "extract_property",
    name : "extract_property",
    props :[
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"id", label:"prop id", type:"hidden", editable:false, socket:"output", value:false},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"method", label:"", type:"select", options:[
            {id:"Greater_Than", value:"Greater Than"},
            {id:"Greater_Than_Or_Equal", value:"Greater Than or Equal"},
            {id:"Less_Than", value:"Less Than"},
            {id:"Less_Than_Or_Equal", value:"Less Than or Equal"},
            {id:"Equal", value:"Equal"},
        ],editable:true, socket:"none", value:"Greater Than"},
        {id:"a", label:"Field", type:"text", editable:true, socket:"input", value:"0"},
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
                    props.id.set(props.method.getOptionId())
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

evaluatorTemplates.extractRelations = {
    templateName : "extract_relations",
    name : "extract_relations",
    style:{
        headerColor:nodeColors.attribute,
    },
    category:"relations",
    props :[
        {id:"output", expect:"array", isSquare:true, label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"id", expect:"string", label:"prop id", type:"hidden", editable:false, socket:"output", value:false},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"inOrOut", label:"Direction", type:"select", options:[
            {id:"incoming", value:"Incoming"},
            {id:"outgoing", value:"outgoing"},
        ],editable:true, socket:"none", value:"Greater Than"},
        {id:"method", label:"Relation", type:"select", options:[
            {id:"Greater_Than", value:"Greater Than"},
        ],editable:true, socket:"none", value:"Greater Than"},
        {id:"a", expect:"data", label:"Data", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            
            // console.log(entityRepo.getAll());
            
            // props.method.setOptions(props.a.get().map(function (e) {
            //         var currentKey = e.parameters.keys
            //         return {id:e.uuid, value:e.name}
            // }))
            console.log(props.a.get()[0] );
            var currentRelationsToConsider = []
            if (Array.isArray(props.a.get()) && props.a.get()[0] &&  props.a.get()[0].attributes.type) {
                var entityRepo = createEntityManagement()
                var entity = entityRepo.getById(props.a.get()[0].attributes.type)
                var inOrOut = props.inOrOut.getOptionId()
                if (inOrOut = "incoming" ) {
                    if (entity.getIncomingRelations()) {
                        currentRelationsToConsider = entity.getIncomingRelations()
                        props.method.setOptions(entity.getIncomingRelations().map(function (e) {
                            return {id:e.uuid, value:e.name}
                        }))
                    }
                }else{
                    if (entity.getOutgoingRelations()) {
                        currentRelationsToConsider = entity.getOutgoingRelations()
                        props.method.setOptions(entity.getOutgoingRelations().map(function (e) {
                            return {id:e.uuid, value:e.name}
                        }))
                    }
                }
                // if (entity.relations) {
                //     props.method.setOptions(entity.relations.map(function (e) {
                //         return {id:e.uuid, value:e.name}
                //     }))
                // }
                if (props.method.get()) {
                    var instancesRepo = createInstancesManagement()
                    var inOrOut = props.inOrOut.getOptionId()
                    props.output.set(props.a.get().map(function (e) {
                        
                        var targetsOfRelation=[]
                        var relatedRelation=[]
                        var instancesRelations = e.getRelations()
                        for (let i = 0; i < instancesRelations.length; i++) {
                            const relation = instancesRelations[i];
                            
                            if (relation.type == props.method.getOptionId() && inOrOut == "incoming") {
                                var relationSource = instancesRepo.getById(relation.from)
                                targetsOfRelation.push(relationSource)
                                relatedRelation.push({displayAs:"relation", relation:relation, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:relationSource})
                            }else if (relation.type == props.method.getOptionId() ) {
                                var relationTarget = instancesRepo.getById(relation.to)
                                targetsOfRelation.push(relationTarget)
                                relatedRelation.push({displayAs:"relation", relation:relation, direction:"outgoing", callback:(id)=>showPopupInstancePreview(id), target:relationTarget})
                            }
                            
                            
                        }
                        console.log(targetsOfRelation);
                        // alert("fesfe")
                        return {[props.method.get()]:relatedRelation}
                    }))
                    props.id.set(props.method.getOptionId())
                }
                
            }

            // var getEntity = entityRepo

            // console.log(props.a.get());
            // alert("fdfes")
            // if (props.a.get()[0] && props.a.get()[0].relations) {
            //     props.method.setOptions(props.a.get()[0].relations.map(function (e) {
            //         return {id:e.uuid, value:e.name}
            //     }))
            //     // props.output.set("undefined")
            //     if (props.method.get()) {
            //         props.output.set(props.a.get().map(function (e) {
            //             console.log(e.properties);
            //             return {[props.method.get()]:e.relations[props.method.get()]}
            //         }))
            //     }
            // }else{
            //     props.output.set("undefined")
            // }
            
        },
        onInit:(props) =>{
        },
    },
}

evaluatorTemplates.joinFields = {
    templateName : "join_fields",
    name : "join_fields",
    props :[
        {id:"output", expect:"data", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"field", expect:"data", label:"Source Field", type:"hidden", editable:true, socket:"input", value:false},
        {id:"fields_to_join",expect:"array", isSquare:true, multiple:true, label:"Fields to join", type:"hidden", editable:true, socket:"input", value:false},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            console.log(props.fields_to_join.get());
            var newFields = []
            var sourceField = props.field.get()
            var fieldsToJoin = props.fields_to_join.get()
            if (sourceField && fieldsToJoin) {
                var fieldsQt = fieldsToJoin.length
                
                for (let i = 0; i < sourceField.length; i++) {
                    const sourceFieldElement = sourceField[i];
                    var newFieldElement = Object.assign({},sourceFieldElement)
                    for (let j = 0; j < fieldsToJoin.length; j++) {
                        const fieldToJoin = fieldsToJoin[j];
                        newFieldElement = Object.assign(sourceFieldElement,fieldToJoin[i])
                    }
                    newFields.push(newFieldElement)
                }
                props.output.set(newFields)
            }
            
        },
        onInit:(props) =>{

        },
    },
}
evaluatorTemplates.joinAllProperties = {
    templateName : "join_all_properties",
    name : "join_all_properties",
    props :[
        {id:"output", expect:"data", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"field", expect:"data", label:"Source Field", type:"hidden", editable:true, socket:"input", value:false},
        // {id:"fields_to_join",expect:"array", isSquare:true, multiple:true, label:"Fields to join", type:"hidden", editable:true, socket:"input", value:false},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            
            var sourceField = props.field.get()
            if (sourceField) {
                for (let i = 0; i < sourceField.length; i++) {
                    const currentItem = sourceField[i];
                    var fieldsProperties = currentItem.properties
                    for (const propName in fieldsProperties) {
                        if (Object.hasOwnProperty.call(fieldsProperties, propName)) {
                            const prop = fieldsProperties[propName];
                            currentItem[propName] =prop
                            
                        }
                    }
                }
                
                
                props.output.set(sourceField)
            }
            
        },
        onInit:(props) =>{

        },
    },
}



evaluatorTemplates.outputTable = {
    templateName : "output_table",
    name : "output_table",
    style:{
        headerColor:nodeColors.output,
    },
    category:"output",

    props :[
        // {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"cols", expect:"configuration",multiple:true, label:"cols definition", type:"hidden", editable:true, socket:"input", value:false},
        {id:"rows", expect:"data", label:"rows", type:"text", editable:true, socket:"input", value:"0"},
        {id:"actions", expect:"function", label:"action", type:"hidden", editable:true, socket:"input", value:false},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            console.log(props.actions.get());
        },
        onInit:(props) =>{

        },
    },
}

evaluatorTemplates.outputGraph = {
    templateName : "output_graph",
    name : "output_graph",
    style:{
        headerColor:nodeColors.output,
    },
    category:"output",
    props :[
        // {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"nodes", expect:"data", multiple:true, label:"Entities", type:"hidden", editable:true, socket:"input", value:false},
        {id:"links", expect:"array", isSquare:true, multiple:true, label:"links", type:"text", editable:true, socket:"input", value:false},
        {id:"actions", expect:"function" , label:"action", type:"hidden", editable:true, socket:"input", value:false},

        {id:"onConnectAction", expect:"function", label:"onConnect", type:"hidden", editable:true, socket:"input", value:false},
        {id:"onNodeClickAction", expect:"function", label:"onNodeClick", type:"hidden", editable:true, socket:"input", value:false},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            console.log(props.actions.get());
        },
        onInit:(props) =>{

        },
    },
}

evaluatorTemplates.outputInstanceCard = {
    templateName : "output_instance_card",
    name : "output_instance_card",
    style:{
        headerColor:nodeColors.output,
    },
    category:"output",
    props :[
        // {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"instance", expect:"object", multiple:false, label:"instance", type:"hidden", editable:true, socket:"input", value:false},
        {id:"actions", expect:"function", label:"action", type:"hidden", editable:true, socket:"input", value:false},

        {id:"onConnectAction",expect:"function", label:"onConnect", type:"hidden", editable:true, socket:"input", value:false},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            console.log(props.actions.get());
        },
        onInit:(props) =>{

        },
    },
}

evaluatorTemplates.colParameters = {
    templateName : "col_parameters",
    name : "col_parameters",
    style:{
        headerColor:nodeColors.input,
    },
    category:"input",
    props :[
        {id:"output", expect:"configuration", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"name",expect:"string", label:"data", type:"text", editable:true, socket:"input", value:"Col Name"},
        {id:"paramName",expect:"string", label:"param name", type:"text", editable:true, socket:"input", value:"0"},
        {id:"clickAction",expect:"function", label:"action", type:"hidden", editable:true, socket:"input", value:false},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            // if (props.data.get()) {
            //     props.output.set(props.a.get().map(function (e) {
            //         console.log(e.properties);
            //         return {[props.method.get()]:e.properties[props.method.get()]}
            //     }))
            // }
            var cellAction = undefined;
            if (props.clickAction.get()) {
                cellAction =function(e, cell){ 
                    var actionData = {
                        input:{
                            clickedItem:cell.getData().uuid,
                            clickedItemUuid:cell.getData().uuid,
                            contextualItemUuid:cell.getData().uuid,
                            clickedItemValue:cell.getValue(),
                            sourceItem:cell.getData().uuid,
                            targetItem:false,
                        }
                    }
                    props.clickAction.get()(actionData) 
                }
            }
            props.output.set({title:props.name.get(), field:props.paramName.get(), editor:undefined, cellClick:cellAction,})     
        },
        onInit:(props) =>{

        },
    },
}

evaluatorTemplates.colCustomButton = {
    templateName : "col_custom_button",
    name : "col_custom_button",
    style:{
        headerColor:nodeColors.input,
    },
    category:"input",
    props :[
        {id:"output", expect:"configuration", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        // {id:"name", label:"data", type:"text", editable:true, socket:"input", value:"Col Name"},
        {id:"buttonLabel",expect:"string", label:"Label", type:"text", editable:true, socket:"input", value:"0"},
        {id:"clickAction",expect:"function", label:"action", type:"hidden", editable:true, socket:"input", value:false},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var cellAction = undefined;
            if (props.clickAction.get()) {
                cellAction =function(e, cell){ 
                    var actionData = {
                        input:{
                            clickedItem:cell.getData().name,
                            clickedItemUuid:cell.getData().uuid,
                        }
                    }
                    props.clickAction.get()(actionData) 
                }
            }
            // props.output.set({title:props.name.get(), field:props.paramName.get(), editor:undefined, cellClick:cellAction,})    
            props.output.set({customButton: {value:props.buttonLabel.get(), onClick:cellAction } } )    
            // props.output.set({customButton: {value:props.buttonLabel.get(), onClick:function(e, cell){projectManagement.getProjectStore(projectId,data.modelElementType).remove(cell.getRow().getData().uuid)} } } )    
            
        },
        onInit:(props) =>{

        },
    },
}





evaluatorTemplates.actionAddInstance = {
    templateName : "action_add_instance",
    name : "action_add_instance",
    props :[
        {id:"output",expect:"function", label:"output", type:"hidden", editable:false, socket:"output", value:()=>alert("No Action")},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"instanceRef",expect:"string", label:"Instance Reference", type:"text", editable:true, socket:"input", value:""},
        // {id:"paramName", label:"param name", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var functionToUse = function () {
                if (props.instanceRef.get() && props.instanceRef.get() != "") {
                    var name= prompt("Name")
                    if (name) {
                        var currentEntityType = props.instanceRef.get()
                        var instancesRepo = createInstancesManagement()
                        instancesRepo.add({name:name,theTime:Date.now(), type:currentEntityType})
                    }
                }else{
                    alert("reference missing") 
                }
            }
            props.output.set(functionToUse)     
        },
        // onInit:(props) =>{

        // },
    },
}

evaluatorTemplates.actionRemoveInstance = {
    templateName : "action_remove_instance",
    name : "action_remove_instance",
    props :[
        {id:"output", expect:"function", label:"output", type:"hidden", editable:false, socket:"output", value:()=>alert("No Action")},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"instanceRef",expect:"string", label:"Instance Reference", type:"text", editable:true, socket:"input", value:""},
        // {id:"paramName", label:"param name", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var functionToUse = function (data) {
                var okToRemove= confirm("Remove element")
                if (okToRemove) {
                    // var currentEntityType = props.instanceRef.get()
                    var instancesRepo = createInstancesManagement()
                    instancesRepo.remove(data.input.clickedItemUuid)
                }
                // if (props.instanceRef.get() && props.instanceRef.get() != "") {
                //     var okToRemove= confirm("Remove element")
                //     if (okToRemove) {
                //         // var currentEntityType = props.instanceRef.get()
                //         var instancesRepo = createInstancesManagement()
                //         instancesRepo.remove(data.input.clickedItemUuid)
                //     }
                // }else{
                //     alert("reference missing") 
                // }
            }
            props.output.set(functionToUse)     
        },
        // onInit:(props) =>{

        // },
    },
}

evaluatorTemplates.previewInstance = {
    templateName : "action_preview_instance",
    name : "action_preview_instance",
    props :[
        {id:"output", expect:"function", label:"output", type:"hidden", editable:false, socket:"output", value:()=>alert("No Action")},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"targetItem",expect:"string", label:"target Instance", type:"text", editable:true, socket:"input", value:""},
        // {id:"paramName", label:"param name", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props, globals) =>{
            var functionToUse = function (data) {
                var targetItem = getProp(props,"targetItem",data)
                if (targetItem && targetItem !="") {
                    showPopupInstancePreview(targetItem)
                }else{
                    alert("Reference Missing")
                }
                // showPopupInstancePreview(data.input.clickedItemUuid)
                // var okToRemove= confirm("Remove element")
                // if (okToRemove) {
                //     // var currentEntityType = props.instanceRef.get()
                //     var instancesRepo = createInstancesManagement()
                //     instancesRepo.remove(data.input.clickedItemUuid)
                // }
                // if (props.instanceRef.get() && props.instanceRef.get() != "") {
                //     var okToRemove= confirm("Remove element")
                //     if (okToRemove) {
                //         // var currentEntityType = props.instanceRef.get()
                //         var instancesRepo = createInstancesManagement()
                //         instancesRepo.remove(data.input.clickedItemUuid)
                //     }
                // }else{
                //     alert("reference missing") 
                // }
            }
            props.output.set(functionToUse)     
        },
        // onInit:(props) =>{

        // },
    },
}



evaluatorTemplates.actionShowMessage = {
    templateName : "action_show_message",
    name : "action_show_message",
    props :[
        {id:"output",expect:"function", label:"output", type:"hidden", editable:false, socket:"output", value:()=>alert("No Action")},
        {id:"message",expect:"string", label:"Message", type:"text", editable:true, socket:"input", value:""},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var functionToUse = function (data) {
                if (props.message.get() && props.message.get() != "") {
                    var valuePassed = props.message.get()
                    if (valuePassed instanceof Function) {
                        valuePassed = valuePassed(data)
                    }

                    alert(valuePassed)
                }else{
                    alert("reference missing") 
                }
            }
            props.output.set(functionToUse)     
        },
        // onInit:(props) =>{

        // },
    },
}

// evaluatorTemplates.actionAddRelation = {
//     templateName : "action_add_relation",
//     name : "action_add_relation",
//     props :[
//         {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:()=>alert("No Action")},
//         {id:"message", label:"Message", type:"text", editable:true, socket:"input", value:""},
//     ],
//     methods:{
//     },
//     event:{
//         onEvaluate:(props) =>{
//             var functionToUse = function (data) {
//                 var instanceRepo = createInstancesManagement()
                
                
//                 var currentSelectedInstance = instanceRepo.getById(data.input.clickedItemUuid) //change to generic
//                 console.log(currentSelectedInstance);
//                 console.log(currentSelectedInstance.getPotentialEntitiesForRelations());
//                 alert()
                
//                 mainPopup.mount()
//                 mainPopup.append(select.instance({
//                     data:{
//                         list:currentSelectedInstance.getPotentialEntitiesForRelations(),
//                         callback:function(event){ //TODO add callback
//                             //Display a new popup to choose the relation type
//                             mainPopup.append(select.instance({
//                                 data:{
//                                     list:currentSelectedInstance.getPotentialRelationsWithInstance(event.value.uuid),
//                                     callback:function(eventInCallback){ //TODO add callback
//                                         currentSelectedInstance.addRelation(eventInCallback.value.uuid,event.value.uuid)
//                                         console.log(currentSelectedInstance.getRelations());
                                        
//                                     }
//                                 }
//                             }), "main-slot")
//                             mainPopup.update();
//                         }
//                     }
//                 }), "main-slot")
//                 mainPopup.update();
//             }
//             props.output.set(functionToUse)     
//         },
//         // onInit:(props) =>{

//         // },
//     },
// }

evaluatorTemplates.actionEditRelation = {
    templateName : "action_edit_relation",
    name : "action_edit_relation",
    props :[
        {id:"output",expect:"function", label:"output", type:"hidden", editable:false, socket:"output", value:()=>alert("No Action")},
        {id:"relationType",expect:"string", label:"Relation Type", type:"text", editable:true, socket:"input", value:""},
        {id:"sourceItem",expect:"string", label:"source item", type:"text", editable:true, socket:"input", value:false},
        {id:"targetItem",expect:"string", label:"target item", type:"text", editable:true, socket:"input", value:false},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var functionToUse = function (data) {
                var instanceRepo = createInstancesManagement()
                var sourceItem = getProp(props,"sourceItem",data)
                var targetItem = getProp(props,"targetItem",data)
                if (sourceItem && typeof sourceItem == "string") {
                    sourceItem = instanceRepo.getById(sourceItem) 
                }
                if (targetItem && typeof targetItem == "string") {
                    targetItem = instanceRepo.getById(targetItem) 
                }

                // console.log(sourceItem);
                // console.log(targetItem);
                // console.log(instanceRepo.getById(sourceItem));
                // console.log(props.relationType.get());
                // alert("itesm")

                if (!sourceItem && targetItem) {
                    // var currentSelectedInstance = instanceRepo.getById(data.input.clickedItemUuid) 
                    // var currentSelectedInstance = instanceRepo.getById(sourceItem) 
                    var currentSelectedInstance = targetItem 
                    var mainPopupNarrow = mainPopup.with({data:{narrow:true,title:"Select Items"}})
                    mainPopupNarrow.mount()
                    var generateList = function () {
                        return currentSelectedInstance.getPotentialAndLinkedEntitiesForRelationType(props.relationType.get()).potentialsSource
                    }
                    var generateSelectedList = function () {
                        return currentSelectedInstance.getPotentialAndLinkedEntitiesForRelationType(props.relationType.get()).alreadyLinkedSource
                    }
                    var selectInstance = select.instance({
                        data:{
                            list:generateList,
                            selectedlist:generateSelectedList,
                            callback:function(event){
                                //Display a new popup to choose the relation type
                                currentSelectedInstance.addRelationFromSource(props.relationType.get(),event.value.uuid)
                                selectInstance.do.softUpdate();
                            },
                            closeSelectedCallback:function(event){
                                // alert(event.uuid)
                                currentSelectedInstance.removeRelationFromSource(props.relationType.get(),event.uuid)
                                selectInstance.do.softUpdate();
                            }
                            
                        }
                    })
                    mainPopupNarrow.append(selectInstance, "main-slot")
                    mainPopupNarrow.update();

                }else if (sourceItem && !targetItem) {
                    // var currentSelectedInstance = instanceRepo.getById(data.input.clickedItemUuid) 
                    // var currentSelectedInstance = instanceRepo.getById(sourceItem) 
                    var currentSelectedInstance = sourceItem 
                    var mainPopupNarrow = mainPopup.with({data:{narrow:true,title:"Select Items"}})
                    mainPopupNarrow.mount()
                    var generateList = function () {
                        return currentSelectedInstance.getPotentialAndLinkedEntitiesForRelationType(props.relationType.get()).potentials
                    }
                    var generateSelectedList = function () {
                        return currentSelectedInstance.getPotentialAndLinkedEntitiesForRelationType(props.relationType.get()).alreadyLinked
                    }
                    var selectInstance = select.instance({
                        data:{
                            list:generateList,
                            selectedlist:generateSelectedList,
                            callback:function(event){
                                //Display a new popup to choose the relation type
                                currentSelectedInstance.addRelation(props.relationType.get(),event.value.uuid)
                                selectInstance.do.softUpdate();
                            },
                            closeSelectedCallback:function(event){
                                // alert(event.uuid)
                                currentSelectedInstance.removeRelation(props.relationType.get(),event.uuid)
                                selectInstance.do.softUpdate();
                            }
                            
                        }
                    })
                    mainPopupNarrow.append(selectInstance, "main-slot")
                    mainPopupNarrow.update();

                }else if(sourceItem && targetItem){
                    // alert("fesfesfefsfe")
                    var currentSelectedInstance = sourceItem
                    var mainPopupNarrow = mainPopup.with({data:{narrow:true,title:"Select Items"}})
                    mainPopupNarrow.mount()
                    mainPopupNarrow.append(select.instance({
                        data:{
                            list:currentSelectedInstance.getPotentialRelationsWithInstance(targetItem.uuid),
                            callback:function(eventInCallback){ //TODO add callback
                                // currentSelectedInstance.addRelation(sourceItem,targetItem)
                                // console.log(currentSelectedInstance.getRelations());
                                currentSelectedInstance.addRelation(eventInCallback.value.uuid,targetItem.uuid)
                                // selectInstance.do.softUpdate();
                            }
                        }
                    }), "main-slot")
                    mainPopupNarrow.update();
                }
                

            }
            props.output.set(functionToUse)     
        },
        // onInit:(props) =>{

        // },
    },
}



evaluatorTemplates.actionInput = {
    templateName : "action_Input",
    name : "action_Input",
    style:{
        headerColor:nodeColors.inputObject,
    },
    category:"input",
    props :[
        // {id:"clicked_item", label:"clicked_item", type:"hidden", editable:false, socket:"output", value:()=>"test1"},
        // {id:"clicked_item_uuid", label:"clicked_item_uuid", type:"hidden", editable:false, socket:"output", value:()=>"test2"},
        {id:"sourceItem", label:"Source Item", type:"hidden", editable:false, socket:"output", value:()=>"test2"},
        {id:"targetItem", label:"target Item", type:"hidden", editable:false, socket:"output", value:()=>"test2"},
        {id:"clickedItem", label:"clicked Item", type:"hidden", editable:false, socket:"output", value:()=>"test2"},
        {id:"contextItem", expect:"object",label:"Context Item", type:"hidden", editable:false, socket:"output", value:()=>"test2"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var repo = createInstancesManagement()
            // var functionToUse = function (data) {
            //     return data.input.clickedItem
            // }
            // props.clicked_item.set(functionToUse)  
            // var functionToUse = function (data) {
            //     return data.input.clickedItemUuid
            // }
            // props.clicked_item_uuid.set(functionToUse)  
            // var uuidToObject = function (input) {
            //     var instanceRepo = createInstancesManagement()
            //     var value = undefined;
            //     if (typeof myVar === 'string' || myVar instanceof String){
                    
            //     }
            // }
            // contextualItemUuid
            var functionTargetItem = function (data) {
                return data.input.targetItem || data.input.clickedItem 
            }
            props.targetItem.set(functionTargetItem)  
            var functionSourceItem = function (data) {
                return data.input.sourceItem
            }
            props.sourceItem.set(functionSourceItem)  
            var functionclickedItem = function (data) {
                return data.input.clickedItem || data.input.targetItem 
            }
            props.clickedItem.set(functionclickedItem)  
            var functionContextItem = function (data) {
                var contextualItem = data.input.contextualItemUuid
                if (typeof contextualItem == "string") {
                    contextualItem = repo.getById(data.input.contextualItemUuid)
                }
                return contextualItem
            }
            props.contextItem.set(functionContextItem)  
        },
        // onInit:(props) =>{

        // },
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