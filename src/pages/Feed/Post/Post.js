import { Avatar } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import React from 'react'
import './Post.css'

const Post = ({p}) => {
    const { name, username, photo, post, profilePhoto}=p;
  return (
    <div className='post'>
        <div className='post_avatar'>
            <Avatar src={profilePhoto} />
        </div>
        <div className="post_body">
            <div className="post_header">
                <div className="post_headerText">
                    <h3 className='name'>
                        {name}{" "}
                    </h3>
                    <h2>
                        <span className='post_headerSpecial'>
                         <VerifiedUserIcon className='post_badge'/> @{username}
                        </span>
                    </h2>
                </div>
                <div className="post_headerDescription">
                    <p>{post}</p>
                </div>
                <img src={photo} alt="" width='580 !important'  />
                <div className="post_footer">
                    <FavoriteBorderIcon className='post_footer_icon_FavoriteBorderIcon' fontSize='small' color='action'/>
                    <AddCommentIcon className='post_footer_icon_AddCommentIcon' fontSize='small' color='action'/>
                    <SendIcon className='post_footer_icon' fontSize='small' color='action'/>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Post