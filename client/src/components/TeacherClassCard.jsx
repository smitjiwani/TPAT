import React from 'react'
import '../styles/TeacherClassCard.css'

export default function TeacherClassCard(props) {
    const { key, ClassID, SubjectName, year, semester, course } = props;

    return (
        <div key={key}>
            <div className="class__card">
                <div className="class__card__left">
                    <h3>Subject: {SubjectName}</h3>
                    <h3> Year:{year}</h3>
                    <h3>Sem: {semester}</h3>
                    <h3>Course: {course}</h3>
                </div>

                <button>View Class</button>

            </div>
        </div>
    )
}
