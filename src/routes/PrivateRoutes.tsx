import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
  const location = useLocation()
  
  const { token, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [location])

  return (
    token? 
    <> 
      <Navbar /> 
      <Outlet /> 
    </> 
    : <Navigate to='/auth/login' replace state={{from: location}} />
  )
}
export default PrivateRoutes