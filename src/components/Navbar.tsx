import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Home from '../assets/home.png' 
import Search from '../assets/search.png' 
import Bell from '../assets/bell.png' 
import Contacts from '../assets/contacts.png' 
import UserIcon from '/src/assets/user.png'
import axios from 'axios'
import './Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FriendRequestType } from '../types/types'

interface Props {
  token: string | null;
  fullname: string | null;
}

const Navbar: React.FC<Props> = ({token, fullname}) => {
  let location = useLocation()
  const nav = useNavigate()

  const links = [
    {link: 'الرئيسية', path: "/", image: Home},
    {link: 'بحث', path: "/search", image: Search},
    {link: 'الأصدقاء', path: "/friends", image: Contacts},
    {link: 'التنبيهات', path: "/notifications", image: Bell},
  ]

  const [currentLocation, setCurrentLocation] =  useState(location)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([])
  const [searchQuery,setSearchQuery] = useState("")
  
  const toggleSearchBar = () =>{
    setIsSearchVisible((prev)=>!prev)
  }
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault()
    console.log(searchQuery)
    if(searchQuery.trim()){
      nav(`/search?query=${encodeURIComponent(searchQuery)}`)
      setIsSearchVisible(false)
    }
  }

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault()
    Cookies.remove('user_data')
    Cookies.remove('access_token')
    nav('/auth/login')
  }

  useEffect(()=>{
      setCurrentLocation(location)
      axios.get('/friends/request/all')
      .then(({data})=>{setFriendRequests(data.requests)})
  },[location])


  return ( 
    <div className='nav-container'>
      {token&& <>
        <div className='user-container'>
          <img src={UserIcon} className='user-img' alt="" />
          <p className='user-name'>{fullname}</p>
        </div>
        <ul className='nav-list'>
           {links.map(({link, path, image}, i)=>
            <li key={i} className={'nav-link ' + ("/" +currentLocation.pathname.split('/')[1] === path && "active")}>
              {path.split('/')[1]=='search'?
              <div onClick={toggleSearchBar} className='search-link'>
                <img src={image} className='link-img' alt="" /> 
                <p className='link-text'>{link}</p>
              </div>
              : path.split('/')[1]=='friends'?
              <Link to={path} className='link-content friends' >
                <img src={image} className='link-img' alt="" /> 
                <p className='link-text'>{link}</p>
                {friendRequests?.length>0 &&
                  <span>{friendRequests?.length}</span>
                }
              </Link>
              :
              <Link to={path} className='link-content' >
                <img src={image} className='link-img' alt="" /> 
                <p className='link-text'>{link}</p>
              </Link>
              }
            </li>
           )}
        </ul>
        <button  onClick={logoutHandler} className='logout-btn'>تسجيل الخروج</button>
        {isSearchVisible &&
          <form className='search-form'>
            <input dir='rtl' type='text' placeholder='بحث'
              defaultValue={searchQuery} 
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              className='search-input'
            />
            <button onClick={() => handleSearch} type='submit' className='search-btn'>بحث</button>
            <button type='button' className='close-btn' onClick={()=> setIsSearchVisible(false)}>x</button>
          </form>
        }
        </>
        }
    </div>
  )
}

export default Navbar