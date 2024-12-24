import React, { useState, useEffect } from "react";
import '../../Post.css'
import Cookies from 'js-cookie'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LikeType, UserType, CommentType  } from '../../../../types/types'
import { getCommentLikesHandler , getUserHandler, likeCommentHandler } from "../../../../utils/Processors";

interface Props {
  comment: CommentType;
}

const Comment: React.FC<Props> = ({ comment }) => {
  const [user, setUser] = useState<UserType| null>(null)
  const [likes, setLikes] = useState<LikeType[]>([])
  const [liked, setLiked] = useState(false)
  const [user_id, setUser_id] = useState('')
  const user_data = Cookies.get('user_data')
  
   
  useEffect(()=>{
    getUserHandler(setUser, comment.user_id)
    getCommentLikesHandler(setLikes, comment.id)
    if(user_data) setUser_id(JSON.parse(user_data).user_id)
  },[])
  
  useEffect(()=>{
    if(likes){
      let checkLiked = likes.filter((like)=>like.user_id==user_id)
      if(checkLiked.length>0) setLiked(true)
    }
    
  },[likes])
  
  const likeHandler = ()=>{
    likeCommentHandler(setLikes, liked, setLiked, comment.user_id)
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