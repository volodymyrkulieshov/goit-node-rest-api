import { ContactsModel } from "../models/contactsModel.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const filter = { owner };
    if (favorite === "true") {
      filter.favorite = true;
    } else if (favorite === "false") {
      filter.favorite = false;
    }
    const skip = (page - 1) * limit;
    const contactsList = await ContactsModel.find(filter, "", { skip, limit });
    res.json(contactsList);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const searchedContact = await ContactsModel.findById(id);

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

    if (!removedContact) {
      throw HttpError(404);
    }
    res.json(removedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await ContactsModel.create({ ...req.body, owner });
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
