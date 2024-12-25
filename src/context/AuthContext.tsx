import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, UserType } from '../types/types';
import Cookies from 'js-cookie';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [token, setToken] = useState<string|null>(null)

  const refreshToken = ()=>{      
    setToken(Cookies.get('access_token')?? null)
  }
  const refreshCurrentUser = ()=>{
    if(token){
      setCurrentUser(JSON.parse(Cookies.get('current_user')!)?? null)
    }else setCurrentUser(null)
  }

  const checkAuth = ()=>{
    refreshCurrentUser()
    refreshToken()
  }

  const resetAuth = ()=>{
    setToken(null)
    setCurrentUser(null)
    Cookies.remove('access_token')
    Cookies.remove('current_user')
  }

  useEffect(()=>{
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        refreshToken,
        refreshCurrentUser,
        checkAuth,
        resetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useFriends must be used within a AuthProvider');
  }
  return context;
};

