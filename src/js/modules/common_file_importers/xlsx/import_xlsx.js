import {createXlsxParser} from './xlsxlib.js'
import createDialogue from "../../common_select_dialogue/common_dialogue.js"
import createEntityManagement from '../../common_project_management/entity_management.js';
import createInstancesManagement from '../../common_project_management/instances_management.js';
import createRelationManagement from '../../common_project_management/relations_management.js';
import createPropertyManagement from '../../common_project_management/properties_management.js';
import createRelationInstancesAggregate from '../../common_project_management/relationInstances_management.js';

function getEntitiesOptions() {
    var repo = createEntityManagement()
    var entities = repo.getAll()
    var options = entities.map(e=>{
        return  {name:e.name, uuid:e.uuid, iconPath:e.attributes.iconPath, color:e.attributes.color}
    })
    return options
}

export var showImportXlsxDialogue = function () {
    createDialogue({
        fields:[
        //  {type:"text", name:"text",config:{
        //          label:"Property Name",
        //          value:"Property Name",
        //          autofocus:true,
        //      }
        //  },
            {type:"file", name:"source", config:{
                    // multipleSelection:multipleSelection,
                    label:"Source",
                    //  list: options,
                    //  selected:selected,
                }
            },
            {type:"selection", name:"selection", config:{
                multipleSelection:false,
                label:"Property Type",
                list: getEntitiesOptions(),
                selected:[],
                }   
            },
        ],
        onConfirm:(result)=>{

            console.log(result);
            var selectedEntity = undefined;
            if (result.selection) {
                selectedEntity =result.selection[0]
            }
            readFile(result.source, selectedEntity)
            // readFile(result.source)
            // alert()
            // var added = []
            // var removed = []
            // var newSelection = result.selection
            // if (Array.isArray(selected)) {
            //     selected = selectedArrayToObject(selected)
            // }
            // if (Array.isArray(result.selection)) {
            //     newSelection = selectedArrayToObject(result.selection)
            // }
            // for (const key in selected) {
            //     if (Object.hasOwnProperty.call(selected, key)) {
            //         const originalUuid = selected[key];
            //         if(!newSelection[key]){
            //             removed.push(key)
            //         }
            //     }
            // }
            // for (const key in newSelection) {
            //     if (Object.hasOwnProperty.call(newSelection, key)) {
            //         const newUuid = newSelection[key];
            //         if(!selected[key]){
            //             added.push(key)
            //         }
            //     }
            // }
            // var change = {added, removed} //TODO check here
            // // onChange(result, change)
        } 
     })
}
 function readFile(file, entityToCast){
    var readXlsxFile = createXlsxParser()
      readXlsxFile(file).then((rows) => {
        console.log(rows);
        var indexOfId = rows[0].indexOf('id');
        var indexOfName= rows[0].indexOf('name');
        var indexOfEntity =rows[0].indexOf('_type');
        if (indexOfId >= 0 && indexOfName >= 0) {
            var entitiesRepo = createEntityManagement()
            var relationRepo = createRelationManagement()
            var propertiesRepo = createPropertyManagement()
            var instancesRepo = createInstancesManagement()
            var instances = instancesRepo.getAll()
            var entities = entitiesRepo.getAll()
            var relations = relationRepo.getAll()
            var properties = propertiesRepo.getAll()
            var externalMapping = {}
            var entityNameMapping = {}
            var relationNameMapping = {}
            var propertiesNameMapping = {}
            var doneExtIds = {}
            for (let i = 0; i < instances.length; i++) {
                var extId = instances[i].attributes.extId;
                console.log(instances[i]);
                if (extId) {
                    externalMapping[extId] = instances[i]
                }
            }
            for (let i = 0; i < entities.length; i++) {
                entityNameMapping[entities[i].name]=entities[i]
            }
            for (let i = 0; i < relations.length; i++) {
                relationNameMapping[relations[i].name]=relations[i]
            }
            for (let i = 0; i < properties.length; i++) {
                propertiesNameMapping[properties[i].name]=properties[i]
            }

            for (let i = 1; i < rows.length; i++) {
                const element = rows[i];
                if (!doneExtIds[element[indexOfId]]) {
                    doneExtIds[element[indexOfId]]= true
                    var currentEntity =entities[0].uuid
                    if (element[indexOfEntity] && entityNameMapping[element[indexOfEntity]]) {// check the correct entity
                        currentEntity =entityNameMapping[element[indexOfEntity]].uuid
                    }
                    if (entityToCast) {// check the correct entity
                        currentEntity =entityToCast.uuid
                    }
                    if (element[indexOfId] && externalMapping[ element[indexOfId] ]) {// update existing ID if already present
                        var newInfo={name:element[indexOfName], type:currentEntity}
                        var idToUpdate = externalMapping[ element[indexOfId] ].uuid
                        console.log(idToUpdate+' updated');
                        newInfo = Object.assign({}, newInfo, getPropertyObject(rows[0],rows[i], propertiesNameMapping) )// assign props
                        instancesRepo.update(idToUpdate, newInfo)
                    } else {
                        var newItem ={extId:element[indexOfId],name:element[indexOfName], type:currentEntity}
                        newItem = Object.assign({}, newItem, getPropertyObject(rows[0],rows[i], propertiesNameMapping) )// assign props
                        instancesRepo.add(newItem)
                    } 
                }else{
                    console.log(element[indexOfId]+' was already added/modified this time');
                }

                
            }
            addRelationsFromHeaders(rows[0],rows, indexOfId)
        }
        
        // `rows` is an array of rows
        // each row being an array of cells.
      })
 }

 function getPropertyObject(topRow,row, mapping) {
    var objectToReturn = {}
    for (let i = 0; i < topRow.length; i++) {
        const headerElement = topRow[i];
        if (headerElement != 'name' && 'uuid' && 'id') {
            if (mapping[headerElement] && mapping[headerElement].uuid) { // if the header is part of the mapping
                objectToReturn['prop_'+mapping[headerElement].uuid] =row[i]
            }
        } 
    }
    return objectToReturn
 }
 function addRelationsFromHeaders(topRow,rows, indexOfId) {
    var entitiesRepo = createEntityManagement()
    var relationRepo = createRelationManagement()
    var propertiesRepo = createPropertyManagement()
    var instancesRepo = createInstancesManagement()
    var relationInstancesRepo = createRelationInstancesAggregate()
    var instances = instancesRepo.getAll()
    var entities = entitiesRepo.getAll()
    var relations = relationRepo.getAll()
    var relationsInstances = relationInstancesRepo.getAll()
    var properties = propertiesRepo.getAll()
    var externalMapping = {}
    var externalRelationInstancesMapping = {}
    var entityNameMapping = {}
    var relationNameMapping = {}
    var propertiesNameMapping = {}

    for (let i = 0; i < instances.length; i++) {
        var extId = instances[i].attributes.extId;
        console.log(instances[i]);
        if (extId) {
            externalMapping[extId] = instances[i]
        }
    }
    for (let i = 0; i < relationsInstances.length; i++) {
        var extId = relationsInstances[i].attributes.extId;
        console.log(relationsInstances[i]);
        if (extId) {
            externalRelationInstancesMapping[extId] = relationsInstances[i]
        }
    }
    for (let i = 0; i < entities.length; i++) {
        entityNameMapping[entities[i].name]=entities[i]
    }
    for (let i = 0; i < relations.length; i++) {
        relationNameMapping[relations[i].name]=relations[i]
    }
    for (let i = 0; i < properties.length; i++) {
        propertiesNameMapping[properties[i].name]=properties[i]
    }
    // until here, refresh all buffers
    for (let i = 1; i < rows.length; i++) {
        const element = rows[i];
        
        if (element[indexOfId] && externalMapping[ element[indexOfId] ]) {// update existing ID if already present

            var idOfImportedInstance = externalMapping[ element[indexOfId] ]
            for (let i = 0; i < topRow.length; i++) {
                const headerElement = topRow[i];
                if (headerElement != 'name' && 'uuid' && 'id') {
                    if (relationNameMapping[headerElement] && relationNameMapping[headerElement].uuid) { // if the header is part of the mapping
                        if (externalMapping[ element[i] ]) { // check if the id in the col is an instance
                            var fromElement = idOfImportedInstance
                            var toElement = externalMapping[ element[i] ]
                            var extId = element[indexOfId]+element[i]+relationNameMapping[headerElement].uuid
                            if (!externalRelationInstancesMapping[extId]) { // check if relation is not already existing
                                relationInstancesRepo.add({name:`from ${fromElement.name} to ${toElement.name}`, extId:extId, from:fromElement.uuid, to:toElement.uuid, type:relationNameMapping[headerElement].uuid})

                            }else{
                                alert('RelationAlreadyAdded')
                            }
                        }
        
                    }
                } 
            }
        } else {
            // var newItem ={extId:element[indexOfId],name:element[indexOfName], type:currentEntity}
            // newItem = Object.assign({}, newItem, getPropertyObject(rows[0],rows[i], propertiesNameMapping) )// assign props
            // instancesRepo.add(newItem)
        }
    }
 }
