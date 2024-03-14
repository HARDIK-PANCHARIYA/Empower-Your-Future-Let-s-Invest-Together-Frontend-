import React from 'react'
import { MainPage } from './MainPage/MainPage'
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'

const Profile = ()=> {
const [user]=useAuthState(auth);

  return (
    <div className='profilPage'>
        <MainPage user={user}/>
    </div>
  )
}

export default Profile