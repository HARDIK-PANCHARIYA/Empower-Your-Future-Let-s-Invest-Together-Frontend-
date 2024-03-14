import React, { useState } from 'react';
import himg from  '../../components/images/Hlogo.png';
import logo from  '../../components/images/logo.png';
import ApiIcon from '@mui/icons-material/Api';
import auth from '../../firebase.init';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button'
import {Link, useNavigate}  from 'react-router-dom';
import './Login.css'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import axios from 'axios';


const Signup = () => {

    const [username,  setUsername] = useState('');
    const [name,  setName] = useState('');
    const [email,  setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error,setError] = useState('');
    const navigate = useNavigate();

    const [
        CreateUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [signInWithGoogle, googleuser, googleloading, googleError] = useSignInWithGoogle(auth);

      if (user||googleuser){
        navigate('/')
        console.log(user)
        console.log(googleuser)
      }
      if (error){
        console.log(error.message)
        console.log(googleError)

      }
      if (loading){
        console.log('loading.....')
        console.log(googleloading)
      }

        const handleSubmit=e=>{
            e.preventDefault();
            CreateUserWithEmailAndPassword(email, password);

            const user={
              username:username,
              name:name,
              email:email,
            }
            
          axios.post(`https://empower-your-future-let-s-invest.onrender.com/register`,user)

        }

        const handleGoogleSignIn=()=>{
          signInWithGoogle();
        }

  return (
    <div className='signup-container'>
        <div className='image-container'>
            <img className='image'src={himg} alt="" />
        </div>
        <div className='form-container'>
          <div className='form-box'>
            {/* <ApiIcon className='apiicon' style={{color:'red'}}/> */}
            <img className='image1'src={logo} alt="" />
            <h6 className='heading'>Signup Here</h6>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                className='display-name'
                placeholder='@username'
                onChange={e=>setUsername(e.target.value)}
                />
                <input 
                type="text" 
                className='display-name'
                placeholder='Enter Full Name'
                onChange={e=>setName(e.target.value)}
                />
                <input 
                type="email"
                className='email'
                placeholder='Email address' 
                onChange={(e)=>{setEmail(e.target.value)}}
                />
                <input 
                type="password"
                className='password'
                placeholder='Password' 
                onChange={(e) => {setPassword(e.target.value)}}             
                />
                <div className='btn-login'>
                    <button type='submit' className='btn'>Sign up</button>
                </div>
            </form>
            <hr />
            <div className=' google-botton'>
              <GoogleButton
              className='g-btn'
              type='light'
              onClick={handleGoogleSignIn}
              />
            </div>
            <div style={{marginLeft: '5%'}}>
              Already have an account ? 
              <Link
              to ='/login'
                style={{
                  textDecoration:'none',
                  color:'blue',
                  fontWeight:'600',
                  marginLeft:'10px'
                }}
              >
                 Login
              </Link>
            </div>
        </div>
    </div>
    </div>
  );
};

export default Signup