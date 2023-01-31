var cleanLinksVisibility = function(state){
    var links = state.links
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if ( state.mapping[link.edata.from].uiRootObject.visible ==false ||  state.mapping[link.edata.to].uiRootObject.visible ==false  ) {
            link.visible = false
        }else{
            link.visible = true
        }
        console.log(link);
        console.log(state);
    }
}

export default cleanLinksVisibility