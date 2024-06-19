import {createXlsxParser} from './xlsxlib.js'
import createDialogue from "../../common_select_dialogue/common_dialogue.js"
import createEntityManagement from '../../common_project_management/entity_management.js';
import createInstancesManagement from '../../common_project_management/instances_management.js';

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
        ],
        onConfirm:(result)=>{

            console.log(result);
            readFile(result.source)
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
 function readFile(file){
    var readXlsxFile = createXlsxParser()
      readXlsxFile(file).then((rows) => {
        console.log(rows);
        var indexOfId = rows[0].indexOf('id');
        var indexOfName= rows[0].indexOf('name');
        if (indexOfId >= 0 && indexOfName >= 0) {
            var entitiesRepo = createEntityManagement()
            var instancesRepo = createInstancesManagement()
            var entities = entitiesRepo.getAll()


            for (let i = 0; i < rows.length; i++) {
                const element = rows[i];
                var newItem ={extId:element[indexOfId],name:element[indexOfName], type:entities[0].uuid}
                instancesRepo.add(newItem)
                
            }
        }
        
        // `rows` is an array of rows
        // each row being an array of cells.
      })

 }


// // File.
// const input = document.getElementById('input')
// input.addEventListener('change', () => {
//   readXlsxFile(input.files[0]).then((rows) => {
//     // `rows` is an array of rows
//     // each row being an array of cells.
//   })
// })

// // Blob.
// fetch('https://example.com/spreadsheet.xlsx')
//   .then(response => response.blob())
//   .then(blob => readXlsxFile(blob))
//   .then((rows) => {
//     // `rows` is an array of rows
//     // each row being an array of cells.
//   })

// // ArrayBuffer.
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
// //
// // Could be obtained from:
// // * File
// // * Blob
// // * Base64 string
// //
// readXlsxFile(arrayBuffer).then((rows) => {
//   // `rows` is an array of rows
//   // each row being an array of cells.
// })
