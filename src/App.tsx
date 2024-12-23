import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Profile from './pages/Profile/Profile'
import Friends from './pages/Friends/Friends'
import PrivateRoutes from './routes/PrivateRoutes'
import LoginRoute from './routes/LoginRoute';
import {FriendsProvider} from './context/FriendsContext'
import './App.css'

function App() {

  return (
    <>
      <FriendsProvider>
      <BrowserRouter>
      <Toaster position='top-left' containerStyle={
        { zIndex: 9999, marginTop: '80px', userSelect: "none"} 
      }/>
        <Routes>
          <Route path='/auth' element={<LoginRoute />} >
            <Route index element={<Login/>} path='/auth/login' />
            <Route index element={<Signup/>} path='/auth/signup' />
          </Route>
          <Route path='/' element={<PrivateRoutes />}>
            <Route index element={<Home />} path='/'  />
            <Route element={<Search />} path='/search'/>
            <Route element={<Profile />} path='/profile/:userId' />
            <Route element={<Friends />} path='/friends' />
          </Route>
        </Routes>
      </BrowserRouter>
      </FriendsProvider>
    
    </>
  )
}

export default App
