require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

// middleware
app.use(express.json())
app.use(express.static('build'))

const cors = require('cors')
app.use(cors())

morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
))

// routes
app.get('/info', (request, response) => {
    response.send(
        `<div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div>`
    )
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.deleteOne({ id: request.params.id }).then(result => {
        return response.status(204).end()
    })
})

app.post('/api/persons/', (request, response) => {
    const { name, number } = request.body

    if (!name || !number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name,
        number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
