import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import { SignUpHandler } from '../../utils/Processors'
import { SignupDataType } from '../../types/types'


const Signup: React.FC = () => {

  const [ signupData, setSignupData ] = useState<SignupDataType>(
    {
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      validPassword: '',
      email: '',
      gender: 'male'
    }
  )
  
  
  const [checkValid, setCheckValid] = useState(false)
  
  const navigate = useNavigate()
  
  const handleLogin = (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    console.log(signupData)
    SignUpHandler(signupData, navigate)
  }

  const inputHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const inputName = e.currentTarget.name
    setSignupData({...signupData, [inputName] : e.currentTarget.value})
    signupData.password == signupData.validPassword&&  setCheckValid(true)
  }

  const onSelectGender = (e:React.ChangeEvent<HTMLSelectElement>)=> {
    setSignupData({...signupData, gender: e.currentTarget.value})
  }
  return (
    <div className='login-container'>
        <div dir='rtl' className='login-form-container'>
          <h1>إنشاء حساب</h1>
          <form onSubmit={handleLogin}>
            <label>الاسم الاول</label>
            <input placeholder="ادخل الاسم الاول" onInput={inputHandler} type="text" name="firstname" />
            <label>اسم العائلة</label>
            <input placeholder="ادخل اسم العائلة" onInput={inputHandler} type="text" name="lastname" />
            <label>البريد الالكتروني</label>
            <input placeholder="ادخل البريد الالكتروني" onInput={inputHandler} type="email" name="email" />
            
            <label>اسم المستخدم</label>
            <input placeholder="ادخل اسم المستخدم" onInput={inputHandler} type="text" name="username" />
            <label>كلمة المرور</label>
            <input  placeholder="ادخل كلمة المرور"
            onInput={inputHandler} name='password' type="password"/>
            <label>تأكيد كلمة المرور</label>
            <input  placeholder=" تأكيد كلمة المرور"
            onInput={inputHandler} name='validPassword' type="password" className={!checkValid? 'non-valid' : ''}/>
            <label>النوع</label>
            <select onInput={onSelectGender}>
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