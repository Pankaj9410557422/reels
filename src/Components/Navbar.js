import React,{useContext} from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    dispaly:"flex",
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
    height: "30px",
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
  }
}));

export default function MenuAppBar({userData=null}) {
  let history = useHistory();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {logout} = useContext(AuthContext);
  console.log(userData);

  const handleClick = (event) => {
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
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img style={{height: "53px", marginTop:"2px", marginLeft:"160px"}} alt="Instagram Logo"src={instaLogo}></img>
          </Typography>
          <HomeIcon className={classes.home}/>
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
      
    </div>
  );
}


