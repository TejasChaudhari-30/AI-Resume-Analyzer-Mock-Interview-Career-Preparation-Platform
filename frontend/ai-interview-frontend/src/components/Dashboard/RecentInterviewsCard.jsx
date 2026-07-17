import { Link } from "react-router-dom";
import { FaArrowRight, FaMicrophoneAlt } from "react-icons/fa";
import { EmptyState } from "./DashboardExtras.jsx";
import { formatDate, panelClass } from "./DashboardUtils.js";

function difficultyClass(difficulty = "") {
    const normalized = difficulty.toLowerCase();

    if (normalized.includes("hard")) {
        return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300";
    }

    if (normalized.includes("medium")) {
        return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";
    }

    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300";
}

function RecentInterviewsCard({ interviews = [] }) {
    return (
        <section className={panelClass} aria-labelledby="recent-interviews-heading">
            <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Practice</p>
                    <h2 id="recent-interviews-heading" className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        Recent interviews
                    </h2>
                </div>
                <Link
                    to="/interviews/history"
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-blue-300 dark:hover:bg-blue-500/10"
                >
                    View All
                </Link>
            </div>

            {interviews.length === 0 ? (
                <EmptyState
                    icon={<FaMicrophoneAlt aria-hidden="true" />}
                    title="No interview sessions found"
                    description="Generate your first AI interview to practice role-specific questions and track performance."
                    actionLabel="Generate Interview"
                    actionTo="/interview/interviewmanager"
                />
            ) : (
                <div className="space-y-3">
                    {interviews.map((interview) => (
                        <article
                            key={interview.id}
                            className="group rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/40"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0">
                                    <h3 className="truncate font-semibold text-slate-950 dark:text-white">{interview.role}</h3>
                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${difficultyClass(interview.difficulty)}`}>
                                            {interview.difficulty || "Standard"}
                                        </span>
                                        <span>{formatDate(interview.started_at)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 sm:justify-end">
                                    <div className="text-left sm:text-right">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Score</p>
                                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">{interview.total_score}%</p>
                                    </div>
                                    <Link
                                        to={`/interview/result/${interview.id}`}
                                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:text-slate-300 dark:group-hover:border-blue-400/40 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-300"
                                    >
                                        View Report
                                        <FaArrowRight aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default RecentInterviewsCard;
