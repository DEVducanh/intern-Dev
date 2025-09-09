import mongoose, { Schema, Document } from "mongoose";

export interface ITaskDocument extends Document {
  text: string;
  status: "todo" | "doing" | "done";
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
  },
  { timestamps: true } // tự động thêm createdAt, updatedAt
);

export default mongoose.models.Task ||
  mongoose.model<ITaskDocument>("Task", TaskSchema);