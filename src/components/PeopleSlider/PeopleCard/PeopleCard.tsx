import React,{ useState, useEffect } from 'react';
import { UserType } from '../../../types/types'
import { useFriends } from '../../../context/FriendsContext';

interface Props {
  user: UserType;
  user_id: string; 
}

const PeopleCard: React.FC<Props> = ({user, user_id}) => {
  const [friendStatus, setFriendStatus] = useState('none')
  const { myFriends, friendRequests, sendFriendRequest, removeFriend, removeFriendRequest } = useFriends()

  const handleAddFriend = () => {
    let request = friendRequests.find((request)=> request.receiver_id==user.id)
    if(friendStatus=='none'){
      sendFriendRequest(user.id)
    }else if(friendStatus=='friends'){
      removeFriend(user.id)
    }else{
      if(friendRequests && request){
        removeFriendRequest(request.id)
      }
    }
    
  };
  
  
  useEffect(()=>{
    if(myFriends || friendRequests){
      let checkFriend = myFriends.find((friend)=>friend.id==user_id)
      checkFriend && setFriendStatus('friends')
      let checkFriendRequest = friendRequests?.find((request)=>request.receiver_id == user.id)
      checkFriendRequest && setFriendStatus('pending')
      
      if(!(checkFriend || checkFriendRequest)) setFriendStatus('none')
    }
  },[myFriends, friendRequests])
  
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