import React, { useEffect, useState } from 'react'
import './Home.css'
import Post from './Post'
import axios from 'axios'
import CreatePostDialogue from './CreatePostDialogue'
import DarkBackground from '../../components/DarkBackground'
import { UserType, PostType } from '../../types/types'

const Home: React.FC = ()=>{
  const [posts, setPosts] = useState<PostType[]>([])
  const [friends, setFriends] = useState<UserType[]>([])
  const [dialogue, setDialogue] = useState(false)
  useEffect(()=>{
    axios.get('/posts/all')
    .then(({data})=>{
      setPosts(data.posts)
    })
    axios.get('/friends/all')
    .then(({data})=>{
      setFriends(data.users)
    })
    
  }, [dialogue])
  
  return (
    <div className='home-container'>
      {
        dialogue&& <>
          <CreatePostDialogue {...{setDialogue}}/>
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
          (<Post {... {post, friends}} key={post.id}/>)
        )}
      </div>
      ) :
      <h1 className='no-posts' dir='rtl'>لا توجد منشورات...</h1>}
    </div>
  )
}

export default Home