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
    <div>
        <p>Question:{questionNo}/{totolQuestions}</p>
        <p dangerouslySetInnerHTML={{ __html: question }}></p>
        {answers.map(ans => (
            <button key = {ans} disabled={userAnswer ? true : false} onClick={callback}
                dangerouslySetInnerHTML={{ __html: ans }}>
            </button>
        ))}
    </div>
)

export default QuestionCard
