import * as Yup from "yup";

export const PortfolioSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(10, "Minimum 10 words are required in the title"),
  images: Yup.array().required("Portfolio Images are required"),
});
