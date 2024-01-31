import React, { useState, useEffect } from 'react'
import '../styles/TeacherProfile.css'

function TeacherProfile() {
    const [teachers, setTeachers] = useState([])
    const [teacherName, setTeacherName] = useState('')
    const [teacherEmail, setTeacherEmail] = useState('')
    const [teacherPhone, setTeacherPhone] = useState('')

    const getTeacherInfo = async () => {
        try {
            const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
            const response = await fetch('/api/teachers/getteacherbyid', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    authtoken: authtoken,
                },
            })

            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
                setTeachers(data.teacher[0])
            } else {
                console.error('Error:', response.status)
            }
        } catch (error) {
            console.error('Error:', error.message)
        }
    }

    useEffect(() => {
        getTeacherInfo()
    }, [])



    const updateTeacherInfo = async () => {
        try {
            const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
            const response = await fetch('/api/teachers/updateteacher', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authtoken: authtoken,
                },
                body: JSON.stringify({
                    name: teacherName,
                    email: teacherEmail,
                    phone: teacherPhone,
                }),
            })

            if (response.status === 200) {
                console.log('Teacher info updated successfully')
            } else {
                console.error('Error:', response.status)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setTeacherName(e.target.value)
        } else if (e.target.name == 'email') {
            setTeacherEmail(e.target.value)
        } else if (e.target.name == 'phone') {
            setTeacherPhone(e.target.value)
        }


    }

    return (
        <div className="teacher-profile">
            <h1>Teacher Profile</h1>
            <input type="text" name="name" placeholder={teachers.name} alt='username' onChange={handleChange} />
            <input type="email" name="email" placeholder={teachers.email} alt='email' onChange={handleChange} />
            <input type="number" name="phone" placeholder={teachers.phone} alt='phone' onChange={handleChange} />
            <button onClick={updateTeacherInfo} className='updateButton'>Update info</button>
            <button className='deleteButton'>Delete account</button>
        </div>
    )
}

export default TeacherProfile
