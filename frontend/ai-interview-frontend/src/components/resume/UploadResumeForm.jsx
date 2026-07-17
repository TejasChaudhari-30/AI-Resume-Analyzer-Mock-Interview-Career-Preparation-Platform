import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  FileText,
  Loader2,
  Sparkles,
  CheckCircle2,
  ArrowUpCircle,
} from "lucide-react";
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
  <div className="flex justify-center px-4 py-8 sm:px-6 lg:px-8">
    <div
      className={`w-full max-w-4xl transition-all duration-300 ${
        loading ? "opacity-70 pointer-events-none" : ""
      }`}
    >
      {/* Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

        {/* Top Gradient */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />

        <div className="p-6 md:p-10">

          {/* Header */}
          <div className="mb-10">

            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
              AI Resume Analyzer
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Upload Your Resume
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Upload your resume and receive an AI-powered ATS review,
              personalized suggestions, interview readiness analysis,
              and improvement recommendations.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
<div>

<label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
Resume (PDF)
</label>

<label
className="
group
relative
flex
cursor-pointer
flex-col
items-center
justify-center
rounded-2xl
border-2
border-dashed
border-slate-300
bg-slate-50
px-6
py-12
text-center
transition-all
duration-300
hover:border-blue-500
hover:bg-blue-50
dark:border-slate-700
dark:bg-slate-800/50
dark:hover:border-blue-400
dark:hover:bg-slate-800
"
>

<input
type="file"
accept=".pdf"
onChange={handleFileChange}
className="absolute inset-0 cursor-pointer opacity-0"
/>

<div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl transition-all duration-300 group-hover:scale-110 dark:bg-blue-500/20">
<UploadCloud className="h-12 w-12 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
</div>

<h3 className="text-lg font-semibold text-slate-800 dark:text-white">
Drag & Drop your Resume
</h3>

<p className="mt-2 text-slate-500 dark:text-slate-400">
or click anywhere to browse
</p>

<div className="mt-5 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 group-hover:scale-105">
Choose PDF
</div>

<p className="mt-5 text-xs text-slate-400">
Supports PDF files
</p>

</label>

</div>

  <div>

<label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
Additional Instructions
</label>

<textarea
rows={5}
value={userprompt}
onChange={(e) => setUserPrompt(e.target.value)}
placeholder="Examples:
• Focus on ATS Score
• Backend Developer Internship
• Highlight React, Node.js & PostgreSQL
• Prepare for FAANG Interviews"
className="
w-full
rounded-2xl
border
border-slate-300
bg-white
px-5
py-4
text-slate-800
shadow-sm
outline-none
transition-all
duration-300
placeholder:text-slate-400
focus:border-blue-500
focus:ring-4
focus:ring-blue-100
dark:border-slate-700
dark:bg-slate-800
dark:text-white
dark:placeholder:text-slate-500
dark:focus:ring-blue-900/40
"
/>

<p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
These instructions help the AI generate a personalized resume review.
</p>

</div>

              {/* Selected File Preview */}

{file && (
  <div
    className="
    rounded-2xl
    border
    border-emerald-200
    bg-emerald-50
    p-5
    shadow-sm
    transition-all
    duration-300
    hover:shadow-md
    dark:border-emerald-800
    dark:bg-emerald-900/20
    "
  >
    <div className="flex items-center justify-between gap-4">

      <div className="flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-3xl dark:bg-red-500/20">
          <FileText className="h-9 w-9 text-red-500" />
        </div>

        <div>

          <h3 className="font-semibold text-slate-900 dark:text-white">
            {file.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

        </div>

      </div>

      <span
        className="
        rounded-full
        bg-emerald-500
        px-4
        py-2
        text-sm
        font-semibold
        text-white
        shadow
        "
      >
       <div className="flex items-center gap-2">
  <CheckCircle2 className="h-5 w-5" />
  Ready to Upload
</div>
      </span>

    </div>
  </div>
)}

{/* Upload Button */}

<button
  type="submit"
  disabled={loading}
  className="
  group
  relative
  flex
  w-full
  items-center
  justify-center
  gap-3
  overflow-hidden
  rounded-2xl
  bg-gradient-to-r
  from-blue-600
  via-blue-500
  to-cyan-500
  px-8
  py-4
  text-lg
  font-semibold
  text-white
  shadow-lg
  transition-all
  duration-300
  hover:-translate-y-1
  hover:shadow-2xl
  disabled:cursor-not-allowed
  disabled:opacity-70
  "
>

  {loading ? (
    <>
      <svg
        className="h-6 w-6 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />

        <path
          className="opacity-100"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
<Loader2 className="h-5 w-5 animate-spin" />
      Uploading & Generating AI Review...
    </>
  ) : (
    <>
      <>
  <ArrowUpCircle className="h-5 w-5" />
  Upload Resume
</>
    </>
  )}

</button>

{/* Footer */}

<div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">

  <h4 className="font-semibold text-slate-800 dark:text-white">
    What happens after uploading?
  </h4>

  <div className="mt-4 grid gap-4 md:grid-cols-3">

    <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
      <div className="text-2xl">📄</div>

      <h5 className="mt-3 font-semibold dark:text-white">
        Resume Parsing
      </h5>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Your resume is parsed and important information is extracted.
      </p>
    </div>

    <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">

      <div className="text-2xl"><Sparkles className="h-8 w-8 text-emerald-500" /></div>

      <h5 className="mt-3 font-semibold dark:text-white">
        AI Review
      </h5>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Our AI analyzes ATS compatibility, skills, projects and weaknesses.
      </p>

    </div>

    <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">

      <div className="text-2xl">📈</div>

      <h5 className="mt-3 font-semibold dark:text-white">
        Improvement Report
      </h5>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Receive personalized recommendations and interview guidance.
      </p>

    </div>

  </div>

</div>
          </form>

        </div>
      </div>
    </div>
  </div>
);



}

export default UploadResumeForm;