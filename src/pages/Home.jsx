import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

import Container from "../components/container/Container";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents.slice(0, 2)); // show only 2 demo posts
      }
      setLoading(false);
    });
  }, []);

  // If user not logged in
  if (!userData) {
    return (
      <div className="w-full py-16 mt-20 mx-4 xl:mb-35 ">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-600 mb-6">
              Welcome to <span className="text-yellow-400">Blogify</span>
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Discover inspiring stories, powerful ideas, and meaningful voices.
              Join our community to share your own experiences and explore the
              best content written by passionate bloggers.
            </p>
            <p className="text-gray-500 text-sm italic">
              *Login to unlock full access to posts and start your journey.*
            </p>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    // ✅ Loading state (modern skeleton shimmer)
    if (loading) {
      return (
        <div className="w-full py-12 px-4">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="p-6 bg-gray-800 rounded-2xl shadow-md animate-pulse"
                >
                  <div className="h-48 bg-gray-700 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      );
    }
    return (
      <div className="w-full py-16 mt-6 mx-4">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">
              No Posts Available
            </h1>
            <p className="text-gray-400">
              Be the first to write something amazing! Your thoughts could
              inspire thousands.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-4">
      <Container>
        {/* Intro Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-600 mb-4">
            The Best Blogging Experience
          </h2>
          <p className="text-gray-400 text-lg">
            Our platform empowers you to create, explore, and connect with
            stories that truly matter. From personal reflections to professional
            insights, this is your space to share and grow.
          </p>
        </div>

        {/* Demo Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
