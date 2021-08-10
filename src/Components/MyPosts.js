import React,{useState,useEffect,useContext} from 'react';
import {database} from './firebaseData'
import CircularProgress from '@material-ui/core/CircularProgress';
import {AuthContext} from '../Context/AuthProvider'
import Video from './Video'
import './MyPosts.css'
import Profile from './Profile';

function MyPosts({userData=null}) {
    const{currentUser}=useContext(AuthContext);
    // console.log(userData);
    const [mypost, setMypost] = useState(null);
        
    useEffect(async()=>{
        let arr=[]
        for(let i=0;i<userData.postIds.length;i++){
            let pId = userData.postIds[i];
            let data = await database.posts.doc(pId).get();
            arr.push(data.data());
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
    return (
        <>
            {mypost==null?<CircularProgress/>:
            <div className="post-cont">
                {mypost.map(post=>(
                    <div className="outer" key={post.pId}>
                        <div className="inner">
                        <video src={post.pUrl}  type="video/mp4" autoPlay loop onClick={handleMute} className="vid" muted></video>
                        </div>
                       {/* <iframe src={post.pUrl} frameborder="0" allow="fullscreen" loading="lazy"></iframe>  */}
                    </div>
                ))
                }
            </div>

            }
        </>
    )
}

export default MyPosts
