import React from "react";
import { Button } from "@/components/Button";

const Portfolio = () => {
  return (
    <div className="items-cener flex justify-between">
      <h2 className="text-[32px] font-bold leading-[30px] text-dark dark:text-white ">
        Portfolio
      </h2>
      <Button
        label="Add Portfolio"
        customClasses="bg-primary text-white rounded-md p-4 py-3"
      />
    </div>
  );
};

export default Portfolio;
