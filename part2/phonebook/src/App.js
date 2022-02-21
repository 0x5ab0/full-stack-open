import { useState, useEffect } from "react"
import axios from 'axios'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const addPerson = event => {
        event.preventDefault()
        const existingPerson = persons.find((person) => 
            person.name === newName
        )

        if (existingPerson) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat({
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }))
            setNewName('')
            setNewNumber('')
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
            <Persons persons={persons} filter={filter} />
        </div>
    )
}

export default App
