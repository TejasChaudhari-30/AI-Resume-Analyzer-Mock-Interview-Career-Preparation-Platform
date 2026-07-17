import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/backendapi.jsx";

import {
    Sparkles,
    Target,
    MessageSquare,
    Download,
    ArrowRight,
    Copy,
    CheckCircle2,
} from "lucide-react";

function InterviewResult() {

    const { sessionId } = useParams();
    const navigate = useNavigate();

const [copied,setCopied]=useState("");

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchReport();

    }, []);

    async function fetchReport() {

        try {

            const response = await api.get(
                `/interview/report/${sessionId}`
            );

            setReport(response.data);

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    }
    function getScoreColor(score){

    if(score>=80) return "text-emerald-500";

    if(score>=60) return "text-yellow-500";

    return "text-red-500";

}

function getProgressColor(score){

    if(score>=80)

        return "from-emerald-500 to-green-400";

    if(score>=60)

        return "from-yellow-500 to-orange-400";

    return "from-red-500 to-pink-500";

}

function getPerformance(score){

    if(score>=90)

        return "Outstanding";

    if(score>=80)

        return "Excellent";

    if(score>=70)

        return "Good";

    if(score>=60)

        return "Average";

    return "Needs Practice";

}

async function copyFeedback(){

    await navigator.clipboard.writeText(

        report.overallFeedback

    );

    setCopied("overall");

    setTimeout(()=>{

        setCopied("");

    },2000);

}

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-[#111318]">

    <div className="rounded-3xl bg-white dark:bg-[#181b21] p-10 shadow-lg">

        <Sparkles className="mx-auto h-12 w-12 animate-pulse text-blue-500"/>

        <h2 className="mt-5 text-2xl font-bold dark:text-white">

            AI is evaluating your interview...

        </h2>

        <p className="mt-2 text-slate-500">

            Generating your personalized report.

        </p>

    </div>

</div>
        );

    }

   return(

<div className="min-h-screen bg-slate-100 dark:bg-[#111318]">

<div className="max-w-7xl mx-auto px-5 py-8">

{/* HERO */}

<div className="mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-[#181b21]">

<div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400"/>

<div className="p-8">

<div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

<div>

<div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">

<Sparkles className="h-4 w-4"/>

AI Interview Evaluation

</div>

<h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">

Interview Performance Report

</h1>

<p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">

Detailed AI analysis of your interview answers with actionable feedback and scoring.

</p>

</div>

<div className="text-center">

<div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111318] shadow-lg">

<div>

<p className={`text-5xl font-bold ${getScoreColor(report.overallScore)}`}>

{report.overallScore}

</p>

<p className="text-sm text-slate-500">

/100

</p>

</div>

</div>

<p className="mt-4 font-semibold dark:text-white">

{getPerformance(report.overallScore)}

</p>

</div>

</div>

<div className="mt-8">

<div className="flex justify-between mb-2 text-sm">

<span className="text-slate-500">

Overall Progress

</span>

<span className="font-medium dark:text-white">

{report.overallScore}%

</span>

</div>

<div className="h-3 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">

<div

style={{

width:`${report.overallScore}%`

}}

className={`

h-full

rounded-full

bg-gradient-to-r

${getProgressColor(report.overallScore)}

transition-all

duration-1000

`}

/>

</div>

</div>

</div>

</div>

{/* STATS */}

<div className="grid gap-6 md:grid-cols-3 mb-10">

<div className="rounded-3xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-[#181b21] p-6">

<div className="flex justify-between items-center">

<div>

<p className="text-slate-500">

Overall Score

</p>

<h2 className={`mt-2 text-4xl font-bold ${getScoreColor(report.overallScore)}`}>

{report.overallScore}

</h2>

</div>

<Target className="h-9 w-9 text-blue-500"/>

</div>

</div>

<div className="rounded-3xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-[#181b21] p-6">

<div className="flex justify-between items-center">

<div>

<p className="text-slate-500">

Questions

</p>

<h2 className="mt-2 text-4xl font-bold text-blue-500">

{report.questions.length}

</h2>

</div>

<MessageSquare className="h-9 w-9 text-cyan-500"/>

</div>

</div>

<div className="rounded-3xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-[#181b21] p-6">

<div className="flex justify-between items-center">

<div>

<p className="text-slate-500">

Average Score

</p>

<h2 className="mt-2 text-4xl font-bold text-emerald-500">

{(report.questions.reduce((a,b)=>a+b.score,0)/report.questions.length).toFixed(1)}

</h2>

</div>

<CheckCircle2 className="h-9 w-9 text-emerald-500"/>

</div>

</div>

</div>

            {/* Overall Feedback */}

          {/* ================= OVERALL FEEDBACK ================= */}

<div className="mb-10 overflow-hidden rounded-3xl border border-blue-200 bg-slate-50 shadow-sm dark:border-blue-800 dark:bg-[#181b21]">

    <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500"/>

    <div className="p-8">

        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-500/10">

                    <MessageSquare className="h-6 w-6 text-blue-600"/>

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                        AI Overall Feedback

                    </h2>

                    <p className="text-sm text-slate-500">

                        Summary of your interview performance

                    </p>

                </div>

            </div>

            <button

                onClick={copyFeedback}

                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"

            >

                <Copy className="h-4 w-4"/>

                {copied === "overall" ? "Copied!" : "Copy"}

            </button>

        </div>

        <p className="mt-8 leading-8 text-slate-700 dark:text-slate-300">

            {report.overallFeedback}

        </p>

    </div>

</div>

            {/* Question Wise Report */}

          <div className="mb-6">

    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">

        Question Analysis

    </h2>

    <p className="mt-2 text-slate-500">

        Detailed AI evaluation for every interview question.

    </p>

</div>
           <div className="space-y-8">

{

report.questions.map((q,index)=>{

const scoreColor=

q.score>=8

?"emerald"

:q.score>=6

?"amber"

:"red";

return(

<div

key={index}

className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-[#181b21]"

>

<div className={`

h-1

bg-gradient-to-r

${

scoreColor==="emerald"

?"from-emerald-500 to-green-400"

:scoreColor==="amber"

?"from-amber-500 to-orange-500"

:"from-red-500 to-pink-500"

}

`}/>

<div className="p-8">

<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

<div>

<p className="text-sm text-slate-500">

Question {index+1}

</p>

<h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">

{q.question}

</h3>

</div>

<div className="flex items-center gap-3">

<span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">

{q.category}

</span>

<span

className={`

rounded-full

px-4

py-2

text-sm

font-semibold

${

scoreColor==="emerald"

?"bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"

:scoreColor==="amber"

?"bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"

:"bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"

}

`}

>

{q.score}/10

</span>

</div>

</div>
<div className="mt-8 grid gap-6 lg:grid-cols-2">

<div>

<h4 className="mb-3 font-semibold text-slate-900 dark:text-white">

Your Answer

</h4>

<div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">

<p className="leading-7 text-slate-700 dark:text-slate-300">

{q.user_answer || "No answer submitted."}

</p>

</div>

</div>

<div>

<h4 className="mb-3 font-semibold text-slate-900 dark:text-white">

AI Feedback

</h4>

<div className="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-500/5">

<p className="leading-7 text-slate-700 dark:text-slate-300">

{q.ai_feedback}

</p>

</div>

</div>

</div>

</div>

</div>

);

})

}

</div>
</div>
        </div>

    );

}

export default InterviewResult;