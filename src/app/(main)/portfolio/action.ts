import { useState } from "react";
import useHomeStore from "@/store/home";
import { uploadToS3 } from "@/utils/helpers";
import { BucketFolderName } from "@/enum/bucket";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PortfolioSchema } from "./schema";

const usePortfolio = () => {
  const { reviews } = useHomeStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const form = useForm({
    resolver: yupResolver(PortfolioSchema),
    defaultValues: {
      title: "",
      images: [],
    },
  });

  const onSubmit = async () => {
    try {
      // const image = await uploadToS3(payload, BucketFolderName.Review);
      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    const visuals: any[] = [];
    const images = form.getValues("images") || [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        visuals.push({
          preview: URL.createObjectURL(file),
          file: file,
        });

        if (visuals.length === files.length) {
          const updatedVisuals = [...images, ...visuals];
          form.setValue("images", updatedVisuals);
          console.log("Updated visuals:", updatedVisuals);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const closeModal = () => setIsVisible(false);

  const openModal = () => setIsVisible(true);

  return {
    onSubmit,
    closeModal,
    reviews,
    isVisible,
    form,
    openModal,
    handleFileChange,
  };
};

export default usePortfolio;
