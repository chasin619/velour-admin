import { useEffect, useState } from "react";
import useHomeStore from "@/store/home";
import { uploadToS3 } from "@/utils/helpers";
import { BucketFolderName } from "@/enum/bucket";

const useReview = () => {
  const { reviews, addReview, getReviews } = useHomeStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    getReviews();
  }, []);

  const handleSubmit = async (payload: File | null) => {
    try {
      const image = await uploadToS3(payload, BucketFolderName.Review);
      await addReview({ image });
      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => setIsVisible(false);

  const openModal = () => setIsVisible(true);

  return {
    handleSubmit,
    closeModal,
    reviews,
    isVisible,
    openModal,
  };
};

export default useReview;
