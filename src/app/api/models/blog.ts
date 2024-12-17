import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    slug: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true },
);

export default models.Blog || model("Blog", BlogSchema);
