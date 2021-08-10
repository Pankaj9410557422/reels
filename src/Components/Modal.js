import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function CustomModal(props) {
    const classes = useStyles();
    const [open, setOpen]=useState(false);
    const [modalStyle] = useState(getModalStyle);
    const [bio, setBio] = useState("");
    
    const openBox=()=>{
        setOpen(true);
    }
    const handleSubmit=(e)=>{
        console.log(e);
    }
    const body =(
        <div style={modalStyle} className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <Button variant="contained" color="primary" disabled>Bio</Button>:
                <label>
                <input type="text" value={bio} onChange={(e)=>setBio(e.target.value)} />        
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
    return (
        <>
            {props.userData.bio===""?<Button variant="outlined" onClick={openBox}>Add Bio</Button>:<Button variant="outlined">Update Bio</Button>}
            {/* <Modal open={open} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            {body}
            </Modal> */}
            
        </>
    )
}

export default CustomModal
