import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/backendapi.jsx";

import {
    Sparkles,
    User,
    Mail,
    Lock,
    Briefcase,
    Code2,
    Eye,
    EyeOff,
    ArrowRight,
    FileText,
    BrainCircuit,
    ShieldCheck,
} from "lucide-react";

function Register(){
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
const navigate = useNavigate();
const [apiError, setApiError] = useState("");

const [showPassword, setShowPassword] = useState(false);

const [loading, setLoading] = useState(false);
const onSubmit = async (data) => {
 setApiError("");
    const payload = {

        ...data,

        skills: data.skills
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean)

    };

    try {

        setLoading(true);

        await api.post("/auth/register", payload);

        navigate("/login");

    }

  catch (error) {

    if (error.response?.status === 409) {

        // Email already exists
        setApiError(
            error.response.data.message ||
            "An account with this email already exists."
        );

    }

    else if (error.response?.status === 400) {

        // Validation errors
        setApiError(
            error.response.data.message ||
            "Invalid registration details."
        );

    }

    else if (error.response?.status === 500) {

        // Server error
        setApiError(
            error.response.data.message ||
            "Server error. Please try again later."
        );

    }

    else if (!error.response) {

        // Network error
        setApiError(
            "Unable to connect to server. Please check your internet connection."
        );

    }

    else {

        setApiError(
            "Something went wrong. Please try again."
        );

    }

}

    finally{

        setLoading(false);

    }

};
  return(

<div className="min-h-screen bg-slate-100 dark:bg-[#111318] flex">

{/* LEFT PANEL */}

<div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-700 via-cyan-600 to-indigo-700 text-white">

<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.18),transparent_40%)]"/>

<div className="relative z-10 flex flex-col justify-center px-20">

<div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 w-fit">

<Sparkles className="h-4 w-4"/>

AI Career Prep

</div>

<h1 className="mt-8 text-6xl font-bold leading-tight">

Start Your

Career Journey

</h1>

<p className="mt-6 max-w-lg text-lg leading-8 text-blue-100">

Create your account to access AI Resume Reviews, ATS analysis and personalized interview preparation.

</p>

<div className="mt-12 space-y-5">

<div className="flex items-center gap-3">

<FileText className="h-6 w-6"/>

Resume Analyzer

</div>

<div className="flex items-center gap-3">

<BrainCircuit className="h-6 w-6"/>

AI Mock Interviews

</div>

<div className="flex items-center gap-3">

<ShieldCheck className="h-6 w-6"/>

Personalized Feedback

</div>

</div>

</div>

</div>

{/* RIGHT */}

<div className="flex flex-1 items-center justify-center px-6 py-10">

<div className="w-full max-w-lg">

<div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-[#181b21]">

<div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400"/>

<div className="p-8">

<div className="text-center">

<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">

<Sparkles className="h-8 w-8"/>

</div>

<h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">

Create Account

</h2>

<p className="mt-2 text-slate-500">

Join AI Career Prep and accelerate your interview preparation.

</p>

</div>

<form

onSubmit={handleSubmit(onSubmit)}

className="mt-10 space-y-5"

>
        <div>

    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

        Full Name

    </label>

    <div className="relative">

        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"/>

        <input

            type="text"

            placeholder="John Doe"

            {...register("name",{

                required:"Name is required"

            })}

            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"

        />

    </div>

    {

        errors.name &&

        <p className="mt-2 text-sm text-red-500">

            {errors.name.message}

        </p>

    }

</div>

       <div>

<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

Email Address

</label>

<div className="relative">

<Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"/>

<input

type="email"

placeholder="Enter your email"

{...register("email",{

required:"Email is required"

})}

className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"

/>

</div>

{

errors.email &&

<p className="mt-2 text-sm text-red-500">

{errors.email.message}

</p>

}

</div>

       <div>

<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

Password

</label>

<div className="relative">

<Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"/>

<input

type={showPassword?"text":"password"}

placeholder="Create password"

{...register("password",{

required:"Password is required",

minLength:{

value:6,

message:"Minimum 6 characters"

}

})}

className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"

/>
{
apiError &&

<div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-500/10 dark:text-red-300">

{apiError}

</div>

}

<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"

>

{

showPassword

?

<EyeOff className="h-5 w-5"/>

:

<Eye className="h-5 w-5"/>

}

</button>

</div>

{

errors.password &&

<p className="mt-2 text-sm text-red-500">

{errors.password.message}

</p>

}

</div>

      <div>

<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

Target Role

</label>

<div className="relative">

<Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"/>

<input

type="text"

placeholder="Full Stack Developer"

{...register("target_role")}

className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"

/>

</div>

</div>
        <div>

<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

Skills

</label>

<div className="relative">

<Code2 className="absolute left-4 top-4 h-5 w-5 text-slate-400"/>

<textarea

rows={3}

placeholder="React, Node.js, Express, PostgreSQL"

{...register("skills")}

className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white resize-none"

/>

</div>

<p className="mt-2 text-xs text-slate-500">

Separate skills with commas.

</p>

</div>

       <button

type="submit"

disabled={loading}

className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"

>

{

loading

?

"Creating Account..."

:

<>

Create Account

<ArrowRight className="h-5 w-5"/>

</>

}

</button>

      

     <div className="mt-8 text-center text-sm text-slate-500">

Already have an account?

<Link

to="/login"

className="ml-2 font-semibold text-blue-600 transition hover:text-cyan-500"

>

Sign In

</Link>

</div>
</form>

</div>

</div>

</div>

</div>

</div>

);
  

  
}

export default Register;