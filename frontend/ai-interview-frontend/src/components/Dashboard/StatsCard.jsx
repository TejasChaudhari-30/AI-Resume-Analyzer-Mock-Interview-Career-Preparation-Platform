import { FaChartPie, FaFileAlt, FaMicrophoneAlt, FaRegCheckCircle } from "react-icons/fa";

function StatsCard({ stats = {} }) {
    const cards = [
        {
            title: "Uploaded Resumes",
            value: stats.resumeCount || 0,
            description: "Files analyzed by the platform",
            icon: <FaFileAlt />,
            accent: "from-blue-500 to-sky-400"
        },
        {
            title: "Resume Reviews",
            value: stats.reviewCount || 0,
            description: "AI review reports generated",
            icon: <FaRegCheckCircle />,
            accent: "from-emerald-500 to-teal-400"
        },
        {
            title: "Interview Sessions",
            value: stats.interviewCount || 0,
            description: "Practice rounds completed",
            icon: <FaMicrophoneAlt />,
            accent: "from-amber-500 to-orange-400"
        },
        {
            title: "Average Interview Score",
            value: `${stats.averageScore || 0}%`,
            description: "Across completed sessions",
            icon: <FaChartPie />,
            accent: "from-indigo-500 to-blue-500"
        }
    ];

    return (
        <section aria-label="Dashboard quick stats" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <article
                    key={card.title}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-[#1d2027] dark:shadow-none"
                >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent}`} />
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</p>
                            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{card.value}</p>
                        </div>
                        <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${card.accent} text-lg text-white shadow-lg shadow-slate-200/70 transition group-hover:scale-105 dark:shadow-none`} aria-hidden="true">
                            {card.icon}
                        </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">{card.description}</p>
                </article>
            ))}
        </section>
    );
}

export default StatsCard;
