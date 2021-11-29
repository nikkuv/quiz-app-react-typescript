import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import {fetchQuestions} from './API'
import {Difficulty} from './API'
import {QuestionState} from './API'

export type AnswerObject = {
  question: string;
  answer : string | null;
  correct : boolean;
  correctAnswer : string;
}

const totalQuestion = 10;

function App() {

  const [loding, setLoding] = useState(false)
  const [questions, setquestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAns, setUserAns] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startQuiz = async () => {

    setLoding(true)
    setGameOver(false)
    
    const newQuestions = await fetchQuestions(totalQuestion, Difficulty.EASY)

    setquestions(newQuestions)
    setScore(0)
    setUserAns([])
    setNumber(0)
    setLoding(false)
    
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if(!gameOver) {
        const ans = e.currentTarget.textContent

        const correct = questions[number].correct_answer === ans

        if(correct){
          setScore( prev => prev+1)
        }

        const answerObject ={
          question: questions[number].question,
          answer : ans,
          correct,
          correctAnswer : questions[number].correct_answer
        }
        setUserAns((prev) => [...prev, answerObject])
      }
  }

  const nextQuestion = () => {
    const nextQuestion = number +  1

    if(nextQuestion === totalQuestion){
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="App">
      <h1>Computer Science Quiz</h1>
      {(gameOver || userAns.length === totalQuestion) && (
        <button onClick={startQuiz}>
        Start
      </button>
      )}
      {!gameOver && ( <p>Score : {score}</p>)}
      {loding && ( <p>Loding questions ...</p>) }
      { !loding && !gameOver && (
         <QuestionCard
         questionNo={number + 1}
         totolQuestions={totalQuestion}
         question={questions[number].question}
         answers={questions[number].answers}
         userAnswer={userAns ? userAns[number] : undefined}
         callback={checkAnswer}
       />
      )}
      {!gameOver && !loding  && userAns.length === number + 1 && number != totalQuestion-1 && (
         <button onClick={nextQuestion}>
         Next Questions
       </button>
      ) }
    </div>
  )
}

export default App
