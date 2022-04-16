import  { useState } from "react";
import Form from "./Form";
import Contacts from "./Contacts";
import Filter from "./Filter";
import Container from "./Container";
import shortid from 'shortid';
import Notiflix from 'notiflix';
import useLocalStorage from "hooks/useLocalStorage";


export default function App()  {
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const [filter, setFilter] = useState('')
  
  const saveContact = ( name, number) => {
    const contactData = {
      id: shortid.generate(),
      name,
      number,
      };
    
      if (contacts.find((contactData) => contactData.name.toLowerCase() === name.toLowerCase())) {
      Notiflix.Notify.failure(`${name} is already in contacts`);
    } else {
      setContacts((contacts) => [contactData, ...contacts])
      }
    }

  const onChangeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId))
  };

    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={saveContact} />
        <hr/>

        <h2>Contacts</h2>
        <Filter value={filter} onChange={onChangeFilter} />
        <Contacts
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}/>
      </Container>
  )

    }

