import React,{useState,useEffect} from 'react'
import styles from "./Mail.module.css"
import ComposeMail from "../../Components/Mailbox/Compose"
import Mailitem from '../../Components/Mailitem/Mailitem'

function Mail({currentUser}) {
    const [showCompose,setShowCompose] = useState(false)
    const [checkedMails,setCheckedMails]=useState([])
    const [count,setCount]=useState(0);
    const [mailType,setMailtype]=useState('inbox')
    const [expanded,setExpanded]=useState(true);

    const mail=[{to:"Far",from:"Samay",subject:"Test results",cc:"",body:"Here are the results",time:new Date().toLocaleTimeString()}]
    const [mails,setMails]=useState(mail);

    useEffect(() => {
       let obj=JSON.parse(localStorage.getItem(currentUser.email))
       setMails(obj.inbox);
    }, []);

    useEffect(() => {
        let newCount=0;
        mails.forEach((item)=>{ item.read===false?newCount+=1:newCount+=0})
        setCount(newCount)
    }, [mails])
     

    const inboxHandler=()=>{
        let obj=JSON.parse(localStorage.getItem(currentUser.email))
        setMails(obj.inbox)
        setMailtype('inbox')
    }
    const sentHandler=()=>{
        let obj=JSON.parse(localStorage.getItem(currentUser.email))
        setMails(obj.sent)
        setMailtype('sent')
    }

    const deleteHandler=()=>{
        const newMails=mails.filter((item)=>{ return(!checkedMails.includes(item.id)?true:false) })
        setMails(newMails);
        setCheckedMails([]);
        const latestCopy=JSON.parse(localStorage.getItem(currentUser.email))
        latestCopy[mailType]=newMails
        localStorage.setItem(currentUser.email,JSON.stringify(latestCopy))
        // delete in local storage pending
        console.log("delete");
    }
    
    const checkedMailsHandler=(e,data)=>{
        e.stopPropagation();
        const index = checkedMails?checkedMails.find((item)=>{ return (item===data.id)}):null;
        if(index){
                let newState= checkedMails.filter((item)=>{ return (item!==data.id)});
                setCheckedMails(newState)
            }
        else{
                let newState=[...checkedMails,data.id]
                setCheckedMails(newState)
            }
    }

    const readMailsHandler=(data)=>{
        const index = mails?mails.findIndex((item)=>{ return (item.id===data.id)}):null;
        mails[index].read=true;
        let newMails=[...mails]
        setMails(newMails)
        //change in local storage pending
    }

    const sidebarHandler=()=>{
        setExpanded((prevState)=>{return !prevState})
    }

    return (
        <div className={styles.parentContainer}>
            <div className={expanded?styles.asideContainer:styles.collapsedAsideContainer}>
                <div className={styles.userDetails}>
                    <img src="https://picsum.photos/200" alt="Profile"/>
                    <span>{currentUser.displayName}</span>
                    <span>Art director</span>
                </div>
                <div className={styles.navigationContainer}> 
                     <ul>
                         <li>Dashboard</li>
                         <li>Layout</li>
                         <li>Graphs</li>
                         <li>Mailbox</li>
                         <li>Metrics</li>
                         <li>Widgets</li>
                         <li>Forms</li>
                         <li>App Views</li>
                     </ul>
                </div>            
            </div>
            <div className={expanded?styles.mailContainer:styles.mailCollapsedContainer}>
                <div className={styles.searchBar}>
                    <div className={styles.searchBarFirstChild}>
                        <button onClick={sidebarHandler} style={{cursor:"pointer"}}>Ham</button>
                        <input placeholder='Search for something ...'/>
                    </div>
                    <div className={styles.searchBarSecondChild}>
                        <button>Mail{ count!==0 && `(${count})`}</button>
                        <button>Notifications</button>
                        <button>Log Out</button>
                    </div> 
                </div>
                <div className={styles.mail}>
                    <div className={styles.compose}>
                        <button onClick={()=>{setShowCompose(true)}}>Compose Mail</button>
                        <div>
                            <h5>FOLDERS</h5>
                            <ul>
                                <li style={{cursor:"pointer"}} onClick={inboxHandler}>Inbox</li>
                                <li style={{cursor:"pointer"}} onClick={sentHandler}>Sent Mails</li>
                                <li>Important</li>
                                <li>Draft</li>
                                <li>Trash</li>
                            </ul>
                        </div>
                        <div>
                            <h5>CATEGORIES</h5>
                            <ul>
                                <li>Work</li>
                                <li>Documents</li>
                                <li>Social</li>
                                <li>Advertising</li>
                                <li>Clients</li>
                            </ul>
                        </div>
                        <div>
                            <h5>LABELS</h5>
                            <div className={styles.spanContainer}>
                            <span>Family</span>
                            <span>Work</span>
                            <span>Home</span>
                            </div>
                        </div>

                    </div>
                    <div className={styles.inboxContainer}>
                        <div className={styles.inboxHeading}>
                            <div className={styles.inboxHeadingFirstChild}>
                                <h3>{mails.length!==0?mails[0].type==='inbox'?'Inbox':'Sent':'Inbox'}{`(${mails.length})`}</h3>
                                <div> 
                                    <input placeholder='Search email'/>
                                    <button>Search</button>
                                    
                                </div>

                            </div>
                            <div className={styles.inboxHeadingSecondChild}>
                                <div>
                                    <button>Refresh</button>
                                    <button>Eye</button>
                                    <button>Exclamation</button>
                                    <button style={{cursor:"pointer"}} onClick={deleteHandler}>Delete</button>
                                </div>
                                <div>
                                    <button>Previous</button>
                                    <button>Next</button>
                                </div>
                            </div>
                              
                        </div>
                        <div className={styles.inboxList}>
                         {mails.map((item)=>{ return (<Mailitem readMailsHandler={readMailsHandler} checkedMailsHandler={checkedMailsHandler} key={item.id} data={item}/>)})}
                        </div>
                    </div>
                </div>
            </div>
           {showCompose && <ComposeMail currentUser={currentUser} setShowCompose={setShowCompose}/>}
        </div>
    )
}

export default Mail
