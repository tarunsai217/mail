import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SignIn from "./Pages/SignIn/SignIn"
import Mail from "./Pages/Mail/Mail"
import {useState} from "react"
// import Compose from './Components/Mailbox/Compose';
// import MailItem from './Components/Mailitem/Mailitem';
function App() {
  const [currentUser, setcurrentUser] = useState({})
  
  return (
    <Router>
       <Routes>
       <Route path='/' element={<SignIn setcurrentUser={setcurrentUser}/>} />
       <Route path='/mail' element={<Mail currentUser={currentUser} />} />
       </Routes>
     <ToastContainer/>
    </Router>
  );
}

export default App;
