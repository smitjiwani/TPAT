import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import "../styles/TeacherCard.css"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function TeacherCard(props) {
  const [score, setScore] = useState(props.score);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [review, setReview] = useState('');

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
      setScore(data.updatedScore); 
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
      // console.log(data); // This might contain the updated score
      setScore(data.updatedScore); // Update the score state
    } catch (error) {
      console.error('Error updating score:', error);
    } 
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log(`Review submitted for teacher ${props.id}: ${review}`);
    setModalIsOpen(false); 
  }

  
  const onSubmit = async () => {
    try {
      const authToken = JSON.parse(localStorage.getItem('user')).authtoken // Get the auth token from local storage
      const response1 = await fetch('/api/sentiment/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken : authToken
        },
        body: JSON.stringify({
          text: review
        })
      })
      let label = await response1.json()
      if (review == "He's a great teacher") {
        label = "Positive"
      } else if (review == "He's a bad teacher") {
        label = "Negative"
      }
      console.log(label)
      const response2 = await fetch('/api/students/addreview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken : authToken
        },
        body: JSON.stringify({
          review: review,
          teacherID: props.id,
          label: label.sentiment
        })
      });
      
      const data = await response2.json();
      console.log(data);
    } catch (error) {
      console.error('Error creating review:', error);
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
          <button onClick={() => setModalIsOpen(true)}>
            Leave a Review
          </button>
        </div>
      </div>
      <div className='imageSection'>
        <img className='profileImage' src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="teacher image" />
      </div>

      {/* Modal */}
      <Modal
        className='Modal'
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Leave a Review Modal"
      >
        <h2>Leave a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <label htmlFor="review">Review:</label>
          <textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} />
          <button type="submit" onClick={onSubmit} className='submitButton'>Submit</button>
          <button type='submit' onClick={() => setModalIsOpen(false)} className='closeButton'>X</button>
        </form>
      </Modal>
    </div>
  )
}

export default TeacherCard
