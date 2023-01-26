function addCSS(cssText){
    var style = document.createElement('style');
    style.innerHTML = cssText;
    document.head.appendChild(style);
}



var injectCssStyles = function () {
    addCSS(/*css*/`
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


        @media (prefers-color-scheme: dark) {
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
            
        }
        }`)
}

export default injectCssStyles