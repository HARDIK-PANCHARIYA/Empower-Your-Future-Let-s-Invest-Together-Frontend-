import React, {useEffect,useState}from 'react'
import './MainPage.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LockResetIcon from '@mui/icons-material/LockReset';
import {useNavigate} from 'react-router-dom'
import useLoginuser from '../../../hooks/useLoginuser'
import Post from '../../Feed/Post/Post';
import axios from 'axios';
import EditProfile from '../EditProfile/EditProfile';

export const MainPage = ({user}) => {
const navigate = useNavigate();
const [Loginuser] = useLoginuser();  
const[imageURL,setImageURL]=useState('');
const[isLoading, setIsLoading]=useState('');
const [posts,setPosts]=useState([]);
  
  useEffect(() =>{
    fetch(`https://empower-your-future-let-s-invest.onrender.com/userPost?email=${user?.email}`)
      .then(res=> res.json())
      .then(data => { setPosts(data)}) 
  },[posts,user?.email])
const username=user?.email?.split('@')[0];

const handleUploadCoverImage = (e) => {
    setIsLoading(true); 
    const image = e.target.files[0];
    
    const formData = new FormData();
    formData.set('image',image)

    axios.post("https://api.imgbb.com/1/upload?key=9c1c8c46acc13d1fee83f7441dc4deb3", formData)
        .then(res =>{
            const url = res.data.data.display_url;
            const userCoverImage={
                email:user?.email,
                coverImage:url
            }

            setIsLoading(false);
            if (url){
                axios.patch(`https://empower-your-future-let-s-invest.onrender.com/userUpdates/${user?.email}`,userCoverImage)
            }
        })
}
const handleUploadProfileImage = (e) => {
    setIsLoading(true); 
    const image = e.target.files[0];
    
    const formData = new FormData();
    formData.set('image',image)

    axios.post("https://api.imgbb.com/1/upload?key=9c1c8c46acc13d1fee83f7441dc4deb3", formData)
        .then(res =>{
            const url = res.data.data.display_url;
            const userProfileImage={
                email:user?.email,
                profileImage:url
            }
            console.log(url);
            setIsLoading(false);
            if (url){
                axios.patch(`https://empower-your-future-let-s-invest.onrender.com/userUpdates/${user?.email}`,userProfileImage)
            }
        })
}
  return (
    <div >
        <ArrowBackIosIcon className='arrow-icon' onClick={()=>{navigate('/')}}/>
        <h4 className='heading-4'>{Loginuser[0]?.name?Loginuser[0]?.name:user&&user?.displayName}</h4>
        <div className="mainProfile">
            <div className="profile-bio">
                {
                    <div>
                        <div className="coverImageContainer">
                            <img src={Loginuser[0]?.coverImage ? Loginuser[0]?.coverImage:'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt="" className='coverImage' />
                            <div className="hoverCoverImage">
                                <label htmlFor='image' className='imageIcon'>
                                    {
                                        isLoading?
                                        <LockResetIcon className='photoIcon photoIconDisabled'/>
                                        :
                                        <FilterCenterFocusIcon className='photoIcon'/>
                                    }
                                </label>
                                    <input type="file" id='image' className='imageInput' onChange={handleUploadCoverImage} />                            
                            </div>
                        </div>
                    
                        <div className='avatar-img'>
                        <div className='avatarContainer'>
                            <img src={Loginuser[0]?.profileImage ? Loginuser[0]?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" className='avatar' />
                        
                        <div className="hoverAvatarImage">
                            <div className="imageIcon_postButton">
                                <label htmlFor='profileImage' className='imageIcon'>
                                    {
                                        isLoading?
                                        <LockResetIcon className='photoIcon photoIconDisabled'/>
                                        :
                                        <FilterCenterFocusIcon className='photoIcon'/>
                                    }
                                </label>                              
                                    <input type='file' id='profileImage' className='imageInput' onChange={handleUploadProfileImage}/>
                            </div>
                        </div>
                        </div>
                        <div className="userInfo">
                            <div>
                                <h3 className='heading-3'>
                                    {Loginuser[0]?.name?Loginuser[0]?.name:user&&user?.displayName}
                                </h3>
                                <p className='usernameSection'>@{username}</p>
                            </div>
                            <EditProfile user={user} LoggedInUser={Loginuser}/>
                        </div>
                            <div className="infoContainer">
                                <p>Bio - {Loginuser[0]?.bio?Loginuser[0]?.bio:''}</p>
                                
                                <div className="locationAndLink">
                                    {Loginuser[0]?.location? <p className='subInfo'><MyLocationIcon/>{Loginuser[0]?.location}</p>:''}
                                    {Loginuser[0]?.website? <p className='subInfo Link'><InsertLinkIcon/>{Loginuser[0]?.website}</p>:''}
                                </div>
                            </div>
                            
                                <h4 className='postText'>Post</h4>
                                <hr/>
                            </div>
                            {
                                posts.map(p=><Post id={p._id}p={p}/>)
                            }
                        </div>
                }
            </div>
        </div>
    </div>
  )
}