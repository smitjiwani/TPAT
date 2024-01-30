import React, { useState, useEffect } from 'react'
import '../styles/TeacherProfile.css'

function TeacherProfile() {
    const [teachers, setTeachers] = useState([])
    const [teacherName, setTeacherName] = useState()
    const [teacherInfo, setTeacherInfo] = useState([])

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
            console.error('Error:', error)
        }
    }

    useEffect(() => {
        getTeacherInfo()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTeacherInfo({ ...teacherInfo, [name]: value })
    }

    const updateTeacherInfo = async () => {
        try {
            const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
            const response = await fetch('/api/teachers/updateteacher', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    authtoken: authtoken,
                },
                body: JSON.stringify(teacherInfo),
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

    return (
        <div className="teacher-profile">
            <h1>Teacher Profile</h1>
            <input type="text" name="name" placeholder={teachers.name} alt='username' onChange={() => {setTeacherName(value); console.log(teachers)}} />
            <input type="email" name="email" placeholder={teachers.email} alt='email' onChange={handleInputChange} />
            <input type="number" name="phone" placeholder={teachers.phone} alt='phone' onChange={handleInputChange} />
            <button onClick={updateTeacherInfo} className='updateButton'>Update info</button>
            <button className='deleteButton'>Delete account</button>
        </div>
    )
}

export default TeacherProfile
