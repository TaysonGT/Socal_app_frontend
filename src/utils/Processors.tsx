// import axios from 'axios'
// import {UserType} from '../types/types'


// export const getMyFriends  = (): UserType[] =>{
//   try{
//     async() =>{
//       const response = await axios.get('/friends/all')
//       const friends = response.data.users
//       if(friends) {
//         return friends
//       }else return []
//     }
//   }catch(error){
//     return []
//   }
// }