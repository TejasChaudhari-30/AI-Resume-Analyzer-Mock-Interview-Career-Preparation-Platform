import React from "react";


function StatsCard({ stats }) {

    const cards = [
        {
            title: "Resumes Uploaded",
            value: stats.resumeCount,
            icon: "📄"
        },
        {
            title: "Resume Reviews",
            value: stats.reviewCount,
            icon: "📝"
        },
        {
            title: "Interviews Taken",
            value: stats.interviewCount,
            icon: "🎤"
        },
        {
            title: "Average Score",
            value: `${stats.averageScore}%`,
            icon: "⭐"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >

                    <div className="text-4xl">
                        {card.icon}
                    </div>

                    <h3 className="text-gray-500 mt-3">
                        {card.title}
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {card.value}
                    </p>

                </div>
            ))}

        </div>
    );
}

export default StatsCard;