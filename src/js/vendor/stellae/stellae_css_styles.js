function addCSS(cssText){
    var style = document.createElement('style');
    style.innerHTML = cssText;
    document.head.appendChild(style);
}



var injectCssStyles = function () {
    addCSS(/*css*/`

        .stellae_inj_css_search{
            background-color: rgb(244, 244, 244);
            height: 25px ;
            width: 222px;
            position: absolute ;
            top: 50px;
            right: 10px;
            opacity:0.8;
            color: black;
            overflow: hidden;
            border-radius: 10px;
        }
        .stellae_inj_css_search input{
            outline: none;
        }
        .stellae_inj_css_side_list {
            height: 100%;
            width: 200px;
            background-color: #e6e6e675;
            position: absolute;
            overflow: auto;
            backdrop-filter: blur(5px);
            padding: 9px;
        }
        .stellae_inj_css_side_list_item{
            padding: 5px;
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: #e2e3e3;
        }
        .stellae_inj_css_side_search{
            width: 100%;
            margin-top: 12px;
            border-radius: 11px;
            border-style: none;
            padding: 8px;
            outline: none;
        }

        .stellae_inj_css_toolbar {
            width: 40px;
            height: 50%;
            position: absolute;
            background-color: #ffffffed;
            right: 20px;
            top: 153px;
            border-radius: 8px;
            box-shadow: 0px 0px 5px #cecece;
            backdrop-filter: blur(5px);
            overflow:hidden;
        }
        .stellae_inj_css_side_toolbar_button_item {
            height: 45px;
            width: 100%;
            overflow: hidden;
            height: 45px;
            
            cursor:pointer;
        }
        .stellae_inj_css_side_toolbar_button_item svg {
            margin-top: 11px;
            margin-left: 8px;
        }
        .stellae_inj_css_side_toolbar_button_item:hover{
            background-color: #f2f2f2;
        }



        @media (prefers-color-scheme: dark) {
            .stellae_inj_css_search{
                background-color: #414142;
            }
            .stellae_inj_css_search{
                background-color: #414142;
                color:white;
            }
            .stellae_inj_css_search input{
                color:white;
            }
            .stellae_inj_css_side_list {
                background-color: #2b2a2a75;
            }
            .stellae_inj_css_side_list_item{
                color:white;
                border-bottom-color: #333;
            }
            .stellae_inj_css_side_search{
                background-color: #414142;
                color:white;
            }
            .stellae_inj_css_toolbar {
                background-color: #222;
                box-shadow: 0px 0px 5px #4f4f4f;
                
            }
            .stellae_inj_css_side_toolbar_button_item {
                color:white;
            }
            .stellae_inj_css_side_toolbar_button_item:hover{
                background-color: black;
            }
            
        }
        }`)
}

export default injectCssStyles