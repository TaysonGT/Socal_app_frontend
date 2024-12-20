import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios'
import './Search.css'
import '../Home/Home.css'
import Post from '../Home/Post'
import PeopleSlider from './PeopleSlider'

const Search = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      axios.get(`/api/search?query=${query}`)
      .then(({data})=>{
          setUsers(data.users || []);
          setPosts(data.posts || []);
      }).finally(()=>{
        setLoading(false);
      })
    }
  }, [query]);

  

  return (
    <div className='search-container'>
      <h2 className='header' dir='rtl'>نتائج البحث: "{query}":</h2>
      {(loading)? <div className='search-feedback'>جار التحميل...</div>
      :
      (!users?.length && !posts?.length)&&
         <div dir='rtl' className='search-feedback'>لا توجد نتائج مطابقة لبحثك: "{query}"</div>
      } 
      {(users.length>0)&&
        <div>
          <h3 dir='rtl' className='search-feedback sec-header'>الأشخاص:</h3>
          <PeopleSlider {...{users}} />
        </div>
      }
      {
        (posts.length>0)&&
        <>
          <h3 className='search-feedback sec-header' dir='rtl'>المنشورات:</h3>
          <div className='posts-list'>
            {posts.map((post) => (
              (<Post {... {post}} key={post.id}/>)
            ))}
          </div>
        </>
      }
        
    </div>
  );
};

export default Search;