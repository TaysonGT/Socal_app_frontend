import React from 'react'
import '../App.css';

const DarkBackground = ({setDialogue})=>{
  return (
    <div className='dark-background' onClick={()=>setDialogue(false)}>
      
    </div>
  )
}

export default DarkBackground