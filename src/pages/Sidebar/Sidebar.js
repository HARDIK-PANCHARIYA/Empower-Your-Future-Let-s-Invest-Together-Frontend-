import React, { useState } from 'react'
import './Sidebar.css'
import logo from  '../../components/images/logo.png';
import ApiIcon from '@mui/icons-material/Api';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreIcon from '@mui/icons-material/More';
import DoneIcon from '@mui/icons-material/Done';
import MailIcon from '@mui/icons-material/Mail';
import SidebarOptions from './SidebarOptions';
import { IconButton, Avatar, Button, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import {Link} from 'react-router-dom';
import CustomeLink from './CustomeLink'
import useLoginuser from '../../hooks/useLoginuser'


const Sidebar =({handleLogout, user})=> {
const[anchorEl, setAnchorEl]=useState(null);
const openMenu = Boolean(anchorEl);
const [loggedInUser]=useLoginuser();

const userProfilePic=loggedInUser[0]?.profileImage? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"


  const handleClick=e=>{
    setAnchorEl(e.currentTarget);
  }
  const handleClose=()=>{
    setAnchorEl(null);
  }

  const result = user[0]?.email?.split('@')[0];

  return (
    <div className='sidebar'>
      <div className='logo-container'>
      <img className='sidebarimg' src={logo} alt="" />
      </div>
        <CustomeLink to='/home/feed' className='linkcolor'>
        <SidebarOptions active Icon={HomeIcon} text={'Home'} />
        </CustomeLink>
        <CustomeLink to='/home/messages' className='linkcolor'>
        <SidebarOptions active Icon={MailIcon} text={'Messages'} />
        </CustomeLink>
        <CustomeLink to='/home/notifications' className='linkcolor'>
        <SidebarOptions active Icon={NotificationsIcon} text={'Notifications'} />
        </CustomeLink>
        <CustomeLink to='/home/list' className='linkcolor'>
        <SidebarOptions active Icon={ListAltIcon} text={'Notes'} />
        </CustomeLink>
        {/* <CustomeLink to='/home/bookmarks' className='linkcolor'>
        <SidebarOptions active Icon={BookmarkIcon} text={'Bookmarks'} />
        </CustomeLink> */}
        {/* <CustomeLink to='/home/explore' className='linkcolor'>
        <SidebarOptions active Icon={SearchIcon} text={'Explore'} />
        </CustomeLink> */}
        <CustomeLink to='/home/profile' className='linkcolor'>
        <SidebarOptions  active Icon={PermIdentityIcon} text={'Profile'} />
        </CustomeLink>
        
        

        {/* <Button variant='outlined' className='sidebar_explore'>
          Post
        </Button> */}

        <div className='Profile_info'>
          <Avatar src={userProfilePic}/>
          <div className="user_info">
            <h4>
              {
              loggedInUser[0]?.name? loggedInUser[0]?.name :user && user[0]?.displayName }
            </h4>
            <h5>@{result}</h5>
          </div>
          <IconButton 
          size='small' 
          sx={{ml:2}}
          aria-controls={openMenu?'basic-menu':undefined}
          aria-haspopup= 'true' 
          aria-expanded={openMenu? 'true': undefined}
          onClick={handleClick}
          >
              <MoreHorizIcon/>
          </IconButton>
          <Menu id='basic-menu' anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClose}>
            <MenuItem className='Profile_info1'>
                  <Avatar src={userProfilePic}/>
              <div className="user_info subUser_info">
                <div>
                <h4>
                {
                  loggedInUser[0]?.name? loggedInUser[0]?.name :user && user[0]?.displayName }
                </h4>
                <h5>@{result}</h5>
                </div>
                  <ListItemIcon className='done_icon'><DoneIcon/></ListItemIcon>
              </div>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleClose}>Add an Existing Account</MenuItem>
            <MenuItem onClick={handleLogout}>Log out @{loggedInUser[0]?.name? loggedInUser[0]?.name :user && user[0]?.displayName }</MenuItem>
          </Menu>
        </div>
    </div>
  )
}

export default Sidebar