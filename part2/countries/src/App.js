import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    return (
        <div>
            {
                countries.length ?
                <>
                <Filter filter={filter} setFilter={setFilter} />
                <Countries countries={countries} filter={filter} setFilter={setFilter} />
                </>
                :
                <p>Loading...</p>
            }
        </div>
    )
}

export default App
