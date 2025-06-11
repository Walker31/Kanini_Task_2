import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import ContactDialog from "../../components/contactDialog";

const tagOptions = [
  { value: "Work", label: "Work", color: "bg-amber-800" },
  { value: "Family", label: "Family", color: "bg-blue-800" },
  { value: "Friend", label: "Friend", color: "bg-green-800" },
];

const ContactDetails = ({ contact, onUpdateContact, onDeleteContact }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const currentTagOption = tagOptions.find(opt => opt.value === contact?.tag);
  const tagColorClass = currentTagOption ? currentTagOption.color : "bg-gray-500";

  const dialogContactData = contact
    ? {
        ...contact,
        phonePersonal: contact.phone?.Personal || '',
        phoneWork: contact.phone?.Work || '',
        emailPersonal: contact.email?.Personal || '',
        emailWork: contact.email?.Work || '',
      }
    : {};

  const handleEdit = () => setOpenDialog(true);

  const handleDelete = async () => {
    if (onDeleteContact) onDeleteContact(contact);
    try {
      await axios.delete(`http://localhost:5000/contacts/${contact._id}`);
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  // When dialog form is submitted
  const handleDialogSubmit = async (updatedData) => {
    // Call backend to update contact
    const updated = {
      ...updatedData,
      phone: {
        Personal: updatedData.phone.Personal,
        Work: updatedData.phone.Work,
      },
      email: {
        Personal: updatedData.email.Personal,
        Work: updatedData.email.Work,
      },
    };
    // Remove temp fields
    delete updated.phonePersonal;
    delete updated.phoneWork;
    delete updated.emailPersonal;
    delete updated.emailWork;

    await axios.put(`http://localhost:5000/contacts/${contact._id}`, updated);
    if (onUpdateContact) onUpdateContact(updated);
    setOpenDialog(false);
  };

  if (!contact) return <div className="text-white">Select a contact to view details</div>;

  const formattedBirthday = new Date(contact.birthday).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <>
      <div className="bg-[#111111] basis-2/3 rounded-2xl h-max p-6 text-white shadow-lg flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
          <div className="flex flex-row gap-4">
            <IconButton onClick={handleEdit}>
              <EditIcon className="text-white hover:text-gray-500" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon className="text-red-500 hover:text-red-900" />
            </IconButton>
          </div>
        </div>

        <div className="bg-[#1f1e1e] rounded-3xl p-4 flex flex-col items-center justify-center">
          <div className="w-32 h-32 flex items-center justify-center bg-gray-700 rounded-4xl">
            <AccountCircleIcon style={{ fontSize: 100, color: 'white' }} />
          </div>
          <div className="p-4 gap-3 flex flex-col items-center">
            <div className="text-4xl font-bold">{contact.name}</div>
            <div className="text-md text-gray-400 mt-1">{contact.profession}</div>
            <div className={`px-3 py-1 ${tagColorClass} w-max rounded-full text-xs font-semibold`}>
              {contact.tag}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 my-2" />
        <ContactInfoGroup title="Phone Numbers" data={contact.phone} />
        <div className="border-t border-gray-700 my-2" />
        <ContactInfoGroup title="Emails" data={contact.email} />
        <div className="border-t border-gray-700 my-2" />
        <ContactInfoGroup title="Birthday" data={{ Birthday: formattedBirthday }} />
      </div>

      {/* Reusable Dialog for Edit */}
      <ContactDialog
        open={openDialog}
        mode="edit"
        contactData={dialogContactData}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleDialogSubmit}
      />
    </>
  );
};

export default ContactDetails;

// Helper component to render info groups
const ContactInfoGroup = ({ title, data }) => {
  const entries = Object.entries(data || {}).filter(([_, value]) => value && value.trim() !== '');

  if (entries.length === 0) return null;
  return (
    <div className="bg-[#1f1e1e] flex flex-col rounded-2xl">
      <div className="text-lg font-semibold text-white px-4 pt-4">{title}</div>
      {entries.map(([label, value], index) => (
        <div className="p-4" key={index}>
          <div className="font-bold text-gray-400">{label}</div>
          <div className="text-xl">{value}</div>
        </div>
      ))}
    </div>
  );
};
