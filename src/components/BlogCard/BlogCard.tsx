import React from "react";
import Image from "next/image";

const BlogCard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mt-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark"
        >
          <Image
            src="/images/dummy-card.webp"
            alt="Dummy Card"
            layout="responsive"
            width={200}
            height={120}
            className="rounded-lg"
          />
          <div className="m-2 flex flex-col items-start justify-between gap-4">
            <h4 className="mb-1.5 mt-4 text-heading-6 font-bold text-dark dark:text-white">
              Card Title {index + 1}
            </h4>
            <span className="text-base font-medium">
              Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
              fringilla goes scelerisque Interdum et.
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
