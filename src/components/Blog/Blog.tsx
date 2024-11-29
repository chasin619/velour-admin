"use client";

import React, { useEffect } from "react";
import BlogCard from "../BlogCard/BlogCard";
import { Button } from "../Button";
import useHomeStore from "@/store/home";

const Blog: React.FC = () => {
  const { initilizeHomeStore, blogs } = useHomeStore();

  useEffect(() => {
    initilizeHomeStore();
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
