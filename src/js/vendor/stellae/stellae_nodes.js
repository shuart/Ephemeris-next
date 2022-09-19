import baseTemplates from "./stellae_nodes_templates.js"
let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");
var demoId1 = nanoid()
var demoId2 = nanoid()
var demoId3 = nanoid()



var createNode= function({
    uuid=nanoid(),
    ui=undefined,
    headerColor = 0xffff00,
    position={x:0,y:0},
    templateName = undefined,
    propsValue = undefined,
    propsValueFromInput = {},
    name = "Node",
    nodeLayout ="square",
    props =[
        // {id:demoId1, label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
        // {id:demoId2, label:"demo2", type:"text", editable:true, socket:"input", value:"Default2"},
        // {id:demoId3, label:"demo2", type:"text", editable:true, socket:"output", value:"Default3"},
        // {id:demoId4, label:"demo4", type:"text", editable:true, socket:"none", value:"Default3"},
    ],
    contextNodes=undefined,
    contextLinks = undefined,
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

    var exportParams = function(){
        var propsValue = {}
        var propsValueFromInput = {}
        for (const key in interactiveProps) {
            if (Object.hasOwnProperty.call(interactiveProps, key)) {
                const element = interactiveProps[key];
                propsValue[key] = interactiveProps[key].get()
                propsValueFromInput[key] = interactiveProps[key]._getFromInput()
            }
        }
        return {templateName,params:{uuid,name, position, propsValue, propsValueFromInput}}
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
            if (!element.valueFromInput) {
                element.valueFromInput = element.value //save Default and set input for when no nodes
            }
            interactivePropsObject[element.id] = {
                get:function () {
                    return element.valueFromLink || element.value
                },
                _getFromInput:function () {
                    return element.valueFromInput || element.value
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
                    if (newValue) {
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
                        element.value = options[0].value
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
            event[eventName](interactiveProps)
        }
    }

    var setProp = function (prop, value) {
        interactiveProps[prop].set(value)
    }
    var getProp = function (prop) {
        return interactiveProps[prop].get()
    }

    var setPosition = function (x,y) {
        position.x=x; position.y=y;
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
            addToScene(currentScene)
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
    
    var addToScene = function (currentScene) {
        if (ui) {
            refInScene =  currentScene.addNode({headerColor,nodeLayout, uuid, position, name, props:internalProps, links, nodeData:self})
        }
        
    }
    var updateInScene = function (){
        if (ui) {
            currentScene.removeNode(refInScene)
            refInScene =  currentScene.addNode({headerColor,nodeLayout, uuid, position, name, props:internalProps, links, nodeData:self}) 
        }
        
    }
    //init
    init()
    self.exportParams=exportParams
    self.setPosition=setPosition;
    self.getProp=getProp;
    self.setProp=setProp;
    self.getUuid=getUuid;
    self.init=init;
    self.evaluate = evaluate;
    return self
}


var createNodeManager = function ({
    ui=undefined,
    } = {}) {
    var self = {}
    var nodeTemplates ={};
    var nodeInUse = {};
    var linksInUse={list:[]}
    
    var addLinks = function(links){
        for (let i = 0; i < links.length; i++) {
            const element = links[i];
            if (!element.uuid) {
                element.uuid = nanoid()
            }
            // linksInUse[links[i].to] = element
            linksInUse.list.push(element)
            if (ui) {
                ui.addLinks(links)
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
        var newParams= Object.assign({},template,params,{ui:ui, contextNodes:nodeInUse,contextLinks:linksInUse})
        var node = createNode(newParams)
        
        nodeInUse[node.getUuid()] = node 
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

    var exportNodes = function () {
        var nodesToExport= []
        var linkToExport = linksInUse.list
        for (const key in nodeInUse) {
            if (Object.hasOwnProperty.call(nodeInUse, key)) {
                const element = nodeInUse[key];
                nodesToExport.push(element.exportParams())
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

    var init= function () {
        if (ui) {
            ui.attachDataManager(self)
        }
    }
    init()

    self.useTemplate = useTemplate
    self.importGraph = importGraph
    self.exportNodes = exportNodes
    self.getUsedTemplates = getUsedTemplates
    self.evaluateTree = evaluateTree
    self.useBaseTemplates = useBaseTemplates
    self.getNode = getNode
    self.addLinks = addLinks
    self.removeLinks = removeLinks;
    self.addNodeTemplate = addNodeTemplate
    self.addNode = addNode
    return self
}

export default createNodeManager