import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AddComment.css'
import {database} from './firebaseData';
const useStyles = makeStyles({
    cbtn:{
        marginRight:'1%',
        marginTop:'2%',
    }
})
function AddComment({userData =null, postData=null}) {
    const classes = useStyles();
    const [text ,setText] = useState('');
    const manageText=(e)=>{
        let comment = e.target.value;
        setText(comment)
    }
    const handleOnEnter=()=>{
        // console.log(userData);
        let obj={
            text:text,
            uName: userData.username,
            uUrl:userData.profileUrl
        }
        // console.log(obj);
        database.comments.add(obj).then(docRef=>{
            console.log(docRef.id);
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments,docRef.id]
            })
        })
        .catch(e=>{
            console.log(e+" ");
        })
        setText('');
    }
    return (
        <div className="emojibox">
           <TextField value={text} label="Add a comment" fullWidth={true} onChange={manageText} onKeyPress={(e)=>{if(e.key=="Enter"){
               handleOnEnter() }}}/> 
           <Button variant="contained" color="primary" disabled={text==''?true:false} className={classes.cbtn} onClick={handleOnEnter}>
            Post
            </Button>
        </div>
    )
}

export default AddComment
