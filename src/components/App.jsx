import React from "react";
import { nanoid } from 'nanoid'
import { Form } from "./Form/Form";
import { ContactsList } from './ContactsList/ContactsList'
import { Filter } from "./Filter/Filter";
import { useState, useEffect } from 'react';

export const App = () => {
  
  // const [contacts, setContacts] = useState([{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },]);
  // const [filter, setFilter] = useState('');

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parcedContacts = JSON.parse(savedContacts);
      return parcedContacts;
    }
    return [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  
  const formSubmit = (name, number) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    console.log(contact)
      
    if (contacts.find(contact => contact.name === name)) {
      alert(name + ' is already in contacts.')
    } else {
    setContacts(prevState => [...prevState, contact]);
    }
  }
    
    const handleChangeFilter = evt => {
      setFilter(evt.target.value);
    };

 
// useEffect(() => {
//     const contacts = localStorage.getItem('contacts');
//     const parseContacts = JSON.parse(contacts);

//     if (parseContacts) {
//       setContacts({ contacts: parseContacts });
//     }
//   }, [contacts]);
  
  
//   useEffect(() => {
//  if (contacts !== useState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }, [contacts]);
  
    const getFilterContact = () => {
    const normalizedFilter = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter));
  }


    const onDelete = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  }
  

      return (
        <>
          <h1>Phonebook</h1>
          <Form onSubmit={formSubmit} contacts={contacts} />
          <h2>Contacts</h2>
          <Filter value={filter} onChange={handleChangeFilter} />
          <ContactsList
            contacts={getFilterContact()}
            onDelete={onDelete} />
        </>
      )
    }

