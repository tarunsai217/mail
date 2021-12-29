import React,{useState} from 'react'
import styles from './Compose.module.css'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';


function Compose({setShowCompose,currentUser}) {
const [to, setTo] = useState()
const [cc, setCc] = useState()
const [subject, setSubject] = useState()
const [body, setBody] = useState()

const sendHandler=()=>{
    let t=new Date();
    const emailObj={id:uuidv4(),to,cc,subject,body,time:t.toLocaleTimeString(),from:currentUser.email,read:false}
    clearForm();

    
    let obj=JSON.parse(localStorage.getItem(currentUser.email));
    obj.sent.unshift({...emailObj,type:"sent"});
    localStorage.setItem(currentUser.email, JSON.stringify(obj))
    
    if(localStorage.getItem(emailObj.to)){
    let obj2=JSON.parse(localStorage.getItem(emailObj.to));
    obj2.inbox.unshift({...emailObj,type:'inbox'})
    localStorage.setItem(emailObj.to,JSON.stringify(obj2))
    }
    else{
        let obj2={userEmail:emailObj.to,sent:[],inbox:[]}
        obj2.inbox=[{...emailObj,type:'inbox'}]
        localStorage.setItem(emailObj.to,JSON.stringify(obj2))
    }

    toast.success("Mail Sent")
}

const closeHandler=()=>{
    setShowCompose(false);
}

const clearForm=()=>{
    setTo('');
    setCc('');
    setSubject('');
    setBody('');
}
    return (
        <div className={styles.composeContainer}>
            <div className={styles.header}>
                New Message
            <button onClick={closeHandler}>Close</button>    
            </div>

            <div className={styles.content}>
            <input value={to} onChange={(e)=>{setTo(e.target.value)}} placeholder='To'/>
            <input value={cc} onChange={(e)=>{setCc(e.target.value)}}placeholder='Cc'/>
            <input value={subject} onChange={(e)=>{setSubject(e.target.value)}} placeholder='Subject'/>
            <textarea value={body} onChange={(e)=>{setBody(e.target.value)}} />
            </div>

            <div className={styles.buttonContainer}>
            <button onClick={sendHandler}>Send</button>
            </div>
        </div>
    )
}

export default Compose
