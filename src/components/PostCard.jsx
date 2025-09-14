import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-gray-900 hover:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] cursor-pointer">
        <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden flex items-center justify-center">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="h-[240px] w-[250px] object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg md:text-xl font-semibold text-white truncate text-center">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
