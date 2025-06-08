import { useState, useEffect } from 'react';
import axios from 'axios';
import ContactList from './contactList';
import ContactDetails from './details';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch contacts from backend
  useEffect(() => {
    axios.get('http://localhost:5000/contacts/')
      .then((res) => {
        setContacts(res.data);
        setSelectedContact(res.data[0]); // Set first contact by default
      })
      .catch((err) => {
        console.error('Error fetching contacts:', err);
      });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between h-screen overflow-y-auto p-4">
      <div className="flex flex-col lg:flex-row flex-1 gap-6">
        <ContactList
          contacts={contacts}
          onSelectContact={setSelectedContact}
        />
        {selectedContact && <ContactDetails contact={selectedContact} />}
      </div>
    </div>
  );
};

export default Contact;
