import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Anecdote = ({ text, votesCount }) => (
    <div>
        <p>{text}</p>
        <p>has {votesCount} votes</p>
    </div>
)

const Winner = ({ anecdotes, votes }) => {
    const highestVoteCount = Math.max(...votes)
    const winnerIndex = votes.indexOf(highestVoteCount)
    const winner = anecdotes[winnerIndex]

    if (highestVoteCount === 0) return <p>No votes have been received yet.</p>
    return <Anecdote text={winner} votesCount={highestVoteCount}/>
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const getRandomIndex = (array) => Math.floor(Math.random() * array.length)
    
    const handleAnecdoteClick = () => {
        const i = getRandomIndex(anecdotes)

        // avoid repeating the same quote twice in a row
        i === selected ? handleAnecdoteClick() : setSelected(i)
    }

    const handleVoteClick = () => {
        const votesCopy = [...votes]
        votesCopy[selected] += 1
        setVotes(votesCopy)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote text={anecdotes[selected]} votesCount={votes[selected]}/>
            <Button handleClick={handleVoteClick} text='vote'/>
            <Button handleClick={handleAnecdoteClick} text='next anecdote'/>
            <h1>Anecdote with most votes</h1>
            <Winner anecdotes={anecdotes} votes={votes}/>
        </div>
    )
}

export default App;
