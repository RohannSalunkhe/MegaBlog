import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData); // logged-in user

  useEffect(() => {
    if (!userData) return; // if not logged in, do nothing

    setLoading(true);

    appwriteService.getPosts().then((res) => {
      if (res && res.documents) {
        // Filter posts by current user's ID
        const userPosts = res.documents.filter(
          (post) => post.userId === userData.$id
        );
        setPosts(userPosts);
      }
      setLoading(false);
    });
  }, [userData]);

  // Loading skeleton
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

  // No posts message
  if (!posts.length) {
    return (
      <div className="w-full py-16 mx-4">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-600 mb-4">
              You haven't created any posts yet
            </h1>
            <p className="text-gray-400">
              Start sharing your thoughts and ideas by adding your first post.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-4">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
