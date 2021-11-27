import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import {fetchQuestions} from './API'
import {Difficulty} from './API'

function App() {

  const [loding, setLoding] = useState(false)
  const [questions, setquestions] = useState([])
  const [number, setNumber] = useState(0)
  const [userAns, setUserAns] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const totalQuestion = 10;

  console.log(fetchQuestions(totalQuestion, Difficulty.EASY))

  const startQuiz = () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>Computer Science Quiz</h1>
      <button onClick={startQuiz}>
        Start
      </button>
      <p>Score :</p>
      <p>Loding questions ...</p>
      {/* <QuestionCard
        questionNo={number + 1}
        totolQuestions={totalQuestion}
        // question={questions[number].question}
        // answer={questions[number].answer}
        userAnswer={userAns ? userAns[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button onClick={nextQuestion}>
        Next Questions
      </button>
      <h1 className='text-xl font-bold'>Hello World!</h1>
    </div>
  )
}

export default App
