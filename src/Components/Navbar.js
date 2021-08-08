import React,{useContext,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../Context/AuthProvider';
import instaLogo from './Login/LoginImages/images.png';
import { white } from 'jest-matcher-utils/node_modules/chalk';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TelegramIcon from '@material-ui/icons/Telegram';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display:"flex",
    backgroundColor: white,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  barstyle:{
    backgroundColor:white
  },
  home:{
    fill: "black",
  },
  small:{
    height:"30px",
    width:"30px"
  },
  chat:{
    height:"30px",
    fill:"black",
    marginLeft:"10px"
  },
  stl:{
    marginLeft:"24%",
    marginRight:"26%"
  }
}));

export default function MenuAppBar({userData=null}) {
  let history = useHistory();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {logout} = useContext(AuthContext);
  
  

  const handleClick = (event) => {
    // console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout= async()=>{
    await logout();
    history.push('/')
}

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: "white", height:"56px"}}>
        <Toolbar className={classes.stl}>
          <Typography variant="h6" className={classes.title}>
            <img style={{height: "53px", marginTop:"2px"}} alt="Instagram Logo"src={instaLogo}></img>
          </Typography>
          <Link to='/'>
          <HomeIcon className={classes.home}/>
          </Link>
          <TelegramIcon className={classes.chat}/>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar alt="Remy Sharp" src={userData.profileUrl} className={classes.small} />
        </Button>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to='/profile' style={{textDecoration:"none",color:"inherit"}}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
      
    </div>
  );
}


