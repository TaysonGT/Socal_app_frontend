import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'

const FriendsContext = createContext()

export const FriendsProvider = ({ children }) => {
  const [myFriends, setMyFriends] = useState([]);
  
  useEffect(() => {
    axios.get('/friends/all')
    .then(({data}) => setMyFriends(data.users))
    
  }, [])
  

  return (
    <FriendsContext.Provider value={{myFriends}}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = ()=> {
  return useContext(FriendsContext)
}
