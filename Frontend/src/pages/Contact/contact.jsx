import { useState } from 'react';
import ContactList from './contactList';
import ContactDetails from './details';
import dp1 from "../../assets/ProfilePics/2.jpg";
import dp2 from "../../assets/ProfilePics/1.jpg";
import dp3 from "../../assets/ProfilePics/4.jpg";

const Contact = () => {
  const contacts = [
    {
      name: 'Aditya Janga',
      tag: 'Work',
      tagColor: 'bg-amber-800',
      role: 'App Developer',
      image: dp1,
      phone: { Personal: '+91 7200148738', Work: '+91 7200148738' },
      email: { Personal: 'walker310407@gmail.com', Work: 'adityajanga@gmail.com' },
      birthday: 'July 31, 2004',
    },
    {
      name: 'Keerthi',
      tag: 'Family',
      tagColor: 'bg-blue-800',
      role: 'Interior Designer',
      image: dp2,
      phone: { Personal: '+91 9999999999', Work: '+91 8888888888' },
      email: { Personal: 'keerthi@gmail.com', Work: 'keerthi.work@gmail.com' },
      birthday: 'May 12, 1999',
    },
    {
      name: 'Aryan',
      tag: 'Friend',
      tagColor: 'bg-green-800',
      role: 'Doctor',
      image: dp3,
      phone: { Personal: '+91 7777777777' },
      email: { Personal: 'aryan@gmail.com' },
      birthday: 'August 20, 2000',
    }
  ];

  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  return (
    <div className="flex flex-col lg:flex-row justify-between h-screen overflow-y-auto p-4">
      <div className="flex flex-col lg:flex-row flex-1 gap-6">
        <ContactList
          contacts={contacts}
          onSelectContact={setSelectedContact}
        />
        <ContactDetails contact={selectedContact} />
      </div>
    </div>
  );
};

export default Contact;
