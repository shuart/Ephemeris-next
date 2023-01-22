import createInstancesManagement from "../../common_project_management/instances_management.js";

var createPopupElement = function (props) {
    var self ={}
    var element = undefined;
    var command = undefined;
    var lastProps = undefined;
    var currentItems = []

    var init = function () {
        element = document.createElement('div')
        element.classList = " block box"
        populateMenu(element,props.items )
        // element.innerHTML = props.items.map(e=>'<div class="sug-item">'+e.name+'</div>').join('')
        command = props.command
        lastProps = props
    }

    
    var populateMenu = function(container, items){
        container.innerHTML =""
        for (let i = 0; i < items.length; i++) {
            const currentItem = items[i];
            var itemEl = document.createElement("div")
            itemEl.classList ='sug-item'
            itemEl.style.cursor ='pointer'
            itemEl.innerText = currentItem.name
            itemEl.addEventListener("click",e=>{
                lastProps.command({label:currentItem.name, id:currentItem.uuid })
            })
            container.appendChild(itemEl)
        }
    }


    init()
    self.updateElement=function (props) {
        currentItems = props.items
        lastProps = props
        populateMenu(element,props.items )
        // element.innerHTML = props.items.map(e=>'<div class="sug-item">'+e.name+'</div>').join('')
    }
    self.getElement =function () {
        return element
    }
    self.confirmSelected = function(){
        lastProps.command({label:currentItems[0].name, id:currentItems[0].uuid })
    }
    return self
}

var suggestionConfigurator = function(editor, tippy){
    var instancesRepo = createInstancesManagement()
    var instances = instancesRepo.getAll()
    return  {
        HTMLAttributes: {
            class: 'mention',
        },
        suggestion: {

            items: ({ query }) => {
                return instances.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
            },
            
            char:'#',
            
            render: () => {
                let popup;
                let popElement;
                return {
                onStart: props => {
                    console.log(props)
                    popElement = createPopupElement(props)
                    if (!props.clientRect) {
                    return
                    }
            
                    popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: popElement.getElement(),
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                    zIndex: "9999999999999999999999999999999999999999999999",
                    })
            
                },
            
                onUpdate(props) {
                    console.log(props.items);
                    popElement.updateElement(props)
                },
            
                onKeyDown(props) {
                    if (props.event.key === 'Escape') {
                        popup[0].hide()
                        console.log(props);
                        return true
                      }
                      if (props.event.key === 'Enter') {
                        popup[0].hide()
                        console.log(props);
                        popElement.confirmSelected()
                        return true
                      }
                      return false
            
                },
            
                onExit() {
                    popup[0].destroy()
                },
                }
            },
        },
    }

}

export default suggestionConfigurator