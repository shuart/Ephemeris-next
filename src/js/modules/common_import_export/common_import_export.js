import projectManagement from "../common_project_management/project_management.js"
import projectStores from "../common_project_management/project_data_store.js"

function createTemplateManager(){
    var self = {}
    async function exportTemplate(){
        var projectId = projectManagement.getCurrent().id
        // projectManagement.getProjectStore(projectId,data.modelElementType)
        var store = projectStores.getProjectDB(projectId)
        
        var localStorageItem = await store.exportLocalStorage() 
        alert(localStorageItem)
        const link = document.createElement("a");
        const file = new Blob([localStorageItem], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "ephemeris.txt";
        link.click();
        URL.revokeObjectURL(link.href);

    }

    function importTemplateFromFile(callback) {
        var input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => { 

            // getting a hold of the file reference
            var file = e.target.files[0]; 

            // setting up the reader
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');

            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
                var content = readerEvent.target.result; // this is the content!
                console.log( content );
                if (callback) {
                    callback(content)
                }
            }

        }

        input.click();
    }

    self.importTemplateFromFile = importTemplateFromFile
    self.exportTemplate = exportTemplate
    return self
}

export {createTemplateManager}