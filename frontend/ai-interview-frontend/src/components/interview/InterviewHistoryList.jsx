import { useEffect, useState } from "react";
import api from "../../api/backendapi.jsx";
import InterviewHistoryCard from "./InterviewHistoryCard";
import { Link } from "react-router-dom";

function InterviewHistoryList({ showAll = false }) {

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchHistory();

    }, []);

    async function fetchHistory() {

        try {

            const response = await api.get("/interview/history?page=1&limit=20");

            if (showAll) {

                setInterviews(response.data.interviews);

            }

            else {

                setInterviews(
                    response.data.interviews.slice(0,5)
                );

            }

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    function removeInterview(id) {

        setInterviews((prev) =>
            prev.filter((item) => item.id !== id)
        );

    }

    if (loading) {

        return (

            <div className="text-center py-10">

                Loading...

            </div>

        );

    }

    if (interviews.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow p-8 text-center">

                No Interviews Found

            </div>

        );

    }

    return (

        <div className="space-y-5">
             


            {

                interviews.map((interview) => (

                    <InterviewHistoryCard

                        key={interview.id}

                        interview={interview}

                        onDelete={removeInterview}

                    />

                ))

            }

        </div>

    );

}

export default InterviewHistoryList;