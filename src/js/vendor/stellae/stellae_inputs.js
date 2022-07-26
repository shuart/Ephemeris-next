var inputElements ={}

function addCSS(cssText){
    var style = document.createElement('style');
    style.innerHTML = /*css*/`
        .stellae_input_container{
            background-color: white;
            width: 500px;
            min-height: 100px;
            padding-bottom: 61px;
            z-index: 2147483647;
            position: relative;
            margin: auto;
            top: 58px;
            border-radius: 8px;
            box-shadow: 0px 2px 16px -6px rgba(0,0,0,1);
        }
        .stellae_input_field {
            width: 80%;
            background-color: white;
            height: 32px;
            margin: auto;
            /* margin-top: 100px; */
            position: relative;
            top: 28px;
            border-radius: 5px;
            box-shadow: inset 0px 2px 16px -6px rgba(0,0,0,.5);
        }
        .stellae_input_list {
            width: 78%;
            background-color: white;
            max-height: 200px;
            margin: auto;
            position: relative;
            top: 28px;
            display:none;
            overflow:auto;
        }
        .stellae_input_list_items{
            padding: .5em .75em;
            border-bottom: 1px solid #ededed;
            cursor:pointer;
        }
        .stellae_input_field_input{
            background-color: transparent;
            border-style: none;
            width: 100%;
            
        }
        .stellae_input_field_input:hover{
            background-color: transparent;
            border-style: none;
        }
        .stellae_input_close{
            background-color: #fd7d7d61;
            height: 15px;
            width: 15px;
            border-radius: 20px;
            padding: -3px;
            padding-top: -21px;
            text-align: center;
            font-size: 9px;
            color: white;
            position: absolute;
            right: 5px;
            margin: 5px;
            cursor:pointer;
        }
        

        @media (prefers-color-scheme: dark) {
            .stellae_input_container {
                background-color: #1b1b1b;
                background-color: rgb(48, 48, 48);
                color:white;
                
            }
            .stellae_input_field {
                background-color: rgba(255,255,255,.05);
                border-color: #242323;
                border-width: 1px;
                border-style: solid;
                cursor:text;
            }
            .stellae_input_list {
                background-color: rgba(255,255,255,.05);
                cursor:pointer;
            }
            .stellae_input_field_input{
                color:white;
            }
            .stellae_input_list_items{
                padding: .5em .75em;
                border-bottom: 1px solid #17181c;
            }
          }
    
    `;
    document.head.appendChild(style);
}

inputElements.createListInput = function ({
    container=document.body,
    mutlipleSelect=false,
    options =[
        {id:"1", value:"Default"},
        {id:"2", value:"Default"},
        {id:"3",  value:"Default"},
    ],
    selected=undefined,
    callback=function (event) {
        alert(event.value)
    }
    }={}) {
    
    function createOption(data, domElement) {
        var optionsDomElement= document.createElement('div')
        optionsDomElement.classList ='stellae_input_list_items'
        optionsDomElement.innerText = data.value
        optionsDomElement.addEventListener("click",function () {
            callback({id:data.id, value:data.value})
            domElement.remove()
        })
        
        return optionsDomElement
    }
    function createDomElement() {
        var domElement= document.createElement('div')
        domElement.classList="stellae_input_container"

        domElement.innerHTML=`
            <div class=stellae_input_close>x</div>
            <div class=stellae_input_field>
                <input class=stellae_input_field_input></input>
            </div>
            <div class=stellae_input_list></div>

        `
        var listElement = domElement.querySelector(".stellae_input_list")
        for (let i = 0; i < options.length; i++) {
            const element = options[i];
            listElement.appendChild(createOption(element, domElement))
        }
        domElement.querySelector(".stellae_input_field").addEventListener("click",function (event) {
            domElement.querySelector(".stellae_input_list").style.display ="block";
        })
        domElement.querySelector(".stellae_input_close").addEventListener("click",function (event) {
            domElement.querySelector(".stellae_input_list").style.display ="block";
            domElement.remove()
        })
        domElement.querySelector(".stellae_input_list").addEventListener("mouseleave",function (event) {
            domElement.querySelector(".stellae_input_list").style.display ="none";
        })
        document.body.appendChild(domElement)

        
        
    }
    createDomElement()

}

addCSS()

export default inputElements
