import Cookies from 'js-cookie'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import './Signup.css'


const Signup = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('male')
  
  const [checkValid, setCheckValid] = useState(false)
  
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState()
  
  const navigate = useNavigate();
  const handleLogin = (e)=>{
    e.preventDefault();
    let token = Cookies.get('access_token')
    if(!(firstname && lastname && username && password && validPassword && email && gender)){
      toast.error('برجاء ملء كل البيانات')
    }else if(password != validPassword ){
      toast.error('برجاء اعادة تأكيد كلمة المرور')
    }else{
      if(!token){
        axios.post('/api/auth/signup', {username, password, email, firstname, lastname, gender}, {withCredentials: true})
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
  }

  useEffect(()=>{
    if (message){
      success? toast.success(message) : toast.error(message)
    }
    setMessage(null) 
  }, [message, success])

  return (
    <div className='login-container'>
        <div dir='rtl' className='login-form-container'>
          <h1>إنشاء حساب</h1>
          <form>
            <label>الاسم الاول</label>
            <input placeholder="ادخل الاسم الاول" onInput={e=>
            setFirstname(e.target.value)} type="text" name="firstname" />
            <label>اسم العائلة</label>
            <input placeholder="ادخل اسم العائلة" onInput={e=>
            setLastname(e.target.value)} type="text" name="lastname" />
            <label>البريد الالكتروني</label>
            <input placeholder="ادخل البريد الالكتروني" onInput={e=>
            setEmail(e.target.value)} type="email" name="email" />
            
            <label>اسم المستخدم</label>
            <input placeholder="ادخل اسم المستخدم" onInput={e=>
            setUsername(e.target.value)} type="text" name="username" />
            <label>كلمة المرور</label>
            <input  placeholder="ادخل كلمة المرور"
            onInput={(e)=>setPassword(e.target.value)} type="password"/>
            <label>تأكيد كلمة المرور</label>
            <input  placeholder=" تأكيد كلمة المرور"
            onInput={(e)=>{
              setValidPassword(e.target.value)
              e.target.value==password? setCheckValid(true) : setCheckValid(false)
            }} type="password" className={!checkValid? 'non-valid' : ''}/>
            <label>النوع</label>
            <select onInput={(e)=>setGender(e.target.value)}>
              <option value='male'>ذكر</option>
              <option value='female'>أنثى</option>
            </select>
            
            <button onClick={handleLogin}>إنشاء حساب</button>
          </form>
          <div className='to-signup'>
            <p>لديك حساب بالفعل؟</p>
            <Link className='link' to='/auth/login'>تسجيل الدخول</Link>
          </div>
        </div>
    </div>
  )
}

export default Signup