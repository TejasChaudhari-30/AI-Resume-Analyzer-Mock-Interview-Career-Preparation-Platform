import { Link } from "react-router-dom";
import { FaArrowRight, FaFileAlt, FaPlus } from "react-icons/fa";
import { EmptyState } from "./DashboardExtras.jsx";
import { formatDate, panelClass } from "./DashboardUtils.js";

function LatestResumeCard({ resume }) {
    if (!resume) {
        return (
            <section className={panelClass} aria-labelledby="latest-resume-heading">
                <div className="mb-5">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Resume</p>
                    <h2 id="latest-resume-heading" className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        Latest resume
                    </h2>
                </div>
                <EmptyState
                    icon={<FaFileAlt aria-hidden="true" />}
                    title="No resumes uploaded yet"
                    description="Upload your first resume to unlock AI analysis, scoring, and improvement guidance."
                    actionLabel="Upload Resume"
                    actionTo="/resume/resumemanager"
                />
            </section>
        );
    }

    return (
        <section className={panelClass} aria-labelledby="latest-resume-heading">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Resume</p>
                    <h2 id="latest-resume-heading" className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        Latest resume
                    </h2>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300" aria-hidden="true">
                    <FaFileAlt />
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Resume name</p>
                <p className="mt-2 break-words text-lg font-semibold text-slate-950 dark:text-white">{resume.file_name}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="rounded-full bg-white px-3 py-1 font-medium shadow-sm dark:bg-[#242832]">Uploaded {formatDate(resume.uploaded_at)}</span>
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                    to={`/resume/review/${resume.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#1d2027]"
                >
                    View Review
                    <FaArrowRight aria-hidden="true" />
                </Link>
                <Link
                    to="/resume/resumemanager"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-white/10 dark:text-slate-200 dark:hover:border-blue-400/40 dark:hover:bg-blue-500/10 dark:focus:ring-offset-[#1d2027]"
                >
                    <FaPlus aria-hidden="true" />
                    Upload New
                </Link>
            </div>
        </section>
    );
}

export default LatestResumeCard;
