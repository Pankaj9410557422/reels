import React,{useEffect,useState} from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import {makeStyles} from '@material-ui/core/styles';
import {database} from './firebaseData'
const useStyles = makeStyles({
    like:{
        color:'#e74c3c',
        cursor:'pointer',
        paddingLeft:"10px",
    },
    unlike:{
        color:'black',
        cursor:'pointer',
        paddingLeft:"10px",
    }
})
function Likes({userData=null,postData=null}) {
    const [like,setLike] = useState(null);
    const classes = useStyles();
    useEffect(()=>{
        let check = postData.likes.includes(userData?.userId)?true:false;
        setLike(check);
    },[postData])
    const handleLike=async()=>{
        if(like==true)
        {
            //unlike
            let uarr = postData.likes.filter(el=>{
                return el!=userData.userId
            })
            await database.posts.doc(postData.postId).update({
                likes:uarr
            })
        }
        else{
            //like
            let uarr = [...postData.likes,userData.userId];
            await database.posts.doc(postData.postId).update({
                likes:uarr
            })
        }
    }
 
    return (
        <div>
            {
                like!=null?<>
                {like==false?<FavoriteBorderIcon className={`${classes.unlike} icon-styling`} onClick={handleLike} />:
                <FavoriteOutlinedIcon className={`${classes.like} icon-styling`} onClick={handleLike} />}
                </>
                :<></>
            }
        </div>
    )
}

export default Likes
