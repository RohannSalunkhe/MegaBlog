import React, { useState } from "react";
import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const handleMobileNavClick = (slug) => {
    navigate(slug);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative bg-gray-900 text-gray-300 shadow-md rounded-xl mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12 mt-2 sm:mt-4 md:mt-6 py-3 sm:py-4 md:py-5">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0 z-20 relative">
            <Link
              to="/"
              className="hover:opacity-90 transition-opacity duration-300"
            >
              {/* Consistent logo size for all screens */}
              <Logo
                width="140px"
                className="sm:w-80 md:w-90 lg:w-100 xl:w-110"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex ml-auto items-center space-x-3 lg:space-x-5 xl:space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-300 font-medium transition-all duration-300 hover:text-white hover:bg-white/10 rounded-lg backdrop-blur-sm border border-transparent hover:border-white/20 shadow-sm hover:shadow-gray-500/20"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li className="ml-3 lg:ml-5">
                <div className="bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 rounded-full transform hover:scale-105 shadow-lg hover:shadow-yellow-200/50">
                  <LogoutBtn />
                </div>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-20 relative p-2 text-gray-300 hover:text-white transition-colors duration-300 hover:bg-white/10 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className={`flex w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300  ${
                mobileMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Mobile Navigation Overlay */}
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Mobile Menu */}
              <div className="md:hidden absolute top-full left-2 right-2 mt-2 bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 z-20 animate-in slide-in-from-top-2 duration-300">
                <div className="p-4 sm:p-5 space-y-3">
                  {navItems.map(
                    (item) =>
                      item.active && (
                        <button
                          key={item.name}
                          onClick={() => handleMobileNavClick(item.slug)}
                          className="block w-full text-left px-4 py-3 text-base sm:text-lg text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 border border-transparent hover:border-white/20"
                        >
                          {item.name}
                        </button>
                      )
                  )}
                  {authStatus && (
                    <div className="pt-4 border-t border-gray-700/50 mt-4">
                      <div className=" ">
                        <LogoutBtn />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
