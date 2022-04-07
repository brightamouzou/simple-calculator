import {useEffect, useRef, useState } from 'react'
import Brand from './components/Brand';
import Keys from "./components/Keys";
import Screen from "./components/Screen";

function App() {
  const [calculExpression, setCalculExpression] = useState("")
  const [result, setResult] = useState(0);
  const [printResult, setPrintResult] = useState(false);
  const [cursorPosition,setCursorPosition]=useState(0);
  const [isPowerOn, setIsPowerOn]=useState(false);
  const [resultsStack, setResultsStack]=useState([])
  const screenProps = useRef()

  screenProps.current = {
    printResult,
    calculExpression,
    result,
    cursorPosition,
    setPrintResult,
    setCalculExpression,
    setResult,
    setCursorPosition,
    isPowerOn,
    setIsPowerOn,
    setResultsStack,
    resultsStack
  }

  useEffect(() => {
    const calculExpressionInput = document.querySelector(".calculExpressionInput");
    const AC = document.querySelector("span[aria-type='AC']")
    const submit=document.forms[0][1]
    const equal = document.querySelector("span[aria-type='EQUAL']")

    if(!isPowerOn){
      calculExpressionInput.blur();
      return
    }
    calculExpressionInput.focus();
    equal.addEventListener("click", () => {
      try {
      
        submit.click()
      } catch (e) {
        setPrintResult(false)
        setResult("Invalid expression")
        return;
      }
    })

    
    AC.addEventListener("click", () => {
      setPrintResult(false);
      return setCalculExpression("");
    })

  }, [isPowerOn])

  useEffect(() => {
    try {
      if (calculExpression.length) {
        const tmp=eval(calculExpression)   
        if (tmp){
          setResult(eval(calculExpression))
        }else{
          setResult("Invalid expression");
        }
      }
    } catch (e) {
      setResult("Invalid expression");
      return
    }
    return

  }, [calculExpression])

  return (
    <div className="app">
      <div className="calculator calculator-box">
        <Brand/>
        <Screen screenProps={screenProps.current}/>
        <Keys keysProps={screenProps.current} />
      </div>
    </div>
  );
}

export default App;
