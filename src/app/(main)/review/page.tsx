"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import { DeleteSvg } from "@/assets/svgs";
import useReview from "./action";

const Review = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const {
    reviews,
    closeModal,
    isVisible,
    openModal,
    handleSubmit,
    isDeleteModalVisible,
    closeDeleteModal,
    openDeleteModal,
    handleDelete,
  } = useReview();

  return (
    <>
      <div className="items-cener flex justify-between">
        <h2 className="text-[32px] font-bold leading-[30px] text-dark dark:text-white">
          Review
        </h2>
        <Button
          label="Add Review"
          customClasses="bg-primary text-white rounded-md p-4 py-3"
          onClick={openModal}
        />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="group relative rounded-[10px] bg-white p-2 shadow-1 dark:bg-gray-dark"
          >
            <Image
              src={review.image}
              alt="Review Image"
              width={200}
              height={120}
              loading="lazy"
              className="h-48 w-full rounded-lg object-cover lg:h-56"
            />
            <div
              className="absolute right-6 top-6 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-white p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-dark"
              onClick={() => openDeleteModal(review)}
            >
              <DeleteSvg className="h-full w-full text-red" />
            </div>
          </div>
        ))}
      </div>
      <Modal
        visible={isVisible}
        title="Add Review"
        onRequestClose={closeModal}
        ok={{ text: "Submit" }}
        onConfirm={() => handleSubmit(selectedImage)}
      >
        <div
          id="FileUpload"
          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
        >
          <input
            type="file"
            id="image"
            accept="image/*"
            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedImage(file);
              }
            }}
          />
          <div className="flex flex-col items-center justify-center">
            {selectedImage && (
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Profile Preview"
                width={300}
                height={300}
                className="h-20 w-20 rounded-xl border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark"
              />
            )}
            {!selectedImage && (
              <span className="flex h-20 w-20 items-center justify-center rounded-xl border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark" />
            )}
            <p className="mt-2.5 text-body-sm font-medium">
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p className="mt-1 text-body-xs">
              SVG, PNG, JPG or GIF (max, 800 X 800px)
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        title="Delete Review"
        visible={isDeleteModalVisible}
        onRequestClose={closeDeleteModal}
        onConfirm={handleDelete}
      >
        Are you sure you want to delete this review?
      </Modal>
    </>
  );
};

export default Review;
