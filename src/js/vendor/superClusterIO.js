var startDb = function(dbname){
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("supercluster-crdt-"+dbname);
        request.onerror = (event) => {
            console.error(`Database error: ${event.target.errorCode}`);
        };
        request.onsuccess = (event) => {
            // db = event.target.result;
            resolve(event.target.result)
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("crdts", { autoIncrement: true });
            // const objectStore = db.createObjectStore("crdts", { keyPath: "row" });
            objectStore.createIndex("dataset", "dataset", { unique: false });
            // Use transaction oncomplete to make sure the objectStore creation is
            // finished before adding data into it.
            objectStore.transaction.oncomplete = (event) => {
            console.log("Done");
            };
        };
    });
 
}
var addBulkToDb = function(crdts, db){
    return new Promise((resolve, reject) => {

        const transaction = db.transaction(["crdts"], "readwrite");
        transaction.oncomplete = (event) => {
            resolve(event)
            console.log("All done!");
        };
        transaction.onerror = (event) => {
            console.error(event);
        };
        const objectStore = transaction.objectStore("crdts");
        for (let i = 0; i < crdts.length; i++) {
            objectStore.add(crdts[i]); 
        }
    });
}

async function importToPersistence(template, dbname) {
    var templateDB = JSON.parse(template)
    if (templateDB.ls) {
        var stringTemplate = JSON.stringify(templateDB.ls)
        localStorage.setItem('supercluster-'+dbname, stringTemplate)
    }
    if (templateDB.crdt) {
        var db = await startDb(dbname)
        await addBulkToDb(templateDB.crdt, db)
    }

    return true

}

export {importToPersistence}