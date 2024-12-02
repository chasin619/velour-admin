import { useEffect, useState } from "react";
import useHomeStore from "@/store/home";
import { uploadToS3 } from "@/utils/helpers";
import { BucketFolderName } from "@/enum/bucket";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PortfolioSchema } from "./schema";

const usePortfolio = () => {
  const { portfolios, addPortfolio, getPortfolios, setLoading } =
    useHomeStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const form = useForm({
    resolver: yupResolver(PortfolioSchema),
    defaultValues: {
      title: "",
      images: [],
    },
  });

  useEffect(() => {
    getPortfolios();
  }, []);

  const onSubmit = async (payload: any) => {
    try {
      setLoading(true);
      const images = await uploadToS3(
        payload.images,
        BucketFolderName.Portfolio,
      );
      await addPortfolio({ title: payload.title, images });
      form.reset();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent) => {
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
    portfolios,
    isVisible,
    form,
    openModal,
    handleFileChange,
  };
};

export default usePortfolio;
