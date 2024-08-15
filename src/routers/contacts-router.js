//contact-router.js


import express from "express";

//controllers
import {
    getAllContactsController,
    getContactByIdController,
    createContactController,
    updateContactController,
    patchContactController,
    deleteContactController 
} from "../controllers/contacts-controllers.js";

//wrapper
import ctrlWrapper from "../utils/ctrlWrapper.js";

//valid id
import isValidID from "../middlewares/isValidID.js";

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post('/', ctrlWrapper(createContactController));

contactsRouter.put('/:contactId', ctrlWrapper(updateContactController));

contactsRouter.patch('/:contactId', ctrlWrapper(patchContactController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;