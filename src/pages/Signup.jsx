import React from "react";
import { Signup as SignupComponent } from "../components/index.js";

function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <SignupComponent />
    </div>
  );
}

export default Signup;
