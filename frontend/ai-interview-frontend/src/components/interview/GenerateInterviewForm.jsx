import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/backendapi.jsx";
import {
  Sparkles,
  FileText,
  Briefcase,
  Brain,
  Loader2,
  CheckCircle2,
} from "lucide-react";

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

        <div
className="
bg-white
dark:bg-[#111827]
rounded-2xl
p-8
border
border-gray-200
dark:border-gray-800
shadow-sm
"
>

          <div className="mb-8">
  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
    <Sparkles className="h-4 w-4" />
    AI Interview Generator
  </span>

  <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
    Create a Personalized Interview
  </h2>

  <p className="mt-3 text-gray-700
dark:text-gray-300">
    Select a resume, choose your target role and difficulty, then let AI
    generate an interview tailored to your profile.
  </p>
</div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>

                   <label className="mb-3 flex items-center gap-2 font-semibold text-gray-700
dark:text-gray-300">
  <FileText className="h-5 w-5 text-blue-500" />
  Resume
</label>

                    <select className="
w-full
rounded-2xl
border
border-slate-300
bg-white
px-5
py-3
shadow-sm
transition
focus:border-blue-500
focus:ring-4
focus:ring-blue-100
dark:border-slate-700
dark:bg-slate-800
dark:text-white
"

                        value={resumeId}

                        onChange={(e) =>
                            setResumeId(e.target.value)
                        }

                        className="
w-full
rounded-xl
border
border-gray-200
bg-gray-50
text-gray-800

dark:border-gray-700
dark:bg-gray-900
dark:text-white

px-4
py-3
"

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

                   <label className="mb-3 flex items-center gap-2 font-semibold">
    <Briefcase className="h-5 w-5 text-blue-500"/>
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

    <label className="mb-3 flex items-center gap-2 font-semibold text-gray-700
dark:text-gray-300">
        <Brain className="h-5 w-5 text-blue-500" />
        Difficulty
    </label>

    <div className="grid grid-cols-3 gap-3">

        <button
            type="button"
            onClick={() => setDifficulty("Easy")}
            className={`rounded-2xl border px-4 py-3 font-semibold transition-all duration-300
            ${
                difficulty === "Easy"
                    ? "bg-green-500 text-white border-green-500 shadow-lg"
                    : "bg-white border-slate-300 hover:border-green-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            }`}
        >
            Easy
        </button>

        <button
            type="button"
            onClick={() => setDifficulty("Medium")}
            className={`rounded-2xl border px-4 py-3 font-semibold transition-all duration-300
            ${
                difficulty === "Medium"
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white border-slate-300 hover:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            }`}
        >
            Medium
        </button>

        <button
            type="button"
            onClick={() => setDifficulty("Hard")}
            className={`rounded-2xl border px-4 py-3 font-semibold transition-all duration-300
            ${
                difficulty === "Hard"
                    ? "bg-red-500 text-white border-red-500 shadow-lg"
                    : "bg-white border-slate-300 hover:border-red-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            }`}
        >
            Hard
        </button>

    </div>

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