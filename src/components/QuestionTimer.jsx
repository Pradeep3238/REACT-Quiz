import { useEffect, useState } from "react";

export default function QuestionTimer({timeout, onTimeout, mode}){

    const [remainingTime,setRemainigTime] = useState(timeout);

    useEffect(()=>{
        console.log('setting Timeout');
        const timer = setTimeout(onTimeout,timeout);

        return ()=> { clearTimeout(timer)} ;

    },[timeout,onTimeout]);

    useEffect(()=>{
        console.log('setting Interval');
        const interval = setInterval(()=>{
        setRemainigTime(prevRemainingTime => prevRemainingTime - 100)
        },100);

        return ()=>{ clearInterval(interval); }
    },[])
    

    return(
        <progress id='question-time' value={remainingTime} max={timeout} className={mode}>

        </progress>
    )
}