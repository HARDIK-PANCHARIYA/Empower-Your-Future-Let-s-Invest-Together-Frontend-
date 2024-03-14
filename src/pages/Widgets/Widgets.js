import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { InstagramEmbed } from 'react-social-media-embed';
// import { LinkedInEmbed } from 'react-social-media-embed';
import './Widgets.css'

const Widgets=()=> {
  return (

    
    <div className='widgets'>

      <div className="badge-base" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="https://www.linkedin.com/in/hardikpanchariya/" data-version="v1">
        <a className="badge-base_link" href="https://linktr.ee/hardikpanchariya">Click Here !!!!</a>
      </div>

        <div className='widgets_input'>
          <SearchIcon className='widgets_searchIcon'/>
          <input type="text" placeholder='Search'/>
        </div>

        <div className='widgets_wedgetContainer'>
            <h2>Today's updates....!!!!</h2>
        </div>
        <div  className='widgets-insta'>
        <div className='widgets'>
        <InstagramEmbed url="https://www.instagram.com/moneycontrol_hindi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" />
        </div>
         <div className='widgets'>
         <InstagramEmbed url="https://www.instagram.com/cnbcawaaz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" />
         </div>
         </div>
    </div>
  )
}

export default Widgets