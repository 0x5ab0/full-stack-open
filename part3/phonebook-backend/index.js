const express = require('express')
const app = express()

app.use(express.json())

const generateId = () => {
    return Math.floor(Math.random() * 10**15)
}

let persons = [
    { 
        "id": generateId(),
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    { 
        "id": generateId(),
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": generateId(),
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": generateId(),
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    response.send(
        `<div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div>`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const { name, number } = request.body

    if (!name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!number) {
        return response.status(400).json({
            error: 'number missing'
        })
    } else if (persons.find(person => person.name === name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else if (persons.find(person => person.number === number)) {
        return response.status(400).json({
            error: 'number must be unique'
        })
    }

    const person = {
        id: generateId(),
        name,
        number
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
