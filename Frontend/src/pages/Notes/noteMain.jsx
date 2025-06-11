import { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TextField, MenuItem, Button } from "@mui/material";
import axios from "axios";
import NoteModal from "./noteModal";
import Note from "./note";

const categories = ["All", "Work", "Projects", "Personal", "Other"];

const NoteMain = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notes/")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  const openNote = (note) => setSelectedNote(note);
  const closeNote = () => setSelectedNote(null);

  const handleCategory = (category) => {
    setSelectedCategory(category === selectedCategory ? "All" : category);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Error deleting note. Please try again.");
    }
  };

  const handleAddNote = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
    closeNote();
  };

  const filteredNotes =
    selectedCategory === "All"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);

  const handleFieldChange = (key, value) => {
    setSelectedNote((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col m-4 p-4 overflow-y-clip">
      <div className="flex justify-between">
        <div className="flex gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategory(category)}
                className={`px-4 py-2 rounded border transition-colors duration-200
                  ${
                    isSelected
                      ? "bg-green-600 text-white border-green-700"
                      : " text-white border-0"
                  }
                  hover:bg-green-700 hover:text-white hover:cursor-pointer`}
              >
                {category}
              </button>
            );
          })}
        </div>
        <Button
          className="text-green-500 flex items-center gap-2"
          onClick={() => setShowAdd(true)}
        >
          <AddCircleOutlineIcon />
          Add Note
        </Button>
      </div>

      <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {filteredNotes.map((note) => (
          <Note
            key={note._id}
            note={note}
            onClick={() => openNote(note)}
            onDelete={() => handleDelete(note._id)}
          />
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <NoteModal
            mode="add"
            initialData={{ title: "", content: "", category: "Other" }}
            onClose={() => setShowAdd(false)}
            onSubmit={async (form) => {
              try {
                const response = await axios.post("http://localhost:5000/notes/create", form);
                handleAddNote(response.data);
              } catch (error) {
                console.error("Error adding note:", error);
                alert("Failed to add note. Please try again");
              }
            }}
          />
        </div>
      )}


      {/* Edit Note Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
          <NoteModal
            mode="edit"
            initialData={selectedNote}
            onClose={closeNote}
            onSubmit={async (updatedNote) => {
              try {
                const res = await axios.put(
                  `http://localhost:5000/notes/${updatedNote._id}`,
                  updatedNote
                );
                setNotes((prev) =>
                  prev.map((n) => (n._id === updatedNote._id ? res.data : n))
                );
                closeNote();
              } catch (error) {
                console.error("Error updating note:", error);
                alert("Failed to update note. Try again.");
              }
            }}
          />
        </div>
      )}

    </div>
  );
};

export default NoteMain;

const AddNote = ({ onAddNote, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Other",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.category) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/notes/create/",
        form
      );
      onAddNote(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-2xl gap-6 p-8 bg-gray-800 shadow-lg rounded-xl transform transition-all duration-300 scale-100 hover:scale-105"
    >
      <h2 className="text-white text-2xl font-semibold text-center">Add New Note</h2>

      <TextField
        label="Title"
        variant="outlined"
        name="title"
        value={form.title}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
      />
      <TextField
        label="Content"
        variant="outlined"
        name="content"
        value={form.content}
        onChange={handleChange}
        fullWidth
        multiline
        maxRows={3}
        minRows={3}
        required
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
      />
      <TextField
        select
        label="Category"
        variant="outlined"
        name="category"
        value={form.category}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      <div className="flex justify-around">
        <Button
          onClick={onClose}
          sx={{ borderRadius: 2, backgroundColor: "green" }}
          variant="contained"
          color="success"
        >
          Close
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 2 }}
          color="success"
        >
          Add Note
        </Button>
      </div>
    </form>
  );
};
