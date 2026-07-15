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

            const response = await api.get("/resume");

            setResumes(response.data.resumes);

        } catch (error) {

            console.log(error);

        } finally {

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

            <div className="mt-10">

                <h2 className="text-2xl font-semibold mb-5">

                    Uploaded Resumes

                </h2>

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