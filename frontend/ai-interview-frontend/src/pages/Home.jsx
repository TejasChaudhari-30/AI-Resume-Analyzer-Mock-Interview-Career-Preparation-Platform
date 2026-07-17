import { Link } from "react-router-dom";
import {
    Sparkles,
    FileText,
    BrainCircuit,
    Target,
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle.jsx";

function Home(){

return (

<div className="relative min-h-screen overflow-hidden bg-slate-100 dark:bg-[#111318] text-slate-900 dark:text-white">

{/* Navbar */}

<motion.nav
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="flex items-center justify-between px-8 py-5 border-b border-slate-200 dark:border-slate-800"
>
<div className="flex items-center gap-3">

<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white">

<Sparkles size={22}/>

</div>

<h1 className="text-xl font-bold">
AI Career Prep
</h1>

</div>


<div className="hidden md:flex items-center gap-8 text-sm font-medium">

<Link 
to="/dashboard"
className="hover:text-blue-500 transition"
>
Dashboard
</Link>


<Link 
to="/about"
className="hover:text-blue-500 transition"
>
About Me
</Link>


<Link 
to="/login"
className="hover:text-blue-500 transition"
>
Login
</Link>
<ThemeToggle />

<Link 
to="/register"
className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-white"
>
Register
</Link>


</div>

</motion.nav>



{/* Hero Section */}

<motion.div

animate={{
    scale:[1,1.2,1],
    opacity:[0.3,0.6,0.3]
}}

transition={{
    duration:5,
    repeat:Infinity
}}

className="
absolute
h-72
w-72
rounded-full
bg-blue-500/20
blur-3xl
"

>

</motion.div>

<motion.section

initial={{
    opacity:0,
    y:40
}}

animate={{
    opacity:1,
    y:0
}}

transition={{
    duration:0.8,
    delay:0.2
}}

className="flex flex-col items-center text-center px-6 py-24"

>

<motion.div

initial={{scale:0}}
animate={{scale:1}}
transition={{duration:0.5}}

className="rounded-full bg-blue-500/10 px-5 py-2 text-sm text-blue-600 dark:text-blue-400"

>
🚀 AI Powered Career Assistant

</motion.div>


<h1 className="mt-8 max-w-4xl text-5xl font-bold leading-tight">

Prepare smarter.

Crack your dream interview.

</h1>


<p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">

AI Career Prep helps you analyze your resume, improve ATS score,
practice realistic AI mock interviews, and receive personalized
feedback to improve your job preparation.

</p>

<motion.div
whileHover={{
    scale:1.05
}}
whileTap={{
    scale:0.95
}}
>

<Link
to="/dashboard"
className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3 font-semibold text-white shadow-lg"
>
Get Started
<ArrowRight size={18}/>
</Link>

</motion.div>


</motion.section>




{/* Features */}


<motion.section

initial={{
    opacity:0,
    y:50
}}

whileInView={{
    opacity:1,
    y:0
}}

viewport={{
    once:true
}}

transition={{
    duration:0.7,
    staggerChildren:0.2
}}

className="grid gap-6 px-8 pb-20 md:grid-cols-3"

>

<motion.div

whileHover={{
    y:-10,
    scale:1.03
}}

transition={{
    type:"spring",
    stiffness:250
}}

className="
rounded-3xl 
border 
border-slate-200 
bg-white 
p-8 
shadow-sm
transition
hover:shadow-xl
dark:border-slate-800
dark:bg-[#181b21]
"

>
<FileText className="text-blue-500"/>

<h3 className="mt-5 text-xl font-semibold">
AI Resume Analysis
</h3>

<p className="mt-3 text-slate-500">

Upload your resume and get AI-powered suggestions,
ATS improvements and skill recommendations.

</p>

</motion.div>



<motion.div

whileHover={{
    y:-10,
    scale:1.03
}}

transition={{
    type:"spring",
    stiffness:250
}}

className="
rounded-3xl 
border 
border-slate-200 
bg-white 
p-8 
shadow-sm
transition
hover:shadow-xl
dark:border-slate-800
dark:bg-[#181b21]
"

>
<BrainCircuit className="text-cyan-500"/>

<h3 className="mt-5 text-xl font-semibold">
Mock Interviews
</h3>

<p className="mt-3 text-slate-500">

Practice interviews generated according to your resume
and target role.

</p>

</motion.div>



<motion.div

whileHover={{
    y:-10,
    scale:1.03
}}

transition={{
    type:"spring",
    stiffness:250
}}

className="
rounded-3xl 
border 
border-slate-200 
bg-white 
p-8 
shadow-sm
transition
hover:shadow-xl
dark:border-slate-800
dark:bg-[#181b21]
"

>
<Target className="text-emerald-500"/>

<h3 className="mt-5 text-xl font-semibold">
Personalized Feedback
</h3>

<p className="mt-3 text-slate-500">

Understand your weak areas and improve your interview
performance.

</p>

</motion.div>


</motion.section>



</div>

);

}


export default Home;