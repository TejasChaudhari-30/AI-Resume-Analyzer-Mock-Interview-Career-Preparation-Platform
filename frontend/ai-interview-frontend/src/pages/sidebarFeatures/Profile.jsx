import { useEffect, useState } from "react";
import api from "../../api/backendapi.jsx";

function Profile() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        target_role: "",
        skills: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {

        try {

            const response = await api.get("/users/profile");
            console.log(response.data.profile.name);

            setFormData({
                name: response.data.profile.name,
                email: response.data.profile.email,
                target_role: response.data.profile.target_role,
                skills: response.data.profile.skills.join(", ")
            });

        } catch (error) {
            console.log(error);
        }

    }

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const payload = {
                ...formData,
                skills: formData.skills
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(Boolean)
            };

            await api.put("/users/profile", payload);

            alert("Profile Updated Successfully");

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

            <h1 className="text-3xl font-bold mb-8">
                My Profile
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <div>

                    <label className="block mb-2 font-medium">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Target Role
                    </label>

                    <input
                        type="text"
                        name="target_role"
                        value={formData.target_role}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Skills
                    </label>

                    <textarea
                        rows="4"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="React, Node.js, PostgreSQL"
                    />

                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Save Changes
                </button>

            </form>

        </div>

    );

}

export default Profile;