import baseTemplates from "./stellae_nodes_templates.js"
let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");
var demoId1 = nanoid()
var demoId2 = nanoid()
var demoId3 = nanoid()



var createNode= function({
    uuid=nanoid(),
    ui=undefined,
    // headerColor = 0x00b5ad,
    headerColor = undefined,
    position={x:0,y:0},
    nodeAttributes={},
    templateName = undefined,
    propsValue = undefined,
    propsValueFromInput = {},
    imgPath = undefined,
    template = undefined,
    name = "Node",
    nodeLayout ="square",
    userData = {},
    props =[
        // {id:demoId1, label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
        // {id:demoId2, label:"demo2", type:"text", editable:true, socket:"input", value:"Default2"},
        // {id:demoId3, label:"demo2", type:"text", editable:true, socket:"output", value:"Default3"},
        // {id:demoId4, label:"demo4", type:"text", editable:true, socket:"none", value:"Default3"},
    ],
    contextNodes=undefined,
    contextLinks = undefined,
    globalSettings={},
    links={
        // demoId1:undefined,
        // demoId2:undefined,
        // demoId3:undefined,
    },
    methods ={
        // mixString:(props) => {
        //     props.demoId3.set(props.demoId1.get() +props.demoId2.get())
        // }
    },
    event={
        // onEvaluate:(props) =>{
        //     props.demoId3.set(props.demoId1.get() +props.demoId2.get())
        // },
        // onInit:(props) => alert(props.demoId1.get()),
    },
    } = {}){
    var self={}
    var currentScene = undefined;
    var refInScene = undefined;
    var interactiveProps = undefined;
    var internalProps = undefined;
    var inEvaluation = false;
    var inInit = false;
    var label =undefined;

    var exportParams = function({
        withAllValues=false,
        withNodeObject = false,
        } = {}){
        var propsValue = {}
        var propsValueFromInput = {}
        var nodeObject = undefined
        for (const key in interactiveProps) {
            if (Object.hasOwnProperty.call(interactiveProps, key)) {
                const element = interactiveProps[key];
                var valueType = typeof interactiveProps[key].get()
                
                // debugger
                // console.log(interactiveProps[key].get()); 
                if ( (valueType  == "string" ||  valueType =="boolean" || valueType =="integer" || valueType =="float") || withAllValues ) {
                    propsValue[key] = interactiveProps[key].get()
                    propsValueFromInput[key] = interactiveProps[key]._getFromInput()
                }
                
            }
        }
        if (withNodeObject) {
            nodeObject = self
        }
        return {templateName, category:template?.category, params:{uuid,name, position, propsValue,nodeAttributes, propsValueFromInput, headerColor, imgPath, nodeLayout, userData, nodeObject}}
    }
    var exportSockets = function(){
        var propsValue = {}
        var propsValueFromInput = {}
        for (const key in interactiveProps) {
            if (Object.hasOwnProperty.call(interactiveProps, key)) {
                const element = interactiveProps[key];
                propsValue[key] = interactiveProps[key].get()
                propsValueFromInput[key] = interactiveProps[key]._getFromInput()
                
            }
        }
        return {propsValue, propsValueFromInput}
    }



    var setUpProps = function(){
        //Deep Copy to avoid issues
        internalProps = JSON.parse(JSON.stringify(props));
        console.log(propsValue);
        if (propsValue) { //populate props with the node values
            for (const key in propsValue) {
                if (Object.hasOwnProperty.call(propsValue, key)) {
                    const currentValue = propsValue[key];
                    console.log(internalProps, key);
                    if (internalProps.find(n=>n.id == key)) {
                        internalProps.find(n=>n.id == key).value = currentValue
                        internalProps.find(n=>n.id == key).valueFromInput = propsValueFromInput[key] //load defaut value not based on nodes
                    }
                    
                }
            }
        }
        var interactivePropsObject = {}
        for (let i = 0; i < internalProps.length; i++) {
            const element = internalProps[i];
            if (!element.valueFromInput ) {
                element.valueFromInput = element.value //save Default and set input for when no nodes
            }
            interactivePropsObject[element.id] = {
                // get:function () {
                   
                //     if (element.valueFromLink != undefined) {
                //         return element.valueFromLink
                //     }else{
                //         return element.value
                //     }
                    
                // },
                get:function(data){

                    function containsOnlyNumbers(str) {
                        return /^[+-]?[0-9]+$/.test(str);
                    }
                    function containsOnlyFloat(str) {
                        return /^[+-]?[0-9]+\.[0-9]+$/.test(str);
                    }

                    function checkForNumbers(str){ //check if the string is an int or a float, and switch if needed
                        if (containsOnlyNumbers(str)) {
                            return parseInt(str)
                        }else if(containsOnlyFloat(str)){
                            return parseFloat(str)
                        }else{
                            return str
                        }
                    }
                    var valuePassed = undefined
                    if (element.valueFromLink != undefined) {
                        valuePassed = element.valueFromLink
                    }else{
                        valuePassed = element.value
                    }

                    if (data && valuePassed instanceof Function) {
                        return valuePassed(data)
                    }else{
                        return checkForNumbers(valuePassed)
                    }
                },
                _getFromInput:function () {
                    // return element.valueFromInput || element.value
                    if (element.valueFromInput != undefined) {
                        return element.valueFromInput
                    }else{
                        return element.value
                    }
                },
                set:function (newValue) {
                    element.valueFromInput = newValue
                    element.value = newValue
                    // evaluate()
                    if (!inEvaluation) {
                        evaluate() //reevaluate if outside event
                    }
                },
                _setFromLink:function (newValue) {
                    if (newValue != undefined) {
                        if (element.multiple) { //if socket can have multiple input
                            if (!Array.isArray(element.valueFromLink )) {//initiate array
                                element.valueFromLink=[]
                                element.value = element.valueFromLink
                            }
                            element.valueFromLink.push(newValue) 
                        } else {
                            element.valueFromLink = newValue
                            element.value = newValue
                        }
                        
                    }else{ //if no links, reset to previous value
                        element.valueFromLink = newValue
                        element.value = element.valueFromInput
                    }
                    
                    // evaluate()
                    if (!inEvaluation) {
                        evaluate() //reevaluate if outside event
                    }
                }
            }
            if (element.options) {
                interactivePropsObject[element.id].setOptions= function (options) {
                    if (options && options[0]) {
                        element.options = options
                        // element.value = options[0].value
                    }
                    
                }
                interactivePropsObject[element.id].getOptionId= function () {
                    for (let i = 0; i < element.options.length; i++) {
                        if (element.options[i].value == element.value) { return element.options[i].id }
                    }
                }       
            }
        }
        return interactivePropsObject
    }

    var evaluate = function(){
        inEvaluation = true;
        updateFromInputs()
        doEvent("onEvaluate")
        inEvaluation = false;
        updateNode()
        console.log(links)
    }

    var updateFromInputs = function () {
        // var relatedLinks = []
        for (let i = 0; i < props.length; i++) { //reset all sockets
            interactiveProps[props[i].id]._setFromLink(undefined) 
            
        }
        console.log(contextLinks, uuid);
        for (let i = 0; i < contextLinks.list.length; i++) {
            const link = contextLinks.list[i];
            
            if (link.to == uuid) {
                for (let k = 0; k < props.length; k++) {
                    const prop = props[k];
                    if (link.to_socket == prop.id) {
                        var otherSocketValue = getValueFromOtherNode(link.from, link.from_socket)
                        interactiveProps[prop.id]._setFromLink(otherSocketValue)  //update socket value
                    }
                }   
            }
            
        }
        
    }

    var getValueFromOtherNode = function (targetUuid, prop) {
        if (contextNodes) {
            console.log(contextNodes, targetUuid);
            console.log(contextNodes[targetUuid].getProp(prop));
            return contextNodes[targetUuid].getProp(prop)
        }
    }

    var doEvent = function(eventName){
        if (event[eventName]) {
            event[eventName](interactiveProps, globalSettings)
        }
    }

    var setProp = function (prop, value) {
        interactiveProps[prop].set(value)
    }
    var getProp = function (prop) {
        if (!interactiveProps[prop]) {
            console.warn("no props found")
            return undefined
        }
        return interactiveProps[prop].get()
    }

    var setPosition = function (x,y) {
        position.x=x; position.y=y;
    }
    var setAttribute = function (attribute,value) {
        nodeAttributes[attribute]=value
    }
    
    var updateNode= function(){

        updateInScene()
    }
    

    
    // var instance = function(ui, data){
    //     var node= createNode()
    //     if (data && data.props) {
    //         //Update props
    //     }
    //     if (data && data.name) {
    //         name = data.name
    //     }
    //     init(ui)
    // }

    var init = function () {
        interactiveProps = setUpProps()
        if(ui){
            currentScene = ui
            // addToScene(currentScene)
        }
        inInit = true;
        doEvent("onInit")
        evaluate()//TODO improve to avoid redraw. Should be before add to scene
        inInit = false;
        
    }
    var getUuid = function() {
        return uuid
    }
    //UI

    var addLabel = function(newLabel){
        label = newLabel
        if (ui) {
            currentScene.labelNode(refInScene, newLabel)
        }
    }
    
    var addToScene = function (currentScene) {
        if (ui) {
            refInScene =  currentScene.addNode({headerColor,nodeLayout, template, uuid, position, name, props:internalProps, links, nodeData:self, imgPath, nodeAttributes})
        }
        
    }
    var updateInScene = function (){
        if (ui) {
            if (refInScene) {
                currentScene.removeNode(refInScene)
                refInScene =  currentScene.addNode({headerColor,nodeLayout, template, uuid, position, name, props:internalProps, links, nodeData:self, imgPath, nodeAttributes}) 
            }else{
                addToScene(currentScene)
            }
        }
        
    }
    var removeInScene = function (){
        if (ui) {
            currentScene.removeNode(refInScene)
        } 
    }
    var remove = function (){
        removeInScene()
    }
    //init
    init()
    self.exportParams=exportParams
    self.exportSockets =exportSockets;
    self.setPosition=setPosition;
    self.getProp=getProp;
    self.setProp=setProp;
    self.getUuid=getUuid;
    self.init=init;
    self.setAttribute=setAttribute
    self.remove = remove;
    self.evaluate = evaluate;
    self.addLabel = addLabel;
    return self
}


var createNodeManager = function ({
    ui=undefined,
    } = {}) {
    var self = {}
    var nodeTemplates ={};
    var nodeInUse = {};
    var linksInUse={list:[]}
    var globalSettings={}
    
    var addLinks = function(links){
        for (let i = 0; i < links.length; i++) {
            const element = links[i];
            if (!element.uuid) {
                element.uuid = nanoid()
            }
            // linksInUse[links[i].to] = element
            linksInUse.list.push(element)
        }
        if (ui) {
            ui.addLinks(links)
        }
    }
    var cleanLinks = function(){//remove links from or to inexisting nodes
        for (let i = 0; i < linksInUse.list.length; i++) {
            const link = linksInUse.list[i];
            if (!nodeInUse[link.to]) {
                removeLinks(link.uuid)
            }
        }
    }
    var removeLinks = function(uuid){
        var indexToRemove = linksInUse.list.findIndex(l=>l.uuid==uuid)
        linksInUse.list[indexToRemove] = linksInUse.list[linksInUse.list.length -1];
        linksInUse.list.pop(); 
        if (ui) {
            ui.removeLinks(uuid) 
        }
        
    }
    var getLink = function(uuid){
        for (let i = 0; i < linksInUse.list.length; i++) {
            const element = linksInUse.list[i];
            if (element.uuid = uuid) {
                return element
            }
        }
    }
    var evaluateTree =function(){
        for (const node in nodeInUse) {
            if (Object.hasOwnProperty.call(nodeInUse, node)) {
                const element = nodeInUse[node];
                element.evaluate()
            }
        }
    }
    var addNode = function(templateName, params){
        
        if (params && !params.uuid) {
            params.uuid = nanoid()
        }
        var template = nodeTemplates[templateName]
        var newParams= Object.assign({},template,params,{ui:ui,template:template, contextNodes:nodeInUse,contextLinks:linksInUse, globalSettings:globalSettings})
        // alert(newParams.color) //TODO find why undefined first?
        var node = createNode(newParams)
        
        nodeInUse[node.getUuid()] = node 
    }

    var removeNode = function (uuid) {
        
        var node = getNode(uuid)
        node.remove()
        delete nodeInUse[uuid]
        cleanLinks()
    }
    var labelNodes = function(data){ //form [{nodeId, label}]
        for (let i = 0; i < data.length; i++) {
            const label = data[i];
            nodeInUse[label.nodeId].addLabel(label.label)
        }
    }

    var getNode = function(uuid){
        return nodeInUse[uuid]
    }

    var updateNode = function(uuid, prop){

    }

    var importGraph = function (graph) {
        for (let i = 0; i < graph.nodes.length; i++) {
            const element = graph.nodes[i];
            self.addNode(element.templateName, element.params)
        }
        self.addLinks(graph.links)
        
        evaluateTree()
        
    }
    var replaceData = function (nodes, links) {
        for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i];
            if (getNode(element.uuid)) {
                
            }else{
                self.addNode(element.templateName, element.params)
            }
            
        }
        var existingLinks = {}
        var linksToAdd = []
        for (let i = 0; i < linksInUse.list.length; i++) {
            const element = linksInUse.list[i];
            existingLinks[element.uuid] = element
        }
        for (let j = 0; j < links.length; j++) {
            const link = links[j];
            if (!existingLinks[link.uuid]) {
                linksToAdd.push(link)
            }
        }
        // console.log(links);
        // console.log(existingLinks);
        // console.log(linksToAdd);
        // alert("adding links")
        self.addLinks(linksToAdd)
        evaluateTree()
        
    }


    var exportNodes = function (options) {
        var nodesToExport= []
        var linkToExport = linksInUse.list
        for (const key in nodeInUse) {
            if (Object.hasOwnProperty.call(nodeInUse, key)) {
                const element = nodeInUse[key];
                nodesToExport.push(element.exportParams(options))
            }
        }
        return {nodes:nodesToExport, links:linkToExport}
    }

    var _getRawData = function (options) {
        var nodesToExport= []
        var linkToExport = linksInUse.list
        for (const key in nodeInUse) {
            if (Object.hasOwnProperty.call(nodeInUse, key)) {
                nodesToExport.push( nodeInUse[key])
            }
        }
        return {nodes:nodesToExport, links:linkToExport}
    }
    var useBaseTemplates = function(){
        for (const key in baseTemplates) {
            if (Object.hasOwnProperty.call(baseTemplates, key)) {
                const template = baseTemplates[key];
                addNodeTemplate(template.templateName, template)
            }
        }
    }

    var useTemplate = function(templateToUse){
        for (const key in templateToUse) {
            if (Object.hasOwnProperty.call(templateToUse, key)) {
                const template = templateToUse[key];
                addNodeTemplate(template.templateName, template)
            }
        }
    }

    var addNodeTemplate = function(name, params){
        // var newParams= Object.assign({},params,{ui:ui})
        // var node = createNode(newParams)
        nodeTemplates[name]=params
        
    }
    var getUsedTemplates     = function () {
        return nodeTemplates
    }

    var setGlobalSetting = function(propName, value){
        globalSettings[propName] = value
    }

    var getScreenshot= function (params) {
        if (ui) {
            return ui.renderToDataURL(params)
        }
    }
    var setSelected= function (params) {
        if (ui) {
            return ui.setSelected(params)
        }
    }
    var getSelected= function (params) {
        if (ui) {
            return ui.getSelected(params)
        }
    }
    var setFocus= function (params, options) {
        if (ui) {
            return ui.setFocus(params, options)
        }
    }



    var init= function () {
        if (ui) {
            ui.attachDataManager(self)
        }
    }
    init()

    self.useTemplate = useTemplate
    self.importGraph = importGraph
    self.exportNodes = exportNodes
    self._getRawData = _getRawData
    
    self.getUsedTemplates = getUsedTemplates
    self.evaluateTree = evaluateTree
    self.useBaseTemplates = useBaseTemplates
    self.getNode = getNode
    self.addLinks = addLinks
    self.removeNode = removeNode;
    self.removeLinks = removeLinks;
    self.addNodeTemplate = addNodeTemplate
    self.addNode = addNode
    
    self.replaceData = replaceData
    self.setGlobalSetting = setGlobalSetting
    self.labelNodes = labelNodes
    self.getScreenshot = getScreenshot
    self.setSelected = setSelected
    self.getSelected = getSelected
    self.setFocus = setFocus
    
    return self
}

export default createNodeManager