import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import {storage,database} from './firebaseData';

const useStyles = makeStyles((theme) => ({
    
  }));

function UploadFile(props) {
    const classes = useStyles();
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(null);
    const types = ['video/webm', 'video/mp4','video/ogg'];
    const onChange =(e)=>{
        const file = e?.target?.files[0];
        if(!file){
            setError('Please select a file');
            setTimeout(()=>{setError(null)},2000);
            return;
        }

        if(types.indexOf(file.type)==-1){
            setError('Please select a video file');
            setTimeout(()=>{setError(null)},2000);
            return;
        }

        if(file.size/(1024*1024)>100){
            setError('File size too big');
            setTimeout(()=>{setError(null)},2000);
            return;
        }

        const id = uuidv4();
        const uploadTask = storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);
        uploadTask.on("state_changed", f1,f2,f3);
        function f1(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }
        function f2(error){
            setError(error);
            setTimeout(()=>{
                setError(null);
            },2000)
            setLoading(false);
        }
        function f3(){
            setLoading(true);
            uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                let obj={
                    comments:[],
                    likes:[],
                    pId:id,
                    pUrl: url,
                    uName: props?.userData?.username,
                    uProfile: props?.userData?.profileUrl,
                    userId : props?.userData?.userId,
                    createdAt : database.getCurrentTimeStamp()
                }
                database.posts.add(obj).then(async docRef=>{
                    let res = await database.users.doc(props.userData.userId).update({
                        postIds:[...props.userData.postIds,docRef.id]
                    })
                }).then(()=>{
                    setLoading(false);
                }).catch((err)=>{
                    setError(err);
                    setTimeout(()=>{
                        setError(null);
                    },2000);
                    setLoading(false);
                })
            })
        }
    }
    return (
        <div>
            <>
            {
                error!=null ? <Alert severity="error">{error}</Alert> :<>
                <input 
                color='primary'
                type='file'
                onChange={onChange}
                id='icon-button-file'
                style={{display : 'none'}}
                />
                <label htmlFor='icon-button-file'>
                <Button  disabled={loading} variant="outlined" color="secondary" component="span"  className={classes.button} size="medium">
                <BackupOutlinedIcon/>
                Upload Video
                </Button>
                </label>
                {loading? <LinearProgress color="secondary"/>:<></>}
                </>
            }
            </>
        </div>
    )
}

export default UploadFile
