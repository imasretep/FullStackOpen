import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({text, handleClick}) => {
  return(
    <button onClick={(e) => handleClick(e)}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  const average = sum ? (good - bad) / sum : 0
  const positive = sum ? (good / sum) * 100 : 0

  if(sum === 0){
   return(
    <tbody>
      <tr>
        <td>No feedback given</td>
      </tr>
    </tbody>
   )
  }
  return(
    <tbody>
      <StatisticLine text={'Good '} value={good}/>
      <StatisticLine text={'Neutral '} value={neutral}/>
      <StatisticLine text={'Bad '} value={bad}/>
      <StatisticLine text={'All '} value={sum}/>
      <StatisticLine text={'Average '} value={average}/>
      <StatisticLine text={'Positive '} value={`${positive} %`}/>
    </tbody>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text={'Give feedback'}/>
      <Button text ={'Good'} handleClick={handleClickGood}/>
      <Button text ={'Neutral'} handleClick={handleClickNeutral}/>
      <Button text ={'Bad'} handleClick={handleClickBad}/>
      <Header text ={'Statistics'} />
      <table>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </table>
    </div>
  )
}

export default App