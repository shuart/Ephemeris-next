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
        @media (prefers-color-scheme: dark) {
            .stellae_inj_css_side_list {
                background-color: #2b2a2a75;
            }
            .stellae_inj_css_side_list_item{
                color:white;
                border-bottom-color: #333;
            }
            
        }
        }`)
}

export default injectCssStyles