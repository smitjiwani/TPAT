import React, { useEffect, useState } from 'react'
import '../styles/MyReviews.css'

function MyReviews() {
  const [reviews, setReviews] = useState([])

  const getReviews = async () => {
    try {
      const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
      const response = await fetch('/api/teachers/getreviews', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authtoken: authtoken,
        },
      })

      if (response.status === 200) {
        const data = await response.json()
        setReviews(data.reviews)
      } else {
        console.log('Error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getReviews()
  }, [])

  return (
    <div className='card'>
        <h1>My Reviews</h1>
      <div className="reviews__container">
        {reviews.map((review) => (
          <div className="review__card">
            <p>{review.review}</p>
            <p className='review__label'>{review.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyReviews