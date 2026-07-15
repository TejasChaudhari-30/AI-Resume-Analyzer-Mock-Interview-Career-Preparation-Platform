import { Link } from "react-router-dom";

function LatestResumeCard({ resume }) {

    if (!resume) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    Latest Resume
                </h2>

                <p className="text-gray-500">
                    No resume uploaded yet.
                </p>

                <Link
                    to="/resume/upload"
                    className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Upload Resume
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <h2 className="text-xl font-semibold mb-4">
                Latest Resume
            </h2>

            <div className="space-y-3">

                <div>
                    <p className="text-gray-500 text-sm">
                        Resume Name
                    </p>

                    <p className="font-medium">
                        {resume.file_name}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">
                        Uploaded On
                    </p>

                    <p className="font-medium">
                        {new Date(resume.uploaded_at).toLocaleDateString()}
                    </p>
                </div>

            </div>

            <div className="mt-5 flex gap-3">

                <Link
                    to={`/resume/review/${resume.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    View Review
                </Link>

                <Link
                    to="/resume/resumemanager"
                    className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                    Upload New
                </Link>

            </div>

        </div>
    );
}

export default LatestResumeCard;