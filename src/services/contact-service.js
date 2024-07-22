//contact-service.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
    console.log('Getting all contacts...');
    const contacts = await ContactsCollection.find().exec();
    console.log('Contacts:', contacts);
    return contacts;
};

export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};