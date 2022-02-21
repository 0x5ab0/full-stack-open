import React from 'react'
import Country from './Country'

const Countries = ({ countries, filter, setFilter }) => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            {
                filteredCountries.length > 10 ?
                <p>Too many matches, specify another filter.</p>
                :
                filteredCountries.length === 1 ?
                <Country country={filteredCountries[0]} />
                :
                <ul>
                    {filteredCountries.map((country, i) => (
                        <li key={i}>
                            {country.name.common}
                            <button onClick={() => setFilter(country.name.common)}>Show</button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Countries
