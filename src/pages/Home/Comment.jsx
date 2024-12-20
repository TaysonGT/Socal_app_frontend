import React, { useState, useEffect } from "react";
import './Post.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'
import { FaRegCommentAlt, FaHeart, FaRegHeart } from "react-icons/fa";

const Comment = ({ comment, setRefresh }) => {
  const [user, setUser] = useState()
  const [likes, setLikes] = useState()
  const [liked, setLiked] = useState(false)
  const [user_id, setUser_id] = useState()
  const user_data = Cookies.get('user_data')
  
   
  useEffect(()=>{
    axios.get(`/users/${comment.user_id}`)
    .then(({data})=>setUser(data.user))
    axios.get(`/posts/like/comment/${comment.id}`)
    .then(({data})=>setLikes(data.likes))
    if(user_data) setUser_id(JSON.parse(user_data).user_id)
  },[])
  
  useEffect(()=>{
    if(likes){
      let checkLiked = likes.filter((like)=>like.user_id==user_id)
      if(checkLiked.length>0) setLiked(true)
    }
    
  },[likes])
  
  const likeHandler = ()=>{
    axios.post(`/posts/like/comment/${comment.id}`)
    .then(({data})=>{
      if(data.success){
        toast.success(data.message)
        if(liked){
          setLikes((prevItems)=> prevItems.filter((item)=> item.user_id !== user_id))
        }else{
          setLikes((prevItems)=> [...prevItems, {id: likes.length+2, user_id, comment_id: comment.id}])
        }
        setLiked((prev)=>!prev)
      }
    })
  }
  return (
    <div className='comment-container' dir='rtl'>
      <div className='user-data'>
        <img src='/src/assets/user.png' />
        <div className='name'>
          <div className='fullname'>{user?.firstname} {user?.lastname}</div>
          <div className='username'>@{user?.username}</div>
        </div>
        <div className='date'>{new Date(comment?.created_at).toLocaleString()}</div>
      </div>
      <div className='main'>
        <div className='content'>{comment.content}</div>
        <div className='likes' onClick={likeHandler}>
          <div className='count'>{likes?.length}</div>
          <div className='btn'>
            {liked?
              <FaHeart/>
              :
              <FaRegHeart/>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment