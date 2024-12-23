import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import './Dialogue.css'

interface Props {
  setDialogue: React.Dispatch<React.SetStateAction<boolean>>
}

const CreatePostDialogue: React.FC<Props> = ({setDialogue}) => {
  
  const [postContent, setPostContent] = useState<string>('')
  
  const postHandler = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
      if(postContent){
        axios.post('/posts', {content:postContent}, {withCredentials: true})
        .then(({data})=>{
          data.success? toast.success(data.message) : toast.error(data.message)
          setDialogue(false)
        })
      }else{
        toast.error('برجاء إدخال محتوى للمنشور')
      }
  }
  useEffect(()=>{
    setPostContent('')
  },[])

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