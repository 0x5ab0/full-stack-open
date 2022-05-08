import { useState, useEffect } from "react"
import personService from './services/persons'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const Notification = ({ message, color }) => {
    const notificationStyle = {
        color,
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    
    if (message === null) {
        return null
    }
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationColor, setNotificationColor] = useState(null)

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

                    setNotificationColor('green')
                    setNotificationMessage(`Added ${returnedPerson.name}`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 3000)
                })
        }
    }

    const updateNumber = (id, newNumber) => {
        const person = persons.find(person => person.id === id)
        const prompt = `${person.name} is already added to phonebook, replace the old number with a new one?`
        const changedPerson = { ...person, number: newNumber }
        
        if (window.confirm(prompt)) {
            personService
                .update(person.id, changedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== id ? person : returnedPerson))

                    setNotificationColor('green')
                    setNotificationMessage(`Changed ${person.name}'s number to ${person.number}`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 3000)
                })
                .catch(error => {
                    setNotificationColor('red')
                    setNotificationMessage(`${person.name}'s information has already been removed from server`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 3000)
                    setPersons(persons.filter(n => n.id !== id))
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

                setNotificationColor('green')
                setNotificationMessage(`Removed ${person.name}'s number from phonebook`)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 3000)
            })
            .catch(error => {
                setNotificationColor('red')
                setNotificationMessage(`${person.name}'s information has already been removed from server`)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 3000)
                setPersons(persons.filter(n => n.id !== id))
            })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
			<Notification message={notificationMessage} color={notificationColor} />
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
