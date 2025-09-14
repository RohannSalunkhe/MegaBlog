import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { Button } from "../components/index.js";
import Input from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[65vh] px-4 sm:px-6 lg:px-8">
      <div className="mt-5 mb-5 w-full max-w-md bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Sign Up</h2>
          <p className="text-gray-400 text-sm">
            Create your account to get started
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-8 mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit(create)} className="space-y-5">
            <Input
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            <Input
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mt-6"
            >
              <p className="text-black">Create Account</p>
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-yellow-400 hover:text-yellow-500 font-medium transition-colors duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
