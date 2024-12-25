import React,{ useState, useEffect } from 'react';
import { UserType } from '../../../types/types'
import { useFriends } from '../../../context/FriendsContext';
import { Link } from 'react-router';
import { useAuth } from '../../../context/AuthContext';

interface Props {
  user: UserType;
}

const PeopleCard: React.FC<Props> = ({user}) => {
  const [friendStatus, setFriendStatus] = useState('none')
  const { myFriends, sentFriendRequests, sendFriendRequest, removeFriend, removeFriendRequest } = useFriends()

  const { currentUser } = useAuth()
  
  const handleAddFriend = () => {
    let request = sentFriendRequests?.find((request)=> request.receiver_id==user.id)
    if(friendStatus=='none'){
      sendFriendRequest(user.id)
    }else if(friendStatus=='friends'){
      removeFriend(user.id)
    }else{
      if(sentFriendRequests && request){
        removeFriendRequest(request.id)
      }
    }
  };
  
  useEffect(()=>{
    if(myFriends || sentFriendRequests){
      let checkFriend = myFriends?.find((friend)=>friend.id== user.id)
      checkFriend && setFriendStatus('friends')
      let checkFriendRequest = sentFriendRequests?.find((request)=>request.receiver_id == user.id)
      checkFriendRequest && setFriendStatus('pending')
      
      if(!(checkFriend || checkFriendRequest)) setFriendStatus('none')
    }
  },[myFriends, sentFriendRequests])
  
  return (
    <div className="user-slider-card" key={user?.id}>
      <img src='/src/assets/user.png' alt={`${user?.username}`} className="user-slider-image" />
      <h3 className="user-slider-name">{user?.firstname} {user?.lastname}</h3>
      <h3 className="user-slider-username">@{user?.username}</h3>
      <div className="action-btns">
        {(user.id != currentUser!.id)&& 
        <button
        className={`btn friend-action-btn ${
                friendStatus=='friends'? 'friends-btn' : friendStatus=='pending'? 'pending-btn' : 'add-friend-btn'
              }`}
              onClick={handleAddFriend}
            >
              {friendStatus=='friends' ? 'أصدقاء' : friendStatus== 'pending'? 'تم الطلب' : 'إضافة صديق'}
        </button>
        } 
        <Link className='profile-btn' to={`/profile/${user.id}`}>عرض الملف الشخصي</Link>
      </div>
    </div>
  )
}

export default PeopleCard