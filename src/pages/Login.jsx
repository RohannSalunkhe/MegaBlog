import React from "react";
import { Login as LoginComponent } from "../components/Login";

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <LoginComponent />
    </div>
  );
}

export default Login;
