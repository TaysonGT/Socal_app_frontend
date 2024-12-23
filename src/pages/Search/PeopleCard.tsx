import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
import { UserType, FriendRequestType } from '../../types/types'

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>; 
  refresh: boolean; 
  user: UserType;
  user_id: string; 
}

const PeopleCard: React.FC<Props> = ({setRefresh, refresh, user, user_id}) => {
  const [friendStatus, setFriendStatus] = useState('none')
  
  const [friends, setFriends] = useState<typeof user[]>([])
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([])
  const handleAddFriend = () => {
    let request = friendRequests.find((request)=> request.receiver_id==user.id)
    if(friendStatus=='none'){
      axios.post(`/friends/request/${user.id}`)
      .then(({data})=>{
        if(data.success){
          toast.success(data.message)
          setRefresh((prev: boolean)=>!prev)
        }else toast.error(data.message)
      })
    }else if(friendStatus=='friends'){
      axios.delete(`/friends/${user.id}`)
      .then(({data})=>{
        if(data.success) {
          toast.success(data.message)
          setRefresh((prev: boolean)=>!prev)
        }else toast.error(data.message)
      })
    }else{
      if(friendRequests && request){
        axios.delete(`/friends/request/${request.id}`)
        .then(({data})=>{
          if(data.success){
            toast.success(data.message) 
            setRefresh((prev: boolean)=>!prev)
          } else toast.error(data.message)
          
        })
      }
    }
    
  };
  
  useEffect(()=>{
    axios.get(`/friends/all/${user.id}`)
    .then(({data})=>{
      setFriends(data.users)
    })
    axios.get(`/friends/request/me`)
    .then(({data})=>{
      setFriendRequests(data.requests)
    })
  }, [refresh])
  
  useEffect(()=>{
    if(friends || friendRequests){
      let checkFriend = friends.find((friend)=>friend.id==user_id)
      checkFriend && setFriendStatus('friends')
      let checkFriendRequest = friendRequests?.find((request)=>request.receiver_id == user.id)
      checkFriendRequest && setFriendStatus('pending')
      
      if(!(checkFriend || checkFriendRequest)) setFriendStatus('none')
    }
  },[friends, friendRequests, refresh])
  
  return (
    <div className="user-slider-card" key={user?.id}>
      <img src='/src/assets/user.png' alt={`${user?.username}`} className="user-slider-image" />
      <h3 className="user-slider-name">{user?.firstname} {user?.lastname}</h3>
      <h3 className="user-slider-username">@{user?.username}</h3>
      <button
      className={`friend-status-btn ${
              friendStatus=='friends'? 'friends-btn' : friendStatus=='pending'? 'pending-btn' : 'add-friend-btn'
            }`}
            onClick={handleAddFriend}
          >
            {friendStatus=='friends' ? 'أصدقاء' : friendStatus== 'pending'? 'تم الطلب' : 'إضافة صديق'}
      </button>
    </div>
  )
}

export default PeopleCard