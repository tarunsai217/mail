import styles from "./Mailitem.module.css"
import React,{useState} from 'react'

function Mailitem({data,checkedMailsHandler,readMailsHandler}) {
    const {id,to,from,subject,time,type,read}=data;
    const[readstatus,setReadStatus]=useState(read);

    const readHandler=()=>{
        setReadStatus(true);
        readMailsHandler(data);
    }
    return (
        <div onClick={readHandler} className={read===false?styles.MailitemContainer:styles.notRead}>
            <input  onClick={(e)=>{checkedMailsHandler(e,data)}} type="checkbox"/>
            <div className={styles.nameContainer}><span>{type==='sent'?to:from}</span></div>
            <div className={styles.subjectContainer}><span>{subject}</span></div>
            <div className={styles.timeContainer}><span>{time}</span></div>
        </div>
    )
}

export default Mailitem
