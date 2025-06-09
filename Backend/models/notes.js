import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { collection: 'Notes',timestamps: true });

const Note = mongoose.model('Note', NoteSchema);

export default Note;
