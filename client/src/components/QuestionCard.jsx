import React from 'react'

export const QuestionCard = (props) => {
  const { questionList } = props
  return (
    <div>
      <p>
        Q {queNum}: {question}
      </p>
      <form>
        {Object.keys(options).map((optionNum) => (
          <div key={optionNum}>
            <input
              type="radio"
              id={optionNum}
              name={`question${queNum}`}
              value={options[optionNum]}
            />
            <label htmlFor={optionNum}>{options[optionNum]}</label>
          </div>
        ))}
      </form>{' '}
    </div>
  )
}
