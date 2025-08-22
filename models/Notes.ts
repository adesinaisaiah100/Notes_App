import mongoose, { Schema, model, models } from "mongoose";

const NoteSchema = new Schema(
  {
    userId: { type: String, required: true },
     title: { type: String, required: true },
      author: { type: String, required: true },
    content: { type: Object, required: true }, // store Slate JSON
  },
  { timestamps: true }
);

const Note = models.Note || model("Note", NoteSchema);
export default Note;
