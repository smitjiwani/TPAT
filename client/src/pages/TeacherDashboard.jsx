import React, { useEffect, useState } from 'react'
import "../styles/TeacherDashboard.css"

function TeacherDashboard() {

  const [teachers, setTeachers] = useState([])

  const getTeacherInfo = async () => {
    try {
      // need a user.id here instead of 1
      const response = await fetch('/api/teachers/1')
      const jsonData = await response.json()
      setTeachers(jsonData.teacher)
      console.log(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getTeacherInfo()
  }, [])

 return(
   <div>
     <h1>Teacher Dashboard</h1>
     {
       teachers.map(teacher => {
         return (
           <div className="profile" key={teacher.id}>
             <h2>{teacher.name}</h2>
             <p>{teacher.email}</p>
             <p>{teacher.phone}</p>
             <p>{teacher.score}/5</p>
           </div>
         )
       })
     }

   </div>
 )
  
}

export default TeacherDashboard