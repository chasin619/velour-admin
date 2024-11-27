import { Schema, model, models } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    author: { type: String, required: false },
  },
  { timestamps: true },
);

export default models.Blog || model("Blog", blogSchema);
