import React,{useContext} from 'react'
import { AuthContext } from '../Context/AuthProvider'



function Feed() {
    const {logout} = useContext(AuthContext);
    const handleLogout= async()=>{
        await logout();
    }
    return (
        <div>
            <h1>Welcome to feed</h1>
            <button type="submit" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Feed
