import { useState, useEffect } from "react";
import { TextField, MenuItem, Button } from "@mui/material";

const categories = ["All", "Work", "Projects", "Personal", "Other"];

const NoteModal = ({ initialData, onClose, onSubmit, mode = "add" }) => {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    setForm(initialData); // in case props change
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim() || !form.category) {
      alert("Please fill in all fields");
      return;
    }

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-2xl gap-6 p-8 bg-gray-800 shadow-lg rounded-xl transform transition-all duration-300 scale-100 hover:scale-105"
    >
      <h2 className="text-white text-2xl font-semibold text-center">
        {mode === "edit" ? "Edit Note" : "Add New Note"}
      </h2>

      <TextField
        label="Title"
        name="title"
        variant="outlined"
        value={form.title}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
      />

      <TextField
        label="Content"
        name="content"
        variant="outlined"
        value={form.content}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={3}
        required
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
      />

      <TextField
        select
        label="Category"
        name="category"
        variant="outlined"
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
        <Button onClick={onClose} sx={{ borderRadius: 2 }} variant="outlined" color="inherit">
          Close
        </Button>
        <Button type="submit" variant="contained" sx={{ borderRadius: 2 }} color="success">
          {mode === "edit" ? "Save Changes" : "Add Note"}
        </Button>
      </div>
    </form>
  );
};

export default NoteModal;
