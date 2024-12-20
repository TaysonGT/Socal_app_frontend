import React, {useEffect, useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import './Post.css'
import User from '../../assets/user.png'
import Cookies from 'js-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaRegCommentAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import CommentsModal from './CommentsModal'


const Post = ({post, friends})=>{
  const [refresh, setRefresh] = useState(false)
  const [liked, setLiked] = useState(false)
  const [isFriend, setIsfriend] = useState(false)
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([])
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [hovered, setHovered] = useState(false);
  const [user_id,setUser_id] = useState('')
  const user_data = Cookies.get('user_data')
  const nav = useNavigate()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const commentHandler = ()=>{
    setIsModalOpen(true)
  }
  
  const handleCloseModal = ()=>{
    setIsModalOpen(false)
  }
  
  const handleAddComment = (content)=>{
    axios.post(`/posts/comment/${post.id}`, {content}, {withCredentials:true})
    .then(({data})=>
    {
      if(data.success){
        toast.success(data.message)
        setRefresh((prev)=>!prev)
      }else toast.error(data.message)
    }
    )
  }
  
  const addFriendHandler = ()=>{
    axios.post(`/friends/request/${post.user_id}`, {withCredentials: true})
    .then(({data})=>{
      data.success? toast.success(data.message) : toast.error(data.message)
    })
  }
  
  const showProfileHandler = ()=>{
    nav(`/profile/${user_id}`)
  }
  
  const likeHandler = ()=>{
    axios.post(`/posts/like/post/${post?.id}`, {withCredentials:true})
    .then(({data})=>{
      if(data.success) {
        if(liked){
          setLikes((prevItems)=> prevItems.filter((item)=> item.user_id !== user_id))
        }else{
          setLikes((prevItems)=> [...prevItems, {id: likes.length+2, user_id, post_id: post.id}])
        }
        setLiked(!liked)
        toast.success(data.success)
      }else{
        toast.error(data.message)
      }
    })
  }
  
  useEffect(()=>{
    setLikes([])
    setComments([])
    
    if(user_data){
      setUser_id(JSON.parse(user_data).user_id)
    }
    axios.get(`/users/${post.user_id}`)
    .then(({data})=>{
      if(data.success){
        setFullname(`${data.user.firstname} ${data.user.lastname}`)
        setUsername(data.user.username)
      }else{
        toast.error('برجاء اعادة تحميل الصفحة')
      }})
    axios.get(`/posts/like/post/${post.id}`)
    .then(({data})=>{
      setLikes(data.likes)
    })
    axios.get(`/posts/comment/all/${post.id}`)
    .then(({data})=>{
      if(data.success){
        setComments(data.comments)
      }else{
        toast.error('برجاء اعادة تحميل الصفحة')
      }
    })
    if(friends) { 
      setIsfriend(friends.find((friend)=>friend.id==post.user_id))
    }
  },[refresh])
  
  useEffect(()=>{
    if(likes){
      let checkLiked = likes.filter((like)=>like.user_id==user_id)
      if(checkLiked.length>0) setLiked(true)
    }
    
  },[likes, refresh])
  
  return (
    <div className='post'>
      <div className='post-data'>
        <div 
        className="post-user"
        onMouseEnter={() => {setHovered(true); console.log(hovered)}}
        onMouseLeave={() => setHovered(false)}
        >
          <img className="post-user-img" src={User}/>
          <div>
            <p>{fullname}</p>
            <p className='username'>@{username}</p>
          </div>
          {hovered && 
            <div className={`post-profile-card ${hovered? "show":""}`}>
              <h3>{fullname}</h3>
              {(post.user_id == user_id)? 
                <button className="card-button">ملفي الشخصي</button>
              : <>
                  {isFriend? <button className="card-button friends" onClick={addFriendHandler}>أصدقاء</button> :<button className="card-button" onClick={addFriendHandler}>إضافة صديق</button>}
                  <button className="card-button" onClick={showProfileHandler}>عرض الملف الشخصي</button>
                </>
              }
            </div>
          }
        </div>
        <div className='sec2'>
          {new Date(post.created_at).toLocaleString()}
        </div>
        
      </div>
      <div className='post-content'>
        {post?.content}
      </div>
      <div className='post-options'>
        <div className='like-post sec' onClick={likeHandler}>
          {liked? <FaHeart className='opt-icon'/>: <FaRegHeart className='opt-icon'/>}
          <p>
            {likes.length}
          </p>
        </div>
        <div className="comment-post sec" onClick={commentHandler}>
          <FaRegCommentAlt className='opt-icon'/>
          <p>
            {comments.length}
          </p>
        </div>
        {isModalOpen&& 
          <CommentsModal
            comments={comments}
            onClose={handleCloseModal}
            onAddComment={handleAddComment}
            {...{setRefresh}}
          />
        }
      </div>
    </div>
  )
}

export default Post

