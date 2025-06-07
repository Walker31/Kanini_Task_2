import { useState } from "react";
import { IconButton, Dialog, TextField, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const tagOptions = [
  { value: "Work", label: "Work", color: "bg-amber-800" },
  { value: "Family", label: "Family", color: "bg-blue-800" },
  { value: "Friend", label: "Friend", color: "bg-green-800" },
];

const ContactDetails = ({ contact, onUpdateContact }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editedContact, setEditedContact] = useState({});

  const onEdit = () => {
    setEditedContact({
      ...contact,
      phonePersonal: contact.phone?.Personal || '',
      phoneWork: contact.phone?.Work || '',
      emailPersonal: contact.email?.Personal || '',
      emailWork: contact.email?.Work || '',
    });
    setOpenDialog(true);
  };

  const onDelete = () => {
    // Add your delete logic here
  };

  const handleInputChange = (e) => {
    setEditedContact(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updated = {
      ...editedContact,
      phone: {
        Personal: editedContact.phonePersonal,
        Work: editedContact.phoneWork,
      },
      email: {
        Personal: editedContact.emailPersonal,
        Work: editedContact.emailWork,
      },
    };

    delete updated.phonePersonal;
    delete updated.phoneWork;
    delete updated.emailPersonal;
    delete updated.emailWork;

    if (onUpdateContact) onUpdateContact(updated);
    setOpenDialog(false);
  };

  if (!contact) return <div className="text-white">Select a contact to view details</div>;

  return (
    <>
      <div className="bg-[#111111] basis-2/3 rounded-2xl p-6 text-white shadow-lg flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
          <div className="flex flex-row gap-4">
            <IconButton onClick={onEdit}>
              <EditIcon className="text-white hover:text-gray-500" />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon className="text-red-500 hover:text-red-900" />
            </IconButton>
          </div>
        </div>

        <div className="bg-[#1f1e1e] rounded-3xl p-4 flex flex-col items-center justify-center">
          <div className="w-32 h-32 overflow-clip rounded-4xl">
            <img className="object-cover w-full h-full" src={contact.image} alt={contact.name} />
          </div>
          <div className="p-4 gap-3 flex flex-col items-center">
            <div className="text-4xl">{contact.name}</div>
            <div className="text-md">{contact.role}</div>
            <div className={`p-2 ${contact.tagColor} w-max rounded-3xl text-xs font-bold flex items-center`}>
              {contact.tag}
            </div>
          </div>
        </div>

        <ContactInfoGroup title="Phone Numbers" data={contact.phone} />
        <ContactInfoGroup title="Emails" data={contact.email} />
        <ContactInfoGroup title="Birthday" data={{ Birthday: contact.birthday }} />
      </div>

      {/* 🛠️ Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 5,
              background: '#121212',
              minWidth: 400,
              color: 'white',
            },
          },
        }}
      >
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4 flex flex-col gap-3 w-max">
          <h2 className="text-xl font-bold mb-2">Edit Contact</h2>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            required
            value={editedContact.name || ''}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            select
            label="Tag"
            name="tag"
            fullWidth
            required
            value={editedContact.tag || ''}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          >
            {tagOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Profession"
            name="role"
            fullWidth
            required
            value={editedContact.role || ''}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            label="Personal Phone"
            name="phonePersonal"
            fullWidth
            value={editedContact.phonePersonal || ''}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            label="Work Phone"
            name="phoneWork"
            fullWidth
            value={editedContact.phoneWork || ''}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            label="Personal Email"
            name="emailPersonal"
            fullWidth
            value={editedContact.emailPersonal || ''}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            label="Work Email"
            name="emailWork"
            fullWidth
            value={editedContact.emailWork || ''}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            label="Birthday"
            name="birthday"
            type="date"
            fullWidth
            value={editedContact.birthday || ''}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ shrink: true, style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={() => setOpenDialog(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-4xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-4xl"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default ContactDetails;

const ContactInfoGroup = ({ title, data }) => (
  <div className="bg-[#1f1e1e] flex flex-col rounded-2xl">
    {Object.entries(data).map(([label, value], index) => (
      <div className="p-4" key={index}>
        <div className="font-bold text-gray-400">{label}</div>
        <div className="text-xl">{value}</div>
      </div>
    ))}
  </div>
);
