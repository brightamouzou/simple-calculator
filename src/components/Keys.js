import React, { useEffect, useRef } from 'react'
import Power from './Power';
import { lines, reversedString, reg, reg2, formattedString} from './utils'



function Keys({keysProps:
  {submit, clickedEqual,isPowerOn,setIsPowerOn,setCalculExpression,calculExpression, setPrintResult, lastInput,setLastInput, setCursorPosition,cursorPosition,setResult, setResultsStack,resultsStack}}
){

  const calculExpressionInput=useRef();
  calculExpressionInput.current=document.querySelector(".calculExpressionInput");
 

  // useEffect(()=>{
  //   const equal=document.querySelector("span[aria-type='EQUAL']");
  //   console.log(calculExpression.at(-1));
  //   equal.addEventListener("click", ()=>{
  //       try {
  //         setPrintResult(true)
  //         document.forms[0].submit()

  //       } catch (e) {
  //         setPrintResult(false)
  //         setResult("Invalid expression")
  //         return;
  //       }

  //   })

  // }, [])
  async function addKeyToString(ele){
    calculExpressionInput.current.focus()
    setPrintResult(false)

    if(!isPowerOn){
      setPrintResult(false)
      return
    }
    let str=ele.name;
    switch(ele.role){

      case "EQUAL":
        setPrintResult(true)
        submit.click()
        // clickedEqual()
        return
      case "ANS":
        if(resultsStack.length)
          setCalculExpression(resultsStack.at(-1)[1])
        return
      case "C":
          const firstCharacter=reversedString(calculExpression).at(0) 
          if (firstCharacter==="/"){
            setCalculExpression(c => reversedString(reversedString(c).replace("/", "")));
          }else if(firstCharacter==="*"){
            setCalculExpression(c => reversedString(reversedString(c).replace("*", "")));
          }else{
            setCalculExpression(c =>reversedString(reversedString(c).slice(1,)));
          }

          return
      case "OPERATOR":

        if(ele.name==="×"){
          // setCalculExpression(c=>c+"*")
          str="*"
          // return
        }
        else if(ele.name==="÷"){
          str="/"
          // setCalculExpression(c=>c+"/")
          // return
        }

        setCalculExpression(formattedString(calculExpression, str))
      
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

    // const tmp=parseFloat(calculExpression)
    // if(tmp){
    //   console.log(tmp);
    //   setCalculExpression(c=>tmp+str)
    // }
    // else
    //   setCalculExpression(c=>c+str)
    // setPrintResult(false)
    
  }


  
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