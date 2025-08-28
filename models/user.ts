import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name?: string;
  email: string;
  password?: string; // Optional for OAuth users
  provider: string; // e.g., "credentials", "github", "google"
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Optional for OAuth
  provider: { type: String, required: true, default: "credentials" },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);