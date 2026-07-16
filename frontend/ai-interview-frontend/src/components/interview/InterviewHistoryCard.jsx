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

        catch (error) {

            console.log(error);

            alert("Failed to delete interview.");

        }

    }

    return (

        <div className="bg-white shadow rounded-xl p-6">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-xl font-bold">

                        {interview.role}

                    </h2>

                    <p className="text-gray-500">

                        {interview.difficulty}

                    </p>

                    <p className="text-gray-400 text-sm">

                        {

                            new Date(

                                interview.started_at

                            ).toLocaleDateString()

                        }

                    </p>

                </div>

                <div className="text-right">

                    <p className="text-gray-500">

                        Score

                    </p>

                    <h3 className="text-3xl font-bold text-blue-600">

                        {interview.total_score}/100

                    </h3>

                </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

                <Link

                    to={`/interview/result/${interview.id}`}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                    View Report

                </Link>

                <button

                    onClick={deleteInterview}

                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"

                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default InterviewHistoryCard;