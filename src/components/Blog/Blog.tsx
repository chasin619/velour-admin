"use client";

import React, { useEffect } from "react";
import useBlogStore from "@/store/blog";
import BlogCard from "../BlogCard/BlogCard";
import { Button } from "../Button";

const Blog: React.FC = () => {
  const { getAllBlogs, blogs } = useBlogStore();

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-[32px] font-bold leading-[30px] text-dark dark:text-white ">
          Blog
        </h2>
        <Button
          label="Add Blog"
          customClasses="bg-primary text-white rounded-md p-4 py-3"
          link="/dashboard/blog/addBlog"
        />
      </div>
      <BlogCard blogs={blogs} />
    </>
  );
};

export default Blog;
