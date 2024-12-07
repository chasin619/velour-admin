import { useState } from "react";
import useHomeStore from "@/store/home";

const useBlogCard = () => {
  const { deleteBlog } = useHomeStore();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedBlogId, setselectedBlogId] = useState<string>("");

  const handleDelete = async () => {
    await deleteBlog(selectedBlogId);
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
