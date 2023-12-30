import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from '../questions.js';

export default function Question({index, onSelectAnswer , onSkipAnswer}){

    const [answer,setAnswer]=useState({
        selectedAnswer : '',
        isCorrect : null
    })

    let timer = 10000;
    //behave as edge conditons that if we choose an  answer at the edge of the timer to be completed, there will be timer collapse
    //thus if there is an answer , then change the timer to 2 secs to show that it is answered. 
    if(answer.selectedAnswer){
        timer=1000;
    }
    //then change the timer to 1 sec for checking the correctness 
    if(answer.isCorrect != null){
        timer = 2000;
    }

    function handleSelectAnswer(answer){
        setAnswer({
            selectedAnswer : answer,
            isCorrect: null
        })

        setTimeout(()=>{
            setAnswer({
                selectedAnswer : answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(()=>{
                onSelectAnswer(answer);
            },2000)
        },1000)
    }

    let answerState = '';
    if(answer.selectedAnswer && answer.isCorrect!==null){
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }else if(answer.selectedAnswer){
        answerState='answered';
    }

    return(
        <div id="question">
            {/* since the dom doesnot actually re-renders this QuestionTimer component and only the index of the question change,
                the component lies in the DOM unchanged and thus the timer and interval is not changed.
                To make the timer component to re-render, a change is need to be specified . thus the key prop is given.
                whenever the timer change, it re renders.
                 */}

            {/*to mark the the question as skipped only when no answer is selected, conditionally render onSkip function*/}
            <QuestionTimer
                key={timer} 
                timeout={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} 
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
                 <Answers
                    answers={QUESTIONS[index].answers}
                    selectedAnswer={ answer.selectedAnswer }
                    answerState={answerState}
                    onSelect={handleSelectAnswer}
                 />
        </div>
    )
}