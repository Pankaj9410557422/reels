import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../Context/AuthProvider';
import { storage,database } from './firebaseData';
import './Signup.css'
import { useHistory } from 'react-router-dom';
import img from '../Components/Login/LoginImages/images.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
const useStyles = makeStyles((theme) => ({
    
}));
function Signup() {
    const classes = useStyles();
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const [name,setName] =useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const history = useHistory();
    const [file,setFile] = useState(null)
    const {signup,currentUser} =useContext(AuthContext);
    const handleSignup =async (e)=>{
        e.preventDefault();
        try{
        setLoading(true);
        let res = await signup(email,password);
        let uid = res.user.uid;
        // console.log(uid); 
        const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
        // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
        // fn 1 -> progress tracking
        // fn2 -> error
        // fn3 -> success
        uploadTaskListener.on('state_changed',fn1,fn2,fn3);
        function fn1(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');         
        }
        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false)
        }
        async function fn3(){
            let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
            console.log(downloadUrl);
          await database.users.doc(uid).set({
                email:email,
                userId:uid,
                username:name,
                createdAt:database.getCurrentTimeStamp(),
                profileUrl:downloadUrl,
                postIds:[],
                bio:""
            })
            setLoading(false);
            console.log('User has Signed up');
            history.push('/')
        }
    
      
    }
    catch(err){
        setError(err)
        setTimeout(()=>setError(''),2000);
        setLoading(false)
    }
    }
    const handleFileSubmit=(e)=>{
        let file = e.target.files[0];
        console.log(file);
        if(file!=null)
        {
            setFile(file)
        }
    }
    useEffect(()=>{
        if(currentUser)
        {
          history.push('/')
        }
      },[])
    return (
        <div className="cont2">
            <div className="modal">
                <div className="signup-section">
                    <img className ='instaLogo' alt="Intagram Logo" src={img}></img>
                    <form onSubmit={handleSignup} >
                        <h2 className="heading">Signup to see videos from your friends</h2>
                        <input className="inp-field2" type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder="User Name"></input>
                        <input className="inp-field2" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"></input>
                        <input type ="password" className="inp-field2" value ={password} onChange={(e)=>setPassword(e.target.value)} placeholder ="Password"></input>
                        <div style={{paddingLeft:"95px",marginBottom:"15px"}}>
                            <input type='file' accept='image/*' onChange={handleFileSubmit} style={{display : 'none'}} id="icon-button-file"></input>
                            <label htmlFor='icon-button-file'>
                                <Button  disabled={loading} variant="outlined" color="secondary" component="span"  className={classes.button} size="medium">
                                <BackupOutlinedIcon/>
                                Profile Picture
                                </Button>
                            </label>
                        </div>
                        <button type='submit' disabled={loading} className="signup-btn">SignUp</button>
                        <div className="divider">
                                    <div className="sep1"><hr></hr></div>
                                    <div>OR</div>
                                    <div className="sep2"><hr></hr></div>
                                </div>
                        {error ? <h3 style={{color:"red"}}>{error}</h3>:<></>}
                    </form>
                    <div className="forSignUp">
                                <h5>Already have an account?<Button onClick={()=> history.push("/login")}>Login In</Button></h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup

{/* <div>
                    <label htmlFor=''>UserName</label>
                    <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>

                </div>
                <div>
                <label htmlFor=''>Email</label>
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                
                <button type='submit' disabled={loading}>SignUp</button> */}

            //     <div>
            //     <label htmlFor='profile'>Profile image</label>
            //     <input type='file' accept='image/*' onChange={handleFileSubmit}></input>
            // </div>