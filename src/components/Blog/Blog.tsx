"use client";

import React from "react";
import BlogCard from "../BlogCard/BlogCard";
import { Button } from "../Button";

const Blog: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-[32px] font-bold leading-[30px] text-dark dark:text-white ">
          Blog
        </h2>
        <Button label="Add Blog" customClasses="bg-primary text-white rounded-md p-4 py-3" link="/blog/addBlog" />
      </div>
      <BlogCard />
    </>
  );
};

export default Blog;
