import React, { useEffect, useState } from 'react'
import TeacherCard from './TeacherCard'
import '../styles/RateYourTeachers.css'

function RateYourTeachers() {
    const [teachers, setTeachers] = useState([])

    const getTeachers = async () => {
        try {
          const response = await fetch('/api/teachers')
          const jsonData = await response.json()
          setTeachers(jsonData.teachers)
        } catch (err) {
          console.error(err.message)
        }
    }

    useEffect(() => {
        getTeachers()
    }, [])
    
    return (
        <div>
            <div className="rateyourteachers">
                <h3>Rate Your Teachers</h3>
                {teachers.map((teacher) => {
                    return (
                        <TeacherCard
                            key={teacher.teacherID}
                            id={teacher.teacherID}
                            name={teacher.name}
                            email={teacher.email}
                            phone={teacher.phone}
                            score={teacher.reviewScore}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default RateYourTeachers