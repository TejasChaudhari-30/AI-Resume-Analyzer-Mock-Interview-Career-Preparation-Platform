import ResumeCard from "./ResumeCard.jsx";

function ResumeList({
    resumes,
    loading,
    refreshResumes
}) {

    if (loading) {

        return (
            <div className="text-center py-8">
                Loading resumes...
            </div>
        );

    }

    if (resumes.length === 0) {

        return (
            <div className="bg-white rounded-xl shadow p-8 text-center">

                <h2 className="text-xl font-semibold mb-2">

                    No Resumes Uploaded

                </h2>

                <p className="text-gray-500">

                    Upload your first resume to get started.

                </p>

            </div>
        );

    }

    return (

        <div className="grid gap-6">

            {
                resumes.map((resume) => (

                    <ResumeCard
                        key={resume.id}
                        resume={resume}
                        refreshResumes={refreshResumes}
                    />

                ))
            }

        </div>

    );

}

export default ResumeList;