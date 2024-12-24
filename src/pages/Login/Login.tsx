import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { LoginHandler } from '../../utils/Processors'
import { useNavigate } from 'react-router'
import { useFriends } from '../../context/FriendsContext'


const Login: React.FC = () => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { refreshLists } = useFriends()
  
  const handleLogin = (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    LoginHandler({username, password}, navigate, refreshLists)
  }
  
  return (
    <div className='login-container'>
        <div dir='rtl' className='login-form-container'>
          <h1>تسجيل الدخول</h1>
          <form onSubmit={handleLogin}>
            <label>اسم المستخدم</label>
            <input placeholder="ادخل اسم المستخدم" onInput={e=>
            setUsername(e.currentTarget.value)} type="text" name="username" />
            <label>كلمة المرور</label>
            <input  placeholder="ادخل كلمة المرور"
            onInput={(e)=>setPassword(e.currentTarget.value)} type="password"/>
            <button>دخول</button>
          </form>
          <div className='to-signup'>
            <p>ليس لديك حساب؟</p>
            <Link className='link' to='/auth/signup'>إنشاء حساب</Link>
          </div>
        </div>
    </div>
  )
}

export default Login