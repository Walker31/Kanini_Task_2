import { useEffect, useState } from "react";
import { Dialog, TextField, MenuItem } from "@mui/material";

// Use your tag options here
const tagOptions = [
  { value: "Work", label: "Work" },
  { value: "Family", label: "Family" },
  { value: "Friend", label: "Friend" },
];

const ContactDialog = ({ open, mode, contactData, onClose, onSubmit }) => {
  // Initialize form state from contactData or empty fields
  const [form, setForm] = useState({
    name: "",
    tag: "",
    profession: "",
    phonePersonal: "",
    phoneWork: "",
    emailPersonal: "",
    emailWork: "",
    birthday: "",
    ...contactData,
  });

  useEffect(() => {
    setForm({
      name: "",
      tag: "",
      profession: "",
      phonePersonal: "",
      phoneWork: "",
      emailPersonal: "",
      emailWork: "",
      birthday: "",
      ...contactData,
    });
  }, [contactData]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      phone: {
        Personal: form.phonePersonal,
        Work: form.phoneWork,
      },
      email: {
        Personal: form.emailPersonal,
        Work: form.emailWork,
      },
    };

    onSubmit(payload, mode);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 5,
            background: "#121212",
            minWidth: 400,
            color: "white",
          },
        },
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 flex flex-col gap-3 w-max"
      >
        <h2 className="text-xl font-bold mb-2">
          {mode === "edit" ? "Edit Contact" : "Add New Contact"}
        </h2>

        <TextField
          label="Full Name"
          className="w-max border-white"
          name="name"
          fullWidth
          required
          value={form.name}
          onChange={handleChange}
          variant="outlined"
          sx={
            {
              borderRadius: 3,
              borderColor:'white',
              border: 0.5,
              
            }
          }
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField
          select
          label="Tag"
          name="tag"
          fullWidth
          required
          value={form.tag}
          onChange={handleChange}
          variant="outlined"
          sx={
            {
              borderRadius: 3,
              borderColor:'white',
              border: 0.5,
              
            }
          }
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
        >
          {tagOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Profession"
          name="profession"
          fullWidth
          required
          value={form.profession}
          onChange={handleChange}
          variant="outlined"
          sx={
            {
              borderRadius: 3,
              borderColor:'white',
              border: 0.5,
              
            }
          }
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField
          label="Personal Phone"
          name="phonePersonal"
          fullWidth
          required
          value={form.phonePersonal}
          onChange={handleChange}
          variant="outlined"
          sx={
            {
              borderRadius: 3,
              borderColor:'white',
              border: 0.5,
              
            }
          }
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField
        
          label="Work Phone"
          name="phoneWork"
          fullWidth
          value={form.phoneWork}
          onChange={handleChange}
          variant="outlined"
          sx={
            {
              borderRadius: 3,
              borderColor:'white',
              border: 0.5,
              
            }
          }
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField
          label="Personal Email"
          name="emailPersonal"
          fullWidth
          value={form.emailPersonal}
          onChange={handleChange}
          variant="outlined"
          sx={
            {
              borderRadius: 3,
              borderColor:'white',
              border: 0.5,
              
            }
          }
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField
          label="Work Email"
          name="emailWork"
          fullWidth
          value={form.emailWork}
          onChange={handleChange}
          variant="outlined"
          sx={
            {
              borderRadius: 3,
              borderColor:'white',
              border: 0.5,
              
            }
          }
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField
          label="Birthday"
          name="birthday"
          type="date"
          fullWidth
          value={form.birthday}
          onChange={handleChange}
          variant="outlined"
          sx={
            {
              borderRadius: 3,
              borderColor:'white',
              border: 0.5,
              
            }
          }
          InputLabelProps={{ shrink: true, style: { color: "gray", fontWeight: 'bold'} }}
          InputProps={{ style: { color: "white" } }}
        />

        <div className="flex justify-end mt-4 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-4xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-4xl"
          >
            {mode === "edit" ? "Save Changes" : "Add Contact"}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default ContactDialog;
