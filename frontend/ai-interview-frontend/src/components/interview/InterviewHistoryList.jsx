import { useEffect, useState } from "react";
import api from "../../api/backendapi.jsx";
import InterviewHistoryCard from "./InterviewHistoryCard";

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

            } else {

                setInterviews(
                    response.data.interviews.slice(0, 5)
                );

            }

        } catch (error) {

            console.log(error);

        } finally {

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

            <div className="space-y-5">

                {[1,2,3].map((item)=>(
                    <div
                        key={item}
                        className="
                        h-44 
                        rounded-2xl 
                        bg-gray-100
                        animate-pulse
                        "
                    />
                ))}

            </div>

        );

    }


    if (interviews.length === 0) {

        return (

            <div
                className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-10
                text-center
                shadow-sm
                "
            >

                <h3 className="text-lg font-semibold text-gray-800">
                    No Interview Attempts Yet
                </h3>

                <p className="text-gray-500 mt-2">
                    Generate your first AI mock interview and track your progress here.
                </p>

            </div>

        );

    }


    return (

        <div className="space-y-5">

            {
                interviews.map((interview)=>(

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