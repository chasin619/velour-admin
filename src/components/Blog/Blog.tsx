"use client";

import React, { useEffect } from "react";
import BlogCard from "../BlogCard/BlogCard";
import { Button } from "../Button";
import useBlogStore from "@/store/blog";

const Blog: React.FC = () => {
  const { initilizeBlogStore, blogs } = useBlogStore();

  useEffect(() => {
    initilizeBlogStore();
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
          link="/blog/addBlog"
        />
      </div>
      <BlogCard blogs={blogs} />
    </>
  );
};

export default Blog;
