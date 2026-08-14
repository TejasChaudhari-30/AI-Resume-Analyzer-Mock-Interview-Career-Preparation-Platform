import { useState } from "react";
import { motion } from "framer-motion";
import {
    LockKeyhole,
    Eye,
    EyeOff,
    CheckCircle,
    ArrowLeft
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

import api from "../../api/backendapi.jsx";

function ResetPassword() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get token from:
    // /reset-password?token=xxxxxxxx
    const token = searchParams.get("token");

    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);


    function handleChange(e) {

        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });

    }


    async function handleSubmit(e) {

        e.preventDefault();

        setMessage("");
        setMessageType("");


        // Check token
        if (!token) {

            setMessage("Invalid or missing reset link.");
            setMessageType("error");

            return;
        }


        // Check passwords
        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {

            setMessage("Passwords do not match.");
            setMessageType("error");

            return;
        }


        // Password length
        if (passwordData.newPassword.length < 8) {

            setMessage(
                "Password must be at least 8 characters."
            );

            setMessageType("error");

            return;
        }


        setLoading(true);


        try {

            const response = await api.post(
                "/auth/reset-password",
                {
                    token: token,
                    newPassword:
                        passwordData.newPassword
                }
            );


            setMessage(
                response.data.message ||
                "Password reset successfully."
            );

            setMessageType("success");


            // Clear fields
            setPasswordData({
                newPassword: "",
                confirmPassword: ""
            });


            // Redirect to login after 2 seconds
            setTimeout(() => {

                navigate("/login");

            }, 2000);


        }
        catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Invalid or expired reset link."
            );

            setMessageType("error");

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

                <div className="
                    mb-8
                    text-center
                ">

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

                        <LockKeyhole size={30} />

                    </div>


                    <h1 className="
                        text-3xl
                        font-bold
                        dark:text-white
                    ">
                        Reset Password
                    </h1>


                    <p className="
                        mt-2
                        text-slate-500
                        dark:text-slate-400
                    ">
                        Create a new password for your account.
                    </p>

                </div>


                {/* No token */}

                {!token ? (

                    <div className="text-center">

                        <p className="
                            mb-6
                            text-sm
                            text-red-500
                        ">
                            This password reset link is
                            invalid or missing.
                        </p>


                        <Link
                            to="/forgot-password"
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

                            Request a new reset link

                        </Link>

                    </div>

                ) : (

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* New Password */}

                        <div>

                            <label className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                dark:text-slate-300
                            ">
                                New Password
                            </label>


                            <div className="relative">

                                <input
                                    type={
                                        showPassword.new
                                            ? "text"
                                            : "password"
                                    }

                                    name="newPassword"

                                    value={
                                        passwordData.newPassword
                                    }

                                    onChange={handleChange}

                                    placeholder="Enter new password"

                                    required

                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        py-3
                                        pl-4
                                        pr-12
                                        outline-none
                                        focus:border-blue-500
                                        dark:border-slate-700
                                        dark:bg-slate-900
                                        dark:text-white
                                    "
                                />


                                <button
                                    type="button"

                                    onClick={() =>
                                        setShowPassword(prev => ({
                                            ...prev,
                                            new: !prev.new
                                        }))
                                    }

                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                        hover:text-slate-600
                                        dark:hover:text-slate-200
                                    "
                                >

                                    {showPassword.new
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                    }

                                </button>

                            </div>

                        </div>


                        {/* Confirm Password */}

                        <div>

                            <label className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                dark:text-slate-300
                            ">
                                Confirm New Password
                            </label>


                            <div className="relative">

                                <input
                                    type={
                                        showPassword.confirm
                                            ? "text"
                                            : "password"
                                    }

                                    name="confirmPassword"

                                    value={
                                        passwordData.confirmPassword
                                    }

                                    onChange={handleChange}

                                    placeholder="Confirm new password"

                                    required

                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        py-3
                                        pl-4
                                        pr-12
                                        outline-none
                                        focus:border-blue-500
                                        dark:border-slate-700
                                        dark:bg-slate-900
                                        dark:text-white
                                    "
                                />


                                <button
                                    type="button"

                                    onClick={() =>
                                        setShowPassword(prev => ({
                                            ...prev,
                                            confirm:
                                                !prev.confirm
                                        }))
                                    }

                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                        hover:text-slate-600
                                        dark:hover:text-slate-200
                                    "
                                >

                                    {showPassword.confirm
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                    }

                                </button>

                            </div>

                        </div>


                        {/* Password requirement */}

                        <p className="
                            text-xs
                            text-slate-500
                            dark:text-slate-400
                        ">
                            Password must be at least 8 characters.
                        </p>


                        {/* Message */}

                        {message && (

                            <div className={`
                                flex
                                items-center
                                justify-center
                                gap-2
                                text-center
                                text-sm
                                ${
                                    messageType === "error"
                                        ? "text-red-500"
                                        : "text-emerald-500"
                                }
                            `}>

                                {messageType === "success" && (
                                    <CheckCircle size={17} />
                                )}

                                <span>
                                    {message}
                                </span>

                            </div>

                        )}


                        {/* Submit */}

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

                            <LockKeyhole size={20} />

                            {loading
                                ? "Resetting..."
                                : "Reset Password"
                            }

                        </button>


                        {/* Back to login */}

                        <div className="
                            pt-2
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

                    </form>

                )}

            </motion.div>

        </div>

    );

}

export default ResetPassword;