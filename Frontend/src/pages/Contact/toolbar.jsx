import { IconButton, Dialog, TextField, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const tagOptions = [
  { label: 'Work', value: 'Work' },
  { label: 'Family', value: 'Family' },
  { label: 'Friend', value: 'Friend' },
];

const Toolbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  // Form state
  const [newContact, setNewContact] = useState({
    name: '',
    tag: '',
    profession: '',
    phonePersonal: '',
    phoneWork: '',
    emailPersonal: '',
    emailWork: '',
    birthday: '',
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddButtonClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    // Optionally reset form here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!newContact.name || !newContact.tag || !newContact.role) {
      alert('Please fill in all required fields.');
      return;
    }

    // Example of processing
    console.log("New Contact:", newContact);

    // You can pass this to a parent via props or update global state

    handleDialogClose();
  };

  return (
    <>
      <div className="flex flex-row gap-3 mb-4 items-center">
        <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full flex-1">
          <SearchIcon className="text-white" />
          <input
            className="bg-transparent text-white placeholder-white outline-none w-full"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <IconButton className="bg-gray-700 p-2 rounded-full cursor-pointer">
          <FilterListIcon className="text-white" />
        </IconButton>
        <IconButton className="bg-gray-700 p-2 rounded-full cursor-pointer">
          <SwapVertIcon className="text-white" />
        </IconButton>
        <IconButton
          onClick={handleAddButtonClick}
          className="bg-gray-700 p-2 rounded-full cursor-pointer"
        >
          <AddIcon className="text-white" />
        </IconButton>
      </div>

      {/* Add Contact Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
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
          <h2 className="text-xl font-bold mb-2">Add New Contact</h2>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            required
            value={newContact.name}
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
            value={newContact.tag}
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
            name="profession"
            fullWidth
            required
            value={newContact.role}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            label="Personal Phone"
            name="phonePersonal"
            fullWidth
            required
            value={newContact.phonePersonal}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            label="Work Phone"
            name="phoneWork"
            fullWidth
            value={newContact.phoneWork}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            label="Personal Email"
            name="emailPersonal"
            fullWidth
            value={newContact.emailPersonal}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            label="Work Email"
            name="emailWork"
            fullWidth
            value={newContact.emailWork}
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
            value={newContact.birthday}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ shrink: true, style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={handleDialogClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-4xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-4xl"
            >
              Add Contact
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Toolbar;
