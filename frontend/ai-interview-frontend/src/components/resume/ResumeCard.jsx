import api from "../../api/backendapi.jsx";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CalendarDays,
  Eye,
  Trash2,
  Sparkles,
} from "lucide-react";

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
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900">

      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />

      <div className="p-7">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-5">

            <div className="rounded-2xl bg-blue-100 p-4 dark:bg-blue-500/20">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {resume.file_name}
                </h2>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  Uploaded
                </span>

              </div>

              <div className="mt-3 flex items-center gap-2 text-slate-500 dark:text-slate-400">

                <CalendarDays className="h-4 w-4" />

                <span>
                  {new Date(resume.uploaded_at).toLocaleDateString()}
                </span>

              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">

                <Sparkles className="h-4 w-4" />

                AI Review Available

              </div>

            </div>

          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={handleViewReview}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              View Review
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-medium text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
            >
              <Trash2 className="h-5 w-5" />
              Delete
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ResumeCard;