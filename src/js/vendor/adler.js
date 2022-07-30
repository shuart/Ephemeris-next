var createAdler = function({
    container = document.body,
    type = "root",
    parent= undefined,
    params = {},
    content ="",
    components={},
    css="",
    nodeMap={},
    slotMap={},
    } = {}){
    var self={}
    var wrapper = undefined;
    var renderList = []
    var checkDataAttributes = true;
    var instanceDomElement = undefined;
    
    
    var createWrapper = function(){
        wrapper = {}
        wrapper.DOMElement=document.createElement("div")
        return wrapper
    }

    function addCSS(cssText){
        var style = document.createElement('style');
        style.innerHTML = cssText;
        document.head.appendChild(style);
    }

    var renderContent= function (params,paramIndex) {
        let localWrapper = createWrapper()
        if(typeof content === 'function'){//case content is a function
            localWrapper.DOMElement.innerHTML = content(getParamsData(params,paramIndex))
        }
        if (localWrapper.DOMElement.childElementCount == 1) {//if template has a single root, no need for an extra div wrapper
            localWrapper.DOMElement = localWrapper.DOMElement.firstElementChild; 
        }
        return localWrapper
    }

    var setUpEvents = function (localWrapper,params, paramIndex){
        var setEventListener = function(localWrapper, action){
            let target = localWrapper.DOMElement.querySelector(action[0])
            console.log(action[0],localWrapper.DOMElement)
            if (!target && localWrapper.DOMElement.classList.contains(action[0].slice(1))) {
                target = localWrapper.DOMElement
            }
            if (target) {
                function callback(event) {
                    action[2](event, getParamsData(params,paramIndex), self);//inject params into event
                }
                target.addEventListener(action[1],callback);
            }else{
                console.log("missing event target")
            }
        }
        if (params && params.on) {
            console.log(params)
            if ( Array.isArray(params.on[0]) ) {
                for (let index = 0; index < params.on.length; index++) {
                    const action = params.on[index];
                    setEventListener(localWrapper, action);
                }
            }else{
                const action = params.on;
                setEventListener(localWrapper, action);
            } 
        }
    }

    function getParamsData(params,paramIndex) { //get the current params even if in a 'for' case
        let newData = params.data || {}
        if (params.for && (paramIndex || paramIndex==0 )) {
            newData = Object.assign({},newData, params.for[paramIndex] )
        }
        return newData
    }

    var appendToDom = function(mountTargetElement){
        wrapper = renderContent(params);
        setUpEvents(wrapper,params);
        applyLogic(wrapper,params);
        mountComponents(wrapper,params);
        mountSlots(wrapper,params);
        if (mountTargetElement && mountTargetElement=="replace") {
            instanceDomElement.parentNode.replaceChild(wrapper.DOMElement, instanceDomElement);
            instanceDomElement =  wrapper.DOMElement;
        }else if(mountTargetElement){
            mountTargetElement.appendChild(wrapper.DOMElement);
            instanceDomElement =  wrapper.DOMElement
        }else{
            container.appendChild(wrapper.DOMElement);
            instanceDomElement =  wrapper.DOMElement
        }
        return wrapper.DOMElement
    }

    var instance = function(extra){
        var newPramas = Object.assign({}, params);
        if(extra && extra.data){ newPramas.data = Object.assign({}, newPramas.data, extra.data) };
        if(extra && extra.on){ newPramas.on = Object.assign({},newPramas.on, extra.on) };
        if(extra && extra.nodeMap){ newPramas.nodeMap = Object.assign({},newPramas.nodeMap, extra.nodeMap) };
        return createAdler({content: content, params:newPramas, components:components});
    }

    var mount = function(mountTarget){
        if(mountTarget && typeof mountTarget =="string"){
            appendToDom(document.querySelector(mountTarget))
        }else if(mountTarget){
            appendToDom(mountTarget)
        }else{
            appendToDom()
        }
    }
    var applyLogic = function(wrapper,params){
        var foundComponents = wrapper.DOMElement.querySelectorAll("[a-if]")
        for (let i = 0; i < foundComponents.length; i++) {
            const element = foundComponents[i];
            if( params.data[element.getAttribute("a-if")] != true ) element.remove();
        }
    }
    var registerInNodeMap = function(id, instance){
        nodeMap[id]=instance;
    }
    var mountComponents = function(wrapper,params){
        var foundComponents = wrapper.DOMElement.querySelectorAll("[adler]")
        for (let i = 0; i < foundComponents.length; i++) {
            const element = foundComponents[i];
            var templateComponent = components[element.getAttribute("adler")]
            if(!templateComponent){
                console.log(components);
                console.log("missing component");
            }else{
                var newData = {data:{}, nodeMap:nodeMap}
                if (element.getAttribute("a-sync")) {//Check if some values must be synced
                    //newData=newData || {data:{}}
                    newData.data = getSyncedData(element.getAttribute("a-sync"))
                }
                if (element.getAttribute("a-id")) {//Check if component is unique
                    //newData=newData || {data:{}}
                    newData.data = Object.assign(newData.data, getUniqueComponentData(element.getAttribute("a-id")) ) //add custom data attribute in new data
                }
                if(checkDataAttributes){//check if data attributes overides the template values
                    //newData=newData || {data:{}}
                    newData.data = Object.assign(newData.data, updateDataFromAttributes(templateComponent.getData(), element) ) //add custom data attribute in new data
                }
                //Mount one or multiple times
                if (element.getAttribute("a-for")) {
                    var listArray = params.data[element.getAttribute("a-for")];
                    //newData=newData || {data:{}};
                    for (let i = 0; i < listArray.length; i++) {
                        const currentDataInArray = listArray[i];
                        newData.data = Object.assign(newData.data, currentDataInArray ); //add custom data attribute in new data
                        var instance = templateComponent.instance(newData); //Instance with new synced data
                        if (element.getAttribute("a-id")) registerInNodeMap(element.getAttribute("a-id"),instance);
                        instance.mount(element);
                    }
                }else{
                    var instance = templateComponent.instance(newData); //Instance with new synced data
                    if (element.getAttribute("a-id")) registerInNodeMap(element.getAttribute("a-id"),instance);
                    instance.mount(element);
                }
            }
        }
    }

    var mountSlots = function(wrapper,params){
        var foundSlots = wrapper.DOMElement.querySelectorAll("[a-slot]")
        for (let i = 0; i < foundSlots.length; i++) {
            const element = foundSlots[i];
            var component = slotMap[element.getAttribute("a-slot")]
            if(!component){
                console.log("missing component");
            }else{
                component.mount(element);
            }
        }
    }

    var getSyncedData = function(attributeValue){
        var pairs= attributeValue.split(",")
        var newValues = {}
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split(":");
            newValues[ pair[0] ]=params.data[ pair[1] ]
            
        }
        return newValues
    }
    var getUniqueComponentData = function(id){
        var newValues = {}
        if (nodeMap[id]) {
            newValues = nodeMap[id].getData()
        }
        return newValues
    }
    var updateDataFromAttributes = function (data, element) {
        var newData = {}
        for (const key in data){
            if(element.dataset[key]) newData[key] = element.dataset[key];
        }
        return newData
    }

    var getData = function(){
        return params.data
    }
    var getNodes = function(){
        return Object.assign({}, nodeMap, slotMap)
    }

    var setData = function(newData){
        console.log("update data");
        params.data = Object.assign(params.data,newData )
        update()
    }
    var append = function (component,slot) {
        slotMap[slot] = component;
    }
    var clearSlot = function (slot) {
        slotMap[slot].unmount()
        slotMap[slot] = undefined;
        //wrapper.DOMElement.querySelector("[a-slot]="+slot).innerHTML=""
    }

    var update = function(){
        //remove()
        appendToDom("replace")
    }

    var remove = function(){
        wrapper.DOMElement.remove()
    }
    var unmount = function(){
        remove()
    }

    var getDOMElement = function(){
        return wrapper.DOMElement
    }
    var query = function(query){
        return wrapper.DOMElement.querySelector(query)
    }

    var init= function(){
        //init template elements (like css etc)
        if (css) {addCSS(css)};
    }

    init()

    self.query = query
    self.getDOMElement = getDOMElement
    self.unmount = unmount;
    self.clearSlot = clearSlot;
    self.update = update;
    self.append = append;
    self.getNodes = getNodes;
    self.getData = getData;
    self.instance = instance;
    self.setData = setData;
    self.mount = mount;
    return self
}

export default createAdler;