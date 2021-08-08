import React,{useContext,useState,useEffect} from 'react'
import Bio from './Bio'
import MyPosts from './MyPosts'
import {database} from './firebaseData';
import {AuthContext} from '../Context/AuthProvider'
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from './Navbar'

function Profile() {
    const {currentUser} = useContext(AuthContext);
    const [profData,setProfData] = useState(null);
    useEffect(() => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            setProfData(doc.data());
        })
    }, [currentUser])
    return (
        <div>
            {profData==null?<CircularProgress/>:<>
                <Navbar userData={profData}/>
                <div className="feed-container">
                <div className="center">
                    <Bio userData={profData}/>
                <hr></hr>
                    <MyPosts userData={profData}/> 
                </div>

            </div>
                
            </>

            }   
        </div>
    )
}

export default Profile
