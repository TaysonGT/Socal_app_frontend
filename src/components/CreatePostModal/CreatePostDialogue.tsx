import React, { useEffect, useState } from 'react'
import './CreatePostDialogue.css'
import { addPostHandler } from '../../utils/Processors'

interface Props {
  setDialogue: React.Dispatch<React.SetStateAction<boolean>>
  dialogue: boolean
}

const CreatePostDialogue: React.FC<Props> = ({setDialogue, dialogue}) => {
  
  const [postContent, setPostContent] = useState<string>('')
  
  const postHandler = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    addPostHandler(postContent, setDialogue)
  }
  useEffect(()=>{
    setPostContent('')
  },[dialogue])

  return (
    <div dir='rtl' className='dialogue-container'>
      <div className="dialogue">
      <h2 className="dialogue-title">إنشاء منشور</h2>
        <form onSubmit={postHandler}>
          <div>
            <textarea onInput={(e)=> setPostContent(e.currentTarget.value)} placeholder='ماذا يخطر ببالك؟' />    
          </div>
          <button type="submit">نشر</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePostDialogue