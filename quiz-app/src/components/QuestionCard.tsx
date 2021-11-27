import React from 'react'

type questionCardProp = {
    question: string,
    answer: string[],
    callback: any,
    userAnswer: any,
    questionNo: number,
    totolQuestions: number
}

const QuestionCard: React.FC<questionCardProp> = ({ question, answer, callback, userAnswer, questionNo, totolQuestions }) => (
    <div>
        <p>Question:{questionNo}/{totolQuestions}</p>
        <p dangerouslySetInnerHTML={{ __html: question }}></p>
        <div>
            {answer.map(ans => {
                <div>
                    <button disabled={userAnswer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html: ans}}></span>
                    </button>
                </div>
            })}
        </div>
    </div>
)

export default QuestionCard
