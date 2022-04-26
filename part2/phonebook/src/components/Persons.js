import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, removePersonWithId }) => {    
    return (
        <ul>
            {persons
                .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => (
                    <Person
                        key={person.id}
                        person={person}
                        removePerson={() => removePersonWithId(person.id)}
                    />
                ))
            }
        </ul>
    )
}

export default Persons
