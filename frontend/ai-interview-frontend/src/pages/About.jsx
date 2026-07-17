import { motion } from "framer-motion";
import {
    Mail,
    Code2,
    GraduationCap,
    Sparkles
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle.jsx";
import {
    FaGithub,
    FaLinkedin
} from "react-icons/fa";
function About(){

return (
    

<div className="
min-h-screen 
relative 
overflow-hidden
bg-slate-100 
dark:bg-[#111318]
text-slate-900 
dark:text-white
">

<ThemeToggle />

{/* Background Glow */}

<motion.div

animate={{
    scale:[1,1.2,1],
    opacity:[0.2,0.5,0.2]
}}

transition={{
    duration:5,
    repeat:Infinity
}}

className="
absolute
top-20
right-20
h-72
w-72
rounded-full
bg-blue-500/20
blur-3xl
"

/>



<motion.div

initial={{
    opacity:0,
    y:40
}}

animate={{
    opacity:1,
    y:0
}}

transition={{
    duration:0.8
}}

className="
flex
items-center
justify-center
px-6
py-24
"


>


<div className="
max-w-3xl
w-full
rounded-3xl
border
border-slate-200
bg-white
p-10
shadow-xl
dark:border-slate-800
dark:bg-[#181b21]
">


{/* Icon */}

<div className="
mx-auto
flex
h-20
w-20
items-center
justify-center
rounded-3xl
bg-gradient-to-r
from-blue-600
to-cyan-500
text-white
shadow-lg
">

<Sparkles size={35}/>

</div>



<h1 className="
mt-8
text-center
text-4xl
font-bold
">

Hi, I'm Tejas Chaudhari

</h1>



<p className="
mt-4
text-center
text-lg
text-slate-600
dark:text-slate-400
">

Full Stack Developer passionate about building
modern web applications and AI-powered solutions.

</p>




{/* Info Cards */}

<div className="
mt-10
grid
gap-5
md:grid-cols-2
">


<motion.div

whileHover={{
    y:-5
}}

className="
rounded-2xl
border
border-slate-200
p-5
dark:border-slate-700
"

>

<div className="flex gap-3 items-center">

<GraduationCap className="text-blue-500"/>

<h3 className="font-semibold">
Education
</h3>

</div>


<p className="
mt-3
text-slate-500
">

Currently pursuing B.Tech at
<strong> Indian Institute of Information Technology Pune (IIIT Pune)</strong>.

</p>


</motion.div>





<motion.div

whileHover={{
    y:-5
}}

className="
rounded-2xl
border
border-slate-200
p-5
dark:border-slate-700
"

>

<div className="flex gap-3 items-center">

<Code2 className="text-cyan-500"/>

<h3 className="font-semibold">
Developer
</h3>

</div>


<p className="
mt-3
text-slate-500
">

Full Stack Developer experienced with
React, Node.js, Express.js and PostgreSQL.

</p>


</motion.div>



</div>





{/* Social Buttons */}


<div className="
mt-10
flex
flex-wrap
justify-center
gap-4
">


<a

href="https://github.com/TejasChaudhari-30"

target="_blank"

className="
flex
items-center
gap-2
rounded-xl
border
px-5
py-3
font-medium
transition
hover:-translate-y-1
hover:shadow-lg
dark:border-slate-700
"

>

<FaGithub size={20}/>
GitHub

</a>




<a

href="https://www.linkedin.com/in/tejas-chaudhari-7021aa332"

target="_blank"

className="
flex
items-center
gap-2
rounded-xl
bg-blue-600
px-5
py-3
font-medium
text-white
transition
hover:-translate-y-1
hover:shadow-lg
"

>

<FaLinkedin size={20}/>

LinkedIn

</a>




<a

href="mailto:tejaschaudhari376@gmail.com"

className="
flex
items-center
gap-2
rounded-xl
border
px-5
py-3
font-medium
transition
hover:-translate-y-1
hover:shadow-lg
dark:border-slate-700
"

>

<Mail size={20}/>

Email

</a>



</div>



</div>


</motion.div>


</div>

);

}


export default About;