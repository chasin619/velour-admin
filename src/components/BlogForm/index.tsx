"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Tiptap from "../Tiptap";
import Image from "next/image";

const validationSchema = Yup.object().shape({
  blogTitle: Yup.string().required("Blog title is required"),
  description: Yup.string()
    .required("Description is required")
    .test("is-not-empty", "Description is required", (value) => {
      const textContent = value
        ? value.replace(/<\/?[^>]+(>|$)/g, "").trim()
        : "";
      return textContent.length > 0;
    }),
  profilePhoto: Yup.string().required("Profile photo is required"),
});

interface BlogFormData {
  blogTitle: string;
  description: string;
  profilePhoto: string;
}

const BlogForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      blogTitle: "",
      description: "",
      profilePhoto: "",
    },
  });

  const onSubmit = (data: BlogFormData) => {
    const formData = new FormData();
    formData.append("blogTitle", data.blogTitle);
    formData.append("description", data.description);
    formData.append("profilePhoto", data.profilePhoto[0]);

    console.log(formData);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="profilePhoto"
                  control={control}
                  render={({ field }) => (
                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
                    >
                      <input
                        type="file"
                        id="profilePhoto"
                        accept="image/png, image/jpg, image/jpeg"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                          }
                        }}
                      />
                      <div className="flex flex-col items-center justify-center">
                        {field.value ? (
                          <Image
                            src={URL.createObjectURL(field.value)}
                            alt="Profile Preview"
                            width={300}
                            height={300}
                            className="h-20 w-20 rounded-xl border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark"
                          />
                        ) : (
                          <span className="flex h-20 w-20 items-center justify-center rounded-xl border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark" />
                        )}
                        {!field.value && (
                          <p className="mt-2.5 text-body-sm font-medium">
                            <span className="text-primary">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                        )}
                        <p className="mt-1 text-body-xs">
                          SVG, PNG, JPG or GIF (max, 800 X 800px)
                        </p>
                      </div>
                    </div>
                  )}
                />
                {errors.profilePhoto && (
                  <p className="my-2 text-sm text-red-500">
                    {errors.profilePhoto.message}
                  </p>
                )}

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="blogTitle"
                  >
                    Blog Title
                  </label>
                  <input
                    {...register("blogTitle")}
                    className={`w-full rounded-[7px] border-[1.5px] border-stroke bg-white px-4.5 py-2.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
                      errors.blogTitle ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="blogTitle"
                    id="blogTitle"
                    placeholder="Type your blog title"
                  />
                  {errors.blogTitle && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.blogTitle.message}
                    </p>
                  )}
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="description"
                  >
                    Blog Description
                  </label>

                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Tiptap
                        content={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogForm;
