import React,{ useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Cookies from 'js-cookie'
import './Profile.css';
import Post from '../../components/Post/Post'
import { UserType, PostType } from '../../types/types'
import { useFriends } from '../../context/FriendsContext';
import { getPostsHandler, getUserFriendsHandler, getUserHandler } from '../../utils/Processors';
import UserIcon from '/src/assets/user.png'

const Profile: React.FC = () => {
  const [friends, setFriends] = useState<UserType[]>([])
  const { userId } = useParams();
  const [user, setUser] = useState<UserType | null>(null)
  const [posts, setPosts] = useState<PostType[]>([])
  const [user_id,setUser_id] = useState('')
  const [myProfile, setMyProfile] = useState(false)
  const [friendStatus, setFriendStatus] = useState('none')
  
  const user_data = Cookies.get('user_data')

  const { sentFriendRequests, myFriends, sendFriendRequest, removeFriend, removeFriendRequest } = useFriends()
  
  const handleFriendAction = () => {
    let request = sentFriendRequests.find((request)=> request.receiver_id==userId)
    if(!userId){
      console.log('حدث خطأ')
    }
    else if(friendStatus=='none'){
      sendFriendRequest(userId)

    }else if(friendStatus=='friends'){
      removeFriend(userId)
    }else{
      if(sentFriendRequests && request){
        removeFriendRequest(request.id)
      }
    }
    
  };

  useEffect(()=>{
    if(userId) {
      getUserHandler(setUser, userId)
      getUserFriendsHandler(setFriends, userId)
    }
    getPostsHandler(setPosts)
    if(user_data){
      setUser_id(JSON.parse(user_data).user_id)
    }
    console.log(user)
  },[userId])
  
  useEffect(()=>{
    if(user && user_id){
      if(user.id == user_id){
        setMyProfile(true)
      }else{
        setMyProfile(false)
      }
    }    
    if(myFriends || sentFriendRequests){
      
      let checkFriend = myFriends.find((friend)=>friend.id==userId)
      checkFriend && setFriendStatus('friends')
      let checkFriendRequest = sentFriendRequests?.find((request)=>request.receiver_id == userId)
      checkFriendRequest && setFriendStatus('pending')
      
      if(!(checkFriend || checkFriendRequest)) setFriendStatus('none')
    }
  console.log(myFriends?.length)
  },[user, myFriends, sentFriendRequests])
  
  return (
    <div className="profile-page-container">
      <div className="profile-page-header">
      {user?
        <>
        <img src={UserIcon} alt="" className="profile-page-pic" />
        <h1>{`${user.firstname} ${user.lastname}`}</h1>
        <p>@{user.username}</p>
        <p>Email: {user.email}</p>
        <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
        </> : ''
      }
        
        {!myProfile&& 
          <button
            className={`friend-status-btn ${
              friendStatus=='friends'? 'friends-btn' : friendStatus=='pending'? 'pending-btn' : 'add-friend-btn'
            }`}
            onClick={handleFriendAction}
          >
            {friendStatus=='friends' ? 'أصدقاء' : friendStatus== 'pending'? 'تم الطلب' : 'إضافة صديق'}
          </button>
        }
      </div>

      <div className="friends-section">
        <div className='header' dir='rtl'>
          <h2>قائمة الأصدقاء</h2>
          <h3>({friends?.length})</h3>
        </div>
        {friends?.length>0 ?
        <div className="friends-list">
          {friends.map((friend) => (
            <div key={friend?.id} className="friend-card">
              <img
                src='/src/assets/user.png'
                alt={`${friend.firstname} ${friend.lastname}`}
                className="friend-pic"
              />
              <h3>{`${friend?.firstname} ${friend?.lastname}`}</h3>
              <p>@{friend?.username}</p>
            </div>
          ))}
        </div>
        : 
          <div dir='rtl'>{!myProfile? 'هذا المستخدم ليس لديه أصدقاء...': 'ليس لديك أصدقاء بعد...'}</div>
        }
      </div>
      <div className="posts-section">
        <h2 dir='rtl'>{!myProfile? 'منشورات المستخدم': 'منشوراتي'}</h2>
        <div className="posts-list">
          {posts?.map((post) => (
            <Post {...{post}} key={post.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;  