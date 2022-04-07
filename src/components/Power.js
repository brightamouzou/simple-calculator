import React, { useState } from 'react'

function Power({setPrintResult,setCalculExpression,isPowerOn, setIsPowerOn}){

  return (
    <div className='power'>
        <button className={isPowerOn? "isPowerOn":"isPowerOff"} onClick={()=>{setIsPowerOn(v=>!v); setCalculExpression(""); setPrintResult("")}}>
            <img src="./power.svg"alt="power"/>
        </button>
    </div>
  )
}

export default Power