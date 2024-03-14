import React,{useEffect,useState}from 'react'
import './Feed.css'
import PostBox from './PostBox'
import Post from './Post/Post';

const Feed =()=> {
  const [posts,setPosts]=useState([]);
  
  useEffect(() =>{
    fetch('https://empower-your-future-let-s-invest.onrender.com/post')
      .then(res=> res.json())
      .then(data => { setPosts(data)}) 
  },[posts])

  return ( 
    <div  className='feed'>
      <div className='header-feed'>
        <h2></h2>
      </div>
        <PostBox />
        {
          posts.map(p=><Post  key={p._id} p={p}/>)
        }
    </div>
  )
}

export default Feed