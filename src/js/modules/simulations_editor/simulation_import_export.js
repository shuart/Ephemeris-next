function createSimulationTemplateManager(){
    var self = {}
    function exportTemplate(network){
        
        alert(network)

        const link = document.createElement("a");
        const file = new Blob([network], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "ephemeris_simulation.txt";
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

export {createSimulationTemplateManager}