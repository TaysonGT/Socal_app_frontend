import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { UserType, FriendRequestType } from '../types/types'

const FriendsContext = createContext<{friends: UserType[], friendRequests:FriendRequestType[]}>({friends: [], friendRequests: []})

// , setRefreshContext: React.Dispatch<React.SetStateAction<boolean>>(false)
export const FriendsProvider = ({ children }:{children: React.JSX.Element}) => {
  const [friends, setFriends] = useState<UserType[]>([])
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([])
  // const [refreshContext, setRefreshContext] = useState(false)
  useEffect(() => {
    axios.get('/friends/all')
    .then(({data}) => {
      setFriends(data.users)
    })
    axios.get('/friends/request/me')
    .then(({data}) => {
      setFriendRequests(data.requests)
    })
    
  }, [])
  

  return (
    <FriendsContext.Provider value={{friends, friendRequests}}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = ()=> {
  return useContext(FriendsContext)
}
