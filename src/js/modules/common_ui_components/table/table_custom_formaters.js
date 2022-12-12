var getCustomFormatterForCol = function (rows, col) {
    
    var formatterFunction = undefined
    console.log(col);
    
    //check if is an entity instance
    for (let i = 0; i < rows.length; i++) {
        var rowColToCheck =rows[i][col.field]
        if (rowColToCheck && rowColToCheck[0] && rowColToCheck[0].displayAs=="relation") { //iterate to find a row with something
            // if (rowColToCheck && rowColToCheck[0] && rowColToCheck[0].uuid && rowColToCheck[0].name &&  rowColToCheck[0].relation) { //iterate to find a row with something
            formatterFunction = function(cell, formatterParams, onRendered){
                //cell - the cell component
                //formatterParams - parameters set for the column
                //onRendered - function to call when the formatter has been rendered
                var html = ""
                var instances = cell.getValue()
                for (let i = 0; i < instances.length; i++) {
                    const element = instances[i];
                    html += `<span onclick='alert();  event.stopPropagation();' class="table-tag" > ${element.target.name} </span>`
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
            
            if (!newCols[i].formatter) {
                newCols[i].formatter= getCustomFormatterForCol(rows, col)
            }
            if (newCols[i].customButton) {
                newCols[i]= getCustomButtonFormatterForCol(rows, col)
            }
            if (newCols[i].customIcon) {
                newCols[i]= getCustomButtonFormatterForIcons(rows, col)
            }
            if (newCols[i].customColor) {
                newCols[i]= getCustomButtonFormatterForColors(rows, col)
            }
            
        }
    }
}

var getCustomButtonFormatterForCol = function(rows, col){
    
    var printIcon = function(cell, formatterParams, onRendered){ //plain text value
        return "<i class='fa fa-print'>"+col.customButton.value+"</i>";
    };
    var formatterButton = {formatter:printIcon, width:40, hozAlign:"center", cellClick:col.customButton.onClick};
    return formatterButton
}
var getCustomButtonFormatterForIcons = function(rows, col){
    
    var toDisplay= function(cell, formatterParams, onRendered){ //plain text value
        return `<img class="darkModeCompatibleIcons" src="./img/icons/${cell.getData()[col.field]}" >`;
    };
    var formatterIcon = {formatter:toDisplay, width:40, hozAlign:"center"};
    return formatterIcon
}

var getCustomButtonFormatterForColors = function(rows, col){
    
    var toDisplay= function(cell, formatterParams, onRendered){ //plain text value
        // return `<img class="darkModeCompatibleIcons" src="./img/icons/${cell.getData().iconPath}" >`;
        // return `<input type="color" id="head" name="head" value="${cell.getData()[col.field]|| '#e66465'}">`;
        return `
        <div style="overflow: hidden;width: 2em;height: 2em;border-radius: 50%; ">
            <input type="color" class="color_input" style="padding: 0;width: 150%;height: 150%;margin: -25%;" name="head" value="${cell.getData()[col.field]|| '#effffff'}">
        </div>
        `;
    };
    var formatterIcon = {formatter:toDisplay, width:50, hozAlign:"center", cellClick:function (e,cell) {
        //e.preventDefault()
        var input=cell.getElement().querySelector(".color_input")
        input.addEventListener('change', function (event) {
            col.callback({value:{color:input.value}}, cell)
        })
    }};
    return formatterIcon
}

export {checkColsForCustomFormating}