import mongoose, { Document } from "mongoose";

export interface NoteDefinition extends Document {
  user: typeof mongoose.Schema.Types.ObjectId;
  title: string;
  url?: string;
  content?: string;
  tags?: string[];
  favourite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema<NoteDefinition>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    url: { type: String, required: false },
    content: { type: String, required: false },
    tags: { type: [String], required: false },
    favourite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model<NoteDefinition>("Note", noteSchema);

export default Note;
