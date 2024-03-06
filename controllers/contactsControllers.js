
import { ContactsModel } from "../models/contactsModel.js";
// import contactsService from "../services/contactsServices.js";

import contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {

    const contactsList = await ContactsModel.find();

    const contactsList = await contactsService.listContacts();

    res.json(contactsList);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const searchedContact = await ContactsModel.findById(id);

    const searchedContact = await contactsService.getContactById(id);

    if (!searchedContact) {
      throw HttpError(404);
    }
    res.json(searchedContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const removedContact = await ContactsModel.findByIdAndDelete(id);

    const removedContact = await contactsService.removeContact(id);

    if (!removedContact) {
      throw HttpError(404);
    }
    res.json(removedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res) => {

  const newContact = await ContactsModel.create(req.body);

  const newContact = await contactsService.addContact(req.body);

  res.status(201).json(newContact);
};

export const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    const { id } = req.params;

    const updatedContact = await ContactsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    const updatedContact = await contactsService.updateContact(id, req.body);

    if (!updatedContact) {
      throw HttpError(404);
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }

};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContactStatus = await ContactsModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedContactStatus) {
      throw HttpError(404);
    }
    res.json(updatedContactStatus);
  } catch (error) {
    next(error);
  }
};

};

