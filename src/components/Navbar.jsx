import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Home from '../assets/home.png' 
import Search from '../assets/search.png' 
import Bell from '../assets/bell.png' 
import Contacts from '../assets/contacts.png' 
import UserIcon from '../assets/user.png'
import './Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Navbar = ({token, fullname}) => {
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
  const [searchQuery,setSearchQuery] = useState("")
  
  const toggleSearchBar = () =>{
    setIsSearchVisible((prev)=>!prev)
  }
  
  const handleSearch = (e)=>{
    e.preventDefault()
    console.log(searchQuery)
    if(searchQuery.trim()){
      nav(`/search?query=${encodeURIComponent(searchQuery)}`)
      setIsSearchVisible(false)
    }
  }

  const logoutHandler = (e)=>{
    e.preventDefault()
    Cookies.remove('user_data')
    Cookies.remove('access_token')
    nav('/auth/login')
  }

  useEffect(()=>{
      setCurrentLocation(location)
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
          <form dir='rtl' className='search-form'>
            <input type='text' placeholder='بحث'
              defaultValue={searchQuery} 
              onChange={(e)=> setSearchQuery(e.target.value)}
              className='search-input'
            />
            <button onClick={(e)=> handleSearch(e)} type='submit' className='search-btn'>srch</button>
            <button type='button' className='close-btn' onClick={()=> setIsSearchVisible(false)}>x</button>
          </form>
        }
        </>
        }
    </div>
  )
}

export default Navbar