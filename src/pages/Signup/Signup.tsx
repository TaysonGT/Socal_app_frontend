import Cookies from 'js-cookie'
import axios, {AxiosResponse} from 'axios'
import React, { useState } from 'react'
import {useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import './Signup.css'

interface SignupResponse{
  success: boolean;
  message: string;
  expDate: Date;
  firstname: string;
  lastname: string;
  user_id: string;
  username: string;
  token: string;
}

const Signup: React.FC = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('male')
  
  const [checkValid, setCheckValid] = useState(false)
  
  
  const navigate = useNavigate();
  const handleLogin = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    let token = Cookies.get('access_token')
    if(!(firstname && lastname && username && password && validPassword && email && gender)){
      toast.error('برجاء ملء كل البيانات')
    }else if(password != validPassword ){
      toast.error('برجاء اعادة تأكيد كلمة المرور')
    }else{
      if(!token){
        const response: AxiosResponse<SignupResponse> = await axios.post('/api/auth/signup', {username, password, email, firstname, lastname, gender}, {withCredentials: true})
       
        if(response.data.success){
          Cookies.set('access_token', response.data.token, {expires: new Date(response.data.expDate), secure: true, path: '/'})
          Cookies.set('user_response.data', JSON.stringify({
            username: response.data.username, 
            user_id: response.data.user_id,
            firstname: response.data.firstname,
            lastname: response.data.lastname
          }), {expires: new Date(response.data.expDate), secure: true, path: '/'})
          navigate('/')
        }else{
          toast.error(response.data.message)
        }
      }else{
        toast.error("لقد سجلت دخولك بالفعل!")
        navigate('/')
      }
    }
  }

  return (
    <div className='login-container'>
        <div dir='rtl' className='login-form-container'>
          <h1>إنشاء حساب</h1>
          <form onSubmit={handleLogin}>
            <label>الاسم الاول</label>
            <input placeholder="ادخل الاسم الاول" onInput={e=>
            setFirstname(e.currentTarget.value)} type="text" name="firstname" />
            <label>اسم العائلة</label>
            <input placeholder="ادخل اسم العائلة" onInput={e=>
            setLastname(e.currentTarget.value)} type="text" name="lastname" />
            <label>البريد الالكتروني</label>
            <input placeholder="ادخل البريد الالكتروني" onInput={e=>
            setEmail(e.currentTarget.value)} type="email" name="email" />
            
            <label>اسم المستخدم</label>
            <input placeholder="ادخل اسم المستخدم" onInput={e=>
            setUsername(e.currentTarget.value)} type="text" name="username" />
            <label>كلمة المرور</label>
            <input  placeholder="ادخل كلمة المرور"
            onInput={(e)=>setPassword(e.currentTarget.value)} type="password"/>
            <label>تأكيد كلمة المرور</label>
            <input  placeholder=" تأكيد كلمة المرور"
            onInput={(e)=>{
              setValidPassword(e.currentTarget.value)
              e.currentTarget.value==password? setCheckValid(true) : setCheckValid(false)
            }} type="password" className={!checkValid? 'non-valid' : ''}/>
            <label>النوع</label>
            <select onInput={(e)=>setGender(e.currentTarget.value)}>
              <option value='male'>ذكر</option>
              <option value='female'>أنثى</option>
            </select>
            
            <button type="submit">إنشاء حساب</button>
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