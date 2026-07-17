import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaBriefcase,
    FaChartLine,
    FaFileAlt,
    FaHistory,
    FaIdBadge,
    FaMicrophoneAlt,
    FaRedo,
    FaUserCircle
} from "react-icons/fa";
import { panelClass } from "./DashboardUtils.js";

export function EmptyState({ icon, title, description, actionLabel, actionTo }) {
    return (
        <div className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-6 py-8 text-center dark:border-white/15 dark:bg-white/[0.03]">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-xl text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                {icon}
            </div>
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
            {actionTo && (
                <Link
                    to={actionTo}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#1d2027]"
                >
                    {actionLabel}
                    <FaArrowRight aria-hidden="true" />
                </Link>
            )}
        </div>
    );
}

function ProgressCard({ item, index }) {
    const colors = ["from-blue-500 to-sky-400", "from-emerald-500 to-teal-400", "from-amber-500 to-orange-400", "from-indigo-500 to-blue-400"];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{item.value}%</p>
                </div>
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${colors[index % colors.length]} opacity-90`} />
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10" aria-hidden="true">
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${colors[index % colors.length]} transition-all duration-700 ease-out`}
                    style={{ width: `${item.value}%` }}
                />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.detail}</p>
        </div>
    );
}

export function ProgressSection({ progress, hasActivity }) {
    return (
        <section className={panelClass} aria-labelledby="progress-heading">
            <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Progress</p>
                    <h2 id="progress-heading" className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        Career readiness snapshot
                    </h2>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Updated from your latest dashboard activity</p>
            </div>

            {hasActivity ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {progress.map((item, index) => (
                        <ProgressCard key={item.label} item={item} index={index} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={<FaChartLine aria-hidden="true" />}
                    title="No progress data yet"
                    description="Upload your first resume or start an interview session to unlock progress insights."
                    actionLabel="Upload Resume"
                    actionTo="/resume/resumemanager"
                />
            )}
        </section>
    );
}

export function ScoreTrendChart({ interviews = [] }) {
    const ordered = [...interviews].reverse();
    const maxScore = Math.max(100, ...ordered.map((item) => Number(item.total_score) || 0));
    const points = ordered.map((item, index) => {
        const x = ordered.length === 1 ? 50 : (index / (ordered.length - 1)) * 100;
        const y = 100 - ((Number(item.total_score) || 0) / maxScore) * 82 - 8;
        return { x, y, score: Number(item.total_score) || 0, label: item.role };
    });
    const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");

    return (
        <section className={panelClass} aria-labelledby="score-trend-heading">
            <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Interview analytics</p>
                    <h2 id="score-trend-heading" className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        Interview score trend
                    </h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                    Last {ordered.length || 0}
                </span>
            </div>

            {ordered.length ? (
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.03]">
                    <svg viewBox="0 0 100 100" className="h-56 w-full overflow-visible" role="img" aria-label="Line chart of recent interview scores">
                        {[20, 40, 60, 80].map((line) => (
                            <line key={line} x1="0" x2="100" y1={line} y2={line} stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="0.5" />
                        ))}
                        <polyline points={polyline} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        {points.map((point) => (
                            <g key={`${point.label}-${point.x}`}>
                                <circle cx={point.x} cy={point.y} r="3.3" fill="#2563eb" className="drop-shadow-sm" />
                                <circle cx={point.x} cy={point.y} r="6" fill="#2563eb" opacity="0.12" />
                            </g>
                        ))}
                    </svg>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {ordered.slice(-3).map((item) => (
                            <div key={item.id} className="rounded-xl bg-white px-3 py-2 text-sm shadow-sm dark:bg-[#242832]">
                                <p className="truncate font-medium text-slate-800 dark:text-slate-100">{item.role}</p>
                                <p className="text-slate-500 dark:text-slate-400">{item.total_score}% score</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <EmptyState
                    icon={<FaMicrophoneAlt aria-hidden="true" />}
                    title="No interview trend yet"
                    description="Generate an interview and complete a session to see your score trend."
                    actionLabel="Generate Interview"
                    actionTo="/interview/interviewmanager"
                />
            )}
        </section>
    );
}

export function DifficultyDistribution({ interviews = [] }) {
    const counts = interviews.reduce((accumulator, interview) => {
        const key = interview.difficulty || "Unknown";
        accumulator[key] = (accumulator[key] || 0) + 1;
        return accumulator;
    }, {});
    const total = interviews.length;
    const rows = Object.entries(counts);

    return (
        <section className={panelClass} aria-labelledby="difficulty-heading">
            <div className="mb-5">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Distribution</p>
                <h2 id="difficulty-heading" className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    Interview categories
                </h2>
            </div>

            {rows.length ? (
                <div className="space-y-4">
                    {rows.map(([label, count]) => {
                        const percentage = Math.round((count / total) * 100);
                        return (
                            <div key={label}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-medium capitalize text-slate-700 dark:text-slate-200">{label}</span>
                                    <span className="text-slate-500 dark:text-slate-400">{percentage}%</span>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-700" style={{ width: `${percentage}%` }} />
                                </div>
                            </div>
                        );
                    })}
                    <p className="pt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Based on your {total} most recent dashboard interview sessions.
                    </p>
                </div>
            ) : (
                <EmptyState
                    icon={<FaBriefcase aria-hidden="true" />}
                    title="No categories available"
                    description="Interview difficulty distribution appears after your first completed session."
                />
            )}
        </section>
    );
}

export function QuickActions() {
    const actions = [
        { label: "Upload Resume", description: "Analyze a new resume with AI feedback.", to: "/resume/resumemanager", icon: <FaFileAlt /> },
        { label: "Generate Interview", description: "Create a tailored interview session.", to: "/interview/interviewmanager", icon: <FaMicrophoneAlt /> },
        { label: "Resume History", description: "Review previous uploads and results.", to: "/resume/history", icon: <FaHistory /> },
        { label: "Interview History", description: "Revisit completed interview reports.", to: "/interviews/history", icon: <FaChartLine /> },
        { label: "Profile", description: "Keep your career target up to date.", to: "/profile", icon: <FaUserCircle /> }
    ];

    return (
        <section className={panelClass} aria-labelledby="quick-actions-heading">
            <div className="mb-5">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Shortcuts</p>
                <h2 id="quick-actions-heading" className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    Quick actions
                </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {actions.map((action) => (
                    <Link
                        key={action.to}
                        to={action.to}
                        className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/40"
                    >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:scale-105 dark:bg-blue-500/10 dark:text-blue-300" aria-hidden="true">
                            {action.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-slate-900 dark:text-white">{action.label}</span>
                            <span className="block text-sm leading-5 text-slate-500 dark:text-slate-400">{action.description}</span>
                        </span>
                        <FaArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500" aria-hidden="true" />
                    </Link>
                ))}
            </div>
        </section>
    );
}

function SkeletonBlock({ className }) {
    return <div className={`animate-pulse rounded-2xl bg-slate-200/80 dark:bg-white/10 ${className}`} />;
}

export function DashboardSkeleton() {
    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-6" aria-label="Loading dashboard">
            <SkeletonBlock className="h-56" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[0, 1, 2, 3].map((item) => (
                    <SkeletonBlock key={item} className="h-36" />
                ))}
            </div>
            <SkeletonBlock className="h-64" />
            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
                <SkeletonBlock className="h-80" />
                <SkeletonBlock className="h-80" />
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
                <SkeletonBlock className="h-72" />
                <SkeletonBlock className="h-72" />
            </div>
        </div>
    );
}

export function DashboardError({ message, onRetry }) {
    return (
        <div className="mx-auto grid min-h-[70vh] max-w-2xl place-items-center">
            <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-xl dark:border-red-500/20 dark:bg-[#1d2027]">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300">
                    <FaIdBadge aria-hidden="true" />
                </div>
                <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">Dashboard unavailable</h1>
                <p className="mt-3 text-slate-500 dark:text-slate-400">{message}</p>
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#1d2027]"
                >
                    <FaRedo aria-hidden="true" />
                    Retry
                </button>
            </div>
        </div>
    );
}
