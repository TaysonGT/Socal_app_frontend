import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { UserType } from '../types/types'

const FriendsContext = createContext<{friends: UserType[]}>({friends: []})

export const FriendsProvider = ({ children }:{children: React.JSX.Element}) => {
  const [friends, setFriends] = useState<UserType[]>([])
  // const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    axios.get('/friends/all')
    .then(({data}) => setFriends(data.users))
    
  }, [])
  

  return (
    <FriendsContext.Provider value={{friends}}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = ()=> {
  return useContext(FriendsContext)
}
