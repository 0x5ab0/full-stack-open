import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <ul>
                <li>Capital: {country.capital[0]}</li>
                <li>Area: {country.area}</li>
            </ul>
            <h3>Languages</h3>
            <ul>
                {
                    Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)
                }
            </ul>
            <img src={country.flags.png} alt='Flag' style={{width: "auto", height: 150}} />
            <Weather country={country} />
        </div>
    )
}

export default Country
