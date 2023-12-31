const logger = require('./contacts');
const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await logger.listContacts();
      return console.table(contacts);

    case 'get':
      const contactById = await logger.getContactById(id);
      return contactById ? console.log(contactById) : console.log(`Contact with id=${id} not found`);

    case 'add':
      const addContact = await logger.addContact(name, email, phone);
      return console.log(addContact);

    case 'remove':
      const deleteContact = await logger.removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);