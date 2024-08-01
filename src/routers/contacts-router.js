import express from "express";

//controllers
import {getAllContactsController, getContactByIdController} from "../controllers/contacts-controllers.js";

//wrapper
import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactsRouter = express.Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

export default contactsRouter;