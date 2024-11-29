import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useHomeStore from "@/store/home";
import { uploadToS3 } from "@/utils/helpers";
import { BucketFolderName } from "@/enum/bucket";
import { BlogFormSchema } from "./schema";
import { BlogFormData } from ".";

const useBlogForm = () => {
  const { addBlog } = useHomeStore();
  const form = useForm<BlogFormData>({
    resolver: yupResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
      author: "",
    },
  });

  const onSubmit = async (payload: BlogFormData) => {
    try {
      const imageUrl = await uploadToS3(payload.image, BucketFolderName.Blog);
      const finalPayload = { ...payload, image: imageUrl };

      await addBlog(finalPayload);
      form.reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (form.formState.isDirty) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [form.formState.isDirty]);

  return {
    onSubmit,
    form,
  };
};

export default useBlogForm;
