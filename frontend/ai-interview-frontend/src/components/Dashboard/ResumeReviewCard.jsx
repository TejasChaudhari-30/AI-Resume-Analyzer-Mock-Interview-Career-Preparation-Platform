import { Link } from "react-router-dom";
import { FaArrowRight, FaClipboardCheck } from "react-icons/fa";
import { EmptyState } from "./DashboardExtras.jsx";
import { formatDate, panelClass } from "./DashboardUtils.js";

function ResumeReviewCard({ review, resume }) {
    if (!review) {
        return (
            <section className={panelClass} aria-labelledby="resume-review-heading">
                <div className="mb-5">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Reviews</p>
                    <h2 id="resume-review-heading" className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        Recent resume reviews
                    </h2>
                </div>
                <EmptyState
                    icon={<FaClipboardCheck aria-hidden="true" />}
                    title="No resume reviews yet"
                    description="Upload a resume to generate your first AI review and receive practical improvement notes."
                    actionLabel="Upload Resume"
                    actionTo="/resume/resumemanager"
                />
            </section>
        );
    }

    const score = Number(review.score) || 0;

    return (
        <section className={panelClass} aria-labelledby="resume-review-heading">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Reviews</p>
                    <h2 id="resume-review-heading" className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        Recent resume reviews
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{resume?.file_name || "Latest resume review"}</p>
                </div>
                <div className="w-fit rounded-2xl bg-emerald-50 px-4 py-3 text-center text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <p className="text-xs font-semibold uppercase tracking-wide">Score</p>
                    <p className="text-2xl font-bold">{score}/100</p>
                </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Strengths</h3>
                    <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{review.strengths || "No strengths summary available."}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Focus areas</h3>
                    <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{review.weaknesses || "No focus areas available."}</p>
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">Reviewed {formatDate(review.created_at)}</p>
                <Link
                    to={`/resume/review/${review.resume_id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#1d2027]"
                >
                    View Full Review
                    <FaArrowRight aria-hidden="true" />
                </Link>
            </div>
        </section>
    );
}

export default ResumeReviewCard;
