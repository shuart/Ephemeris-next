import { renderNameAttribute } from "./common_name_attribute_editor.js"
import { renderTextAttribute } from "./common_text_attribute_editor.js"

export var getAttributeRenderer = function (type) {
    var table={
        text:renderTextAttribute,
        name:renderNameAttribute,
    }

    return table[type]
    
}