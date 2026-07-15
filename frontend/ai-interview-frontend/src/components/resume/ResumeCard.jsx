import api from "../../api/backendapi.jsx";
import { useNavigate } from "react-router-dom";

function ResumeCard({ resume, refreshResumes }) {

    const navigate = useNavigate();

    async function handleDelete() {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/resume/${resume.id}`);

            alert("Resume deleted successfully.");

            refreshResumes();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete resume."
            );

        }

    }

    function handleViewReview() {

        navigate(`/resume/review/${resume.id}`);

    }

    return (

        <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">

            <div>

                <h2 className="text-xl font-semibold">

                    📄 {resume.file_name}

                </h2>

                <p className="text-gray-500 mt-2">

                    Uploaded on{" "}
                    {new Date(resume.uploaded_at).toLocaleDateString()}

                </p>

            </div>

            <div className="flex gap-3">

                <button
                    onClick={handleViewReview}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    View Review
                </button>

                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default ResumeCard;