//http-errors
import createHttpError from "http-errors"

import {getAllContacts, getContactById} from "../services/contact-service.js";

export const getAllContactsController =  async (req, res) => {

       console.log('Received request for all contacts...');
       const contacts = await getAllContacts();
       console.log('Contacts:', contacts);
       res.status(200).json({
           status: 200,
           message: 'Successfully found contacts!',
           data: contacts,
       });
}

export const getContactByIdController = async (req, res, next) => {

        const { contactId } = req.params;

        const contact = await getContactById(contactId);

        if (!contact) {
            throw createHttpError(404, `Could not find contact: ${contactId}`);
        }
}