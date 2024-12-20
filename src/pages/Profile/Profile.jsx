import React,{ useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Cookies from 'js-cookie'
import './Profile.css';
import Post from '../Home/Post'
import axios from 'axios';
import toast from 'react-hot-toast'

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([])
  const [friends, setFriends] = useState([])
  const [user_id,setUser_id] = useState('')
  const [myProfile, setMyProfile] = useState(false)
  const [friendStatus, setFriendStatus] = useState('none')
  
  const user_data = Cookies.get('user_data')
  
  const handleFriendAction = () => {
    if(friendStatus=='none'){
      axios.post(`/friends/request/${userId}`)
      .then(({data})=>{
        if(data.success){
          toast.success(data.message)
          setFriendStatus('pending')
        }else toast.error(data.message)
      })
    }
  };

  useEffect(()=>{
    axios.get(`/users/${userId}`)
    .then(({data})=>{
      setUser(data.user)
    })
    axios.get(`/posts/all/${userId}`)
    .then(({data})=>{
      setPosts(data.posts)
    })
    axios.get(`/friends/all/${userId}`)
    .then(({data})=>{
      setFriends(data.users)
    })
    if(user_data){
      setUser_id(JSON.parse(user_data).user_id)
    }
  },[])
  
  useEffect(()=>{
    if(user && user_id){
      if(user.id == user_id){
        setMyProfile(true)
      }else{
        setMyProfile(false)
      }
    }    
    if(friends){
      let check = friends.find((friend)=> friend.id == user_id)
      check&& setFriendStatus('friends')
    }
  },[user, friends])
  
  return (
    <div className="profile-page-container">
      <div className="profile-page-header">
        <img src={user?.profilepic || '/src/assets/user.png'} alt="Profile" className="profile-page-pic" />
        <h1>{`${user?.firstname} ${user?.lastname}`}</h1>
        <p>@{user?.username}</p>
        <p>Email: {user?.email}</p>
        <p>Joined: {new Date(user?.created_at).toLocaleDateString()}</p>
        
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
          <h2>قائمة الأصدقاء:</h2>
          <h3>({friends.length})</h3>
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
        <h2 dir='rtl'>{!myProfile? 'منشورات المستخدم:': 'منشوراتي'}</h2>
        <div className="posts-list">
          {posts?.map((post) => (
            <Post {...{post}}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;  