import { useCallback, useState } from "react";
import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";
export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);
    //this logic is to move on to the next question if the answer state is reset to ''
    const activeQuestionIndex =  userAnswers.length ; 
    const quizIsFinished = activeQuestionIndex === QUESTIONS.length;


    const handleSelectAnswer = useCallback( function handleSelectAnswer(selectedAnswer){
            setUserAnswers((prevUserAnswers)=>{
                return [...prevUserAnswers,selectedAnswer];
        });
    },[]);
    
    const handleSkipAnswer = useCallback( () => handleSelectAnswer(null), [handleSelectAnswer]);
    
    if(quizIsFinished){
        return <Summary userAnswers={userAnswers}/>
    }

    return(
    <div id='quiz'>
        <Question
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
        />
    </div>
    )
}
