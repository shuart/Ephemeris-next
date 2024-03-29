import { createNameAttributeEditor } from "../../common_attributes_editors/common_name_attribute_editor.js";
import { renderTextAttribute } from "../../common_attributes_editors/common_text_attribute_editor.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";

var getCustomFormatterForCol = function (rows, col, originalColConfig) {
    
    var formatterFunction = undefined
    console.log(col);
    //check if is an entity instance
    // alert("fesf")
    for (let i = 0; i < rows.length; i++) {
        var rowColToCheck =rows[i][col.field]
        
        if (rowColToCheck && rowColToCheck[0] && rowColToCheck[0].displayAs=="relation") { //iterate to find a row with something
        // if (rowColToCheck && rowColToCheck[0] && rowColToCheck[0].displayAs=="relation") { //iterate to find a row with something
            // if (rowColToCheck && rowColToCheck[0] && rowColToCheck[0].uuid && rowColToCheck[0].name &&  rowColToCheck[0].relation) { //iterate to find a row with something


            formatterFunction = getCustomFormatterForRelations(rows, col, rowColToCheck[0].callback)

            // formatterFunction = function(cell, formatterParams, onRendered){
            //     //cell - the cell component
            //     //formatterParams - parameters set for the column
            //     //onRendered - function to call when the formatter has been rendered
            //     var html = ""
            //     var instances = cell.getValue()
            //     for (let i = 0; i < instances.length; i++) {
            //         const element = instances[i];
            //         html += `<span data-id='${element.target.uuid}' class="table-tag action-tag" > ${element.target.name} </span>`
            //     }

            //     onRendered(function(params) {
                    
            //         var domElemOfCell = cell.getElement()
            //         var tags = domElemOfCell.querySelectorAll('.action-tag')
            //         for (let i = 0; i < tags.length; i++) {
            //             const tag = tags[i];
            //             tag.addEventListener('click', function (ev) {
            //                 ev.stopPropagation();
            //                 rowColToCheck[0].callback(ev.target.dataset.id)
            //             })
            //         }
            //     })
                
            //     return html
            // }
            break
        }
        if (rowColToCheck && rowColToCheck.property) { //iterate to find a row with something
            
            formatterFunction = getCustomFormatterForProperties(rows, col)
            break
        }
        
    }
    
    originalColConfig.formatter=formatterFunction

    return originalColConfig
}

var checkColsForCustomFormating = function(rows, cols){

    var newCols = []
    if (rows[0] && cols[0]) {
        newCols = cols
        for (let i = 0; i < cols.length; i++) {
            const col = cols[i];
            
            if (!newCols[i].formatter) {
                newCols[i] = getCustomFormatterForCol(rows, col, newCols[i])
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
            if (newCols[i].customSwitch) {
                newCols[i]= getCustomButtonFormatterForSwitch(rows, col)
            }
            if (newCols[i].customObject) {
                newCols[i]= getCustomFormatterForObject(rows, col)
            }
            if (newCols[i].customObjects) {
                newCols[i]= getCustomFormatterForObjects(rows, col)
            }
            if (newCols[i].customTags) {
                newCols[i]= getCustomFormatterForTags(rows, col)
            }
            if (newCols[i].isAttribute) {
                newCols[i]= getCustomFormatterForAttributes(rows, col)
            }
        }
    }
}

var getCustomFormatterForAttributes = function(rows, col){

    var renderedElement = function(cell, formatterParams, onRendered){ //plain text value
        var domEl = renderTextAttribute(col.field.substring(5), cell.getData()[col.field], cell.getData().uuid)
        
        if (cell.getData()._copiedInTable &&  cell.getData()._copiedInTable[col.field]) {
            domEl ="<span class='table_copied_cell'></span>"
        }
        return domEl
    };
    // var formatterButton = {formatter:printIcon, width:400, hozAlign:"center", cellClick:col.customSwitch.onClick};
    // var formatterButton = {title:col.title, formatter:renderedElement, width:60, hozAlign:"center", cellClick:function (e,cell) {
    //     //e.preventDefault()
    //     var input=cell.getElement().querySelector(".tbl_toggle__input")
    //     input.checked = !input.checked 
    //     col.customSwitch.onClick({value:{checked:input.checked}}, cell)
    // }};
    col.formatter = renderedElement
    return col
}

// var getCustomFormatterForAttributes = function(rows, col){

//     var renderedElement = function(cell, formatterParams, onRendered){ //plain text value
//         var domEl = renderTextAttribute(col.field.substring(5), cell.getData()[col.field], cell.getData().uuid)
        
//         if (cell.getData()._copiedInTable &&  cell.getData()._copiedInTable[col.field]) {
//             domEl =""
//         }
//         return domEl
//     };
//     col.formatter = renderedElement
//     return col
// }

var getCustomButtonFormatterForCol = function(rows, col){
    var styleClass=""
    var iconElement=""

    if (col.customButton.style) {
        styleClass = col.customButton.style 
        
    }
    if (col.customButton.iconPath) {
        // iconElement = `<img class="darkModeCompatibleIcons" style="height: 16px;position: relative;left: 2px; top: -1px;" src="./img/icons/${col.customButton.iconPath}" >`
        iconElement = `<img class="darkModeCompatibleIcons" style="width: 105%; height: auto;" src="./img/icons/${col.customButton.iconPath}" >`
        
    }
    
    var printIcon = function(cell, formatterParams, onRendered){ //plain text value
        return "<i class='fa fa-print "+styleClass+ " '>"+ iconElement+ col.customButton.value+"</i>";
    };
    var formatterButton = {formatter:printIcon, width:40, hozAlign:"center", cellClick:col.customButton.onClick};
    return formatterButton
}
var getCustomButtonFormatterForSwitch = function(rows, col){

    var printIcon = function(cell, formatterParams, onRendered){ //plain text value
        return `
        <label class="tbl_toggle" for="tg_${cell.getData().uuid}">
            <input class="tbl_toggle__input" name="" type="checkbox" id="tg_${cell.getData().uuid}" ${cell.getData()[col.field] ? "checked":""}/>
            <div class="tbl_toggle__fill"></div>
        </label>
        `;
    };
    // var formatterButton = {formatter:printIcon, width:400, hozAlign:"center", cellClick:col.customSwitch.onClick};
    var formatterButton = {formatter:printIcon, width:60, hozAlign:"center", cellClick:function (e,cell) {
        //e.preventDefault()
        var input=cell.getElement().querySelector(".tbl_toggle__input")
        input.checked = !input.checked 
        col.customSwitch.onClick({value:{checked:input.checked}}, cell)
    }};
    return formatterButton
}
var getCustomButtonFormatterForIcons = function(rows, col){

    var toDisplay= function(cell, formatterParams, onRendered){ //plain text value
        var iconPath = cell.getData()[col.field] || col.defaultPath
        return `<img class="darkModeCompatibleIcons" style="height:24px; width:24px" src="./img/icons/${iconPath}" >`;
    };
    var formatterIcon = {formatter:toDisplay, width:40, hozAlign:"center",cellClick:function (e,cell) {
        if (col.callback) {
            col.callback(e, cell)
        }
        
    }};
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

var getCustomFormatterForObject = function (rows, col) {
    var toDisplay= function(cell, formatterParams, onRendered){ //plain text value

        onRendered(function(params) {
            var item = cell.getData()
            var domElemOfCell = cell.getElement()
            var editActions = domElemOfCell.querySelectorAll('.tableEditAction')
            for (let i = 0; i < editActions.length; i++) {
                editActions[i].addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    createNameAttributeEditor(item.name,item.uuid)
                })
            }
            // var domElemOfCell = cell.getElement()
            var tags = domElemOfCell.querySelectorAll('.table-tag')
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                tag.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    showPopupInstancePreview(item.uuid)
                })
            }
        })
        
        if (cell.getData()._copiedInTable &&  cell.getData()._copiedInTable[col.field]) {
            return "<span class='table_copied_cell'></span>"
        }else{
            var item = cell.getData()
            var colorField = ""
            var iconPart =""
            var editPart =""
            var deletePart =""
            if (item.color) {
                colorField = "background-color:"+(item.color)+";"
            }
            if (item.iconPath) {
                iconPart = '<span class=""><img class="tableTagIcon" src="./img/icons/'+item.iconPath+'"></img></span>'
            }
            if (true) {
                deletePart = '<span class="tableEditActionContainer "><img class="tableTagIcon tableObjectAction tableDeleteAction" src="./img/icons/x.svg"></img></span>'
            }
            if (true) {
                editPart = '<span class="tableEditActionContainer "><img class="tableTagIcon tableObjectAction tableEditAction" src="./img/icons/edit-2.svg"></img></span>'
            }
            // return ` <span style="${colorField}" onclick='alert();  event.stopPropagation();' class="table-tag" >${editPart}${deletePart}  ${iconPart} ${cell.getData()[col.field]? cell.getData()[col.field] : ""} </span>`;
            return ` <span style="${colorField}" class="table-tag" >${editPart}${deletePart}  ${iconPart} ${cell.getData()[col.field]? cell.getData()[col.field] : ""} </span>`;
        }
    };
    var colObject = {formatter:toDisplay, width:90, title:col.title, cellClick:col.cellClick};
    return colObject
}

var getCustomFormatterForTags = function (rows, col) {
    
    var formatterFunction = function(cell, formatterParams, onRendered){
        //cell - the cell component
        //formatterParams - parameters set for the column
        //onRendered - function to call when the formatter has been rendered
        var html = ""
        var items = cell.getData()[col.field]
        if (items == undefined) {
            items = []
        }
        if (!Array.isArray(items)) {
            items = [items]
        }
        if (items[0] === undefined) {
            items = []  
        }
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            var colorField = ""
            var iconPart =""
            if (element.attributes?.color || element.color) {
                colorField = "background-color:"+(element.attributes?.color || element.color )+";"
            }
            if (element.iconPath) {
                iconPart = '<span class=""><img class="tableTagIcon" src="./img/icons/'+element.iconPath+'"></img></span>'
            }
            console.log(element);
            html += `<span style="${colorField}" data-id='${element.uuid}' class="table-tag action-tag" >${iconPart} ${element.name} </span>`
        }
        // onRendered(function(params) {
            
        //     var domElemOfCell = cell.getElement()
        //     var tags = domElemOfCell.querySelectorAll('.action-tag')
        //     for (let i = 0; i < tags.length; i++) {
        //         const tag = tags[i];
        //         tag.addEventListener('click', function (ev) {
        //             ev.stopPropagation();
        //             col.callback(ev.target.dataset.id)
        //         })
        //     }
        // })
        return html
    }

    var rowDef = {formatter:formatterFunction, width:col.width, title:col.title, cellClick:col.cellClick};
    return rowDef
}


var getCustomFormatterForObjects = function (rows, col) {
    
    var formatterFunction = function(cell, formatterParams, onRendered){
        //cell - the cell component
        //formatterParams - parameters set for the column
        //onRendered - function to call when the formatter has been rendered
        var html = ""
        var items = cell.getData()[col.field]
        if (items == undefined) {
            items = []
        }
        if (!Array.isArray(items)) {
            items = [items]
        }
        if (items[0] === undefined) {
            items = []  
        }
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            var colorField = ""
            if (element.attributes.color || element.color) {
                colorField = "background-color:"+(element.attributes.color || element.color )+";"
            }
            console.log(element);
            html += `<span style="${colorField}" data-id='${element.uuid}' class="table-tag action-tag" > ${element.name} </span>`
        }

        onRendered(function(params) {
            
            var domElemOfCell = cell.getElement()
            var tags = domElemOfCell.querySelectorAll('.action-tag')
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                tag.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    col.callback(ev.target.dataset.id)
                })
            }
        })
        
        return html
    }

    var rowDef = {formatter:formatterFunction, width:col.width, title:col.title, cellClick:col.cellClick};
    return rowDef
}

var getCustomFormatterForRelations = function (rows, col, callback) {

    var formatterFunction = function(cell, formatterParams, onRendered){
        //cell - the cell component
        //formatterParams - parameters set for the column
        //onRendered - function to call when the formatter has been rendered
        var html = ""
        var instances = cell.getValue()
        console.log(cell);
        if (instances) {
            for (let i = 0; i < instances.length; i++) {
                const element = instances[i];
                var colorField = ""
                if (element.target.color || element.target.attributes?.color) {
                    colorField = "background-color:"+(element.target.color || element.target.attributes?.color )+";"
                }
                console.log(element);
                html += `<span style="${colorField}" data-id='${element.target.uuid}' class="table-tag action-tag" > ${element.target.name} </span>`
            }  
        }else{
            html += ``
        }
        if (cell.getData()._copiedInTable &&  cell.getData()._copiedInTable[col.field]) {
            html ="<span class='table_copied_cell'></span>"
        }
        

        onRendered(function(params) {
            
            var domElemOfCell = cell.getElement()
            var tags = domElemOfCell.querySelectorAll('.action-tag')
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                tag.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    callback(ev.target.dataset.id)
                })
            }
        })
        
        return html
    }
    return formatterFunction
}

var getCustomFormatterForProperties = function (rows, col) {

    var formatterFunction = undefined
    
    formatterFunction = function(cell, formatterParams, onRendered){
        //cell - the cell component
        //formatterParams - parameters set for the column
        //onRendered - function to call when the formatter has been rendered
        var html = ""
        var content = cell.getValue()
        // for (let i = 0; i < instances.length; i++) {
        //     const element = instances[i];
        //     html += `<span data-id='${element.target.uuid}' class="table-tag action-tag" > ${element.target.name} </span>`
        // }
        
        html += `<span data-id='${content.property.uuid}' class="" > ${content.value} </span>`

        // onRendered(function(params) {
            
        //     var domElemOfCell = cell.getElement()
        //     var tags = domElemOfCell.querySelectorAll('.action-tag')
        //     // for (let i = 0; i < tags.length; i++) {
        //     //     const tag = tags[i];
        //     //     tag.addEventListener('click', function (ev) {
        //     //         ev.stopPropagation();
        //     //         console.log(cell.getData().uuid);
        //     //         console.log(cell.getValue().uuid);
        //     //         // callback(ev.target.dataset.id)
        //     //     })
        //     // }
        // })
        
        return html
    }
    return formatterFunction
}

export {checkColsForCustomFormating}