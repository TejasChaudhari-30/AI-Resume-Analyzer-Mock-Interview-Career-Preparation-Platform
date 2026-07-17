import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Briefcase,
    Code2,
    Save
} from "lucide-react";

import api from "../../api/backendapi.jsx";


function Profile() {


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        target_role: "",
        skills: ""
    });


    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);



    useEffect(() => {

        fetchProfile();

    }, []);



    async function fetchProfile() {

        try {

            const response = await api.get("/users/profile");


            setFormData({

                name: response.data.profile.name || "",

                email: response.data.profile.email || "",

                target_role: response.data.profile.target_role || "",

                skills:
                    response.data.profile.skills?.join(", ") || ""

            });


        }
        catch (error) {

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

        setLoading(true);
        setMessage("");


        try {


            const payload = {

                ...formData,

                skills:
                    formData.skills
                        .split(",")
                        .map(skill => skill.trim())
                        .filter(Boolean)

            };


            await api.put(
                "/users/profile",
                payload
            );


            setMessage(
                "Profile updated successfully"
            );


        }
        catch (error) {

            setMessage(
                "Failed to update profile"
            );

        }
        finally {

            setLoading(false);

        }

    }




    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 30
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.6
            }}

            className="
max-w-3xl
mx-auto
"

        >


            <div className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-xl

dark:border-slate-800
dark:bg-[#181b21]

">


                {/* Header */}

                <div className="
flex
items-center
gap-5
mb-10
">


                    <div className="
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-gradient-to-r
from-blue-600
to-cyan-500
text-white
shadow-lg
">

                        <User size={32} />

                    </div>


                    <div>

                        <h1 className="
text-3xl
font-bold
dark:text-white
">

                            My Profile

                        </h1>


                        <p className="
text-slate-500
dark:text-slate-400
">

                            Manage your career information

                        </p>


                    </div>


                </div>





                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >



                    {/* Name */}

                    <div>

                        <label className="
mb-2
block
text-sm
font-medium
dark:text-slate-300
">

                            Name

                        </label>


                        <div className="relative">

                            <User
                                className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
"
                                size={20}
                            />


                            <input

                                name="name"

                                value={formData.name}

                                onChange={handleChange}

                                className="
w-full
rounded-2xl
border
border-slate-200
bg-slate-50
py-3
pl-12
pr-4
outline-none
focus:border-blue-500

dark:border-slate-700
dark:bg-slate-900
dark:text-white

"

                            />

                        </div>

                    </div>





                    {/* Email */}

                    <div>

                        <label className="
mb-2
block
text-sm
font-medium
dark:text-slate-300
">

                            Email

                        </label>


                        <div className="relative">

                            <Mail
                                className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
"
                                size={20}
                            />


                            <input

                                value={formData.email}

                                disabled

                                className="
w-full
rounded-2xl
border
border-slate-200
bg-slate-100
py-3
pl-12
pr-4
cursor-not-allowed

dark:border-slate-700
dark:bg-slate-800
dark:text-slate-400

"

                            />

                        </div>

                    </div>





                    {/* Role */}

                    <div>

                        <label className="
mb-2
block
text-sm
font-medium
dark:text-slate-300
">

                            Target Role

                        </label>


                        <div className="relative">


                            <Briefcase
                                className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
"
                                size={20}
                            />


                            <input

                                name="target_role"

                                value={formData.target_role}

                                onChange={handleChange}


                                className="
w-full
rounded-2xl
border
border-slate-200
bg-slate-50
py-3
pl-12
pr-4

dark:border-slate-700
dark:bg-slate-900
dark:text-white

"

                            />


                        </div>

                    </div>





                    {/* Skills */}

                    <div>

                        <label className="
mb-2
block
text-sm
font-medium
dark:text-slate-300
">

                            Skills

                        </label>


                        <div className="relative">

                            <Code2
                                className="
absolute
left-4
top-5
text-slate-400
"
                                size={20}
                            />


                            <textarea

                                rows="4"

                                name="skills"

                                value={formData.skills}

                                onChange={handleChange}


                                placeholder="React, Node.js, PostgreSQL"


                                className="
w-full
rounded-2xl
border
border-slate-200
bg-slate-50
py-3
pl-12
pr-4

dark:border-slate-700
dark:bg-slate-900
dark:text-white

"

                            />


                        </div>

                    </div>




                    {
                        message && (

                            <p className="
text-sm
text-center
text-emerald-500
">

                                {message}

                            </p>

                        )
                    }





                    <button

                        disabled={loading}

                        className="
flex
w-full
items-center
justify-center
gap-2

rounded-2xl

bg-gradient-to-r
from-blue-600
to-cyan-500

py-3

font-semibold
text-white

shadow-lg

transition

hover:-translate-y-1

disabled:opacity-60

"

                    >

                        <Save size={20} />

                        {

                            loading
                                ?
                                "Saving..."
                                :
                                "Save Changes"

                        }


                    </button>




                </form>


            </div>


        </motion.div>


    );

}


export default Profile;