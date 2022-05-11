require('dotenv').config();
const morgan = require('morgan');
const express = require('express');

const app = express();

// middleware
app.use(express.static('build'));
app.use(express.json());
const cors = require('cors');

app.use(cors());

morgan.token('body', (request) => JSON.stringify(request.body));
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :body',
));

const Person = require('./models/person');

// routes
app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<div>
                <p>Phonebook has info for ${persons.length} people</p>
                <p>${new Date()}</p>
            </div>`,
    );
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post('/api/persons/', (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({
    name,
    number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// middleware
const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);
