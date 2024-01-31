import React, { useEffect, useState } from 'react'
import '../styles/MyReviews.css'

function MyReviews() {
  const [reviews, setReviews] = useState([
    {
      _id: '1',
      title: 'Review 1',
      description: 'This is review 1',
    },
    {
      _id: '2',
      title: 'Review 2',
      description: 'This is review 2',
    },
    {
      _id: '3',
      title: 'Review 3',
      description: 'This is review 3',
    },
  ])

  // const getReviews = async () => {
  //   const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
  //   const response = await fetch('/api/reviews/getreviews', {
  //     method: 'get',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authtoken: authtoken,
  //     },
  //   })

  //   if (response.status === 200) {
  //     const data = await response.json()
  //     setReviews(data.reviews)
  //   } else {
  //     console.error('Error:', response.status)
  //   }
  // }

  // useEffect(() => {
  //   getReviews()
  // }, [])
  return (
    <div className='card'>
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