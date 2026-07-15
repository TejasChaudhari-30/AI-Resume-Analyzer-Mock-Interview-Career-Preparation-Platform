import React from "react";


function WelcomeCard({ profile }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <h1 className="text-3xl font-bold">
                Welcome back, {profile.name} 👋
            </h1>

            <p className="text-gray-600 mt-2">
                Ready to continue your interview preparation?
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <h3 className="text-sm text-gray-500">
                        Email
                    </h3>

                    <p className="font-medium">
                        {profile.email}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm text-gray-500">
                        Target Role
                    </h3>

                    <p className="font-medium">
                        {profile.target_role}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default WelcomeCard;