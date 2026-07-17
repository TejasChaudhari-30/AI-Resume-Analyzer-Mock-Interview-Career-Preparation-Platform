import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../../api/backendapi.jsx";

import {
    Clock3,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    AlertTriangle,
    Sparkles,
} from "lucide-react";

function InterviewSession() {

    const { sessionId } = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    const questions = location.state?.questions || [];

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState(
        questions.map((q) => ({
            questionId: q.id,
            answer: "",
        }))
    );

    const [submitting, setSubmitting] = useState(false);

    const [showSubmitModal, setShowSubmitModal] = useState(false);

    // ----------------------------
    // Timer
    // ----------------------------

    // 2 minutes per question
    const TOTAL_SECONDS = Math.max(questions.length * 120, 300);

    const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);

    // ----------------------------
    // Current Question
    // ----------------------------

    const current = questions[currentQuestion];

    // ----------------------------
    // Progress
    // ----------------------------

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    const answeredCount = useMemo(() => {

        return answers.filter(
            (a) => a.answer.trim().length > 0
        ).length;

    }, [answers]);

    // ----------------------------
    // Timer Effect
    // ----------------------------

    useEffect(() => {

        if (questions.length === 0) return;

        const timer = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 1) {

                    clearInterval(timer);

                    submitInterview(true);

                    return 0;
                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, []);
    useEffect(() => {

    function handleKeyDown(e) {

        if (e.target.tagName === "TEXTAREA") return;

        if (e.key === "ArrowRight") {

            if (currentQuestion < questions.length - 1) {

                nextQuestion();

            }

        }

        if (e.key === "ArrowLeft") {

            if (currentQuestion > 0) {

                previousQuestion();

            }

        }

        if (e.ctrlKey && e.key === "Enter") {

            setShowSubmitModal(true);

        }

    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);

}, [currentQuestion, questions.length]);

    // ----------------------------
    // Format Time
    // ----------------------------

    function formatTime(seconds) {

        const mins = Math.floor(seconds / 60);

        const secs = seconds % 60;

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    }

    // ----------------------------
    // Timer Color
    // ----------------------------

    function timerColor() {

        const percent = timeLeft / TOTAL_SECONDS;

        if (percent > 0.5) return "text-emerald-500";

        if (percent > 0.2) return "text-yellow-500";

        return "text-red-500";

    }

    // ----------------------------
    // Empty State
    // ----------------------------

    if (questions.length === 0) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-[#111318]">

                <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm dark:bg-[#181b21] dark:border-slate-800">

                    <h2 className="text-2xl font-bold dark:text-white">

                        No Interview Found

                    </h2>

                    <p className="mt-3 text-slate-500">

                        Please generate an interview first.

                    </p>

                </div>

            </div>

        );

    }

    // ----------------------------
    // Answer Change
    // ----------------------------

    function handleAnswerChange(e) {

        const temp = [...answers];

        temp[currentQuestion].answer = e.target.value;

        setAnswers(temp);

    }

    // ----------------------------
    // Navigation
    // ----------------------------

    function nextQuestion() {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(currentQuestion + 1);

        }

    }

    function previousQuestion() {

        if (currentQuestion > 0) {

            setCurrentQuestion(currentQuestion - 1);

        }

    }

    function jumpToQuestion(index) {

        setCurrentQuestion(index);

    }

    // ----------------------------
    // Submit
    // ----------------------------

    async function submitInterview(auto = false) {

        if (submitting) return;

        try {

            setSubmitting(true);

            await api.post(

                `/interview/evaluate/${sessionId}`,

                {
                    answers,
                }

            );

            navigate(`/interview/result/${sessionId}`);

        }
        catch (error) {

            console.log(error.response?.data);

            setSubmitting(false);

        }

    }

    return (

<div className="min-h-screen bg-slate-100 dark:bg-[#111318] transition-colors duration-300">

    {/* Loading Overlay */}

    {
        submitting &&

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="rounded-3xl bg-white dark:bg-[#181b21] p-10 shadow-2xl">

                <div className="flex flex-col items-center gap-5">

                    <Sparkles className="h-10 w-10 text-blue-500 animate-pulse"/>

                    <div className="text-center">

                        <h2 className="text-2xl font-bold dark:text-white">

                            AI is Evaluating...

                        </h2>

                        <p className="mt-2 text-slate-500">

                            Please wait while we analyze your interview.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    }



<div className="max-w-7xl mx-auto px-5 py-8">


{/* ========================= HEADER ========================= */}

<div className="mb-8">
<div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm dark:bg-[#181b21]/90 dark:border-slate-800 p-6">

<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

<div>

<div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">

<Sparkles className="h-4 w-4"/>

AI Interview

</div>

<h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">

Interview Session

</h1>

<p className="mt-2 text-slate-500 dark:text-slate-400">

Answer every question carefully before submitting.

</p>

</div>





<div className="flex gap-5">

<div className="rounded-2xl bg-slate-100 dark:bg-slate-800 px-6 py-4 text-center">

<p className="text-sm text-slate-500">

Question

</p>

<p className="mt-1 text-2xl font-bold text-blue-600">

{currentQuestion+1}/{questions.length}

</p>

</div>

<div className="rounded-2xl bg-slate-100 dark:bg-slate-800 px-6 py-4 text-center">

<div className={`

flex

items-center

gap-2

justify-center

${timerColor()}

${timeLeft<60?"animate-pulse":""}

`}>

<Clock3 className="h-5 w-5"/>

<span className="font-bold text-xl">

{formatTime(timeLeft)}

</span>

</div>

<p className="text-xs text-slate-500 mt-1">

Remaining

</p>

</div>

</div>

</div>





<div className="mt-6">

<div className="flex justify-between text-sm mb-2">

<span className="text-slate-500">

Progress

</span>

<span className="font-medium dark:text-white">

{Math.round(progress)}%

</span>

</div>

<div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">

<div

style={{width:`${progress}%`}}

className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-700 ease-out"

/>

</div>

</div>

</div>

</div>





{/* ========================= MAIN ========================= */}

<div className="grid lg:grid-cols-4 gap-8">




{/* LEFT */}

<div className="lg:col-span-3">

<div className="rounded-3xl border border-slate-200 bg-white dark:bg-[#181b21] dark:border-slate-800 shadow-sm overflow-hidden">

<div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"/>

<div className="p-8">

<div className="mb-6">

<span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-500/10 px-4 py-2 text-blue-700 dark:text-blue-300 font-medium">

{current.category}

</span>

</div>

<h2 className="text-2xl font-semibold leading-relaxed text-slate-900 dark:text-white">

{current.question}

</h2>


<div className="mt-8">

<label className="block mb-3 font-semibold text-slate-800 dark:text-slate-200">

Your Answer

</label>

<textarea

rows={10}

value={answers[currentQuestion].answer}

onChange={handleAnswerChange}

placeholder="Write your answer here..."

className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111318] p-5 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition"

/>

<div className="mt-3 flex justify-between text-sm">

<span className="text-slate-500">

{answers[currentQuestion].answer.length} characters

</span>

<span className="text-emerald-500">

{answers[currentQuestion].answer.length>0 &&

<div className="flex items-center gap-1">

<CheckCircle2 className="h-4 w-4"/>

✓ Auto Saved

</div>

}

</span>

</div>

</div>





<div className="mt-10 flex justify-between">

<button

onClick={previousQuestion}

disabled={currentQuestion===0}

className="flex items-center gap-2 rounded-xl bg-slate-200 dark:bg-slate-700 px-6 py-3 disabled:opacity-40 hover:scale-105 transition"

>

<ChevronLeft className="h-5 w-5"/>

Previous

</button>

{

currentQuestion===questions.length-1 ?

<button

onClick={()=>setShowSubmitModal(true)}

className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-7 py-3 text-white font-semibold transition"

>

Submit Interview

</button>

:

<button

onClick={nextQuestion}

className="flex items-center gap-2 rounded-xl bg-gradient-to-r
from-blue-600
to-cyan-500 hover:bg-blue-700 px-6 py-3 text-white font-semibold transition"

>

Next

<ChevronRight className="h-5 w-5"/>

</button>

}

</div>

</div>

</div>

</div>





{/* RIGHT SIDEBAR */}

<div className="space-y-6">

<div className="rounded-3xl border border-slate-200 bg-white dark:bg-[#181b21] dark:border-slate-800 p-6 shadow-sm">

<h3 className="font-bold mb-4 dark:text-white">

Questions

</h3>

<div className="grid grid-cols-5 gap-2">

{

questions.map((q,index)=>(

<button

key={q.id}

onClick={()=>jumpToQuestion(index)}

className={`

aspect-square

rounded-xl

font-semibold

transition

${
index===currentQuestion

?

'bg-blue-600 text-white'

:

answers[index].answer.trim()

?

'bg-gradient-to-r from-emerald-500 to-green-500 text-white'

:

'bg-slate-200 dark:bg-slate-700 dark:text-white'

}

`}

>

{index+1}

</button>

))

}

</div>

</div>





<div className="rounded-3xl border border-slate-200 bg-white dark:bg-[#181b21] dark:border-slate-800 p-6 shadow-sm">

<h3 className="font-bold dark:text-white">

Interview Tips

</h3>

<ul className="mt-4 space-y-3 text-sm text-slate-500">

<li>• Structure answers clearly.</li>

<li>• Give real examples.</li>

<li>• Mention trade-offs.</li>

<li>• Explain your reasoning.</li>

<li>• Stay concise.</li>

</ul>

<div className="mt-5 rounded-xl bg-blue-50 dark:bg-blue-500/10 p-4">

<p className="text-sm text-blue-700 dark:text-blue-300">

Answered {answeredCount} of {questions.length} questions.

</p>

</div>

</div>

</div>

</div>
{
showSubmitModal && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

<div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:bg-[#181b21] dark:border-slate-800">

<div className="flex justify-center">

<div className="rounded-full bg-yellow-100 dark:bg-yellow-500/10 p-4">

<AlertTriangle className="h-8 w-8 text-yellow-600"/>

</div>

</div>

<h2 className="mt-6 text-center text-2xl font-bold dark:text-white">

Finish Interview?

</h2>

<p className="mt-4 text-center text-slate-500">

You answered

<strong className="mx-1">

{answeredCount}

</strong>

out of

<strong className="mx-1">

{questions.length}

</strong>

questions.

</p>

<div className="mt-8 flex gap-4">

<button

onClick={()=>setShowSubmitModal(false)}

className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 py-3 font-medium"

>

Continue

</button>

<button

onClick={submitInterview}

className="flex-1 rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"

>

{submitting ? "Evaluating..." : "Submit"}

</button>

</div>

</div>

</div>

)
}

</div>

</div>

);

}

export default InterviewSession;