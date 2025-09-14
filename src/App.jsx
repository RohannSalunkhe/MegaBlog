import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "../store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          console.log("User is logged in");
          dispatch(login({ userData }));
        } else {
          console.log("No user data found");
          dispatch(logout());
        }
      } catch (error) {
        // This catches the 401 error and other authentication issues
        console.log("Authentication check failed:", error.message);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []); // Empty dependency array - runs only once on mount

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
