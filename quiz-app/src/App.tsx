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
          setScore( prev => prev+1);
          (e.target as HTMLBodyElement).style.backgroundColor = `rgb(0, 255, 0, 0.2)`;
        }else{
          (e.target as HTMLBodyElement).style.backgroundColor = `rgb(255, 0, 0, 0.2)`
        }

        const answerObject ={
          question: questions[number].question,
          answer : ans,
          correct,
          correctAnswer : questions[number].correct_answer,
        }
        setUserAns((prev) => [...prev, answerObject]);
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
    <div className="min-h-screen flex items-center flex-col flex justify-center bg-green-100 pb-6">
      <h1 className="text-3xl my-2 font-bold">Computer Science Quiz</h1>
      <p className='text-xl font-medium m-2 p-2'>Test your computer science knowledge. Start Now 👇 </p>
      {(gameOver || userAns.length === totalQuestion) && (
        <button className="py-2 px-4 bg-green-500 rounded m-2 text-white font-medium" onClick={startQuiz}>
        Start
      </button>
      )}
      {!gameOver && ( <p className='text-xl p-2 m-2 font-medium' >Score : {score}</p>)}
      {loding && ( <p className='text-green-500 p-2 m-2 font-medium'>Loding questions ...</p>) }
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
         <button className='m-2 py-2 px-4 text-white bg-green-500 rounded' onClick={nextQuestion}>
         Next Questions
       </button>
      ) }
    </div>
  )
}

export default App
