import React, { useEffect, useState } from 'react'
import TeacherClassCard from './TeacherClassCard'
import '../styles/MyTeacherClasses.css'
import AddClass from "./AddClass"

function MyTeacherClasses() {
    const [teacherClasses, setTeacherClasses] = useState([])

    const getClasses = async () => {
        try {
            const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
            const response = await fetch('/api/teachers/getmyclasses', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    authtoken: authtoken,
                },
            })

            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
                setTeacherClasses(data.classes)
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
            <AddClass />
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