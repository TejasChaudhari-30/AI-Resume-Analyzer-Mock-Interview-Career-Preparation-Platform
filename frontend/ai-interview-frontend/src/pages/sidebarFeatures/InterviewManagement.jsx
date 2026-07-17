import { useEffect, useState } from "react";
import api from "../../api/backendapi.jsx";
import { Link } from "react-router-dom";

import GenerateInterviewForm from "../../components/interview/GenerateInterviewForm.jsx";
import InterviewHistoryList from "../../components/interview/InterviewHistoryList.jsx";

function InterviewManagement() {

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchInterviews();

    }, []);

    async function fetchInterviews() {

        try {

            const response = await api.get(
                "/interview/history"
            );

            setInterviews(response.data.interviews);

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    }

    return (

    <div className="
        min-h-screen
        bg-slate-100
        dark:bg-[#111318]
        transition-colors
        duration-300
    ">


        <div className="max-w-7xl mx-auto px-5 py-8">



            {/* Header */}

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


                    <div className="
                        h-1
                        bg-gradient-to-r
                        from-purple-500
                        via-blue-500
                        to-cyan-400
                    "/>



                    <div className="p-8">


                        <div className="
                            flex
                            flex-col
                            gap-8
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        ">


                            <div>


                                <div className="
                                    inline-flex
                                    items-center
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

                                    ✨ AI Interview Assistant

                                </div>



                                <h1 className="
                                    mt-5
                                    text-4xl
                                    font-bold
                                    text-slate-900
                                    dark:text-white
                                ">

                                    Interview Management

                                </h1>



                                <p className="
                                    mt-4
                                    max-w-2xl
                                    text-base
                                    leading-relaxed
                                    text-slate-600
                                    dark:text-slate-400
                                ">

                                    Generate AI-powered interviews,
                                    practice questions based on your resume,
                                    and track your previous interview sessions.

                                </p>


                            </div>


                            <Link
                                to="/interviews/history"
                                className="
                                    rounded-2xl
                                    bg-blue-600
                                    px-6
                                    py-3.5
                                    font-semibold
                                    text-white
                                    shadow-md
                                    transition
                                    hover:bg-blue-700
                                    hover:-translate-y-0.5
                                "
                            >

                                View Interview History

                            </Link>



                        </div>


                    </div>


                </div>


            </div>







            {/* Stats */}

            <div className="
                mb-10
                grid
                gap-6
                md:grid-cols-3
            ">



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


                    <p className="
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    ">

                        Total Interviews

                    </p>


                    <h2 className="
                        mt-3
                        text-4xl
                        font-bold
                        text-blue-600
                    ">

                        {interviews.length}

                    </h2>


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


                    <p className="
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    ">

                        AI Generated Sessions

                    </p>


                    <h2 className="
                        mt-3
                        text-4xl
                        font-bold
                        text-purple-600
                    ">

                        {interviews.length}

                    </h2>


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


                    <p className="
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    ">

                        Practice Mode

                    </p>


                    <h2 className="
                        mt-3
                        text-xl
                        font-bold
                        text-slate-900
                        dark:text-white
                    ">

                        Resume Based AI

                    </h2>


                </div>


            </div>







            {/* Generate Interview */}

            <section className="mb-12">


                <GenerateInterviewForm
                    refreshInterviews={fetchInterviews}
                />


            </section>







            {/* History */}

            <section>


                <div className="
                    mb-8
                    flex
                    items-center
                    justify-between
                ">


                    <div>


                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-900
                            dark:text-white
                        ">

                            Previous Interviews

                        </h2>


                        <p className="
                            mt-2
                            text-slate-500
                            dark:text-slate-400
                        ">

                            Review your AI generated interview sessions.

                        </p>


                    </div>



                    <Link
                        to="/interviews/history"
                        className="
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-slate-700
                            shadow-sm
                            transition
                            hover:bg-white
                            dark:border-slate-800
                            dark:bg-[#181b21]
                            dark:text-slate-300
                            dark:hover:bg-slate-800
                        "
                    >

                        View All

                    </Link>


                </div>





                <InterviewHistoryList
                    interviews={interviews}
                    loading={loading}
                    refreshInterviews={fetchInterviews}
                />



            </section>



        </div>


    </div>

);
}

export default InterviewManagement;