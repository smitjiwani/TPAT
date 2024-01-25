import React, { useState, useEffect } from 'react'
import "../styles/Login.css"
import RadioButton from '../components/RadioButton'
import { useNavigate  } from "react-router-dom"


function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState({ student: false, teacher: false })

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    // console.log(user)
    if (user) {
      navigate('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();


    const data = { email: email, password: password, role: (role.teacher ? 'teacher' : 'student') };

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json());

    if (response.status === 'success') {
      if (data.role === 'teacher') {
        navigate("/teacherdashboard");
      } else {
        navigate("/studentdashboard");
      }
    } else {
      toast.error(response.error, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      console.log(response)
    }
  };


  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'student') {
      setRole({ teacher: false, student: true })
    }
    else if (e.target.name == 'teacher') {
      setRole({ teacher: true, student: false })
    }
  }

  return (
    <section className='loginPage'>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='loginBox'>
        <h2>
          Sign in to your account
        </h2>
        <GoogleTranslateWidget />
        <div className='radioBox'>
          <span>Sign in as :</span>
          <RadioButton
            name="student"
            id="studentRadio"
            value="student"
            onChange={handleChange}
            checked={role.student}
            text="student"
          />
          <RadioButton
            name="teacher"
            id="teahcerRadio"
            value="teacher"
            onChange={handleChange}
            checked={role.teacher}
            text="teacher"
          />
        </div>
        <form action="#" onSubmit={handleSubmit} className='loginForm'>
          <div className='inputSection'>
            <label htmlFor="email" >Email</label>
            <input value={email} onChange={handleChange} type="email" name="email" id="email" placeholder="abc@eng.rizvi.edu.in" required="" />
          </div>
          <div className='inputSection'>
            <label htmlFor="password" >Password</label>
            <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" required="" />
          </div>
          <div>
            <div className='rememberBox'>
              <div >
                <input id="remember" aria-describedby="remember" type="checkbox" required="" />
              </div>
              <div >
                <label htmlFor="remember" >Remember me</label>
              </div>
            </div>
            <a href="#" >Forgot password?</a>
          </div>
          <div className='buttonContainer'>
            <button type="submit" className='loginButton' >Sign in</button>
          </div>
          <p >
            Don’t have an account yet? <a href="#" >Sign up</a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login
