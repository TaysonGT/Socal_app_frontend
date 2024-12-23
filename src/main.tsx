import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import Cookies from 'js-cookie'
import App from './App.jsx'
import axios, {AxiosRequestHeaders} from 'axios'

interface Props extends AxiosRequestHeaders {
  Authorization: string;
  user_data: string;
}

axios.defaults.baseURL = 'http://localhost:5000';
axios.interceptors.request.use((config) => {
   const user_data = Cookies.get('user_data');
   const authorization = Cookies.get('access_token');
   
   config.headers={
    Authorization: `Bearer ${authorization}`,
    user_data: `Bearer ${user_data}`
   } as Props

   return config;
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
      <App />
  </StrictMode>,
)
