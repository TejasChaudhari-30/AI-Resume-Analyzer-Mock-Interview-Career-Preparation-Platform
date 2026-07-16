import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/backendapi.jsx";

import UploadResumeForm from "../../components/resume/UploadResumeForm.jsx";
import ResumeList from "../../components/resume/ResumeList.jsx";

function ResumeManagement() {

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchResumes();

    }, []);

    async function fetchResumes() {

        try {

            setLoading(true);

            const response = await api.get("/resume?limit=5");

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

            <h1 className="text-3xl font-bold mb-8">

                Resume Management

            </h1>

            <UploadResumeForm
                refreshResumes={fetchResumes}
            />

            <div className="mt-12">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-2xl font-semibold">

                        Recent Resumes

                    </h2>

                    <Link
                        to="/resume/history"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        View All →
                    </Link>

                </div>

                <ResumeList
                    resumes={resumes}
                    loading={loading}
                    refreshResumes={fetchResumes}
                />

            </div>

        </div>

    );

}

export default ResumeManagement;