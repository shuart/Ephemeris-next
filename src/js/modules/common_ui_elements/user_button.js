import createAdler from "../../vendor/adler.js";

var user_button =createAdler({
    content: p => /*html*/`
        <button class="user_button">${p.value}</button>
        `,
    params:{
        data:{
            value:"Hello",
            onClick:()=>console.log("click")
        },
        on:[
            [".user_button","click", (event, data, instance)=> data.onClick(event, data, instance) ],
        ]
    },
    css:/*css*/`
        .user_button {
            --color: #01b3ab;
            font-family: inherit;
            display: block;
            width: 8em;
            height: 2.6em;
            line-height: 2.5em;
            margin: 20px;
            position: relative;
            overflow: hidden;
            border: 1px solid var(--color);
            border: 1px none var(--color);
            transition: color .5s;
            z-index: 1;
            font-size: 17px;
            border-radius: 6px;
            font-weight: 500;
            color: var(--color);
            cursor: pointer;
            margin: ;
            margin: auto;
            margin-top: auto;
            margin-top: 5px;
            background-color: white;
        }
        
        .user_button:before {
            content: "";
            position: absolute;
            z-index: -1;
            background: var(--color);
            height: 150px;
            width: 200px;
            border-radius: 50%;
        }
        
        .user_button:hover {
            color: #fff;
        }
        
        .user_button:before {
            top: 100%;
            left: 100%;
            transition: all .7s;
        }
        
        .user_button:hover:before {
            top: -30px;
            left: -30px;
        }
        
        .user_button:active:before {
            background: #000000;
            transition: background 0s;
        }
        @media (prefers-color-scheme: dark) {
            .user_button {
                color:white;
                background-color: #1b1b1b;
            
            }
          }
    `,
})

export default user_button