import Cookies from 'js-cookie'
import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import './Login.css'


const Login: React.FC = () => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate();
  const handleLogin = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    let token = Cookies.get('access_token')
    if(!token){
      axios.post('/api/auth/login', {username, password}, {withCredentials: true})
      .then(({data})=>{
        if(data.success){
          Cookies.set('access_token', data.token, {expires: new Date(data.expDate), secure: true, path: '/'})
          Cookies.set('user_data', JSON.stringify({
            username: data.username, 
            user_id: data.user_id,
            firstname: data.firstname,
            lastname: data.lastname
          }), {expires: new Date(data.expDate), secure: true, path: '/'})
          navigate('/')
        }else{
          toast.error(data.message)
        }
      }).catch(err=> console.log(err))
    }else{
      toast.error("لقد سجلت دخولك بالفعل!")
      navigate('/')
    }
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