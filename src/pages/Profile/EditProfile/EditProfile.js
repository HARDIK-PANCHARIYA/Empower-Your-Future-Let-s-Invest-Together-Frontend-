import * as React from 'react'
import './EditProfile.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';

const style={
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)' ,
  width: 600,
  height:600,
  bgcolor: 'background.paper',
  boxShadow:24,
  borderRadius:8,
}

function EditChild({dob,setDob}){
    const [open, setOpen]=React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <React.Fragment>
        <div className='birthdate-section' onClick={handleOpen}>
            <text>Edit</text>
        </div>
        <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        >
          <Box sx={{...style,width:300, height:300}}>
              <div className='text'>
                <h2>Edit date of birth</h2>
                <input 
                type="date"
                onChange={e=>setDob(e.target.value)}
                />
                <Button className='e-button' onClick={()=>{setOpen(false)}}>Cancel</Button>
              </div>
          </Box>
        </Modal>
      </React.Fragment>
    )
}

export default function EditProfile ({user, LoggedInUser}) {
  const [open,setOpen]=React.useState(false);
  const [name,setName]=React.useState('');
  const [bio,setBio]=React.useState('');
  const [location,setLocation]=React.useState('');
  const [website,setWebsite]=React.useState('');
  const [dob,setDob]=React.useState('');

  const HandleSave = async () =>{
    const editedInfo={
        name,
        bio,
        location,
        website,
        dob,
    };
    if(editedInfo){
      await axios.patch(`https://empower-your-future-let-s-invest.onrender.com/userUpdates/${user?.email}`,editedInfo)
      setOpen(false)
    }
  }

  return (
    <div>
      <button className='Edit-profile-btn' onClick={() => setOpen(true)}>Edit Profile</button>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='model'>
          <div className='header'>
            <IconButton onClick={()=>{setOpen(false)}}><CloseIcon/></IconButton>
            <h2 className='header-title'>Edit Profile</h2>
            <button className='save-btn' onClick={HandleSave}>Save</button>
          </div>
          <form className='fill-content'>
            <TextField className='Text-field' fullWidth label='Name' variant='filled' onChange={(e) => setName (e.target.value)} defaultValue={LoggedInUser[0]?.name?LoggedInUser[0]?.name:''}/>
            <TextField className='Text-field' fullWidth label='Bio'  variant='filled' onChange={(e) => setBio (e.target.value)} defaultValue={LoggedInUser[0]?.bio?LoggedInUser[0]?.bio:''}/>
            <TextField className='Text-field' fullWidth label='Location' variant='filled' onChange={(e) => setLocation (e.target.value)} defaultValue={LoggedInUser[0]?.location?LoggedInUser[0]?.location:''}/>
            <TextField className='Text-field' fullWidth label='Website'  variant='filled' onChange={(e) => setWebsite (e.target.value)} defaultValue={LoggedInUser[0]?.website?LoggedInUser[0]?.website:''}/>
          </form>
          <div className='birthdate-section'>
            <p>Birth Date</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob}/>
          </div>
          <div className='last-section'>
            {
              LoggedInUser[0]?.dob?
              <h2>{LoggedInUser[0]?.dob}</h2>:
              <h2>
                {
                  dob?dob:'Add your date of birth'
                }
              </h2>
            }
            <div className='last-btn'>
              <h2>Switch to Professional</h2>
              <KeyboardArrowRightIcon/>

            </div>
          </div>

        </Box>

      </Modal>
    </div>
  )
}
