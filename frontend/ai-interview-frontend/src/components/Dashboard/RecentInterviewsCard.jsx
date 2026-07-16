import { Link } from "react-router-dom";

function RecentInterviewsCard({ interviews }) {

   return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-semibold">
                    Recent Interview Sessions
                </h2>

                <Link
                    to="/interviews/history"
                    className="text-blue-600 hover:underline"
                >
                    View All
                </Link>

            </div>

            {
                interviews.length === 0 ? (

                    <p className="text-gray-500">
                        No interview sessions found.
                    </p>

                ) : (

                    <div className="space-y-4">

                        {
                            interviews.map((interview) => (

                                <div
                                    key={interview.id}
                                    className="border rounded-lg p-4 flex justify-between items-center"
                                >

                                    <div>

                                        <h3 className="font-semibold">
                                            {interview.role}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            {interview.difficulty} • {new Date(interview.started_at).toLocaleDateString()}
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-2xl font-bold text-green-600">
                                            {interview.total_score}%
                                        </p>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );

}

export default RecentInterviewsCard;