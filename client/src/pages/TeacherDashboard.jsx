import React, { useEffect, useState } from 'react'
import "../styles/TeacherDashboard.css"

function TeacherDashboard() {

  const [teachers, setTeachers] = useState([])

  const getTeacherInfo = async () => {
    
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