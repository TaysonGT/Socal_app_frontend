import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';

const PrivateRoutes = () => {
  const location = useLocation()
  const data = Cookies.get('user_data')
  const [token, setToken] = useState<string | null>(Cookies.get("access_token")?.toString() ?? null) 
  const [fullname, setFullname] = useState<string>('') 
  useEffect(() => {
    if(data) {
      setToken(Cookies.get("access_token")!)
      setFullname(`${JSON.parse(data).firstname} ${JSON.parse(data).lastname}`)
    }
  }, [location, data])

  return (
    token? 
    <> 
      <Navbar {...{token, fullname}} /> 
      <Outlet /> 
    </> 
    : <Navigate to='/auth/login' replace state={{from: location}} />
  )
}
export default PrivateRoutes