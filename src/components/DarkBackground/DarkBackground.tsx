import React from 'react'
import '../../App.css';

const DarkBackground = ({setDialogue} : {setDialogue: React.Dispatch<React.SetStateAction<boolean>>})=>{
  return (
    <div className='dark-background' onClick={()=>setDialogue(false)}>
      
    </div>
  )
}

export default DarkBackground