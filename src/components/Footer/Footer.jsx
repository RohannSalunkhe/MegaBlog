import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-900 text-gray-400 pt-10 pb-6 px-4 sm:px-6 lg:px-16 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col h-full">
            <Logo className="mb-4 w-32" />
            <p className="text-gray-400 text-sm leading-relaxed mb-4 sm:mb-6">
              Building amazing digital experiences with modern web technologies.
            </p>
            <p className="text-gray-500 text-xs mt-auto">
              &copy; 2023 DevUI. All Rights Reserved.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  to="/"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  to="/"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  to="/"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  to="/"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  to="/"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  to="/"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Legals
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  to="/"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  to="/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  to="/"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-xs sm:text-sm">
          “Every story deserves a reader.”
        </div>
      </div>
    </footer>
  );
}

export default Footer;
