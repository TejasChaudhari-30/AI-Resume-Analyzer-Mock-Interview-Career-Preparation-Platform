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

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">

                Interview Management

            </h1>

            <GenerateInterviewForm
                refreshInterviews={fetchInterviews}
            />

            <div className="mt-10">
 <div className="flex justify-between items-center mb-4">

              

          
                <h2 className="text-2xl font-semibold mb-6">

                    Previous Interviews

                </h2>

                  <Link
                    to="/interviews/history"
                    className="text-blue-600 hover:underline"
                >
                    View All
                </Link>

  </div>
                <InterviewHistoryList
                    interviews={interviews}
                    loading={loading}
                    refreshInterviews={fetchInterviews}
                />

            </div>

        </div>

    );

}

export default InterviewManagement;