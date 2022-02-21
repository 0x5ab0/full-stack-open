import React  from 'react'

const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            <label htmlFor="filter">Find countries: </label> 
            <input
                id="filter"
                value={filter}
                onChange={event => setFilter(event.target.value)}
            />
        </div>
    )
}

export default Filter
