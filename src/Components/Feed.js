import React,{useContext,useState,useEffect} from 'react';
import Navbar from './Navbar';
import {AuthContext} from '../Context/AuthProvider'
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile';
import Post from './Post'
import {database} from './firebaseData'
import './Feed.css';

function Feed() {
    const [userData, setUserData] =useState(null);
    const{currentUser} = useContext(AuthContext);
    useEffect(()=>{
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            setUserData(doc.data());
        })
    },[currentUser])


    return (
        <>
        {userData==null?<CircularProgress/>:<>
            <Navbar userData={userData}/>
            <div className="feed-container">
                <div className="center">
                    <UploadFile userData={userData}/>
                    <Post userData={userData}/>
                </div>

            </div>
        </>}
        </>
    )
}

export default Feed
