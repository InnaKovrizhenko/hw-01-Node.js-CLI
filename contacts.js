const fs = require('fs').promises;
const path = require('path');
const {nanoid} = require('nanoid');

 const contactsPath = path.join('db', 'contacts.json');
 

// Функція, яка повертає масив контактів.
const listContacts = async () => {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const result = JSON.parse(data);
        return result;
  }

// Функція, яка повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const getContactById = async (contactId) => {
        const allContacts = await listContacts();
        const contactById = allContacts.filter(item => item.id === contactId);
        return contactById || null;
  }

// Функція, яка повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const removeContact = async (contactId) => {
        const allContacts = await listContacts();

        const index = allContacts.findIndex(item => item.id === contactId)
        if(index === -1){
            return null;
        }
        const [result] = allContacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return result;

  }
  
// Функція, яка повертає об'єкт доданого контакту. 
  const addContact = async (name, email, phone) => {
        const allContacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        }
        allContacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return newContact;
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };