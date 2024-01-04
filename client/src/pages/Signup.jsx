import React, { useState } from 'react'
import "../styles/Signup.css"
import RadioButton from '../components/RadioButton'
import { useNavigate } from "react-router-dom"


function Signup() {

    // const [credentials, setCredentials] = useState({name: "", email: "", phone: "", password: "", cpassword: "" });

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState({ student: false, teacher: false })
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            if (password != confirmPassword){
                throw new Error("Confirm password does not match password")
            }

            const data = { username: email, password: password, role: (role.teacher ? 'teacher' : 'student'), phone: phone, name: name }

            let res = await fetch(`http://localhost:5000/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            let response = await res.json();

            setEmail('')
            setPassword('')

            // I don't know why this works out of the if-else block but not inside it, Fuck it man , almost at it for 1 hour
            // navigate("/studentdashboard")
            if (response.success) {
                console.log(response)
                navigate((role.teacher ? "/teacherdashboard" : "/studentdashboard"))
            }
            else {
                console.log(response)
                navigate("/")
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }


    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
        else if (e.target.name == 'confirmPassword') {
            setConfirmPassword(e.target.value)
        }
        else if (e.target.name == 'student') {
            setRole({ teacher: false, student: true })
        }
        else if (e.target.name == 'teacher') {
            setRole({ teacher: true, student: false })
        }
        else if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value)
        }

    }

    return (
        <section className='loginPage'>
            <div className='loginBox'>
                <h2>
                    Sign Up
                </h2>
                <div className='radioBox'>
                    <span>Sign up as :</span>
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
                        <label htmlFor="name" >Name</label>
                        <input value={name} onChange={handleChange} type="text" name="name" id="name" placeholder="John Doe" required="" />
                    </div>
                    <div className='inputSection'>
                        <label htmlFor="email" >Email</label>
                        <input value={email} onChange={handleChange} type="email" name="email" id="email" placeholder="abc@eng.rizvi.edu.in" required="" />
                    </div>
                    <div className='inputSection'>
                        <label htmlFor="password" >Password</label>
                        <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" required="" />
                    </div>
                    <div className='inputSection'>
                        <label htmlFor="confirmPassword" >Confirm Password</label>
                        <input value={confirmPassword} onChange={handleChange} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Your Password" required="" />
                    </div>
                    <div className='inputSection'>
                        <label htmlFor="phone" >Phone</label>
                        <input value={phone} onChange={handleChange} type="number" name="phone" id="phone" placeholder="Enter your 10 digits phone number" required="" />
                    </div>
                    <div className='buttonContainer'>
                        <button type="submit" className='loginButton' >Sign Up</button>
                    </div>
                    <p >
                        Already have an account? <a href="#" >Sign in</a>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Signup