import axios from 'axios'
import {CommentType, FriendRequestType, LikeType, PostType, UserType} from '../types/types'
import toast from 'react-hot-toast'
import { NavigateFunction  } from 'react-router'
import Cookies from 'js-cookie'


export const addPostHandler = (
  content: string,
  setDialogue: React.Dispatch<React.SetStateAction<boolean>>
)=>{
    try{
      if(content){
        axios.post('/posts', {content}, {withCredentials: true})
        .then(({data})=>{
            data.success? toast.success(data.message) : toast.error(data.message)
            setDialogue(false)
        })
      }else{
        toast.error('برجاء إدخال محتوى للمنشور')
      }
    }catch(error){
        console.log(error)
    }
}

export const getPostsHandler = (setPosts: React.Dispatch<React.SetStateAction<PostType[]>>)=>{
    try{
        axios.get('/posts/all')
        .then(({data})=>{
            setPosts(data.posts)
        })
    }catch(error){
        console.log(error)
    }
}

export const getUserPostsHandler = (
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>,
  id:string
)=>{
    try{
        axios.get(`/posts/all/${id}`)
        .then(({data})=>{
            setPosts(data.posts)
        })
    }catch(error){
        console.log(error)
    }
}


export const getMyFriendsHandler  = async(setFriends: React.Dispatch<React.SetStateAction<UserType[]>>) =>{
  try{
      const {data}= await axios.get('/friends/all')
      if(data) {
        setFriends(data.users)
      }
  }catch(error){
    console.log(error)
  }
}

export const getUserFriendsHandler = async(setUserFriends: React.Dispatch<React.SetStateAction<UserType[]>>, id:string) =>{
    try{
        const {data}= await axios.get(`/friends/all/${id}`)
        if(data) {
            setUserFriends(data.users)
        }
      }catch(error){
        console.log(error)
      }
}

export const getFriendRequestsHandler  = async(
    setFriendRequests: React.Dispatch<React.SetStateAction<FriendRequestType[]>>,
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>> | null
) =>{
    try{
        const {data}= await axios.get('/friends/request/all')
        if(data) {
            setFriendRequests(data.requests)
            if(setUsers) setUsers(data.users)
        }
    }catch(error){
        console.log(error)
    }
}

export const getSentFriendRequestsHandler  = async(
    setSentFriendRequests: React.Dispatch<React.SetStateAction<FriendRequestType[]>>,
    ) =>{
    try{
        const {data}= await axios.get('/friends/request/me')
        if(data) {
            setSentFriendRequests(data.requests)
        }
    }catch(error){
        console.log(error)
    }
}

export const getMyFriendRequestsHandler  = (
    setFriendRequests: React.Dispatch<React.SetStateAction<FriendRequestType[]>>,
) =>{
    try{
        async() =>{
            const {data}= await axios.get('/friends/request/me')
            if(data) {
                setFriendRequests(data.requests)
            }
        }
    }catch(error){
        console.log(error)
    }
}

export const getPostLikesHandler  = async(setLikes: React.Dispatch<React.SetStateAction<LikeType[]>>, id:string) =>{
    try{
        const {data}= await axios.get(`/posts/like/post/${id}`)
        if(data) {
          setLikes(data.likes)
        }
    }catch(error){
      console.log(error)
    }
  }

  export const addCommentHandler  = async(
    content:string, 
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
  ) =>{
    try{
      axios.post(`/posts/comment/${id}` , {content}, {withCredentials: true})
        .then(({data})=>{
          if(data.success){
            toast.success(data.message)
            setRefresh((prev)=> !prev)
          }else toast.error(data.message)
        })
    }catch(error){
      console.log(error)
    }
  }

  export const getCommentsHandler  = async(
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
    id:string
  ) =>{
    try{
        const {data}= await axios.get(`/posts/comment/all/${id}`)
        if(data) {
          setComments(data.comments)
        }
      }catch(error){
       console.log(error)
    }
  }

  export const getCommentLikesHandler  = (setLikes: React.Dispatch<React.SetStateAction<LikeType[]>>, id:string) =>{
    try{
      async() =>{
        const {data}= await axios.get(`/posts/like/comment/${id}`)
        if(data) {
          setLikes(data.likes)
        }else return []
      }
    }catch(error){
      return []
    }
  }
  
export const getUserHandler  = async(
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>, 
    id:string
) =>{
    try{
    const {data}= await axios.get(`/users/${id}`)
    if(data) {
        setUser(data.user)
    }
    }catch(error){
        console.log("couldn't find user: ", error)
    }
  }

  export const likeCommentHandler  = (
    setLikes: React.Dispatch<React.SetStateAction<LikeType[]>>, 
    liked: boolean,
    setLiked: React.Dispatch<React.SetStateAction<boolean>>,
    id: string,
) =>{
    try{
        axios.post(`/posts/like/comment/${id}`)
        .then(({data})=>{
          if(data.success){
            toast.success(data.message)
            if(liked){
                setLikes((prevItems)=> prevItems!.filter((item)=> item.user_id !== data.like.user_id))
            }else{
                setLikes((prevItems)=> [...prevItems!, data.like])
            }
            
            setLiked((prev)=>!prev)
          }
        })
    }catch(error){
        console.log("couldn't find user: ", error)
    }
  }
  
  export const likePostHandler  = (
    setLikes: React.Dispatch<React.SetStateAction<LikeType[]>>, 
    liked: boolean,
    setLiked: React.Dispatch<React.SetStateAction<boolean>>,
    id: string,
) =>{
    try{
        axios.post(`/posts/like/post/${id}`)
        .then(({data})=>{
          if(data.success){
            toast.success(data.message)
            if(liked){
                setLikes((prevItems)=> prevItems!.filter((item)=> item.user_id !== data.like.user_id))
            }else{
                setLikes((prevItems)=> [...prevItems!, data.like])
            }
            
            setLiked((prev)=>!prev)
          }else toast.error(data.message)
        })
    }catch(error){
        console.log("couldn't find user: ", error)
    }
  }

  export const LoginHandler =  (
    {
        username, 
        password,
    }
    : {
        username: string, 
        password:string
    }, 
    navigate: NavigateFunction,
    refreshLists: ()=> void
) =>{
    try{
        let token = Cookies.get('access_token')
        if(!token){
        axios.post('/api/auth/login', {username, password}, {withCredentials: true})
        .then(({data})=>{
            if(data.success){
            Cookies.set('access_token', data.token, {expires: new Date(data.expDate), secure: true, path: '/'})
            Cookies.set('current_user', JSON.stringify(data. user), {expires: new Date(data.expDate), secure: true, path: '/'})
            refreshLists()
            navigate('/')
            }else{
            toast.error(data.message)
            }
        }).catch(err=> console.log(err))
        }else{
        toast.error("لقد سجلت دخولك بالفعل!")
        navigate('/')
        }
    }catch(error){
      return []
    }
  }

  export const SignUpHandler =  async(
    {
        firstname, 
        lastname, 
        email, 
        validPassword, 
        gender, 
        username, 
        password
    } : {
        firstname:string, 
        lastname:string, 
        email:string, 
        validPassword:string, 
        gender:string, 
        username: string, 
        password:string
    },
    navigate: NavigateFunction,
    checkAuth: ()=> void
) =>{
    try{
        let token = Cookies.get('access_token')
        if(!(firstname && lastname && username && password && validPassword && email && gender)){
            toast.error('برجاء ملء كل البيانات')
        }else if(password != validPassword ){
            toast.error('برجاء اعادة تأكيد كلمة المرور')
        }else{
            if(!token){
                const { data } = await axios.post('/api/auth/signup', {username, password, email, firstname, lastname, gender}, {withCredentials: true})
            
                if(data.success){
                    Cookies.set('access_token', data.token, {expires: new Date(data.expDate), secure: true, path: '/'})
                    Cookies.set('current_user', JSON.stringify(data.user), {expires: new Date(data.expDate), secure: true, path: '/'})
                    checkAuth()
                    navigate('/')
                }else{
                    toast.error(data.message)
                }
            }else{
                toast.error("لقد سجلت دخولك بالفعل!")
                navigate('/')
            }
        }
    }catch(error){
      console.log(error)
    }
  }

export const sendFriendRequestHandler = async(
  id: string, 
)=>{
  try{
      await axios.post(`/friends/request/${id}`)
      .then(({data})=>{
        if(data.success){
          toast.success(data.message)
        }else toast.error(data.message)
      })
  }catch(error){

  }
}

export const acceptFriendRequestHandler = async(
    id: string, 
    refreshLists: ()=> void
)=>{
    try{
        await axios.put(`/friends/request/accept/${id}`)
        .then(({data})=>{
          if(data.success){
            toast.success(data.message)
            refreshLists()
          }else toast.error(data.message)
        })
    }catch(error){

    }
}

export const declineFriendRequestHandler = async(
    id: string, 
    refreshLists: ()=> void
)=>{
    try{
        await axios.put(`/friends/request/decline/${id}`)
        .then(({data})=>{
          if(data.success){
            toast.success(data.message)
            refreshLists()
          }else toast.error(data.message)
        })
    }catch(error){

    }
}


export const removeFriendRequestHandler = async(
  id: string,
  refreshLists: ()=> void
)=>{
  try{
      await axios.delete(`/friends/request/${id}`)
      .then(({data})=>{
        if(data.success){
          toast.success(data.message)
          refreshLists()
        }else toast.error(data.message)
      })
  }catch(error){

  }
}

export const removeFriendHandler = async(
  id: string,
  refreshLists: ()=> void
)=>{
  try{
      await axios.delete(`/friends/${id}`)
      .then(({data})=>{
        if(data.success){
          toast.success(data.message)
          refreshLists()
        }else toast.error(data.message)
      })
  }catch(error){

  }
}