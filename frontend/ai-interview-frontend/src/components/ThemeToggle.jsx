import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import {
    getStoredTheme,
    persistTheme
} from "../theme/theme";


function ThemeToggle(){

const [theme,setTheme]=useState(
    getStoredTheme()
);


useEffect(()=>{

    persistTheme(theme);

},[theme]);



const toggleTheme=()=>{

    setTheme(
        prev=>prev==="dark" ? "light" : "dark"
    );

};



return (

<button

onClick={toggleTheme}

className="
rounded-xl
p-2
transition
hover:bg-slate-200
dark:hover:bg-slate-800
"

>

{

theme==="dark"

?

<Sun size={20}/>

:

<Moon size={20}/>

}

</button>

)

}


export default ThemeToggle;