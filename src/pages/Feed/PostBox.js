import React, { useState } from 'react';
import {Avatar,Button} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios'
import './PostBox.css';
import useLoginuser from '../../hooks/useLoginuser'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const PostBox=()=> {
const[post,setPost]=useState('');
const[imageURL,setImageURL]=useState('');
const[isLoading, setIsLoading]=useState('');
const[name, setName]=useState('');
const[username, setUsername]=useState('');
const [loggedInUser]=useLoginuser();
// console.log(loggedInUser)
const [user]=useAuthState(auth);
const email=user?.email;

const userProfilePic=loggedInUser[0]?.profileImage? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"


const handleUploadImage =(e)=>{
    setIsLoading(true); 
    const image = e.target.files[0];
    
    const formData = new FormData();
    formData.set('image',image)

    axios.post("https://api.imgbb.com/1/upload?key=9c1c8c46acc13d1fee83f7441dc4deb3", formData)
        .then(res =>{
            setImageURL(res.data.data.display_url)
            console.log(res.data.data.display_url);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setIsLoading(false);
        })
}


const handlePost=(e)=>{
    e.preventDefault();
    if(user.providerData[0].providerId=='password'){
        fetch(`https://empower-your-future-let-s-invest.onrender.com/loggedInUser?email=${email}`)
        .then(res => res.json())
        .then(data=>{
            setName(data[0]?.name)
            setUsername(data[0]?.username)
        }) 
    }
    else{
        setName(user?.displayName)
        setUsername(email?.split('@')[0])
    }

    if (name){
        const userPost={
            profilePhoto:userProfilePic,
            post:post,
            photo: imageURL,
            username:username,
            name:name,
            email:email
        }
        console.log(userPost);
        setPost('');
        setImageURL('');
        fetch(`https://empower-your-future-let-s-invest.onrender.com/post`,{
            method: "POST",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(userPost)
        })
            .then(res=> res.json())
            .then(data=>{
                console.log(data);
            }) 
    }
}

  return (
    <div className='postBox'>
        <form onSubmit={handlePost}>
            <div className='postBox_input'> 
                 <Avatar src={userProfilePic}/>
                <input type="text"
                placeholder='Where to invest....?'
                onChange={(e)=>setPost(e.target.value)}
                value={post}
                required
                />
            </div>

            <div className='imageIcon_postButton'>
                <label htmlFor="image" className='imageIcon'>
                    {
                        isLoading?<p>Uploading image</p>:<p>{imageURL?'image uploaded':<AddPhotoAlternateIcon/>}</p>
                    }
                </label>
                <input type='file' 
                    id='image' 
                    className='imageInput'
                    onChange={handleUploadImage}
                />
                <Button className='postBox_postButton' type='submit'>
                    Post
                </Button>
            </div>
        </form>
    </div>
  );
};
export default PostBox