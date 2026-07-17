import { Link } from "react-router-dom";
import api from "../../api/backendapi";


function InterviewHistoryCard({

    interview,

    onDelete

}) {


    async function deleteInterview() {


        const confirmDelete = window.confirm(
            "Delete this interview?"
        );


        if (!confirmDelete) return;


        try {

            await api.delete(
                `/interview/${interview.id}`
            );


            onDelete(interview.id);


        }

        catch(error){

            console.log(error);

            alert("Failed to delete interview.");

        }


    }



    return (

       <div
    className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-slate-200
    bg-slate-50
    p-6
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl

    dark:border-slate-800
    dark:bg-[#181b21]
    "
>
    <div
    className="
    absolute
    inset-x-0
    top-0
    h-[3px]
    bg-gradient-to-r
    from-purple-500
    via-blue-500
    to-cyan-400
    opacity-80
    transition
    group-hover:opacity-100
    "
/>

            <div className="flex justify-between gap-6">


                <div>


                    <div className="flex items-center gap-3">


                        <h2
                            className="
                            text-xl
                            font-bold
                            text-gray-900
                            dark:text-white
                            "
                        >

                            {interview.role}

                        </h2>


                        <span
                            className="
                            px-3
                            py-1
                            text-xs
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            dark:bg-blue-900/30
                            dark:text-blue-300
                            "
                        >

                            {interview.difficulty}

                        </span>


                    </div>



                    <p
                        className="
                        text-sm
                        text-gray-500
                        mt-3
                        "
                    >

                        Completed on{" "}

                        {
                            new Date(
                                interview.started_at
                            ).toLocaleDateString()
                        }


                    </p>



                    <p
                        className="
                        text-sm
                        text-gray-400
                        mt-1
                        "
                    >

                        AI Generated Mock Interview

                    </p>


                </div>



                <div
                    className="
                    text-right
                    "
                >

                    <p
                        className="
                        text-sm
                        text-gray-500
                        "
                    >

                        Overall Score

                    </p>


                    <h3
                        className="
                        text-4xl
                        font-extrabold
                        text-blue-600
                        dark:text-blue-400
                        mt-1
                        "
                    >

                        {interview.total_score}

                        <span className="text-xl">
                            /100
                        </span>


                    </h3>


                </div>



            </div>



            <div
                className="
                flex
                justify-end
                gap-3
                mt-7
                "
            >


                <Link

                    to={`/interview/result/${interview.id}`}

                    className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-blue-600
                    text-white
                    font-medium
                    hover:bg-blue-700
                    transition
                    "

                >

                    View Report

                </Link>



                <button

                    onClick={deleteInterview}

                    className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-red-500
                    text-white
                    font-medium
                    hover:bg-red-600
                    transition
                    "

                >

                    Delete

                </button>


            </div>


        </div>

    );

}


export default InterviewHistoryCard;