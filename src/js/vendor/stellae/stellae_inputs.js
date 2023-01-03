var inputElements ={}

function addCSS(cssText){
    var style = document.createElement('style');
    style.innerHTML = /*css*/`
        .stellae_input_container{
            background-color: white;
            width: 500px;
            min-height: 100px;
            padding-bottom: 61px;
            padding-top:10px;
            z-index: 9147483647;
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
            margin-top: 10px;
        }
        .stellae_input_list {
            width: 78%;
            background-color: white;
            max-height: 200px;
            margin: auto;
            position: relative;
            top: 28px;
            display:block;
            overflow:auto;
            margin-top: 22px;
            border-radius: 4px;
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
            height: 100%;
            border-radius: 5px;
            
        }
        
        .stellae_input_shield{
            background-color: #ffffff;
            background-color: rgba(0, 0, 0, 0.3);
            
            position:absolute;
            width:100%;
            height:100%;
            z-index: 9147483640;
            backdrop-filter: blur(2px);
        }
        .stellae_input_field_input:hover{
            background-color: transparent;
            border-style: none;
        }
        .stellae_input_close{
            background-color: #fd7d7d61;
            height: 22px;
            width: 22px;
            border-radius: 20px;
            padding: -3px;
            padding-top: -21px;
            text-align: center;
            font-size: 13px;
            color: white;
            position: absolute;
            right: 12px;
            margin: 5px;
            cursor:pointer;
        }
        .stellae_input_back{
            background-color: #3b3b3b;
            height: 30px;
            width: 30px;
            border-radius: 20px;
            padding: -3px;
            padding-top: -21px;
            text-align: center;
            font-size: 19px;
            color: white;
            position: absolute;
            left: 12px;
            margin: 5px;
            cursor: pointer;
            top: 102px;
            display:none;
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
    customName = false,
    options =[
        {id:"1", value:"Default", params:{}},
        {id:"2", value:"Default"},
        {id:"3",  value:"Default"},
    ],
    selected=undefined,
    callback=function (event) {
        alert(event.value)
    }
    }={}) {

    function createCategories(listElement,options, domElement,shieldElement) {
        var categoryElement = {}
        for (let i = 0; i < options.length; i++) {
            const data = options[i];
            if (data.category && !categoryElement[data.category]) {
                categoryElement[data.category ] = true;
                var optionsDomElement= document.createElement('div')
                optionsDomElement.classList ='stellae_input_list_items'
                optionsDomElement.innerText = data.category+ " >"
                optionsDomElement.addEventListener("click",function () {
                
                showOnlyInCategory(domElement, data.category)
            })
            listElement.appendChild(optionsDomElement)
            }
        }
    }

    function hideIfInCategories(domElement) {
        var listElements=  domElement.querySelectorAll(".isInCategory")
        for (let i = 0; i < listElements.length; i++) {
            listElements[i].style.display="none";
        }
    }
    function showOnlyInCategory(domElement, category) {
        var listDisplayed = domElement.querySelectorAll(".stellae_input_list_items");
        for (let i = 0; i < listDisplayed.length; i++) {
            
            if (listDisplayed[i].classList.contains("stellae_cat_"+category)) {
                listDisplayed[i].style.display="block";
            }else{
                listDisplayed[i].style.display="none";
            }
        }
        domElement.querySelector(".stellae_input_back").style.display="block";
    }
    function showOriginalView(domElement) {
        var listDisplayed = domElement.querySelectorAll(".stellae_input_list_items");
        for (let i = 0; i < listDisplayed.length; i++) {
            
            if (listDisplayed[i].classList.contains("isInCategory")) {
                listDisplayed[i].style.display="none";
            }else{
                listDisplayed[i].style.display="block";
            }
        }
        domElement.querySelector(".stellae_input_back").style.display="none";
    }


    
    function createOption(data, domElement,shieldElement) {
        var optionsDomElement= document.createElement('div')
        var classExtraAttributes = ""
        if (data.category) {
            classExtraAttributes = "isInCategory stellae_cat_"+data.category
        }
        optionsDomElement.classList ='stellae_input_list_items '+classExtraAttributes
        optionsDomElement.innerText = data.value
        optionsDomElement.addEventListener("click",function () {
            if (!data.params) {
                data.params ={}
            }
            if (customName) {
                data.params.name = prompt("Name")
                callback({id:data.id, value:data.value, params:data.params})
            }else{
                data.params.name = data.value
                callback({id:data.id, value:data.value, params:data.params})
            }
            
            domElement.remove()
            shieldElement.remove()
        })
        
        return optionsDomElement
    }
    function createDomElement() {

        //create input area
        var domElement= document.createElement('div')
        domElement.classList="stellae_input_container"

        domElement.innerHTML=`
            <div class=stellae_input_close>x</div>
            <div class=stellae_input_field>
                <input class=stellae_input_field_input></input>
            </div>
            <div class=stellae_input_list></div>

        `

        //create Back Button if needed
        var backElement= document.createElement('div')
        backElement.classList="stellae_input_back"
        backElement.innerText="<"
        backElement.addEventListener("mousedown",function (event) {
            showOriginalView(domElement)
        })

        //create shield area
        var shieldElement= document.createElement('div')
        shieldElement.classList="stellae_input_shield"

        //Create list and logic
        var listElement = domElement.querySelector(".stellae_input_list")

        createCategories(listElement, options, domElement,shieldElement)
        domElement.appendChild(backElement)

        for (let i = 0; i < options.length; i++) {
            const element = options[i];
            listElement.appendChild(createOption(element, domElement,shieldElement))
        }
        domElement.querySelector(".stellae_input_field").addEventListener("click",function (event) {
            domElement.querySelector(".stellae_input_list").style.display ="block";
        })
        domElement.querySelector(".stellae_input_close").addEventListener("click",function (event) {
            domElement.querySelector(".stellae_input_list").style.display ="block";
            domElement.remove()
            shieldElement.remove()
        })
        shieldElement.addEventListener("mousedown",function (event) {
            domElement.remove()
            shieldElement.remove()
        })
        // domElement.querySelector(".stellae_input_list").addEventListener("mouseleave",function (event) {
        //     domElement.querySelector(".stellae_input_list").style.display ="none";
        // })
        domElement.querySelector(".stellae_input_field_input").addEventListener("keyup",function (event) {
            var searchValue = domElement.querySelector(".stellae_input_field_input").value;
            var listDisplayed = domElement.querySelectorAll(".stellae_input_list_items");

            for (var i = 0; i < listDisplayed.length; ++i) {
                var li = listDisplayed[i]
                if(searchValue == ""){
                    li.style.display = 'block';
                }else if (li.innerText.search(searchValue)<0) {
                    li.style.display = 'none';
                }else{
                    li.style.display = 'block';
                }
            }
            if (searchValue == "") { //re-hide categories
                hideIfInCategories(domElement)
            }
            
        })

        hideIfInCategories(domElement) //hide if in category
        document.body.appendChild(shieldElement)
        document.body.appendChild(domElement)
        domElement.querySelector(".stellae_input_field_input").focus()
        
        
    }
    createDomElement()

}

addCSS()

export default inputElements
