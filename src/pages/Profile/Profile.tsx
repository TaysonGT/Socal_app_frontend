import React,{ useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import './Profile.css';
import Post from '../../components/Post/Post'
import { UserType, PostType } from '../../types/types'
import { useFriends } from '../../context/FriendsContext';
import { getUserPostsHandler, getUserFriendsHandler, getUserHandler } from '../../utils/Processors';
import UserIcon from '/src/assets/user.png'
import PeopleSlider from '../../components/PeopleSlider/PeopleSlider';
import { useAuth } from '../../context/AuthContext';

const Profile: React.FC = () => {
  const [friends, setFriends] = useState<UserType[]>([])
  const { userId } = useParams();
  const [user, setUser] = useState<UserType | null>(null)
  const [posts, setPosts] = useState<PostType[]>([])
  const [myProfile, setMyProfile] = useState(false)
  const [friendStatus, setFriendStatus] = useState('none')
  
  
  const user_id = useAuth().currentUser?.id

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
    setUser(null)
    setFriends([])
    setPosts([])
    setFriendStatus('none')
    if(userId) {
      getUserHandler(setUser, userId)
      getUserFriendsHandler(setFriends, userId)
      getUserPostsHandler(setPosts, userId)
    }
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
            className={`profile-friend-action-btn ${
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
        <PeopleSlider {... {users: friends}}/>
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