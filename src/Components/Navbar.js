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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    height: "27px",
    fill: "black",
  }
}));

export default function MenuAppBar() {
  let history = useHistory();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {logout} = useContext(AuthContext);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
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
        </Toolbar>
      </AppBar>
      <button type="submit" onClick={handleLogout}>Logout</button>
    </div>
  );
}