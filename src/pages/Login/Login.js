import React, { useState } from 'react';
import himg from  '../../components/images/Hlogo.png';
import logo from  '../../components/images/logo.png';
import ApiIcon from '@mui/icons-material/Api';
import auth from '../../firebase.init';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import GoogleButton from 'react-google-button'
import {Link ,useNavigate }  from 'react-router-dom';
import './Login.css'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const Login = () => {
    const [email,  setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error,setError] = useState('');
    const navigate = useNavigate();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

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
            console.log(email, password);
            signInWithEmailAndPassword(email, password);
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
            {/* <ApiIcon className='apiicon' style={{color:'rgb(236, 136, 21)'}}/> */}
            <img className='image1'src={logo} alt="" />
            <h6 className='heading'>Login Here</h6>
            <form onSubmit={handleSubmit}>
                <input 
                type="email"
                className='email'
                placeholder='Email address' 
                onChange={(e)=>{setEmail(e.target.value);}}
                />
                <input 
                type="password"
                className='password'
                placeholder='Password' 
                onChange={(e) => {setPassword(e.target.value)}}             
                />
                <div className='btn-login'>
                    <button type='submit' className='btn'>Login</button>
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
            <div  style={{marginLeft: '5%'}}>
              Don't have account ?
              <Link
              to ='/signup'
                style={{
                  textDecoration:'none',
                  color:'blue',
                  fontWeight:'600',
                  marginLeft:'8px'
                }}
              >
                 Sign up
              </Link>
            </div>

        </div>
    </div>
    </div>
  );
};

export default Login;