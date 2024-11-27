import React from "react";
import Image from "next/image";
import { formatDate } from "@/utils/helpers";

interface BlogCardProps {
  blogs: any[];
}

const BlogCard: React.FC<BlogCardProps> = ({ blogs }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      {blogs?.map((blog, index) => (
        <div
          key={index}
          className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark"
        >
          <Image
            src={"/images/dummy-card.webp"}
            alt={blog.title}
            layout="responsive"
            width={200}
            height={120}
            className="rounded-lg"
          />
          <div className="m-2 flex flex-col items-start justify-between gap-4">
            <h4 className="mb-1.5 mt-4 text-heading-6 font-bold text-dark dark:text-white">
              {blog.title}
            </h4>
            <span className="text-base font-medium">
              {blog.content.substring(0, 100)}...
            </span>
            <div className="mt-8 flex w-full items-center justify-between">
              <p className="text-base font-medium">By {blog.author}</p>
              <p className="text-base font-medium">
                {formatDate(blog.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
