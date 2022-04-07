import React, { useEffect, useRef } from 'react'
import Power from './Power';
import { lines, reversedString } from './utils'


function Keys({keysProps:
  {isPowerOn,setIsPowerOn,setCalculExpression,calculExpression, setPrintResult, lastInput,setLastInput, setCursorPosition,cursorPosition, setResultsStack,resultsStack}}
){

  const calculExpressionInput=useRef();
  calculExpressionInput.current=document.querySelector(".calculExpressionInput");

  async function addKeyToString(ele){
    calculExpressionInput.current.focus()
    if(!isPowerOn){
      return
    }
    const str=ele.name;
    switch(ele.role){
      case "EQUAL":
        return  
      case "ANS":
        if(resultsStack.length)
          setCalculExpression(resultsStack.at(-1)[1])
        return
      case "C":
          const firstCharacter=reversedString(calculExpression)[0] 
          if (firstCharacter=="÷"){
            setCalculExpression(c => reversedString(reversedString(c).replace("/", "")));
          }else if(firstCharacter=="×"){
            setCalculExpression(c => reversedString(reversedString(c).replace("*", "")));
          }else{
            setCalculExpression(c =>c.replace(c.at(-1), ""));
          }

          return
      case "OPERATOR":
        if(ele.name==="×"){
          setCalculExpression(c=>c+"*")
          return
        }
        else if(ele.name=="÷"){
          setCalculExpression(c=>c+"/")
          return
        }
        setCalculExpression((c)=>c+str)
        
        return
      case "CHANGE_SIGN":
        try {
          const tmp=eval(-eval(calculExpression))
          if(tmp)
            setCalculExpression(c=>(-eval(c)).toString())
        } catch (error) {
          return
        }
        return
      case "PERCENTAGE":
        try{
          const tmp=eval(calculExpression)
          if(tmp)
            setCalculExpression(c=>(eval(c)/100).toString())
        }catch(e){}

        return
      case "MEMORY_CLEAR":
        setResultsStack([])
        break
      default:break
    }
    setCalculExpression(c=>c+str)
    setPrintResult(false)
    
  }

  useEffect(()=>{
    if (cursorPosition>0)
      setCalculExpression()
  }, [cursorPosition])
  
  return (
    <div className='keys'>
      {
        lines.map((line, id)=>{       
          return <div key={id} className='line'>
            {
              line.map((ele, id)=>{
                const valueToDisplay=ele.name?ele.name:ele.valueToDisplay
                return ele.role!=="POWER"?(

                  <span key={id} className='line__command' aria-type={ele.role} style={ele.color?{background:ele.color}:null}  onClick={(e)=>addKeyToString(ele)}>{valueToDisplay}</span>
                ):( 
                  <Power key={id} setPrintResult={setPrintResult} setCalculExpression={setCalculExpression} isPowerOn={isPowerOn} setIsPowerOn={setIsPowerOn}/>
                )
              })
            }
          </div> 
        })      
      }
    </div>
  )
}

export default Keys