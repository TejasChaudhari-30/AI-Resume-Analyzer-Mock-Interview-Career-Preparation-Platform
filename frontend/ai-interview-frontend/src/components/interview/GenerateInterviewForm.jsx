import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/backendapi.jsx";

function GenerateInterviewForm() {

    const navigate = useNavigate();

    const [resumes, setResumes] = useState([]);
    const [resumeId, setResumeId] = useState("");
    const [targetRole, setTargetRole] = useState("");
    const [difficulty, setDifficulty] = useState("Medium");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchResumes();
    }, []);

    async function fetchResumes() {

        try {

            const response = await api.get("/resume");

            setResumes(response.data.resumes);

        }
        catch (error) {

            console.log(error);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!resumeId) {

            alert("Select a resume.");
            return;

        }

        try {

            setLoading(true);

            const response = await api.post(

                `/interview/generate/${resumeId}`,

                {
                    difficulty,
                    targetRole
                }

            );

            navigate(

                `/interview/session/${response.data.sessionId}`,

                {

                    state: {

                        sessionId: response.data.sessionId,

                        questions: response.data.questions

                    }

                }

            );

        }
        catch (error) {

            console.log(error.response?.data);

            alert("Failed to generate interview.");

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div className="bg-white shadow rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-6">

                Generate Interview

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>

                    <label className="block mb-2 font-medium">

                        Resume

                    </label>

                    <select

                        value={resumeId}

                        onChange={(e) =>
                            setResumeId(e.target.value)
                        }

                        className="w-full border rounded-lg p-3"

                    >

                        <option value="">

                            Select Resume

                        </option>

                        {

                            resumes.map((resume) => (

                                <option

                                    key={resume.id}

                                    value={resume.id}

                                >

                                    {resume.file_name}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        Target Role

                    </label>

                    <input

                        type="text"

                        value={targetRole}

                        onChange={(e) =>
                            setTargetRole(e.target.value)
                        }

                        className="w-full border rounded-lg p-3"

                        placeholder="Backend Developer"

                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        Difficulty

                    </label>

                    <select

                        value={difficulty}

                        onChange={(e) =>
                            setDifficulty(e.target.value)
                        }

                        className="w-full border rounded-lg p-3"

                    >

                        <option value="Easy">Easy</option>

                        <option value="Medium">Medium</option>

                        <option value="Hard">Hard</option>

                    </select>

                </div>

                <button

                    type="submit"

                    disabled={loading}

                    className="w-full bg-blue-600 text-white py-3 rounded-lg"

                >

                    {

                        loading

                        ?

                        "Generating..."

                        :

                        "Generate Interview"

                    }

                </button>

            </form>

        </div>

    );

}

export default GenerateInterviewForm;