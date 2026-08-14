import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../api/backendapi.jsx";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/auth/forgot-password",
                {
                    email
                }
            );

            setMessage(
                response.data.message ||
                "If an account with this email exists, a reset link has been sent."
            );

            setEmail("");

        }
        catch (error) {

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        }
        finally {

            setLoading(false);

        }

    }


    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-slate-100
            px-4
            dark:bg-[#111318]
        ">

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
                    duration: 0.5
                }}
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-xl
                    dark:border-slate-800
                    dark:bg-[#181b21]
                "
            >

                {/* Header */}

                <div className="mb-8 text-center">

                    <div className="
                        mx-auto
                        mb-5
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
                        <Mail size={30} />
                    </div>


                    <h1 className="
                        text-3xl
                        font-bold
                        dark:text-white
                    ">
                        Forgot Password?
                    </h1>


                    <p className="
                        mt-2
                        text-slate-500
                        dark:text-slate-400
                    ">
                        Enter your registered email and
                        we'll send you a password reset link.
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            dark:text-slate-300
                        ">
                            Email Address
                        </label>


                        <div className="relative">

                            <Mail
                                size={20}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />


                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="you@example.com"
                                required
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


                    {/* Success */}

                    {message && (

                        <p className="
                            text-center
                            text-sm
                            text-emerald-500
                        ">
                            {message}
                        </p>

                    )}


                    {/* Error */}

                    {error && (

                        <p className="
                            text-center
                            text-sm
                            text-red-500
                        ">
                            {error}
                        </p>

                    )}


                    <button
                        type="submit"
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

                        <Send size={20} />

                        {loading
                            ? "Sending..."
                            : "Send Reset Link"
                        }

                    </button>

                </form>


                {/* Back to Login */}

                <div className="
                    mt-6
                    text-center
                ">

                    <Link
                        to="/login"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-blue-600
                            hover:text-blue-700
                            dark:text-cyan-400
                        "
                    >

                        <ArrowLeft size={16} />

                        Back to Login

                    </Link>

                </div>

            </motion.div>

        </div>

    );

}

export default ForgotPassword;