import React, { useEffect, useState } from 'react'
import TeacherClassCard from './TeacherClassCard'
import '../styles/MyTeacherClasses.css'
import AddClass from "./AddClass"

function MyStudentClasses() {
  const [studentClasses, setStudentClasses] = useState([])

  const getClasses = async () => {
    try {
      const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
      const response = await fetch('/api/students/getmyclasses', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authtoken: authtoken,
        },
      })

      if (response.status === 200) {
        const data = await response.json()
        console.log(data)
        setStudentClasses(data)
      } else {
        console.log('Error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getClasses()
  }, [])

  return (
    <div className="my-teacher-classes">
      <h1 className="my-classes-heading">My Classes</h1>
      <div className="my-classes">
        {
          studentClasses.map((studentClass) => {
            return (
              <div className="teacher-class-card" key={studentClass.classID}>
                <TeacherClassCard
                  classID={studentClass.classID}
                  subjectName={studentClass.subjectName}
                  year={studentClass.year}
                  semester={studentClass.semester}
                  course={studentClass.course}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyStudentClasses
