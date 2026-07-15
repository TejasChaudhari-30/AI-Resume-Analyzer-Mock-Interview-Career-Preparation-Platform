import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/backendapi.jsx";

function InterviewResult() {

    const { sessionId } = useParams();

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

    if (loading) {

        return (

            <div className="text-center mt-20 text-xl">

                Loading Report...

            </div>

        );

    }

    return (

        <div className="max-w-6xl mx-auto p-8">

            {/* Heading */}

            <h1 className="text-4xl font-bold mb-8">

                Interview Report

            </h1>

            {/* Overall Score */}

            <div className="bg-white shadow rounded-xl p-6 mb-8">

                <h2 className="text-xl font-semibold mb-2">

                    Overall Score

                </h2>

                <p className="text-6xl font-bold text-blue-600">

                    {report.overallScore}/100

                </p>

            </div>

            {/* Overall Feedback */}

            <div className="bg-white shadow rounded-xl p-6 mb-10">

                <h2 className="text-xl font-semibold mb-4">

                    Overall Feedback

                </h2>

                <p className="text-gray-700 leading-7">

                    {report.overallFeedback}

                </p>

            </div>

            {/* Question Wise Report */}

            <h2 className="text-2xl font-bold mb-5">

                Question Analysis

            </h2>

            <div className="space-y-6">

                {

                    report.questions.map((q, index) => (

                        <div
                            key={index}
                            className="bg-white shadow rounded-xl p-6"
                        >

                            <div className="flex justify-between items-center mb-4">

                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                                    {q.category}

                                </span>

                                <span className="font-semibold text-lg">

                                    Score : {q.score}/10

                                </span>

                            </div>

                            <h3 className="font-semibold text-lg mb-3">

                                Q{index + 1}. {q.question}

                            </h3>

                            <div className="mb-4">

                                <h4 className="font-medium mb-1">

                                    Your Answer

                                </h4>

                                <p className="bg-gray-100 rounded-lg p-3">

                                    {q.user_answer || "No Answer"}

                                </p>

                            </div>

                            <div>

                                <h4 className="font-medium mb-1">

                                    AI Feedback

                                </h4>

                                <p className="bg-green-50 rounded-lg p-3">

                                    {q.ai_feedback}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default InterviewResult;