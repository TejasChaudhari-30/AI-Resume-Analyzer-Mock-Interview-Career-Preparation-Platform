import { useEffect, useState } from "react";
import api from "../../api/backendapi.jsx";

import ResumeList from "../../components/resume/ResumeList.jsx";

function ResumeHistoryPage() {

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchResumes();

    }, []);

    async function fetchResumes() {

        try {

            setLoading(true);

            const response = await api.get("/resume");

            setResumes(response.data.resumes);

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-2">

                Resume History

            </h1>

            <p className="text-gray-500 mb-8">

                View all uploaded resumes and manage them.

            </p>

            <ResumeList

                resumes={resumes}

                loading={loading}

                refreshResumes={fetchResumes}

            />

        </div>

    );

}

export default ResumeHistoryPage;