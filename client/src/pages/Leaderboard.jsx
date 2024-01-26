import React, { useEffect, useState } from 'react'
import '../styles/LeaderBoard.css'



const Leaderboard = () => {
    const [teachers, setTeachers] = useState([])
    const getTeachers = async () => {
        const data = await fetch(`/api/teachers`).then(res => res.json())
        console.log(data)
        setTeachers(data.teachers)
        console.log(typeof(data.teachers))
    }

    useEffect(() => {
        getTeachers()
    }, [])

    return (
        <div className=''>
            <h1>Leaderboard</h1>
            <div className='bg-slate-300'>
                <table className='text-center table-auto'>
                    <thead>
                        <tr className='grid grid-cols-4 gap-4'>
                            <th>Rank</th>
                            <th>Teacher</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, i) => {
                            console.log(teacher.teacherID);
                            return (
                                <div key={teacher.teacherID}>
                                    <tr className='grid grid-cols-4 gap-4'>
                                        <td>{i+1}</td>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.totalScore}</td>
                                    </tr>
                                </div>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Leaderboard