import React from 'react'
import "../styles/TeacherCard.css"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function TeacherCard(props) {
    // add teacher card prop here


  return (
    <div className='TeacherCard'>
        <div className='details'>
          <h2>{props.name}</h2>
          <p>email: {props.email}</p>
          <p>phone: {props.phone}</p>
          <p>Score: {props.score}/5 ⭐</p>
          <div className='responseButtons'>
            <button>
              <ThumbUpIcon />
            </button>
            <button>
              <ThumbDownIcon />
            </button>
          </div>
        </div>
        <div className='imageSection'>
          <img className='profileImage' src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="teacher image" />
        </div>
    </div>
  )
}

export default TeacherCard