import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function readContacts() {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  }
  
  async function writeContacts(contacts) {
    return await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  }
  
  async function listContacts() {
     const data = await readContacts();
    return data;
  }
  
  async function getContactById(contactId) {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
  
    return contact || null;
  }
  
  async function removeContact(contactId) {
    const contacts = await readContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
  
    const removedContact = contacts[index];
  
    contacts.splice(index, 1);
  
    await writeContacts(contacts);
    return removedContact;
  
  }
  
  async function addContact({name, email, phone}) {
    const contacts = await readContacts();
    const newContact = { id: nanoid(),name, email, phone };
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
  
  }
  
  async function updateContact(contactId, updatedData) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const updatedContact = { ...contacts[index], ...updatedData };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  }

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};