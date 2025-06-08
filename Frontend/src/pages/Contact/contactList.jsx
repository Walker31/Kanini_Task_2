import Toolbar from "./toolbar";
import ContactCard from "./contactCard";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from "@mui/material";

const ContactList = ({ contacts, onSelectContact }) => {

  const [hide,setHidden] = useState(false);

  const toggleHidden = () => {
    setHidden(!hide);
  }

  return <>
  <div className="bg-[#111111] basis-1/3 rounded-2xl p-6 h-max text-white shadow-lg flex flex-col">
    <div className="flex flex-row items-center justify-between">
      <div className="text-lg font-semibold mb-4">Displayed Contacts - {contacts.length}</div>
      <IconButton onClick={toggleHidden}><KeyboardArrowDownIcon className={`text-gray-50 transition-transform duration-300 ${hide ? 'rotate-180' : ''}` }/></IconButton>
    </div>
    
    { !hide && (
      <>
    <Toolbar />
    <div className="flex flex-col mt-4 gap-4 overflow-y-auto max-h-170">
      {contacts.map((contact, index) => (
        <div key={index} onClick={() => onSelectContact(contact)} className="cursor-pointer">
          <ContactCard {...contact} />
        </div>
      ))}
    </div>
    </>
    )
    }
  </div>
  </>
};

export default ContactList;
