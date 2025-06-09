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
        setSelectedContact(res.data[0]);
      })
      .catch((err) => {
        console.error('Error fetching contacts:', err);
      });
  }, []);

  const onUpdateContact = (updatedContact) => {
    setContacts(prev =>
    prev.map(c => (c._id === updatedContact._id ? updatedContact : c)));

    if (selectedContact && selectedContact._id === updatedContact._id) {
      setSelectedContact(updatedContact);
    }
  }

  const onDeleteContact=(contactToDelete) => {
    setContacts(prev => prev.filter(c => c._id !== contactToDelete._id));

    if (selectedContact && selectedContact._id === contactToDelete._id) {
      setSelectedContact(null);
    }
  }
  const handleAddContact = (Contact) => {
    setContacts((prev) => [...prev,Contact]);
    setSelectedContact(Contact);
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between h-full overflow-y-auto p-4">
      <div className="flex flex-col lg:flex-row flex-1 gap-6">
        <ContactList
          contacts={contacts}
          onSelectContact={setSelectedContact}
          onAddContact={handleAddContact}
        />
        {selectedContact && <ContactDetails contact={selectedContact} onDeleteContact={onDeleteContact} onUpdateContact={onUpdateContact}/>}
      </div>
    </div>
  );
};

export default Contact;
