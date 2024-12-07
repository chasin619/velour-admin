import React from "react";
import Image from "next/image";
import { formatDate } from "@/utils/helpers";
import { DeleteSvg, EditSvg } from "@/assets/svgs";

interface BlogCardProps {
  blogs: any[];
}

const BlogCard: React.FC<BlogCardProps> = ({ blogs }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      {blogs?.map((blog, index) => (
        <div
          key={index}
          className="group relative rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            loading="lazy"
            width={200}
            height={120}
            style={{ objectPosition: "top" }}
            className="!h-[250px] w-full rounded-lg object-cover"
          />
          <div className="absolute right-6 top-6 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-white p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-dark">
            <DeleteSvg className="h-full w-full text-red" />
          </div>
          <div className="absolute right-17 top-6 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-white p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-dark">
            <EditSvg className="h-full w-full text-dark-4 dark:text-white" />
          </div>
          <div className="m-2 flex flex-col items-start justify-between gap-4">
            <h4 className="mb-1.5 mt-4 text-heading-6 font-bold text-dark dark:text-white">
              {blog.title}
            </h4>
            <span
              className="text-base font-medium"
              dangerouslySetInnerHTML={{
                __html: blog.content.substring(0, 100) + "...",
              }}
            />
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
