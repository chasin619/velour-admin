import React from "react";
import { Button } from "@/components/Button";
import Image from "next/image";

const Review = () => {
  return (
    <>
      <div className="items-cener flex justify-between">
        <h2 className="text-[32px] font-bold leading-[30px] text-dark dark:text-white ">
          Review
        </h2>
        <Button
          label="Add Review"
          customClasses="bg-primary text-white rounded-md p-4 py-3"
        />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[10px] bg-white p-2 shadow-1 dark:bg-gray-dark"
          >
            <Image
              src="/images/dummy-card.webp"
              alt="Dummy Card"
              layout="responsive"
              width={200}
              height={120}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Review;
