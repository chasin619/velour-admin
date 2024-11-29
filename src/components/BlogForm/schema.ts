import * as Yup from "yup";

export const BlogFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(30, "Minimum 30 words are required in the title")
    .max(100, "Maximum 100 words are required in the title"),
  author: Yup.string().required("Author is required"),
  image: Yup.mixed().required("Image is required"),
  content: Yup.string()
    .required("Content is required")
    .min(100, "Minimum 100 words are required in the content")
    .test("is-not-empty", "Content is required", (value) => {
      const textContent = value
        ? value.replace(/<\/?[^>]+(>|$)/g, "").trim()
        : "";
      return textContent.length > 0;
    }),
});
