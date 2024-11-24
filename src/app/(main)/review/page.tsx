import React from "react";
import { Button } from "@/components/Button";

const Review = () => {
  return (
    <div className="flex justify-between items-cener">
      <h2 className="text-[32px] font-bold leading-[30px] text-dark dark:text-white ">
        Review
      </h2>
      <Button
        label="Add Review"
        customClasses="bg-primary text-white rounded-md p-4 py-3"
      />
    </div>
  );
};

export default Review;
