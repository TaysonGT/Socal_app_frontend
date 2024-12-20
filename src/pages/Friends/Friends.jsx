import React, {useEffect, useState} from "react";
import "./Friends.css";
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Friends = () => {
  const [friends, setFriends] = useState([])
  const [friendRequests, setFriendRequests] = useState([])
  const [users, setUsers] = useState([]) 
  const [refresh, setRefresh] = useState(false)
  
  const nav = useNavigate()
  
  useEffect(()=>{
    axios.get('/friends/all')
    .then(({data})=>{
      setFriends(data.users)
    })
    axios.get('/friends/request/')
    .then(({data})=>{
      setFriendRequests(data.friendRequests)
      setUsers(data.users)
    })
  },[refresh])
  
  const onAcceptRequest = (id)=>{
    axios.put(`/friends/request/accept/${id}`)
    .then(({data})=>{
      if(data.success){
        toast.success(data.message)
        setRefresh((prev)=>!prev)
      }else toast.error(data.message)
    })
  }
  
  const toProfileHandler = (id)=>{
    nav(`/profile/${id}`)
  }
  
  return (
    <div className="friends-page">
      <h1 className="page-title" dir='rtl'>الأصدقاء</h1>

      <div className="section">
        <h2 className="section-title" dir='rtl'>أصدقائي</h2>
        <div className="friends-grid">
          {friends?.map((friend) => (
            <div key={friend.id} className="friend-card">
              <img
                src={friend.profilePic|| '/src/assets/user.png'}
                alt={`${friend.username}'s profile`}
                className="friend-img"
              />
              <h3 className="friend-name">{friend.firstname} {friend.lastname}</h3>
              <button className="btn btn-view" onClick={()=>toProfileHandler(friend.id)}>عرض الملف الشخصي</button>
            </div>
          ))}
        </div>
      </div>

      {/* Friend Requests Section */}
      <div className="section">
        <h2 className="section-title" dir='rtl'>طلبات الصداقة</h2>
        <div className="requests-list">
          {friendRequests?.map((request) => {
          let user = users.find((user)=>user.id==request.sender_id) 
          return(
          
            <div key={request.id} className="request-card">
              <div className="request-info">
                <img
                  src={'/src/assets/user.png'}
                  alt={`${user.username}'s profile`}
                  className="request-img"
                />
                <div>
                  <h3 className="request-name">{user.firstname} {user.lastname}</h3>
                  <p className="request-email">{user.email}</p>
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
      </div>
    </div>
  );
};

export default Friends;