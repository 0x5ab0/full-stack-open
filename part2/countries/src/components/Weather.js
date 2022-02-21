import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const params = {
            q: country.capital[0],
            appid: process.env.REACT_APP_API_KEY
        }

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${params.q}&appid=${params.appid}&units=metric`)
            .then(response => setData(response.data))
    }, [country])

    return (
        <div>
            <h2>Weather in {country.capital[0]}</h2>
            {
                data ?
                <>
                    <p><strong>Temperature:</strong> {data.main.temp} Celsius</p>
                    <p><strong>Wind:</strong> {data.wind.speed} m/s</p>
                </>
                :
                <p>Loading...</p>
            }
        </div>
    )
}

export default Weather
