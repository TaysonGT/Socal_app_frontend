import Cookies from 'js-cookie';
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import {useState, useEffect} from 'react'

const LoginRoute = () => {
    const location = useLocation();
    const [token, setToken] = useState<string | null>('')
    useEffect(() => {
      let tokenString: string = Cookies.get('access_token')?? '' ;
      tokenString&& setToken(tokenString)
    }, [])
    

    if(!token){
        return <>
            <Navbar {...{token: null, fullname:null}} />
            <Outlet />
        </>
    }else{
        return <Navigate to="/"  replace state={{from: location}} />
    }
}

export default LoginRoute