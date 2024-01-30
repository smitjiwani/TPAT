import React, { useEffect, useState } from 'react'

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
    <div>
        <h1>My Reviews</h1>
      <div className="reviews__container">
        {reviews.map((review) => (
          <div className="review__card">
            <h3>{review.review}</h3>
            <p>{review.teacherID}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyReviews