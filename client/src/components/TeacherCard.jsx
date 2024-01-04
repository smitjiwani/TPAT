import React from 'react'
import "../styles/TeacherCard.css"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';

function TeacherCard(props) {
  const handleRatingClick = async (rating) => {
    try {
      
      const response = await axios.post(`/updateScore/${props.teacherId}`, {
        score: calculateScoreFromRating(rating)
      });
      
      console.log(response.data); // This might contain the updated score
    } catch (error) {
      
      console.error('Error updating score:', error);
    }
  };

  const calculateScoreFromRating = (rating) => {
 
    switch (rating) {
      case 5:
        return 5;
      case 4:
        return 4;
      case 3:
        return 3;
      case 2:
        return 2;
      case 1:
        return 1;
    }
  };


  return (
    <div className='TeacherCard' key={props.key}>
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