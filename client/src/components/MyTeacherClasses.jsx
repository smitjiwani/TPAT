import React, { useEffect, useState } from 'react'
import TeacherClassCard from './TeacherClassCard'
import '../styles/MyTeacherClasses.css'

function MyTeacherClasses() {
    const [teacherClasses, setTeacherClasses] = useState([
        {
            classID: 1,
            SubjectName: "Math",
            year: 1,
            semester: 1,
            Course: "AI", 
        },  
    ])

    // const getClasses = async () => {
    //     try {
    //         const response = await fetch('/api/classes')
    //         const jsonData = await response.json()
    //         setTeacherClasses(jsonData.classes)
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }

    // useEffect(() => {
    //     getClasses()
    // }, [])

    return (
        <div className="my-teacher-classes">
            <h1 className="my-classes-heading">My Classes</h1>
            <div className="my-classes">
                {
                    teacherClasses.map((teacherClass) => {
                        return (
                            <div className="teacher-class-card" key={teacherClass.classID}>
                                <TeacherClassCard
                                    classID={teacherClass.classID}
                                    SubjectName={teacherClass.SubjectName}
                                    year={teacherClass.year}
                                    semester={teacherClass.semester}
                                    Course={teacherClass.Course}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyTeacherClasses