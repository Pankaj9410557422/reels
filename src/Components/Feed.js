import React,{useContext,useState,useEffect} from 'react'
import { AuthContext } from '../Context/AuthProvider'
import Navbar from './Navbar';
import {database} from './firebaseData'
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile';
import './Feed.css';
import Posts from './Post';


function Feed() {
    const {currentUser} = useContext(AuthContext);
    const [userData,setUserData] = useState(null);
    useEffect(()=>{
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            // console.log(doc.data());
            setUserData(doc.data());
        })
    },[currentUser])
    return (
        <div>
            { userData != null ?<> 
                <Navbar userData={userData}/> 
                <div className="feed-container">
                    <div className="center">
                        <UploadFile userData={userData}/>
                        <div className="post-container">
                            <Posts userData={userData}/>
                        </div>
                    </div>
                </div>    
            </>:<CircularProgress/>
            }  
            
            
            
            
        </div>
    )
}

export default Feed
