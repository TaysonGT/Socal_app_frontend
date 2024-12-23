import React, {useEffect, useState} from 'react';
import './PeopleSlider.css';
import Cookies from 'js-cookie'
import PeopleCard from './PeopleCard'
import {UserType} from '../../types/types'

interface Props{
  users : UserType[]
} 

const PeopleSlider: React.FC<Props> = ({users}) => {
  const [user_id,setUser_id] = useState('')
  const user_data = Cookies.get('user_data')
  const [refresh, setRefresh] = useState(false)

  
  useEffect(()=>{
    if(user_data){
      setUser_id(JSON.parse(user_data).user_id)
    }
    
  },[refresh])
  
  
  

  return (
    <div className="slider-container">
      {users?.map((user) => (
        <PeopleCard {...{setRefresh, refresh, user, user_id}} />
      ))}
    </div>
  );
};

export default PeopleSlider;