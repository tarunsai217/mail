import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import styles from "./SignIn.module.css"


function SignIn({setcurrentUser}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  

  const users=[{email:"ravi@gmail.com",password:"ravi",displayName:"Ravi"},{email:"sharan@gmail.com",password:"sharan",displayName:"Sharan"}]
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const {email,password}=formData
    const found = users.find(element => element.email===email);
    if(found){
      if(found.password===password){
        setcurrentUser(found)
        navigate('/mail')
      }
      else{
        toast.error('Wrong Password')
      }
    }
    else{
      toast.error('Wrong email')
    }

  }

  return (
    <>
      <div className={styles.container}>
        <header>
          <p >Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className={styles.passwordContainer}>
            <input
              type='text'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />
          </div>
          <div >
            <button >
                Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignIn
