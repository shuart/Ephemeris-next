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
    var renderList = [];
    var currentComponents = undefined;
    var checkDataAttributes = true;
    var instanceDomElement = undefined;
    
    console.log(params);
    
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

    var setContent = function(newContent) {
        content = newContent
    }

    var setUpEvents = function (localWrapper,params, paramIndex){
        console.log(self);
        var setEventListener = function(localWrapper, action){
            // let target = localWrapper.DOMElement.querySelector(action[0])
            const targets = localWrapper.DOMElement.querySelectorAll(action[0]);

            targets.forEach((target) => {
                function callback(event) {
                    action[2](event, getParamsData(params,paramIndex), self);//inject params into event
                }
                target.addEventListener(action[1],callback);
            });

            if (action[0] && localWrapper.DOMElement.classList.contains(action[0].slice(1))) {
                function callback(event) {
                    action[2](event, getParamsData(params,paramIndex), self);//inject params into event
                }
                localWrapper.DOMElement.addEventListener(action[1],callback);
            }


            // // console.log(action[0],localWrapper.DOMElement)
            // if (!target && action[0] && localWrapper.DOMElement.classList.contains(action[0].slice(1))) {
            //     target = localWrapper.DOMElement
            // }
            // if (target) {
            //     function callback(event) {
            //         action[2](event, getParamsData(params,paramIndex), self);//inject params into event
            //     }
            //     target.addEventListener(action[1],callback);
            // }else{
            //     console.log("missing event target")
            // }
        }
        if (params && params.on) {
            // console.log(params)
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
        setUpReplacementComponents(params)
        setUpProps(params)
        doLifeCycleEvents("onBeforeMount")//Lifecyle event
        wrapper = renderContent(params);
        setUpEvents(wrapper,params);
        applyLogic(wrapper,params);
        mountComponents(wrapper,params);
        mountSlots(wrapper,params);
        if (mountTargetElement && mountTargetElement=="replace") {
            
            // console.log(params, mountTargetElement);
            if(instanceDomElement){//if is mounting on body
                instanceDomElement.parentNode.replaceChild(wrapper.DOMElement, instanceDomElement);
                instanceDomElement =  wrapper.DOMElement;
            }else{
                container.appendChild(wrapper.DOMElement);
            }
            
        }else if(mountTargetElement){
            mountTargetElement.appendChild(wrapper.DOMElement);
            instanceDomElement =  wrapper.DOMElement
        }else{
            container.appendChild(wrapper.DOMElement);
            instanceDomElement =  wrapper.DOMElement
        }
        console.log(params);
        attachMethods(wrapper,params);
        console.log(self);
        // setUpEvents(wrapper,params);
        doLifeCycleEvents("onMount")//Lifecyle event
        return wrapper.DOMElement
    }

    var doLifeCycleEvents= function(eventName){
        // console.log(params.events, eventName);
        if (eventName =="onBeforeMount" &&  params.events && params.events["onBeforeMount"]) {
            params.events["onBeforeMount"]({lifecycleEvent:eventName}, params.data, self)
        }
        if (eventName =="onMount" &&  params.events && params.events["onMount"]) {
            console.log(wrapper);
            params.events["onMount"]({lifecycleEvent:eventName}, params.data, self)
        }
    }

    var attachMethods = function (wrapper,params) {
        console.log(params);
        if (params.methods) {
            self.do={}
            for (const key in params.methods){
                var newFunc = function (args) {
                    params.methods[key]({method:key, args:args, data:params.data, instance:self}, params.data, self,params)
                }
                self.do[key]=newFunc
            }
        }
        console.log(self);
    }

    var createProp = function (value) {
        var prop = {};
        var value = value; var listeners = [];
        var get = ()=> value;
        var set = function (newValue) {
            value=newValue;
            for (let i = 0; i < listeners.length; i++) {
                listeners[i].callback({},listeners[i].data, listeners[i].instance)
                
            }
        }
        var addListener = (listener,data, callback)=>listeners.push({listener:listener,data:data, callback:callback})
        prop.get = get; prop.set = set;prop.addListener = addListener; prop.type = "adler-props";
        return prop
    }

    var setUpReplacementComponents = function(params){
        if (!params.replaceComponents) { //avoid undefined cases
            params.replaceComponents = {}
        }
    }

    var setUpProps = function (params) {
        self.props={}
        self.props.set = (propName, newValue)=> self.props[propName].set(newValue)
        self.props.get = (propName)=> self.props[propName].get()
        console.log(params);
        if (params.props) {
            for (const key in params.props){
                console.log(params.props[key]);
                // console.log(params.props[key].type != "adler-props");
                if (params.props[key] && params.props[key].type != "adler-props") {
                    self.props[key] = createProp(params.props[key])
                    console.log(self);
                }else if (params.props[key] && params.props[key].type == "adler-props"){
                    self.props[key] = params.props[key]
                }
                if (self.props[key] && params.listen && params.listen[key]) {
                    self.props[key].addListener(params.data, self, params.listen[key]) 
                }
            }
        }
    }
    var passProps= function (params,attributeValue) {
        var pairs= attributeValue.split(",")
        console.log(pairs);
        var newValues = {}
        for (let i = 0; i < pairs.length; i++) {
            // console.log(pairs[i]);
            if (pairs[i].search(":")>=0) {
                const pair = pairs[i].split(":");
                // console.log(self.props);
                // console.log(self.props[ pair[1] ]);
                if (self.props[ pair[1] ]) {
                    newValues[ pair[0] ]=self.props[ pair[1] ]
                }
            }else{
                if (self.props[ pairs[i] ]) { //pass props automaticaly when source and target names are same
                    newValues[ pairs[i] ]=self.props[ pairs[i] ]
                }
            }
            
        }
        return newValues
    }

    var instance = function(extra){
        var newPramas = Object.assign({}, params);
        if(extra && extra.data){ newPramas.data = Object.assign({}, newPramas.data, extra.data) };
        if(extra && extra.on){ newPramas.on = Object.assign({},newPramas.on, extra.on) };
        if(extra && extra.nodeMap){ newPramas.nodeMap = Object.assign({},newPramas.nodeMap, extra.nodeMap) };
        if(extra && extra.events){ newPramas.events = Object.assign({},newPramas.events, extra.events) };
        if(extra && extra.methods){ newPramas.methods = Object.assign({},newPramas.methods, extra.methods) };
        if(extra && extra.props){ newPramas.props = Object.assign({},newPramas.props, extra.props) };
        if(extra && extra.listen){ newPramas.listen = Object.assign({},newPramas.listen, extra.listen) };
        if(extra && extra.replaceComponents){ newPramas.replaceComponents = Object.assign({},newPramas.replaceComponents, extra.replaceComponents) };
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
            // console.log(self);
            // alert()
            if( params.data[element.getAttribute("a-if")] != true  || self.props.get(element.getAttribute("a-if"))!= true){
                element.remove();
            } 
        }
    }
    var registerInNodeMap = function(id, instance){
        nodeMap[id]=instance;
    }
    var mountComponents = function(wrapper,params){
        
        var foundComponents = wrapper.DOMElement.querySelectorAll("[adler]")
        for (let i = 0; i < foundComponents.length; i++) {
            const element = foundComponents[i];
            var templateComponent = params.replaceComponents[element.getAttribute("adler")] || components[element.getAttribute("adler")] //check overideComponent
            if(!templateComponent){
                // console.log(components);
                // console.log("missing component");
            }else{
                var newData = {data:{}, nodeMap:nodeMap}
                if (element.getAttribute("a-sync")) {//Check if some values must be synced
                    //newData=newData || {data:{}}
                    newData.data = getSyncedData(element.getAttribute("a-sync"))
                }
                if (element.getAttribute("a-props")) {//Check if some values must be synced
                    //newData=newData || {data:{}}
                    newData.props = passProps(params, element.getAttribute("a-props"))
                    console.log(newData);
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
                // console.log("missing component");
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

    var setData = function(newData, updateNeeded){
        if(updateNeeded == undefined) updateNeeded=true;
        // console.log("update data");
        params.data = Object.assign(params.data,newData )
        if (updateNeeded) {
            update()
        }
    }
    var replaceComponents = function (newComps) {
        params.replaceComponents = Object.assign(params.replaceComponents,newComps )
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
        console.log(wrapper);
        return wrapper.DOMElement.querySelector(query)
    }

    var init= function(){
        //init template elements (like css etc)
        if (css) {addCSS(css)};
    }

    init()

    self.setContent = setContent;
    self.replaceComponents = replaceComponents;
    self.query = query;
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