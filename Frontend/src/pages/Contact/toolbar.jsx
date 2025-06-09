import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import axios from 'axios';
import ContactDialog from '../../components/contactDialog';

const tagOptions = [
  { label: 'Work', value: 'Work' },
  { label: 'Family', value: 'Family' },
  { label: 'Friend', value: 'Friend' },
];

const Toolbar = ({ onAddContact }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  // When the dialog is submitted
  const handleDialogSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        tag: formData.tag,
        profession: formData.profession,
        phone: {
          Personal: formData.phone.Personal,
          Work: formData.phone.Work,
        },
        email: {
          Personal: formData.email.Personal,
          Work: formData.email.Work,
        },
        birthday: formData.birthday,
      };
      const response = await axios.post('http://localhost:5000/contacts/create', payload);
      if (onAddContact) onAddContact(response.data);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
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
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <IconButton className="bg-gray-700 p-2 rounded-full cursor-pointer">
          <FilterListIcon className="text-white" />
        </IconButton>
        <IconButton className="bg-gray-700 p-2 rounded-full cursor-pointer">
          <SwapVertIcon className="text-white" />
        </IconButton>
        <IconButton
          onClick={() => setOpenDialog(true)}
          className="bg-gray-700 p-2 rounded-full cursor-pointer"
        >
          <AddIcon className="text-white" />
        </IconButton>
      </div>

      {/* Reusable Dialog for Add */}
      <ContactDialog
        open={openDialog}
        mode="create"
        contactData={{
          name: '',
          tag: '',
          profession: '',
          phonePersonal: '',
          phoneWork: '',
          emailPersonal: '',
          emailWork: '',
          birthday: '',
        }}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleDialogSubmit}
      />
    </>
  );
};

export default Toolbar;
