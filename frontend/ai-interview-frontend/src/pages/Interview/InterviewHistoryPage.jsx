import { History, Sparkles } from "lucide-react";
import InterviewHistoryList from "../../components/interview/InterviewHistoryList.jsx";

function InterviewHistoryPage() {

    return (

        <div className="min-h-screen bg-slate-100 dark:bg-[#111318] transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-5 py-8">

                {/* Hero */}

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

                        <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"/>

                        <div className="p-8">

                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                <div>

                                    <div className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-purple-100
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-purple-700
                                        dark:bg-purple-500/10
                                        dark:text-purple-300
                                    ">

                                        <Sparkles className="h-4 w-4"/>

                                        AI Interview Assistant

                                    </div>

                                    <h1 className="
                                        mt-5
                                        text-4xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                        dark:text-white
                                    ">

                                        Interview History

                                    </h1>

                                    <p className="
                                        mt-4
                                        max-w-2xl
                                        text-base
                                        leading-relaxed
                                        text-slate-600
                                        dark:text-slate-400
                                    ">

                                        Browse all your AI-generated interview sessions,
                                        review previous practice attempts, and continue
                                        improving your interview performance.

                                    </p>

                                </div>

                                <div className="
                                    flex
                                    h-20
                                    w-20
                                    items-center
                                    justify-center
                                    rounded-3xl
                                    bg-gradient-to-br
                                    from-purple-500
                                    to-blue-500
                                    shadow-lg
                                ">

                                    <History className="h-10 w-10 text-white"/>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>





                {/* Section Header */}

                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-900
                            dark:text-white
                        ">

                            Previous Interview Sessions

                        </h2>

                        <p className="
                            mt-2
                            text-slate-500
                            dark:text-slate-400
                        ">

                            All interview sessions generated from your uploaded resumes.

                        </p>

                    </div>

                </div>





                {/* Interview Cards */}

                <InterviewHistoryList showAll={true} />

            </div>

        </div>

    );

}

export default InterviewHistoryPage;