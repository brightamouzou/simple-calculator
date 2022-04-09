import { useCallback, useEffect, useRef, useState } from 'react'
import Brand from './components/Brand';
import Keys from "./components/Keys";
import Screen from "./components/Screen";
import { formattedString, reg3 } from './components/utils';

function App() {
  const [calculExpression, setCalculExpression] = useState("")
  const [result, setResult] = useState(0);
  const [printResult, setPrintResult] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [resultsStack, setResultsStack] = useState([])
  const screenProps = useRef()

  const equal = useRef()
  equal.current=document.querySelector("span[aria-type='EQUAL']")
  const submit =useRef()
  useEffect(()=>{
    submit.current=document.forms[0][1]
  }, [])

  function clickedEqual(){
    promise()
    .then(()=>{
      // submit.current.click();
      return
    })
    
  }

  const promise = useCallback(() => {
    return new Promise((resolve, reject) => {
      const lastCharacters = calculExpression.match(reg3)
      if (lastCharacters) {
        console.log("last ", lastCharacters);
        const tmp = parseFloat(lastCharacters[1])
        const lastIndex = calculExpression.lastIndexOf(lastCharacters[1])
        setCalculExpression(c => c.substring(0, lastIndex) + tmp.toString())
        resolve(true)
      }
    })
  }, [calculExpression])

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
    resultsStack,
    clickedEqual,
    submit:submit.current
  }

  useEffect(() => {
    const calculExpressionInput = document.querySelector(".calculExpressionInput");
    const AC = document.querySelector("span[aria-type='AC']")
    console.log("s");
    if (!isPowerOn) {
      calculExpressionInput.blur();
      // setPrintResult(false)
      return
    }
    calculExpressionInput.focus();


    AC.addEventListener("click", () => {
      setPrintResult(false);
      return setCalculExpression("");
    })

  }, [isPowerOn])

  useEffect(() => {
    
  
    // equal.addEventListener("click", () => {
    //   console.log(calculExpression.at(-1));
    //   try {
       
    //     promise()
    //       .then(() => {
    //         console.log('dfd');
    //         submit.click()

    //       })

    //   } catch (e) {
    //     setPrintResult(false)
    //     setResult("Invalid expression")
    //     return;
    //   }
    // }, [])

  })

  useEffect(() => {

    try {
      if (calculExpression.length) {
        const tmp = eval(calculExpression)
        if (tmp) {
          setResult(eval(calculExpression))
        } else {
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
        <Brand />
        <Screen screenProps={screenProps.current} />
        <Keys keysProps={screenProps.current} />
      </div>
    </div>
  );
}

export default App;
