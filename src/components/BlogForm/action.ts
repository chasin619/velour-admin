import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useBlogStore from "@/store/blog";
import useConfigStore from "@/store/config";
import { uploadToS3 } from "@/utils/helpers";
import { BucketFolderName } from "@/enum/bucket";
import { BlogFormSchema } from "./schema";
import { BlogFormData } from ".";

const useBlogForm = () => {
  const { addBlog, editBlog } = useBlogStore();
  const { setLoading } = useConfigStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const form = useForm<BlogFormData>({
    resolver: yupResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      meta_description: "",
      content: "",
      image: "",
      author: "",
    },
  });

  useEffect(() => {
    if (searchParams.get("title")) {
      setIsEdit(true);
      const queryData = {
        title: searchParams.get("title") || "",
        content: searchParams.get("content") || "",
        image: searchParams.get("image") || "",
        author: searchParams.get("author") || "",
        meta_description: searchParams.get("meta_description") || "",
        id: searchParams.get("_id") || "",
      };

      form.reset(queryData);
    }
  }, [searchParams]);

  const onSubmit = async (payload: BlogFormData) => {
    try {
      setLoading(true);
      let imageUrl: any = "";
      if (
        typeof payload.image === "string" &&
        payload.image
          .trim()
          .startsWith("https://velour-web.s3.amazonaws.com/blog")
      ) {
        imageUrl = payload.image.trim();
      } else {
        imageUrl = await uploadToS3(payload.image, BucketFolderName.Blog);
      }
      const finalPayload = { ...payload, image: imageUrl };

      isEdit ? editBlog(finalPayload) : addBlog(finalPayload);

      router.push("/blog");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setIsEdit(false);
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
    isEdit,
  };
};

export default useBlogForm;
