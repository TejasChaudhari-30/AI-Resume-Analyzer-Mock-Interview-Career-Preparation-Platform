import InterviewHistoryList from "../../components/interview/InterviewHistoryList.jsx";

function InterviewHistoryPage() {

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Interview History

                    </h1>

                    <p className="text-gray-500 mt-2">

                        View all your previous AI interview sessions.

                    </p>

                </div>

            </div>

            <InterviewHistoryList showAll={true} />

        </div>

    );

}

export default InterviewHistoryPage;