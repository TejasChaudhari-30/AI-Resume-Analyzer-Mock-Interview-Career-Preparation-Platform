import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import api from "../../api/backendapi.jsx";
import "../../App.css"
import { Link } from "react-router-dom";
function Register(){
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

const onSubmit = async (data) => {

  const payload = {
    ...data,
    skills: data.skills
      .split(",")
      .map(skill => skill.trim())
      .filter(Boolean)
  };

  console.log(payload);
  try {
    const response = await api.post("/auth/register", payload);

    console.log(response.data);
  } catch (error) {
    console.log(error.response?.data);
  }
};
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create Account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email",{
                required:"Email is required"
            })}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500">
    {errors.email?.message}
</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password",{
                required:"password can't be empty"
            })}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
           <p className="text-red-500">
    {errors.password?.message}
</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Target Role</label>
          <input
            type="text"
            placeholder="e.g. Full Stack Developer"
            {...register("target_role")}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Skills (comma separated)
          </label>
          <input
            type="text"
            placeholder="React, Node.js, PostgreSQL"
            {...register("skills")}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>

      </form>

      <p className="text-center mt-5">
        Already have an account?{" "}
       <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
      </p>
    </div>
  </div>
);

  
}

export default Register;