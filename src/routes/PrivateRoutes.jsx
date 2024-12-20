import React, { useEffect, useState } from 'react'
import eruda from 'eruda';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';

const PrivateRoutes = () => {
  const location = useLocation()
  const data = Cookies.get('user_data')
  const [token, setToken] = useState(Cookies.get('access_token')) 
  const [fullname, setFullname] = useState() 
  useEffect(() => {
    if(token && data) {
      setToken(Cookies.get('access_token'))
      setFullname(`${JSON.parse(data).firstname} ${JSON.parse(data).lastname}`)
    }
    eruda.init()
  }, [location])

  return (
    token? 
    <> 
      <Navbar token={token} fullname={fullname} /> 
      <Outlet /> 
    </> 
    : <Navigate to='/auth/login' replace state={{from: location}} />
  )
}
export default PrivateRoutes