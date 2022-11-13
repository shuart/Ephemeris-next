import createInstancesManagement from "../common_project_management/instances_management.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import createRelationsManagement from "../common_project_management/relations_management.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"


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
        {id:"outputReference", label:"Type Reference", type:"hidden", editable:false, socket:"output", value:""},
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
    props :[
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        {id:"id", label:"prop id", type:"hidden", editable:false, socket:"output", value:false},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"method", label:"", type:"select", options:[
            {id:"Greater_Than", value:"Greater Than"},
        ],editable:true, socket:"none", value:"Greater Than"},
        {id:"a", label:"Field", type:"text", editable:true, socket:"input", value:"0"},
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
            if (Array.isArray(props.a.get()) && props.a.get()[0].attributes.type) {
                var entityRepo = createEntityManagement()
                var entity = entityRepo.getById(props.a.get()[0].attributes.type)
                if (entity.relations) {
                    props.method.setOptions(entity.relations.map(function (e) {
                        return {id:e.uuid, value:e.name}
                    }))
                }

                if (props.method.get()) {
                    var instancesRepo = createInstancesManagement()
                    props.output.set(props.a.get().map(function (e) {
                        
                        var targetsOfRelation=[]
                        var relatedRelation=[]
                        for (let i = 0; i < e.relations.length; i++) {
                            const relation = e.relations[i];

                            if (relation.type == props.method.getOptionId()) {
                                var relationTarget = instancesRepo.getById(relation.to)
                                targetsOfRelation.push(relationTarget)
                                relatedRelation.push({displayAs:"relation", relation:relation, target:relationTarget})
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
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"field", label:"Source Field", type:"hidden", editable:true, socket:"input", value:false},
        {id:"fields_to_join", multiple:true, label:"Fields to join", type:"hidden", editable:true, socket:"input", value:false},
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

evaluatorTemplates.outputTable = {
    templateName : "output_table",
    name : "output_table",
    props :[
        // {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"cols", multiple:true, label:"cols definition", type:"hidden", editable:true, socket:"input", value:false},
        {id:"rows", label:"rows", type:"text", editable:true, socket:"input", value:"0"},
        {id:"actions", label:"action", type:"hidden", editable:true, socket:"input", value:false},
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
    props :[
        // {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"nodes", multiple:true, label:"Entities", type:"hidden", editable:true, socket:"input", value:false},
        {id:"links", multiple:true, label:"links", type:"text", editable:true, socket:"input", value:"0"},
        {id:"actions", label:"action", type:"hidden", editable:true, socket:"input", value:false},

        {id:"onConnectAction", label:"onConnect", type:"hidden", editable:true, socket:"input", value:false},
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
    props :[
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"name", label:"data", type:"text", editable:true, socket:"input", value:"Col Name"},
        {id:"paramName", label:"param name", type:"text", editable:true, socket:"input", value:"0"},
        {id:"clickAction", label:"action", type:"hidden", editable:true, socket:"input", value:false},
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
                            clickedItem:cell.getData().name,
                            clickedItemUuid:cell.getData().uuid,
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
    props :[
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:"output"},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        // {id:"name", label:"data", type:"text", editable:true, socket:"input", value:"Col Name"},
        {id:"buttonLabel", label:"Label", type:"text", editable:true, socket:"input", value:"0"},
        {id:"clickAction", label:"action", type:"hidden", editable:true, socket:"input", value:false},
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
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:()=>alert("No Action")},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"instanceRef", label:"Instance Reference", type:"text", editable:true, socket:"input", value:""},
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
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:()=>alert("No Action")},
        // {id:"method", label:"A", type:"text", editable:true, socket:"input", value:"0"},
        {id:"instanceRef", label:"Instance Reference", type:"text", editable:true, socket:"input", value:""},
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

evaluatorTemplates.actionShowMessage = {
    templateName : "action_show_message",
    name : "action_show_message",
    props :[
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:()=>alert("No Action")},
        {id:"message", label:"Message", type:"text", editable:true, socket:"input", value:""},
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
        {id:"output", label:"output", type:"hidden", editable:false, socket:"output", value:()=>alert("No Action")},
        {id:"relationType", label:"Relation Type", type:"text", editable:true, socket:"input", value:""},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var functionToUse = function (data) {
                var instanceRepo = createInstancesManagement()
                
                var currentSelectedInstance = instanceRepo.getById(data.input.clickedItemUuid) //change to generic
                mainPopup.mount()
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
                mainPopup.append(selectInstance, "main-slot")
                
                mainPopup.update();
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
    props :[
        {id:"clicked_item", label:"clicked_item", type:"hidden", editable:false, socket:"output", value:()=>"test1"},
        {id:"clicked_item_uuid", label:"clicked_item_uuid", type:"hidden", editable:false, socket:"output", value:()=>"test2"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            var functionToUse = function (data) {
                return data.input.clickedItem
            }
            props.clicked_item.set(functionToUse)  
            var functionToUse = function (data) {
                return data.input.clickedItemUuid
            }
            props.clicked_item_uuid.set(functionToUse)  
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