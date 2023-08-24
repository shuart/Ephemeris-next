import { getMentionsPlugin } from "./mentionPlugin.js";

export var getDefaultMentionPlugin = function (defs, lists, callbacks) {
    var defsMap = {}
    for (let i = 0; i < defs.length; i++) {
        defsMap[defs[i].name] =  defs[i];
        
    }

    var getTagSuggestionsHTML = (items,type) => '<div class="suggestion-item-list">'+
    items.map(i => '<div class="suggestion-item">'+i[defsMap[type].attributeToDisplay]+'</div>').join('')+
    '</div>';

    /**
     * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
     * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
     */
    var mentionPlugin = getMentionsPlugin(defs, {
        functionOnClick: callbacks,
        getSuggestions: (type, text, done) => {
            console.log(text);
            setTimeout(() => {
            if (type) {
                // pass dummy mention suggestions
                console.log(lists);
                console.log(type);
                done(( lists[type].filter(e => e[defsMap[type].attributeToDisplay].toLowerCase().search(text.toLowerCase()) >=0) ))
            }
            
            }, 0);
        },
        getSuggestionsHTML: (items, type) =>  {
            if (type) {
                return getTagSuggestionsHTML(items,type)
            } 
            
        }
    });

    return mentionPlugin
}

