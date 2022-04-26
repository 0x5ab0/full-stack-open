import { useState, useEffect } from "react"
import personService from './services/persons'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = event => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }
        const existingPerson = persons.find((person) => 
            person.name === newName
        )

        if (existingPerson) {
            updateNumber(existingPerson.id, newNumber)
        } else {
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const updateNumber = (id, newNumber) => {
        const person = persons.find(person => person.id == id)
        const prompt = `${person.name} is already added to phonebook, replace the old number with a new one?`
        const changedPerson = { ...person, number: newNumber }
        
        if (window.confirm(prompt)) {
            personService
                .update(person.id, changedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                })
        }        
    }

    const removePersonWithId = (id) => {
        const person = persons.find(n => n.id === id)

        if (window.confirm(`Remove ${person.name}?`)) {
            personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(n => n.id !== id))
            })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <h2>Add contact</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName} setNewName={setNewName}
                newNumber={newNumber} setNewNumber={setNewNumber}    
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                filter={filter}
                removePersonWithId={removePersonWithId}
            />
        </div>
    )
}

export default App
