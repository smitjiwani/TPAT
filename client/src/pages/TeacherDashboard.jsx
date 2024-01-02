import React from 'react'
import "../styles/TeacherDashboard.css"
import TeacherCard from '../components/TeacherCard'

function TeacherDashboard() {

  // Temporary data
  const data = [
    {
      name: "Reshma Lohar", 
      email: "reshma@eng.rizvi.edu.in",
      phone: "3214312412",
      score: 3.5
    },
    {
      name: "Tushar Kapoora", 
      email: "tushar@eng.rizvi.edu.in",
      phone: "876312412",
      score: 2.7
    },
    {
      name: "Anuj Mishra", 
      email: "anuj@eng.rizvi.edu.in",
      phone: "8674312412",
      score: 3.9
    },
    {
      name: "Mohammed Juned", 
      email: "juned@eng.rizvi.edu.in",
      phone: "9324312412",
      score: 2.3
    },
    {
      name: "Shiburaj Pappu", 
      email: "shibu@eng.rizvi.edu.in",
      phone: "984312412",
      score: 4.6
    }
  ];
  return (
    <div className='container'>
      {
        data.map((teacher) => {
          return (
            <TeacherCard key={teacher} name={teacher.name} email={teacher.email} phone={teacher.phone} score={teacher.score}  />
          )
        })
      }
    </div>
  )
}

export default TeacherDashboard