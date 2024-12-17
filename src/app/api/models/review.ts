import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  image: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

export default models.Review || model("Review", ReviewSchema);
