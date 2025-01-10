import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  portalName: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "client"] },
});

export default models.User || model("User", UserSchema);
