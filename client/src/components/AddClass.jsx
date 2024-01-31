
import React, { useState } from 'react'
import "./../styles/addtailwind.css"

import { year, semester, course } from "./../enums/enums.js"

const AddClass = () => {


    const [showModal, setShowModal] = useState(false);
    const [ClassName, setClassName] = useState("");
    const [ClassYear, setClassYear] = useState(year[0]);
    const [ClassSemester, setClassSemester] = useState(semester[0])
    const [ClassCourse, setClassCourse] = useState(course[0]);

    const handleChange = (e) => {
        if (e.target.name == 'subjectName') {
            setClassName(e.target.value)
        }
        else if (e.target.name == 'year') {
            setClassYear(e.target.value)
        }
        else if (e.target.name == 'semester') {
            setClassSemester(e.target.value)
        }
        else if (e.target.name == 'course') {
            setClassCourse(e.target.value)
        }
    }

    const handleCreateClass = async (e) => {
        e.preventDefault()
        const authtoken = JSON.parse(localStorage.getItem("user")).authtoken
        const data = { subjectName: ClassName, year: ClassYear, semester: ClassSemester, course: ClassCourse }
        const res = await fetch(`http://localhost:5000/api/classes/addclass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': authtoken
            },
            body: JSON.stringify(data)
        });
        if (res.status == 200) {
            setShowModal(false);
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <button
                    className="bg-blue-500 w-15 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Add Class
                </button>
            </div>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white p-4 rounded-md">
                            {/*content*/}
                            <div className='flex justify-end'>
                                <p className='text-red-500' onClick={() => { setShowModal(false) }}>X</p>
                            </div>
                            <form onSubmit={handleCreateClass} className="w-full max-w-lg">

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Class Name
                                        </label>

                                        <input name='subjectName' value={ClassName} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Algorithms" />

                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-2">
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                            Year
                                        </label>
                                        <div className="relative">
                                            {/* <Select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" options={yearOptions} /> */}

                                            <select name='year' value={ClassYear} onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">

                                                {year.map(y => <option key={y}>{y}</option>)}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                            Semester
                                        </label>
                                        <div className="relative">

                                            <select name='semester' value={ClassSemester} onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">

                                                {semester.map(y => <option key={y}>{y}</option>)}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                            Course
                                        </label>
                                        <div className="relative">

                                            <select name='course' value={ClassCourse} onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">

                                                {course.map(y => <option key={y}>{y}</option>)}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className='rounded-xl bg-green-400 hover:bg-green-800 px-4 py-2'  >Create</button>

                            </form>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

                </>
            ) : null}
        </>
    )
}

export default AddClass;
