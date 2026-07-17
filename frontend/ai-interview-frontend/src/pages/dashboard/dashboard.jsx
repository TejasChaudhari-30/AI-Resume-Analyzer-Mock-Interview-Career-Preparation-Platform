import { useEffect, useMemo, useState } from "react";
import api from "../../api/backendapi.jsx";

import WelcomeCard from "../../components/dashboard/WelcomeCard.jsx";
import StatsCard from "../../components/dashboard/StatsCard.jsx";
import LatestResumeCard from "../../components/dashboard/LatestResumeCard.jsx";
import ResumeReviewCard from "../../components/dashboard/ResumeReviewCard.jsx";
import RecentInterviewsCard from "../../components/dashboard/RecentInterviewsCard.jsx";
import {
    DashboardError,
    DashboardSkeleton,
    ProgressSection,
    QuickActions,
    ScoreTrendChart,
    DifficultyDistribution
} from "../../components/dashboard/DashboardExtras.jsx";

import { getStoredTheme, persistTheme } from "../../theme/theme.js";

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [theme, setTheme] = useState(getStoredTheme);

    useEffect(() => {
        persistTheme(theme);
    }, [theme]);

    useEffect(() => {
        fetchDashboard();
    }, []);

    async function fetchDashboard() {
        try {
            setLoading(true);
            setError("");
            const response = await api.get("/dashboard");
            setDashboardData(response.data);
        } catch (fetchError) {
            console.log(fetchError);
            setError(fetchError?.response?.data?.message || "We could not load your dashboard right now.");
        } finally {
            setLoading(false);
        }
    }

    const progress = useMemo(() => {
        if (!dashboardData) {
            return [];
        }

        const stats = dashboardData.stats || {};
        const resumeCompletion = Math.min(100, (stats.resumeCount || 0) > 0 ? 68 + Math.min((stats.reviewCount || 0) * 8, 24) : 0);
        const interviewProgress = Math.min(100, (stats.interviewCount || 0) * 20);
        const aiScore = Math.min(100, stats.averageScore || dashboardData.latestReview?.score || 0);
        const overall = Math.round((resumeCompletion + interviewProgress + aiScore) / 3);

        return [
            { label: "Resume Completion", value: resumeCompletion, detail: dashboardData.latestResume ? "Latest resume is ready for review" : "Upload a resume to begin" },
            { label: "Interview Progress", value: interviewProgress, detail: `${stats.interviewCount || 0} practice sessions completed` },
            { label: "Average AI Score", value: aiScore, detail: "Blended from available resume and interview scores" },
            { label: "Overall Career Progress", value: overall, detail: "Your current preparation momentum" }
        ];
    }, [dashboardData]);

    const hasActivity = Boolean(
        dashboardData?.latestResume ||
        dashboardData?.latestReview ||
        dashboardData?.recentInterviews?.length
    );

    if (loading) {
        return (
            <div className="dashboard-surface -m-8 min-h-screen bg-slate-50 p-4 text-slate-950 transition-colors duration-300 dark:bg-[#15171b] dark:text-slate-100 sm:p-6 lg:p-8">
                <DashboardSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-surface -m-8 min-h-screen bg-slate-50 p-4 text-slate-950 transition-colors duration-300 dark:bg-[#15171b] dark:text-slate-100 sm:p-6 lg:p-8">
                <DashboardError message={error} onRetry={fetchDashboard} />
            </div>
        );
    }

    return (
        <div className="dashboard-surface -m-8 min-h-screen bg-slate-50 p-4 text-slate-950 transition-colors duration-300 dark:bg-[#15171b] dark:text-slate-100 sm:p-6 lg:p-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <WelcomeCard
                    profile={dashboardData.profile}
                    theme={theme}
                    onToggleTheme={() => setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark")}
                />

                <StatsCard stats={dashboardData.stats} />

                <ProgressSection progress={progress} hasActivity={hasActivity} />

                <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
                    <ScoreTrendChart interviews={dashboardData.recentInterviews} />
                    <DifficultyDistribution interviews={dashboardData.recentInterviews} />
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                    <LatestResumeCard resume={dashboardData.latestResume} />
                    <ResumeReviewCard review={dashboardData.latestReview} resume={dashboardData.latestResume} />
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <RecentInterviewsCard interviews={dashboardData.recentInterviews || []} />
                    <QuickActions />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
