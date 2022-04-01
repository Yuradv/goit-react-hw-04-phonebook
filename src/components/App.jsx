import React, { Component } from "react";
import Form from "./Form";
import Contacts from "./Contacts";
import Filter from "./Filter";
import Container from "./Container";
import shortid from 'shortid';
import Notiflix from 'notiflix';



class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };
  
  
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  
  
  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }  
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
    const {filter} = this.state
    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={this.saveContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.onChangeFilter} />
        <Contacts
          contacts={this.getVisibleContacts()}
          onDeleteContact={this.deleteContact }/>
      </Container>
  )
}
}


export default App;


// if(this.state.contacts === []) {
//           <h3>There are no contacts here, add something above</h3>
//         }