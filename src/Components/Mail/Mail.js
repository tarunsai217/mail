import React from 'react'
import styles from "./Mail.module.css"
import Mailitem from '../Mailitem/Mailitem'

function Mail() {
    const mails=[{to:"Far",from:"Samay",subject:"Test results",cc:"",body:"Here are the results",time:new Date()}]
    const [mailsType,setMailsType]=useState('inbox')
    return (
        <div className={styles.parentContainer}>
            <div className={styles.asideContainer}>
                <div className={styles.userDetails}>
                    <img/>
                    <span>David Williams</span>
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
            <div className={styles.mailContainer}>
                <div className={styles.searchBar}>
                    <div className={styles.searchBarFirstChild}>
                        <button>Ham</button>
                        <input placeholder='Search for something ...'/>
                    </div>
                    <div className={styles.searchBarSecondChild}>
                        <button>Mail</button>
                        <button>Notifications</button>
                        <button>Log Out</button>
                    </div> 
                </div>
                <div className={styles.mail}>
                    <div className={styles.compose}>
                        <button>Compose Mail</button>
                        <div>
                            <h5>FOLDERS</h5>
                            <ul>
                                <li>Inbox</li>
                                <li>Send Mail</li>
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
                                <h3>Inbox(16)</h3>
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
                                    <button>Delete</button>
                                </div>
                                <div>
                                    <button>Previous</button>
                                    <button>Next</button>
                                </div>
                            </div>
                              
                        </div>
                        <div className={styles.inboxList}>
                         {mails.map((item)=>{ return (<Mailitem key={item} data={item}/>)})}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mail
