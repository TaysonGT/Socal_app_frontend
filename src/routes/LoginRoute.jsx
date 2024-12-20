import Cookies from 'js-cookie';
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar';
import React, {useState, useEffect} from 'react'

const LoginRoute = () => {
    const location = useLocation();
    const [token, setToken] = useState(Cookies.get('access_token'))
    useEffect(() => {
        setToken(Cookies.get('access_token'))
    }, [])
    

    if(!token){
        return <>
            <Navbar token={token} />
            <Outlet />
        </>
    }else{
        return <Navigate to="/"  replace state={{from: location}} />
    }
}

export default LoginRoute