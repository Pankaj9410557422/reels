import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import {database} from './firebaseData'
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AddComment from './AddComment';
import './MyPosts.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Likes from './Likes';
import Comments from './Comments'
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
const useStyles = makeStyles({

})

function MyPosts({userData=null}) {
    const classes = useStyles();
    const [mypost, setMypost] = useState(null);
    const [openId, setOpenId] = useState(null);

    const handleClickOpen = (id) => {
        setOpenId(id);
      };
      const handleClose = () => {
        setOpenId(null);
      };
    
        
    useEffect(async()=>{
        let arr=[]
        for(let i=0;i<userData.postIds.length;i++){
            let pId = userData.postIds[i];
            let data = await database.posts.doc(pId).get();
            // console.log(data.data());
            let obj ={...data.data(),postId:pId};
            arr.push(obj);
        }
        
        // console.log(temp);
        setMypost(arr);
        // console.log(arr);
    },[userData.postIds])
    // console.log(mypost);
    const handleMute=(e)=>{
        e.preventDefault();
        e.target.muted =!e.target.muted;
    }
    console.log(mypost)
    return (
        <>
            {mypost==null?<CircularProgress/>:
            <div className="post-cont">
                {mypost.map(post=>(
                    // console.log(post)
                    <div className="outer" key={post.pId}>
                        <div className="inner">
                        <video src={post.pUrl}  type="video/mp4" autoPlay loop onClick={handleMute} className="vid" muted></video>
                        {/* <FavoriteRoundedIcon className="like-icon" onClick={handleLike}/> */}
                        <div className="like-icon">
                            <Likes userData={userData} postData={post}/>
                            <ModeCommentOutlinedIcon onClick={() => handleClickOpen(post.pId)} className={classes.ci} />
                            </div>
                        </div>
                        <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pId}>
                        <MuiDialogContent>
                          <div className='dcontainer'>
                            <div className='video-part'>
                              <video  autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
                                <source src={post.pUrl} type="video/webm" />
                              </video>
                            </div>
                            <div className='info-part'>
                              <Card>
                                <CardHeader
                                  avatar={
                                    <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>
                                    </Avatar>
                                  }
                                  action={
                                    <IconButton aria-label="settings">
                                      <MoreVertIcon />
                                    </IconButton>
                                  }
                                  title={post?.uName}
                                  
                                  />
                                
                                <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                <CardContent className={classes.seeComments}>
                                  
                                <Comments userData={userData} postData={post} />
                                </CardContent>
                                
                              </Card>
                              <div className='extra'>
                              <div className='likes'>
                                <Typography className={classes.typo} variant='body2'>Liked By {post.likes.length == 0 ? 'nobody' : ` others`}</Typography>
                                </div>
                                <AddComment  userData={userData} postData={post}/> 
                                </div>
                            </div>
                          </div>
                        </MuiDialogContent>
                      </Dialog>
                    </div>
                ))
                }
            </div>

            }
        </>
    )
}

export default MyPosts
