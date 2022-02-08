import React, { useState } from 'react';

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (good + (bad * -1)) / all
    const positive = `${good / all * 100} %`

    if (all === 0) return <p>No feedback given</p>

    return (
        <table><tbody>
            <StatisticLine text='good' value={good}/>
            <StatisticLine text='neutral' value={neutral}/>
            <StatisticLine text='bad' value={bad}/>
            <StatisticLine text='all' value={all}/>
            <StatisticLine text='average' value={average}/>
            <StatisticLine text='positive' value={positive}/>
        </tbody></table>
    )
}

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    return (
        <div>
            <Title text="give feedback"/>
            <Button handleClick={handleGood} text='good'/>
            <Button handleClick={handleNeutral} text='neutral'/>
            <Button handleClick={handleBad} text='bad'/>
            <Title text="statistics"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App;
