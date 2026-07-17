export const panelClass = "rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-300 dark:border-white/10 dark:bg-[#1d2027]/95 dark:shadow-none";

export function formatDate(value) {
    if (!value) {
        return "Not available";
    }

    return new Date(value).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}
