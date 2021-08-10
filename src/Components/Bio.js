import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import cameraimg from './camera.png'
import CustomModal from './Modal';

const useStyles=makeStyles(()=>({
    styl:{
        height:"200px",
        width:"200px",
        border:"3px solid #1976D2"
    },
    base:{
        display:"flex",
        paddingTop:"20px",
        paddingBottom:"20px",
        position:"relative"
    },
    add:{
        position:"absolute",
        left: "160px",
        top: "173px",
        height:"33px"
    }
}))

function Bio({userData=null}) {
    const classes = useStyles();
    // console.log(userData);
    return (
        <div className={classes.base}>
            <Avatar alt={userData.username} src={userData.profileUrl} className={classes.styl} />
            <img src={cameraimg} className={classes.add}></img>
            <div className={classes.about}>
                <h1>{userData.username}</h1>
                <h4>No. of posts : {userData.postIds.length} </h4>
                {userData.bio===""?<CustomModal action="Add Bio" userData={userData}/>:<CustomModal userData ={userData} action="Update Bio"/>

                }

            </div>
            
        </div>
    )
}

export default Bio
// 