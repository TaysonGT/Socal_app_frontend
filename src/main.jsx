import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cookies from 'js-cookie'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';
axios.interceptors.request.use(config => {
   const user_data = Cookies.get('user_data');
   const authorization = Cookies.get('access_token');
   
   config.headers.Authorization = `Bearer ${authorization}`;
   config.headers.user_data = `Bearer ${user_data}`;

   return config;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
