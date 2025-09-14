import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import Button from "../components/Button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [showMessage, setShowMessage] = useState(false); // ✅ popup state
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);

        // ✅ Show popup
        setShowMessage(true);

        // Hide popup after 1.2s and redirect
        setTimeout(() => {
          setShowMessage(false);
          navigate("/");
        }, 1200);
      }
    });
  };

  return post ? (
    <div className="py-6 px-3 sm:px-6 lg:px-10 xl:px-20 relative">
      <Container>
        {/* Back Button */}

        <Link
          to="/all-posts"
          className="inline-flex items-center space-x-2 text-sm sm:text-base font-medium 
                       text-gray-900 hover:text-indigo-400 transition-colors duration-300"
        ></Link>

        <div className="mb-6">
          <Link
            to="/all-posts"
            className="inline-flex items-center space-x-2 text-sm sm:text-base font-medium 
                       text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <span>Back to All Posts</span>
          </Link>
        </div>

        {/* Image Section */}
        <div className="relative w-full mb-6">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full max-h-[70vh] object-contain rounded-2xl shadow-md"
          />

          {/* Edit/Delete buttons */}
          {isAuthor && (
            <div className="absolute top-4 right-4 flex flex-wrap gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500 hover:bg-green-400"
                  className="px-3 py-1 text-xs sm:text-sm"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500 hover:bg-red-400"
                onClick={deletePost}
                className="px-3 py-1 text-xs sm:text-sm"
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="mb-4 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            {post.title}
          </h1>
        </div>

        {/* Content */}
        <div className="prose max-w-none prose-sm sm:prose lg:prose-lg xl:prose-xl prose-p:leading-relaxed prose-img:rounded-lg">
          {parse(post.content)}
        </div>
      </Container>

      {/* ✅ Modern Delete Popup */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-white/80 backdrop-blur-md text-gray-900 px-6 py-3 rounded-xl shadow-xl 
                       text-sm sm:text-base font-semibold flex items-center gap-2
                       transform transition-all duration-500 ease-out animate-fade-in-up"
          >
            ✅ Post deleted successfully!
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
