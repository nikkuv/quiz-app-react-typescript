import React from 'react'
import {AnswerObject} from '../App'

type questionCardProp = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    questionNo: number,
    totolQuestions: number
}

const QuestionCard: React.FC<questionCardProp> = ({ question, answers, callback, userAnswer, questionNo, totolQuestions }) => (
    <div className='p-2 m-2  bg-white rounded'>
        <p className="font-medium p-2 m-2">Question: {questionNo}/{totolQuestions}</p>
        <p className="font-medium p-2 m-2" dangerouslySetInnerHTML={{ __html: question }}></p>
        {answers.map((ans) => (
            <div key={ans}>
                <button className={`p-2 border-box m-2 bg-gray-100 ${userAnswer?.correctAnswer === ans && 'bg-green-100'} w-11/12 rounded`} disabled={userAnswer ? true : false} onClick={callback}
                    dangerouslySetInnerHTML={{ __html: ans }}>
                </button>
            </div>
        ))}
    </div>
)

export default QuestionCard
