const mongoose = require('mongoose');

if (process.argv.length < 3 || (process.argv.length > 3 && process.argv.length < 5)) {
  console.log('Error: wrong arguments');
  console.log('* Contact list: node mongo.js <password>');
  console.log('* Add new contact: node mongo.js <password> <name> <number>');
  process.exit(1);
}

const password = process.argv[2];
const uri = `mongodb+srv://josep:${password}@cluster0.fi6f1.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(uri);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
    process.exit(0);
  });
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
