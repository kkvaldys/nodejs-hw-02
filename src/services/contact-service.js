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

export const addContact = async (data) =>{
    const result = await ContactsCollection.create(data);
    return result;
};

export const upsertContact = async(filter, data, options  = {})=> {
    const result = await ContactsCollection.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata: true,
        ...options,
    });

    if(!result || !result.value) return null;

    const isNew = Boolean(result?.lastErrorObject?.upserted);

    return{
        data: result.value,
        isNew,
    }
};

export const deleteContact = filter => ContactsCollection.findByIdAndDelete(filter);