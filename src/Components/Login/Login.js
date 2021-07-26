import React, {useState,useContext,useEffect} from 'react'
import './Login.css'
import photo1 from './LoginImages/photo1.jpg';
import photo2 from './LoginImages/photo2.jpg';
import photo3 from './LoginImages/photo3.jpg';
import photo4 from './LoginImages/photo4.jpg';
import img from './LoginImages/images.png';

import {useHistory} from 'react-router-dom';
import {AuthContext} from 'C:\\Users\\asus.LAPTOP-F97U0B83\\Desktop\\reels\\src\\Context\\AuthProvider.js'




function Login() {
    const images =[photo1,photo2,photo3,photo4];
    const [idx, setIdx] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const {login , currentUser} = useContext(AuthContext);
    const history = useHistory();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            await login(email, password);
            setLoading(false);
            history.push('/');
        }catch{
            setError("Failed to login");
            setTimeout(()=>setError(''),2000);
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(currentUser){
            history.push('/');
        }
        const tick = () => setIdx (idx => idx + 1);
        const interval = setInterval(tick , 1500);
        return () => clearInterval(interval);
    },[])
    return (
        <div>
            <div className="container">
                <div className='phoneimg'>
                    <img className="float_img" src={images[idx % images.length]} alt="Welcome to Instagram"></img>
                </div>
                <div className ='modal_container'>
                    <div className='login_section'>
                        <div className='login-area'>
                            <img className ='instaLogo' alt="Intagram Logo" src={img}></img>
                            <form onSubmit={handleSubmit}>
                                <input className="inp-field" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"></input>
                                <input type ="password" className="inp-field" value ={password} onChange={(e)=>setPassword(e.target.value)} placeholder ="Password"></input>
                                <button type='submit' disabled={loading} className="login-btn">Log In</button>
                                {error ? <h1>{error}</h1>:<></>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

