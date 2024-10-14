import mongoose, { Schema, Document } from "mongoose";

const logSchema: Schema = new Schema(
  {},
  {
    timestamps: true,
    versionKey: false,
    strict: false,
  }
);

export default mongoose.model<any>("log", logSchema);
