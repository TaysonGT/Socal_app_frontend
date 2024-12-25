import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Post.css'
import { FaRegCommentAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import CommentsModal from './CommentsModal/CommentsModal'
import { LikeType, CommentType, PostType, UserType } from '../../types/types'
import { useFriends } from '../../context/FriendsContext'
import { getUserHandler, likePostHandler, getPostLikesHandler, getCommentsHandler, addCommentHandler } from '../../utils/Processors'
import { useAuth } from '../../context/AuthContext'

interface Props {
  post: PostType;
}

const Post: React.FC<Props> = ({post})=>{
  const [user, setUser] = useState<UserType| null>(null)
  const [comments, setComments] = useState<CommentType[]>([])
  const [likes, setLikes] = useState<LikeType[]>([])
  const [liked, setLiked] = useState(false)
  const [friendStatus, setFriendStatus] = useState<string | null>('none')
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hovered, setHovered] = useState(false);
  const [refresh, setRefresh] = useState(false)

  const nav = useNavigate()
  
  const { id: user_id } = useAuth().currentUser!  
  const {myFriends, sentFriendRequests, sendFriendRequest, removeFriend, removeFriendRequest} = useFriends()
  
  const handleAddComment = (content: string)=>{
    addCommentHandler(content, setRefresh, post.id)
  }
  
  const addFriendHandler = ()=>{
    let userId = post.user_id
    if(friendStatus=='none'){
      sendFriendRequest(userId)
    }else if(friendStatus=='pending'){
      let request = sentFriendRequests.find((request)=> request.receiver_id==userId)
      request && removeFriendRequest(request.id)
    } else{
      removeFriend(userId)
    }
  }
  
  const likeHandler = ()=>{
    likePostHandler(setLikes, liked, setLiked, post.id)
  }
  
  useEffect(()=>{
    setLikes([])
    setComments([])
    
    getUserHandler(setUser, post.user_id)
    getPostLikesHandler(setLikes, post.id)
    getCommentsHandler(setComments, post.id)

  },[refresh])
  
  useEffect(()=>{
    setFriendStatus(null)
    if(likes){
      let checkLiked = likes.filter((like)=>like.user_id==user_id)
      if(checkLiked.length>0) setLiked(true)
    }
    if(myFriends || sentFriendRequests){
      let checkFriend = myFriends?.find((friend)=>friend.id==post.user_id)
      checkFriend && setFriendStatus('friends')
      let checkFriendRequest = sentFriendRequests?.find((request)=>request.receiver_id == post.user_id)
      checkFriendRequest && setFriendStatus('pending')
      
      if(!(checkFriend || checkFriendRequest)) setFriendStatus('none')
    }
  },[likes, myFriends, sentFriendRequests, refresh])
  
  return (
    <div className='post'>
      <div className='post-data'>
        <div 
        className="post-user"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
          <img className="post-user-img" src='/src/assets/user.png'/>
          <div>
            <p>{user?.firstname} {user?.lastname}</p>
            <p className='username'>@{user?.username}</p>
          </div>
          {hovered && 
            <div className={`post-profile-card ${hovered? "show":""}`}>
              <h3>{user?.firstname} {user?.lastname}</h3>
              {(post.user_id == user_id)? 
                <button className="card-button">ملفي الشخصي</button>
              : <>
                  {friendStatus == 'friends'? 
                  <button className="card-button friends" onClick={addFriendHandler}>أصدقاء</button>
                  : friendStatus == 'none'? 
                  <button className="card-button" onClick={addFriendHandler}>إضافة صديق</button> 
                  : <button className="card-button pending" onClick={addFriendHandler}>تم الطلب</button>}
                  <button className="card-button" onClick={()=> nav(`/profile/${post.user_id}`)}>عرض الملف الشخصي</button>
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
        <div className="comment-post sec" onClick={()=> setIsModalOpen(true)}>
          <FaRegCommentAlt className='opt-icon'/>
          <p>
            {comments.length}
          </p>
        </div>
        {isModalOpen&& 
          <CommentsModal
            comments={comments}
            onClose={()=> setIsModalOpen(false)}
            onAddComment={handleAddComment}
            {...{setRefresh}}
          />
        }
      </div>
    </div>
  )
}

export default Post

