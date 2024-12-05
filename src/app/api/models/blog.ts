import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    slug: { type: String },
  },
  { timestamps: true },
);

export default models.Blog || model("Blog", BlogSchema);
