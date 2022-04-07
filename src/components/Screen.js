import React, { useEffect, useState } from 'react';


function Screen({ screenProps: {isPowerOn,setCalculExpression, calculExpression, result, setResult,printResult, setPrintResult ,lastInput, setLastInput,setCursorPosition,cursorPosition, resultsStack,setResultsStack} }) {

  function handleCaluculExpression(e) {
    e.preventDefault();
    setPrintResult(true);

    if (result!="Invalid expression")
      setResultsStack(c=>[...c, [calculExpression,result]])
  }

  function handleInput(e){
    if(!isPowerOn){
      setCalculExpression("")
      return
    }
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