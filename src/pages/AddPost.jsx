import React from "react";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";

function AddPost() {
  return (
    <div className="py-8 px-4 min-h-[calc(100vh-200px)]">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create New Post
            </h1>
            <p className="text-gray-600">Share your thoughts with the world</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <PostForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
