import {useEffect, useState} from "react";
import "./Friends.css";
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { FriendRequestType, UserType } from '../../types/types'
// import { getMyFriends } from '../../utils/Processors'

const Friends = () => {
  const [friends, setFriends] = useState<UserType[]>([])
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([])
  const [users, setUsers] = useState<UserType[]>([]) 
  const [refresh, setRefresh] = useState(false)
  
  const nav = useNavigate()
  
  useEffect(()=>{
    axios.get('/friends/all')
    .then(({data})=>{
      setFriends(data.users)
    })
    axios.get('/friends/request/all')
    .then(({data})=>{
      setFriendRequests(data.requests)
      setUsers(data.users)
    })
  },[refresh])
  
  const onAcceptRequest = (id:string)=>{
    axios.put(`/friends/request/accept/${id}`)
    .then(({data})=>{
      if(data.success){
        toast.success(data.message)
        setRefresh((prev)=>!prev)
        nav('/friends')
      }else toast.error(data.message)
    })
  }
  
  const onDeclineRequest = (id:string)=>{
    console.log(id)
  }
  
  const toProfileHandler = (id:string)=>{
    nav(`/profile/${id}`)
  }
  
  return (
    <div className="friends-page">
      <h1 className="page-title" dir='rtl'>الأصدقاء</h1>

      <div className="section">
        <h2 className="section-title" dir='rtl'>أصدقائي</h2>
        {!(friends?.length>0)?
        <div className='feedback' dir='rtl'>ليس لديك أصدقاء...</div> 
        :
        <div className="friends-grid">
          {friends?.map((friend) => (
            <div key={friend.id} className="friend-card">
              <img
                src={'/src/assets/user.png'}
                alt={`${friend.username}'s profile`}
                className="friend-img"
              />
              <h3 className="friend-name">{friend.firstname} {friend.lastname}</h3>
              <button className="btn btn-view" onClick={()=>toProfileHandler(friend.id)}>عرض الملف الشخصي</button>
            </div>
          ))}
        </div>
        }
      </div>

      <div className="section">
        <h2 className="section-title" dir='rtl'>طلبات الصداقة</h2>
        {!(friendRequests?.length>0)?
        <div className='feedback' dir='rtl'>ليس هناك طلبات صداقة...</div> 
        :
        
        <div className="requests-list">
          {friendRequests?.map((request) => {
          let user = users.find((user)=>user?.id==request.sender_id) 
          return(
          
            <div key={request.id} className="request-card">
              <div className="request-info">
                <img
                  src={'/src/assets/user.png'}
                  alt={`${user?.username}'s profile`}
                  className="request-img"
                />
                <div>
                  <h3 className="request-name">{user?.firstname} {user?.lastname}</h3>
                  <p className="request-email">{user?.email}</p>
                </div>
              </div>
              <div className="request-actions">
                <button
                  onClick={() => onAcceptRequest(request.id)}
                  className="btn btn-accept"
                >
                  قبول
                </button>
                <button
                  onClick={() => onDeclineRequest(request.id)}
                  className="btn btn-decline"
                >
                  رفض
                </button>
              </div>
            </div>
          )})}
        </div>
        }
      </div>
    </div>
  );
};

export default Friends;