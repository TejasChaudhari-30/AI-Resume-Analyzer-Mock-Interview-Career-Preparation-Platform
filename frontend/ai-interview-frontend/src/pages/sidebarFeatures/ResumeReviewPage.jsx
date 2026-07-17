import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/backendapi.jsx";

import {
    Sparkles,
    Target,
    CheckCircle2,
    AlertTriangle,
    Lightbulb,
    FileText,
    ArrowRight,
    Copy,
    Download,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function ResumeReviewPage() {

    const { resumeId } = useParams();

    const navigate = useNavigate();

    const [review, setReview] = useState(null);

    const [loading, setLoading] = useState(true);

    const [copied, setCopied] = useState("");

    useEffect(() => {
        fetchReview();
        

    }, []);

    
function downloadReport() {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text("AI Resume Analyzer", 14, 20);

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Resume Analysis Report", 14, 32);

    doc.setFontSize(14);
    doc.text(`ATS Score: ${review.score}/100`, 14, 46);

    autoTable(doc, {
        startY: 58,
        head: [["Section", "Content"]],
        body: [
            ["Review Focus", review.user_prompt || "-"],
            ["Strengths", Array.isArray(review.strengths)
                ? review.strengths.join("\n")
                : review.strengths],
            ["Weaknesses", Array.isArray(review.weaknesses)
                ? review.weaknesses.join("\n")
                : review.weaknesses],
            ["Suggestions", Array.isArray(review.suggestions)
                ? review.suggestions.join("\n")
                : review.suggestions],
        ],
        styles: {
            fontSize: 10,
            cellPadding: 4,
            overflow: "linebreak",
        },
        headStyles: {
            fillColor: [37, 99, 235],
        },
    });

    doc.save("Resume-Analysis-Report.pdf");
}   

    async function fetchReview() {

        try {

            const response = await api.get(

                `/resume/review/${resumeId}`

            );

            setReview(response.data.review);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }
    function getScoreColor(score) {

    if (score >= 80)

        return "text-emerald-500";

    if (score >= 60)

        return "text-yellow-500";

    return "text-red-500";

}

function getProgressColor(score) {

    if (score >= 80)

        return "from-emerald-500 to-green-400";

    if (score >= 60)

        return "from-yellow-500 to-orange-400";

    return "from-red-500 to-pink-500";

}

function toBulletList(value) {

    if (!value) return [];

    if (Array.isArray(value)) {
        return value;
    }

    if (typeof value !== "string") {
        return [String(value)];
    }

    return value
        .split(/\r?\n|•|-|\*|\d+\./)
        .map(item => item.trim())
        .filter(Boolean);

}
async function copyText(text, type) {

    await navigator.clipboard.writeText(text);

    setCopied(type);

    setTimeout(() => {

        setCopied("");

    }, 2000);

}
    const strengths = useMemo(

    () => toBulletList(review?.strengths),

    [review]

);

const weaknesses = useMemo(

    () => toBulletList(review?.weaknesses),

    [review]

);

const suggestions = useMemo(

    () => toBulletList(review?.suggestions),

    [review]

);

    if (loading) {

        return (
            <h1 className="text-center mt-20 text-xl">
               <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-[#111318]">

    <div className="rounded-3xl bg-white dark:bg-[#181b21] p-10 shadow-lg">

        <Sparkles className="mx-auto h-12 w-12 animate-pulse text-blue-500"/>

        <h2 className="mt-6 text-2xl font-bold dark:text-white">

            AI is reviewing your resume...

        </h2>

        <p className="mt-2 text-slate-500">

            Please wait a few moments.

        </p>

    </div>

</div>
            </h1>
        );

    }

    if (!review) {

        return (
           <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-[#111318]">

    <div className="rounded-3xl bg-white dark:bg-[#181b21] p-10 shadow">

        <FileText className="mx-auto h-10 w-10 text-slate-400"/>

        <h2 className="mt-5 text-2xl font-bold dark:text-white">

            Review Not Found

        </h2>

        <p className="mt-2 text-slate-500">

            Generate a resume review first.

        </p>

    </div>

</div>
        );

    }

    return (

<div className="min-h-screen bg-slate-100 dark:bg-[#111318] transition-colors duration-300">

<div className="max-w-7xl mx-auto px-5 py-8">

{/* ================= HERO ================= */}

<div className="mb-10">

<div className="
overflow-hidden
rounded-3xl
border
border-slate-200
bg-slate-50
shadow-sm
dark:border-slate-800
dark:bg-[#181b21]
">

<div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400"/>

<div className="p-8">

<div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center">

<div>

<div className="
inline-flex
items-center
gap-2
rounded-full
bg-blue-100
dark:bg-blue-500/10
px-4
py-2
text-sm
font-medium
text-blue-700
dark:text-blue-300
">

<Sparkles className="h-4 w-4"/>

AI Resume Analyzer

</div>

<h1 className="
mt-5
text-4xl
font-bold
tracking-tight
text-slate-900
dark:text-white
">

Resume Analysis Report

</h1>

<p className="
mt-4
max-w-2xl
leading-relaxed
text-slate-600
dark:text-slate-400
">

AI-powered ATS analysis highlighting strengths,
weaknesses and actionable improvements for your resume.

</p>

</div>





<div className="text-center">

<div className={`
mx-auto
flex
h-40
w-40
items-center
justify-center
rounded-full
border-[10px]
border-slate-200
dark:border-slate-700
bg-white
dark:bg-[#111318]
shadow-lg
`}>

<div>

<p className={`text-5xl font-bold ${getScoreColor(review.score)}`}>

{review.score}

</p>

<p className="text-sm text-slate-500">

/100

</p>

</div>

</div>

<p className="mt-4 font-semibold text-slate-700 dark:text-slate-300">

ATS Resume Score

</p>

</div>

</div>





<div className="mt-8">

<div className="flex justify-between mb-2 text-sm">

<span className="text-slate-500">

Overall Progress

</span>

<span className="font-medium dark:text-white">

{review.score}%

</span>

</div>

<div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

<div

style={{width:`${review.score}%`}}

className={`

h-full

rounded-full

bg-gradient-to-r

${getProgressColor(review.score)}

transition-all

duration-1000

`}

/>

</div>

</div>

</div>

</div>

</div>





{/* ================= STATS ================= */}

<div className="grid gap-6 md:grid-cols-3 mb-10">

<div className="
rounded-3xl
border
border-slate-200
bg-slate-50
p-6
shadow-sm
dark:border-slate-800
dark:bg-[#181b21]
">

<div className="flex items-center justify-between">

<div>

<p className="text-slate-500">

ATS Score

</p>

<h2 className={`mt-2 text-4xl font-bold ${getScoreColor(review.score)}`}>

{review.score}

</h2>

</div>

<Target className="h-9 w-9 text-blue-500"/>

</div>

</div>





<div className="
rounded-3xl
border
border-slate-200
bg-slate-50
p-6
shadow-sm
dark:border-slate-800
dark:bg-[#181b21]
">

<div className="flex items-center justify-between">

<div>

<p className="text-slate-500">

Strengths

</p>

<h2 className="mt-2 text-4xl font-bold text-emerald-500">

{strengths.length}

</h2>

</div>

<CheckCircle2 className="h-9 w-9 text-emerald-500"/>

</div>

</div>





<div className="
rounded-3xl
border
border-slate-200
bg-slate-50
p-6
shadow-sm
dark:border-slate-800
dark:bg-[#181b21]
">

<div className="flex items-center justify-between">

<div>

<p className="text-slate-500">

Suggestions

</p>

<h2 className="mt-2 text-4xl font-bold text-blue-500">

{suggestions.length}

</h2>

</div>

<Lightbulb className="h-9 w-9 text-blue-500"/>

</div>

</div>

</div>
{/* ================= REVIEW FOCUS ================= */}

{review.user_prompt && (

<div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-[#181b21]">

    <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"/>

    <div className="p-8">

        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-purple-100 p-3 dark:bg-purple-500/10">

                    <Target className="h-6 w-6 text-purple-600 dark:text-purple-400"/>

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                        Review Focus

                    </h2>

                    <p className="text-sm text-slate-500">

                        Your custom prompt for AI analysis

                    </p>

                </div>

            </div>

        </div>

        <p className="mt-6 leading-8 text-slate-700 dark:text-slate-300">

            {review.user_prompt}

        </p>

    </div>

</div>

)}

{/* ================= STRENGTHS ================= */}

<div className="mb-8 overflow-hidden rounded-3xl border border-emerald-200 bg-slate-50 shadow-sm dark:border-emerald-800 dark:bg-[#181b21]">

    <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-400"/>

    <div className="p-8">

        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-emerald-100 p-3 dark:bg-emerald-500/10">

                    <CheckCircle2 className="h-6 w-6 text-emerald-600"/>

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                        Strengths

                    </h2>

                    <p className="text-sm text-slate-500">

                        Things your resume already does well

                    </p>

                </div>

            </div>

            <button

                onClick={() => copyText(review.strengths, "strengths")}

                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"

            >

                <Copy className="h-4 w-4"/>

                {copied === "strengths" ? "Copied!" : "Copy"}

            </button>

        </div>

        <div className="mt-8 space-y-4">

            {strengths.map((item, index) => (

                <div

                    key={index}

                    className="flex items-start gap-4 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/5"

                >

                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500"/>

                    <p className="leading-7 text-slate-700 dark:text-slate-300">

                        {item}

                    </p>

                </div>

            ))}

        </div>

    </div>

</div>
{/* ================= WEAKNESSES ================= */}

<div className="mb-8 overflow-hidden rounded-3xl border border-amber-200 bg-slate-50 shadow-sm dark:border-amber-800 dark:bg-[#181b21]">

    <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"/>

    <div className="p-8">

        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-amber-100 p-3 dark:bg-amber-500/10">

                    <AlertTriangle className="h-6 w-6 text-amber-600"/>

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                        Areas to Improve

                    </h2>

                    <p className="text-sm text-slate-500">

                        These sections could be strengthened.

                    </p>

                </div>

            </div>

            <button
                onClick={() => copyText(review.weaknesses, "weaknesses")}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
                <Copy className="h-4 w-4" />

                {copied === "weaknesses" ? "Copied!" : "Copy"}

            </button>

        </div>

        <div className="mt-8 space-y-4">

            {weaknesses.map((item, index) => (

                <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl bg-amber-50 p-4 dark:bg-amber-500/5"
                >

                    <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-500"/>

                    <p className="leading-7 text-slate-700 dark:text-slate-300">

                        {item}

                    </p>

                </div>

            ))}

        </div>

    </div>

</div>



{/* ================= AI SUGGESTIONS ================= */}

<div className="mb-10 overflow-hidden rounded-3xl border border-blue-200 bg-slate-50 shadow-sm dark:border-blue-800 dark:bg-[#181b21]">

    <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500"/>

    <div className="p-8">

        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-500/10">

                    <Lightbulb className="h-6 w-6 text-blue-600"/>

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                        AI Suggestions

                    </h2>

                    <p className="text-sm text-slate-500">

                        Recommended improvements for a stronger resume.

                    </p>

                </div>

            </div>

            <button
                onClick={() => copyText(review.suggestions, "suggestions")}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >

                <Copy className="h-4 w-4"/>

                {copied === "suggestions" ? "Copied!" : "Copy"}

            </button>

        </div>

        <div className="mt-8 space-y-4">

            {suggestions.map((item, index) => (

                <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl bg-blue-50 p-4 dark:bg-blue-500/5"
                >

                    <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-blue-500"/>

                    <p className="leading-7 text-slate-700 dark:text-slate-300">

                        {item}

                    </p>

                </div>

            ))}

        </div>

    </div>

</div>



{/* ================= ACTION BUTTONS ================= */}

<div className="flex flex-col gap-4 sm:flex-row sm:justify-end">

    <button

        onClick={() => navigate("/interview")}

        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"

    >

        <Sparkles className="h-5 w-5"/>

        Generate Interview

        <ArrowRight className="h-5 w-5"/>

    </button>

    <button

        onClick={downloadReport}

        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-[#181b21] dark:text-white dark:hover:bg-slate-800"

    >

        <Download className="h-5 w-5"/>

        Download Report

    </button>

</div>

</div>

</div>
);

}

export default ResumeReviewPage;