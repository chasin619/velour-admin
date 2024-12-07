import { useEffect, useState } from "react";
import useHomeStore from "@/store/home";
import { deleteFromS3, uploadToS3 } from "@/utils/helpers";
import { BucketFolderName } from "@/enum/bucket";

const useReview = () => {
  const { reviews, addReview, getReviews, setLoading, deleteReview } =
    useHomeStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<any>();

  useEffect(() => {
    getReviews();
  }, []);

  const handleSubmit = async (payload: File | null) => {
    try {
      setLoading(true);
      const image = await uploadToS3(payload, BucketFolderName.Review);
      await addReview({ image });
      setIsVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (review: any) => {
    setIsDeleteModalVisible(true);
    setSelectedReview(review);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDelete = async () => {
    const res = await deleteFromS3(
      selectedReview.image,
      BucketFolderName.Review,
    );
    if (res) {
      await deleteReview(selectedReview);
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
    isDeleteModalVisible,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    selectedReview,
  };
};

export default useReview;
