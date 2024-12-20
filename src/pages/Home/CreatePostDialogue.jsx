import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import './Dialogue.css'

const CreatePostDialogue = ({setDialogue}) => {
  
  const [postContent, setPostContent] = useState('')
  
  const postHandler = (e)=>{
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
        <form>
          <div>
            <textarea onInput={(e)=> setPostContent(e.target.value)} placeholder='ماذا يخطر ببالك؟' />    
          </div>
          <button onClick={(e)=> postHandler(e)}>نشر</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePostDialogue