import React, { createContext, useContext, useState, useEffect } from 'react';
import { FriendRequestType, FriendsContextType, UserType } from '../types/types'
import { removeFriendRequestHandler, getMyFriendsHandler, removeFriendHandler, acceptFriendRequestHandler, declineFriendRequestHandler, sendFriendRequestHandler, getFriendRequestsHandler, getSentFriendRequestsHandler } from '../utils/Processors';


const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

export const FriendsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [myFriends, setMyFriends] = useState<UserType[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([]);
  const [sentFriendRequests, setSentFriendRequests] = useState<FriendRequestType[]>([]);
  const [friendRequestUsers, setFriendRequestUsers] = useState<UserType[]>([]);

  const getFriends = async () => {
    await getMyFriendsHandler(setMyFriends)
  };

  const getFriendRequests = async () => {
    await getFriendRequestsHandler(setFriendRequests, setFriendRequestUsers)
  };
  
  const getSentFriendRequests = async () => {
    await getSentFriendRequestsHandler(setSentFriendRequests)
  };

  const sendFriendRequest = async (id: string) => {
    await sendFriendRequestHandler(id)
    refreshLists();
  };
  
  const acceptFriendRequest = async(id: string) => {
    await acceptFriendRequestHandler(id, refreshLists)
    
  }
  const declineFriendRequest = async (id: string) => {
    await declineFriendRequestHandler(id, refreshLists)
  };

  const removeFriend = async (id: string) => {
    await removeFriendHandler(id, refreshLists)
  };
  
  const removeFriendRequest = async(id: string) => {
    await removeFriendRequestHandler(id, refreshLists)
  };

  const refreshLists = async () => {
    await getFriends();
    await getFriendRequests();
    await getSentFriendRequests()
  };

  const resetLists = async() =>{
    setFriendRequests([])
    setMyFriends([])
    setSentFriendRequests([])
  }

  useEffect(() => {
    refreshLists();
  }, []);

  return (
    <FriendsContext.Provider
      value={{
        myFriends,
        friendRequests,
        sentFriendRequests,
        friendRequestUsers,
        sendFriendRequest,
        removeFriendRequest,
        declineFriendRequest,
        removeFriend,
        refreshLists,
        resetLists,
        acceptFriendRequest
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error('useFriends must be used within a FriendsProvider');
  }
  return context;
};
