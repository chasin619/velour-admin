import { Schema, model, models } from "mongoose";

const PortfolioSchema = new Schema({
  title: { type: String, required: true },
  images: { type: Array, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

export default models.Portfolio || model("Portfolio", PortfolioSchema);
