import { FaMoon, FaSun } from "react-icons/fa";

function WelcomeCard({ profile, theme, onToggleTheme }) {
    const today = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric"
    });
    const name = profile?.name || "there";

    return (
        <header className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#1d2027] dark:shadow-none">
            <div className="relative p-6 sm:p-8">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400" />
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-300">{today}</p>
                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                            Welcome back, {name}
                        </h1>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                            Keep the momentum going. A few focused improvements today can turn into a noticeably sharper interview performance.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onToggleTheme}
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                        className="inline-flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-blue-400/40 dark:hover:bg-blue-500/10 dark:focus:ring-offset-[#1d2027]"
                    >
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-[#2a2f3a] dark:text-blue-300">
                            {theme === "dark" ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
                        </span>
                        {theme === "dark" ? "Light mode" : "Dark mode"}
                    </button>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Email</p>
                        <p className="mt-2 truncate font-medium text-slate-900 dark:text-slate-100">{profile?.email || "Not added"}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Target role</p>
                        <p className="mt-2 truncate font-medium text-slate-900 dark:text-slate-100">{profile?.target_role || "Add your target role"}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default WelcomeCard;
