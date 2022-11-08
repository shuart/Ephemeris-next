var getCustomFormatterForCol = function (rows, col) {
    
    var formatterFunction = undefined
    console.log(col);
    
    //check if is an entity instance
    for (let i = 0; i < rows.length; i++) {
        var rowColToCheck =rows[i][col.field]
        if (rowColToCheck && rowColToCheck[0] && rowColToCheck[0].uuid && rowColToCheck[0].attributes) { //iterate to find a row with something
            formatterFunction = function(cell, formatterParams, onRendered){
                //cell - the cell component
                //formatterParams - parameters set for the column
                //onRendered - function to call when the formatter has been rendered
                var html = ""
                var instances = cell.getValue()
                for (let i = 0; i < instances.length; i++) {
                    const element = instances[i];
                    html += `<span onclick='alert();  event.stopPropagation();' style='background-color:green; margin-right:5px;padding:2px; border-radius:4px;' > ${element.name} </span>`
                }
                
                return html
            }
            break
        }
    }
    

    return formatterFunction
}

var checkColsForCustomFormating = function(rows, cols){
    
    var newCols = []
    if (rows[0] && cols[0]) {
        newCols = cols
        for (let i = 0; i < cols.length; i++) {
            const col = cols[i];
            
            newCols[i].formatter= getCustomFormatterForCol(rows, col)
        }
    }
}

export {checkColsForCustomFormating}