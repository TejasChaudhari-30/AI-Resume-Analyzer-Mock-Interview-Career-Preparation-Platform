import { useEffect, useState } from "react";
import api from "../../api/backendapi.jsx";

import WelcomeCard from "../../components/dashboard/WelcomeCard.jsx";
import StatsCard from "../../components/dashboard/StatsCard.jsx";
import LatestResumeCard from "../../components/dashboard/LatestResumeCard.jsx";
import ResumeReviewCard from "../../components/dashboard/ResumeReviewCard.jsx";
import RecentInterviewsCard from "../../components/dashboard/RecentInterviewsCard.jsx";

function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {

        fetchDashboard();

    }, []);

    async function fetchDashboard() {

        try {

            const response = await api.get("/dashboard");
            setDashboardData(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    if (!dashboardData) {
   console.log("empty")
        return <h1>Loading...</h1>;

    }

    return (

        <div className="p-8">

            <WelcomeCard profile={dashboardData.profile} />

            <StatsCard
                stats={dashboardData.stats}
            />

            <LatestResumeCard
                resume={dashboardData.latestResume}
            />

            <ResumeReviewCard
                review={dashboardData.latestReview}
            />

            <RecentInterviewsCard
                interviews={dashboardData.recentInterviews}
            />

        </div>

    );

}

export default Dashboard;