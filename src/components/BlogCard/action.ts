import { useState } from "react";
import useBlogStore from "@/store/blog";

const useBlogCard = () => {
  const { deleteBlog } = useBlogStore();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedBlogId, setselectedBlogId] = useState<string>("");

  const handleDelete = async () => {
    await deleteBlog(selectedBlogId);
    closeModal();
  };

  const openModal = (id: string) => {
    setVisible(true);
    setselectedBlogId(id);
  };

  const closeModal = () => setVisible(false);

  return {
    handleDelete,
    visible,
    setVisible,
    closeModal,
    openModal,
  };
};

export default useBlogCard;
