import React, { useEffect, useState } from 'react'
import './Home.css'
import Post from '../../components/Post/Post'
import CreatePostDialogue from '../../components/CreatePostModal/CreatePostDialogue'
import DarkBackground from '../../components/DarkBackground/DarkBackground'
import { PostType } from '../../types/types'
import { getPostsHandler } from '../../utils/Processors'

const Home: React.FC = ()=>{
  const [posts, setPosts] = useState<PostType[]>([])
  const [dialogue, setDialogue] = useState(false)
  
  useEffect(()=>{
    getPostsHandler(setPosts)
  }, [dialogue])
  
  return (
    <div className='home-container'>
      {
        dialogue&& <>
          <CreatePostDialogue {...{setDialogue, dialogue}}/>
          <DarkBackground {...{setDialogue}}/>
        </>
      }
      <div dir='rtl' className='create-post'>
        <p>هل تريد إضافة منشور؟</p>
        <button className='create-post-btn' onClick={()=> setDialogue(true)}> إنشاء منشور</button>
      </div>
      {posts?.length>0? (
      <div className='posts'>
        {posts?.map((post)=>
          (<Post {... {post}} key={post.id}/>)
        )}
      </div>
      ) :
      <h1 className='no-posts' dir='rtl'>لا توجد منشورات...</h1>}
    </div>
  )
}

export default Home