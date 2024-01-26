import React, { useEffect, useState } from 'react'
import "../styles/TeacherCard.css"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function TeacherCard(props) {
  const [score, setScore] = useState(props.score);

  const handleThumbsUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/teachers/updatescore/review/${props.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          score: "5"
        })
      });
      
      const data = await response.json();
      console.log(data);
      setScore(data.updatedScore); // Update the score state
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const handleThumbsDown = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/teachers/updatescore/review/${props.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          score: "0"
        })
      });
      
      const data = await response.json();
      console.log(data); // This might contain the updated score
      setScore(data.updatedScore); // Update the score state
    } catch (error) {
      console.error('Error updating score:', error);
    } 
  }


  return (
    <div className='TeacherCard' id={props.id}>
      <div className='details'>
        <h2>{props.name}</h2>
        <p>email: {props.email}</p>
        <p>phone: {props.phone}</p>
        <p>Score: {score}/5 ⭐</p>
        <div className='responseButtons'>
          <button onClick={handleThumbsUp}>
            <ThumbUpIcon />
          </button>
          <button onClick={handleThumbsDown}>
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