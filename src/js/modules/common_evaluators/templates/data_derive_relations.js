import { settingsNodeColors as nodeColors } from "./settings_node_colors.js"
import createInstancesManagement from "../../common_project_management/instances_management.js"
import createRelationManagement from "../../common_project_management/relations_management.js";
import createEntityManagement from "../../common_project_management/entity_management.js";

export var deriveRelations = {
    templateName : "derive_relations",
    name : "derive_relations",
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
        ],editable:true, socket:"none", value:"Incoming"},
        {id:"method", label:"Relation", type:"select", options:[
            {id:"Greater_Than", value:"...."},
        ],editable:true, socket:"none", value:"...."},
        {id:"a", expect:"array", isSquare:true,label:"Data", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            console.log(props.a.get()[0] );
            // console.log(Array.isArray(props.a.get()) && props.a.get()[0] &&  props.a.get()[0].relation);

            if (Array.isArray(props.a.get()) && props.a.get()[0].relations ) {

                if (props.method.get()) {
                    var instancesRepo = createInstancesManagement()
                    var inOrOut = props.inOrOut.getOptionId()
                    var relationFieldToDerive = props.a.get()
                    var outputField = [];
                    for (let i = 0; i < relationFieldToDerive.length; i++) {
                        const relationsToDerive = relationFieldToDerive[i].relations;
                        var localField = []
                        for (let j = 0; j < relationsToDerive.length; j++) {
                            
                            const relations = relationsToDerive[j];
                            var currentTarget = relations.target

                            var targetsOfRelation=[]
                            var relatedRelation=[]
                            var instancesRelations = currentTarget.getRelations()
                            console.log(currentTarget);
                            console.log(currentTarget.getRelations());

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
                            console.log(relatedRelation);
                            localField.push(relatedRelation)
                        }
                        outputField.push({relations:localField})
                    }
                    console.log(outputField);
                    props.output.set(outputField)
                    props.id.set(props.method.getOptionId())
                }
                
            }


        },
        onInit:(props) =>{

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

export var extractRelations = {
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
        ],editable:true, socket:"none", value:"Incoming"},
        {id:"method", label:"Relation", type:"select", options:[
            {id:"Greater_Than", value:"...."},
        ],editable:true, socket:"none", value:"...."},
        {id:"a", expect:"data", label:"Data", type:"text", editable:true, socket:"input", value:"0"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            
            console.log(props.a.get()[0] );
            var currentRelationsToConsider = []
            if (Array.isArray(props.a.get()) && props.a.get()[0] &&  props.a.get()[0].attributes.type) {
                // var entityRepo = createEntityManagement()
                // var entity = entityRepo.getById(props.a.get()[0].attributes.type)
                // var inOrOut = props.inOrOut.getOptionId()
                // if (inOrOut == "incoming" ) {
                    // if (entity.getIncomingRelations()) {
                    //     currentRelationsToConsider = entity.getIncomingRelations()
                    //     props.method.setOptions(entity.getIncomingRelations().map(function (e) {
                    //         return {id:e.uuid, value:e.name}
                    //     }))
                    // }
                // }else{
                    // console.log(entity.getOutgoingRelations());
                    // if (entity.getOutgoingRelations()) {
                    //     currentRelationsToConsider = entity.getOutgoingRelations()
                    //     props.method.setOptions(entity.getOutgoingRelations().map(function (e) {
                    //         return {id:e.uuid, value:e.name}
                    //     }))
                    // }
                // }
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
                        console.log(e);
                        console.log(instancesRelations);
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
                        console.log(relatedRelation);
                        // return {[props.method.get()]:relatedRelation}
                        return {relations:relatedRelation}
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