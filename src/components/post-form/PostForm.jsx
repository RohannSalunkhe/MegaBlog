import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../index.js";
import { Input } from "../index.js";
import { RTE } from "../index.js";
import { Select } from "../index.js";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const submit = async (data) => {
    setLoading(true); // Start loading
    try {
      let file;
      if (data.image && data.image[0]) {
        file = await appwriteService.uploadFile(data.image[0]);
      }

      if (post) {
        const dbPost = await appwriteService.updatePost(post.$id || post.slug, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });
        if (dbPost && dbPost.$id) navigate(`/post/${dbPost.$id}`);
      } else {
        if (file) data.featuredImage = file.$id;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost && dbPost.$id) navigate(`/post/${dbPost.$id}`);
      }
    } catch (err) {
      console.error("PostForm error:", err);
      alert("An error occurred while submitting the post.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="h-full flex flex-col w-full max-w-[1600px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      <form onSubmit={handleSubmit(submit)} className="h-full flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 p-2 sm:p-4 min-h-0">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
            <div className="bg-gray-50 rounded-lg p-4 flex-shrink-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
                Post Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label="Title"
                  placeholder="Enter your post title..."
                  className="bg-white"
                  {...register("title", { required: true })}
                />
                <Input
                  label="Slug"
                  placeholder="post-url-slug"
                  className="bg-white"
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex-1 min-h-0 flex flex-col">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
                Content
              </h3>
              <div className="flex-1 min-h-0">
                <RTE
                  label=""
                  name="content"
                  control={control}
                  defaultValue={getValues("content")}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-4 min-h-0">
            <div className="bg-gray-50 rounded-lg p-4 flex-shrink-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
                Featured Image
              </h3>
              <Input
                label="Upload Image"
                type="file"
                className="bg-white text-xs sm:text-sm"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
              />
              {post && (
                <div className="mt-3">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex-shrink-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
                Publishing
              </h3>
              <div className="space-y-3">
                <Select
                  options={["active", "inactive"]}
                  label="Status"
                  className="bg-white"
                  {...register("status", { required: true })}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 sm:py-3 text-sm sm:text-base rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                    post
                      ? "bg-green-500 hover:bg-green-400 text-white"
                      : "bg-blue-500 hover:bg-blue-400 text-white"
                  }`}
                >
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  )}
                  {post
                    ? loading
                      ? "Updating..."
                      : "Update Post"
                    : loading
                    ? "Publishing..."
                    : "Publish Post"}
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 flex-shrink-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                Quick Tips
              </h3>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li>• Use engaging titles</li>
                <li>• Add quality images</li>
                <li>• Write valuable content</li>
                <li>• Preview before publishing</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
