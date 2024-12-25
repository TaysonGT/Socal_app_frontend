import { Navigate, useLocation, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext';

const LoginRoute = () => {
    const location = useLocation();
    const { token, checkAuth } = useAuth()
    useEffect(() => {
        checkAuth()
    }, [location])
    

    if(!token){
        return <>
            <Navbar />
            <Outlet />
        </>
    }else{
        return <Navigate to="/"  replace state={{from: location}} />
    }
}

export default LoginRoute