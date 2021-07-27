import React,{useContext,useState,useEffect} from 'react'
import { AuthContext } from '../Context/AuthProvider'
import Navbar from './Navbar';
import {database} from './firebaseData'



function Feed() {
    const {currentUser} = useContext(AuthContext);
    const [userData,setUserData] = useState(null);
    useEffect(()=>{
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            // console.log(doc);
            setUserData(doc.data());
        })
    },[currentUser])
    return (
        <div>
            <Navbar/>
            
        </div>
    )
}

export default Feed
