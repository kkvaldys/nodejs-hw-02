//contacts-controllers.js

import createHttpError from "http-errors"

import {getAllContacts, getContactById, addContact, upsertContact, deleteContact} from "../services/contact-service.js";

export const getAllContactsController =  async (req, res) => {

       console.log('Received request for all contacts...');
       const contacts = await getAllContacts();
       console.log('Contacts:', contacts);
       res.status(200).json({
           status: 200,
           message: 'Successfully found contacts!',
           data: contacts,
       });
};

export const getContactByIdController = async (req, res, next) => {

        const { contactId } = req.params;
        const stringID = contactId.toString();

        const contact = await getContactById(stringID);

        res.status(200).json({
            status: 200,
            data: contact,
            message: 'Successfully found contact!',
        })

        if (!contact) {
            throw createHttpError(404, `Could not find contact: ${stringID}`);
        };

};

export const createContactController =  async (req, res) => {
    const data = await addContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created contact!',
        data: data,
    })
};

export const updateContactController =  async (req, res) => {
const {contactID} = req.params.toString();
const result = await upsertContact({_id: contactID}, req.body, {
    upsert: true,
    includeResultMetadata: true,
});

if(!result){
    throw createHttpError(404, `Could not find contact: ${contactID}`);
}

    const status = result.isNew ? 201 : 200;
    const message = result.isNew ? "Movie succsess add" : "Movie update succsess";

    res.json({
        status: status,
        message: message,
        data: result,
    })
};

export const patchContactController =  async (req, res) => {
    const {contactID} = req.params.toString();
    const result = await upsertContact({_id: contactID}, req.body, {
        new: false,
        upsert: false,
    });

    if(!result){
        throw createHttpError(404, `Could not find contact: ${contactID}`);
    }

    res.json({
        status: 200,
        message: "Movie update succsess",
        data: result,
    })
};

export const deleteContactController =  async (req, res) => {
    const {id} = req.params;
    const result = await deleteContact({_id: id});

    if(!result){
        throw createHttpError(404, `Could not find contact: ${id}`);
    }

    res.json({
        status: 200,
        message: "Contact delete succsess",
    });
}