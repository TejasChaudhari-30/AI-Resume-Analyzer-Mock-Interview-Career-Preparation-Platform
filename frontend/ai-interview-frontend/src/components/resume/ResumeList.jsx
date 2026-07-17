import ResumeCard from "./ResumeCard.jsx";
import { FileText } from "lucide-react";

function ResumeList({
  resumes,
  loading,
  refreshResumes,
}) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-8 py-5 shadow-lg dark:bg-slate-900">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
            Loading resumes...
          </span>
        </div>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

        <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />

        <div className="flex flex-col items-center px-8 py-16 text-center">

          <div className="mb-6 rounded-full bg-blue-100 p-6 dark:bg-blue-500/20">
            <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            No Resumes Yet
          </h2>

          <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">
            Upload your first resume to receive an AI-powered ATS review,
            personalized feedback and interview recommendations.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          refreshResumes={refreshResumes}
        />
      ))}
    </div>
  );
}

export default ResumeList;