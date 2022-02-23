import React, { Component } from "react";
import Form from "./Form";
import Contacts from "./Contacts";
import Filter from "./Filter";
import Container from "./Container";
import shortid from 'shortid';
import Notiflix from 'notiflix';



class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  
  saveContact = ({ name, number }) => {
    const {contacts} = this.state
    const contactData = {
      id: shortid.generate(),
      name,
      number,
    };
    if (contacts.find((contactData) => contactData.name.toLowerCase() === name.toLowerCase())) {
      Notiflix.Notify.failure(`${name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contactData, ...contacts],
      }));
    }
    
  }

  onChangeFilter = (event) => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  deleteContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={this.saveContact} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.onChangeFilter }/>
        <Contacts
          contacts={this.getVisibleContacts()}
          onDeleteContact={this.deleteContact }/>
      </Container>
  )
}
}


export default App;