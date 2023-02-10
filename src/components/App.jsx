import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Title } from './Title/Title';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  reset = () => {
    this.setState({
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    });
  };
  addProduct = contact => {
    if (this.state.contacts.some(p => p.name === contact.name)) {
      alert(`Contact ${contact.title} is already exists!`);
      return;
    }
    const finalContact = {
      id: nanoid(),
      ...contact,
    };

    this.setState({
      contacts: [finalContact, ...this.state.contacts],
    });
    console.log(this.state.contacts);
  };
  deleteProduct = productId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== productId),
    });
  };

  handleFilter = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
    const filteredProducts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase())
    );
    if (filteredProducts.length === 0) {
      Notify.failure('No contacts found', {
        timeout: 5500,
      });

      setTimeout(this.reset, 2000);

      return;
    }

    this.setState({
      contacts: [...filteredProducts],
    });
  };

  render() {
    return (
      <>
        <Title message="Phonebook" />
        <ContactForm onAddProduct={this.addProduct} />
        <Title message="Contacts" />
        <Filter onChangeFilter={this.handleFilter} value={this.state.filter} />
        <ContactList
          contacts={this.state.contacts}
          onDeleteProduct={this.deleteProduct}
        />
      </>
    );
  }
}
