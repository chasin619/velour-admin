"use client";

import React from "react";
import Image from "next/image";
import { Controller } from "react-hook-form";

import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import { Input } from "@/components/Input";
import { Slider } from "@/components/slider";
import usePortfolio from "./action";
import { DeleteSvg } from "@/assets/svgs";

const Portfolio = () => {
  const {
    closeModal,
    isVisible,
    openModal,
    onSubmit,
    form,
    handleFileChange,
    portfolios,
    isDeleteModalVisible,
    handleDelete,
    closeDeleteModal,
    openDeleteModal,
  } = usePortfolio();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-[32px] font-bold leading-[30px] text-dark dark:text-white">
          Portfolio
        </h2>
        <Button
          label="Add Portfolio"
          customClasses="bg-primary text-white rounded-md p-4 py-3"
          onClick={openModal}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          visible={isVisible}
          title="Add Portfolio"
          onRequestClose={closeModal}
          ok={{ text: "Submit", type: "submit" }}
        >
          <Input
            register={register("title")}
            label="Portfolio Title"
            name="title"
            placeholder="Type your Portfolio Title here"
            error={errors.title}
          />

          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <>
                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
                >
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    multiple
                    onChange={(e) => handleFileChange(e)}
                  />
                  <div className="flex flex-col items-center justify-center">
                    {!field.value || field.value.length === 0 ? (
                      <p className="mt-2.5 text-body-sm font-medium">
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                    ) : (
                      <p className="mt-2.5 text-body-sm font-medium">
                        {field.value.length} images selected
                      </p>
                    )}
                    <p className="mt-1 text-body-xs">
                      SVG, PNG, JPG or GIF (max, 800 X 800px)
                    </p>
                  </div>
                </div>
                {errors.images && (
                  <p className="my-2 text-sm text-red-500">
                    {errors.images.message}
                  </p>
                )}
                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                    Uploaded Images
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {field.value && field.value.length > 0 ? (
                      field.value.map((file, index) => {
                        return (
                          <div key={index} className="h-20 w-20">
                            <img
                              src={file.preview}
                              alt={`Preview ${index + 1}`}
                              className="h-full w-full rounded-lg object-cover"
                            />
                          </div>
                        );
                      })
                    ) : (
                      <p>No images uploaded yet</p>
                    )}
                  </div>
                </div>
              </>
            )}
          />
        </Modal>
      </form>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {portfolios.map((item, index) => (
          <div
            key={index}
            className="group relative rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark"
          >
            <Slider
              data={item.images}
              slidesPerView={1}
              autoplay={false}
              renderItem={(image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt={`Portfolio Image ${idx}`}
                  loading="lazy"
                  width={200}
                  height={120}
                  className="h-48 w-full rounded-lg object-cover lg:h-56"
                />
              )}
            />
            <div
              className="absolute right-6 top-6 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-white p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-dark"
              onClick={() => openDeleteModal(item)}
            >
              <DeleteSvg className="h-full w-full text-red" />
            </div>
            <h4 className="mb-1.5 mt-4 text-heading-6 font-bold text-dark dark:text-white">
              {item.title}
            </h4>
          </div>
        ))}
      </div>
      <Modal
        title="Delete Portfolio"
        visible={isDeleteModalVisible}
        onRequestClose={closeDeleteModal}
        onConfirm={handleDelete}
      >
        Are you sure you want to delete this portfolio?
      </Modal>
    </>
  );
};

export default Portfolio;
