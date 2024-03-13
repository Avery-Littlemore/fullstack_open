import { useState } from 'react'

const Heading = ({ title }) => {
  return (
    <h1>{title}</h1>
  ) 
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>    
    <td>{value}</td>
  </tr>
)

const DisplayStats = ({ good, neutral, bad }) => {
    if (good || neutral || bad) {
      const all = good + neutral + bad
      const score = good - bad
      return (
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={score/all} />
            <StatisticLine text='positive' value={String(good/all*100) + '%'} />
          </tbody>
        </table>
      )  
    } else {
      return (
        <p>
          No feedback given
        </p>
      )
    }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <Heading title='give feedback' />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Heading title='statistics' />
      <DisplayStats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App