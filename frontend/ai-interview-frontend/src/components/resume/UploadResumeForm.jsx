import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/backendapi.jsx";

function UploadResumeForm({ refreshResumes }) {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userprompt, setUserPrompt] = useState("");

    const navigate = useNavigate();

    function handleFileChange(e) {
        setFile(e.target.files[0]);
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!file) {
            alert("Please select a PDF.");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("resume", file);

            // Upload Resume
            const uploadResponse = await api.post(
                "/resume/upload",
                formData
            );
console.log(uploadResponse.data);
            const resumeId = uploadResponse.data.resumeId
            // Generate AI Review
            const reviewResponse = await api.post(
                `/resume/review/${resumeId}`,{
                    userprompt
                }
            );


            refreshResumes();

            navigate(`/resume/review/${resumeId}`);

        }
        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Upload failed."
            );

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-semibold mb-5">
                Upload Resume
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full border rounded-lg p-2"
                />
                <div>

    <label className="block font-medium mb-2">
        Additional Instructions (Optional)
    </label>

    <textarea
        rows={4}
        value={userprompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Example: Focus on ATS score, Backend Developer role, FAANG interview..."
        className="w-full border rounded-lg p-3"
    />

</div>

                {
                    file &&
                    <div className="bg-gray-100 rounded-lg p-3">

                        <p>
                            📄 {file.name}
                        </p>

                    </div>
                }

                <button
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    {
                        loading
                            ? "Uploading..."
                            : "Upload Resume"
                    }
                </button>

            </form>

        </div>

    );

}

export default UploadResumeForm;