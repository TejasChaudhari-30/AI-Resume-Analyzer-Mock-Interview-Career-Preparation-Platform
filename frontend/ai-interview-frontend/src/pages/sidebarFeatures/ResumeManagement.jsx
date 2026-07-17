import { Link } from "react-router-dom";
import {
    FileText,
    Sparkles,
    History,
    ArrowRight,
    Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/backendapi.jsx";

import UploadResumeForm from "../../components/resume/UploadResumeForm.jsx";
import ResumeList from "../../components/resume/ResumeList.jsx";

function ResumeManagement() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResumes();
    }, []);

    async function fetchResumes() {
        try {
            setLoading(true);

            const response = await api.get("/resume?limit=5");

            setResumes(response.data.resumes);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#15171b] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-5 py-8">

                {/* Header */}
                <div className="mb-10">

    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

        <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />

        <div className="p-8">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">

                        <Sparkles className="h-4 w-4" />

                        AI Resume Analyzer

                    </div>

                    <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-900 dark:text-white">

                        Resume Management

                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">

                        Upload resumes, receive AI-powered ATS reviews,
                        track previous uploads and manage your resume
                        library with a beautiful dashboard experience.

                    </p>

                </div>

                <Link
                    to="/resume/history"
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                    <History className="mr-2 h-5 w-5" />

                    Resume History

                    <ArrowRight className="ml-2 h-5 w-5" />

                </Link>

            </div>

        </div>

    </div>

</div>


               {/* Hero */}
     
          <div className="mb-10 grid gap-6 md:grid-cols-3">

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">

        <div className="flex items-center justify-between">

            <div>

                <p className="text-slate-500 dark:text-slate-400">

                    Recent Uploads

                </p>

                <h2 className="mt-2 text-4xl font-bold text-blue-600">

                    {resumes.length}

                </h2>

            </div>

            <div className="rounded-2xl bg-blue-100 p-4 dark:bg-blue-500/20">

                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-300"/>

            </div>

        </div>

    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">

        <div className="flex items-center justify-between">

            <div>

                <p className="text-slate-500 dark:text-slate-400">

                    AI Reviews

                </p>

                <h2 className="mt-2 text-4xl font-bold text-emerald-500">

                    {resumes.length}

                </h2>

            </div>

            <div className="rounded-2xl bg-emerald-100 p-4 dark:bg-emerald-500/20">

                <Sparkles className="h-8 w-8 text-emerald-600"/>

            </div>

        </div>

    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">

        <div className="flex items-center justify-between">

            <div>

                <p className="text-slate-500 dark:text-slate-400">

                    Upload New

                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-800 dark:text-white">

                    PDF Resume

                </h2>

            </div>

            <div className="rounded-2xl bg-purple-100 p-4 dark:bg-purple-500/20">

                <Upload className="h-8 w-8 text-purple-600"/>

            </div>

        </div>

    </div>

</div>

                {/* Upload */}

               <section className="mb-12">

    <UploadResumeForm refreshResumes={fetchResumes} />

</section>

                {/* Recent */}

                <section className="mt-12">

                    <div className="mb-8 flex items-center justify-between">

    <div>

        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">

            Resume Library

        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">

            Recently uploaded resumes with AI-generated analysis.

        </p>

    </div>

    <Link
        to="/resume/history"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium shadow transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
    >

        View All

        <ArrowRight className="h-4 w-4"/>

    </Link>

</div>

                    <ResumeList
                        resumes={resumes}
                        loading={loading}
                        refreshResumes={fetchResumes}
                    />

                </section>

            </div>
        </div>
    );
}

export default ResumeManagement;