import React, { useEffect, useState } from 'react';
import { formattedString } from './utils';


function Screen({ screenProps: {isPowerOn,setCalculExpression, calculExpression, result, setResult,printResult, setPrintResult ,lastInput, setLastInput,setCursorPosition,cursorPosition, resultsStack,setResultsStack, clickedEqual} }) {

  function handleCaluculExpression(e) {
    e.preventDefault();
    clickedEqual()
    setPrintResult(true);
    setResult(eval(calculExpression))
    if (result!="Invalid expression")
      setResultsStack(c=>[...c, [calculExpression,result]])
  }

  function handleInput(e){
    if(!isPowerOn){
      setCalculExpression("")
      return
    }
    const {value}=e.target

    if (["+", "-", "*", "/"].includes(value.at(-1)))
      //We formate the value to change things as (0005 by 5).That is th goal of formattedString function
      setCalculExpression(formattedString(value.slice(0, value.length-1), value.at(-1)))
    else
      setCalculExpression(e.target.value);
    setPrintResult(false);
  
  }
  return ( 
    <div className={`screen ${isPowerOn?"isPowerOn":"isPowerOff"}` }>
      <div className="old_calculs">
        {
          isPowerOn && resultsStack.map((result, id)=>(
             <div key={id}>
              {result.join(" = ")}
            </div>
          )
          )
        }
      </div>
      <div className="current_calcul">

        <div>
          <form onSubmit={handleCaluculExpression} >
            <input type="text" className='calculExpressionInput' value={calculExpression}  onChange={handleInput}  />
            <input type="submit" />
          </form>
          <div className="result">
            {printResult && result}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Screen;