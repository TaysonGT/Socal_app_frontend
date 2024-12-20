import React, {useEffect, useState} from 'react';
import './PeopleSlider.css';
import Cookies from 'js-cookie'

const PeopleSlider = ({users}) => {
  const [user_id,setUser_id] = useState('')
  const user_data = Cookies.get('user_data')

  
  useEffect(()=>{
    if(user_data){
      setUser_id(JSON.parse(user_data).user_id)
    }
  },[])
  
  const handleAddFriend = (id) => {
    console.log(`Added friend with ID: ${id}`);
    // Add your "add friend" logic here
  };

  return (
    <div className="slider-container">
      {users?.map((user) => (
        <div className="user-slider-card" key={user?.id}>
          <img src={user?.profilepic||'/src/assets/user.png'} alt={`${user?.username}`} className="user-slider-image" />
          <h3 className="user-slider-name">{user?.firstname} {user?.lastname}</h3>
          <h3 className="user-slider-username">@{user?.username}</h3>
          <button className={"add-friend-button" } onClick={() => handleAddFriend(user?.id)}>
            إضافة صديق
          </button>
        </div>
      ))}
    </div>
  );
};

export default PeopleSlider;