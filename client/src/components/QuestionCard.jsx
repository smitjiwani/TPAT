import React, { useEffect, useState } from 'react'

const QuestionCard = (props) => {

  const { queNum, question, options, handleAnswer } = props


  // State for storing the selected option. Default is "Male"
  const [selectedOption, setSelectedOption] = useState(null)
  // Function to handle the change in radio button selection
  function onValueChange(event) {
    // Updating the state with the selected radio button's value
    setSelectedOption(event.target.value)
    handleAnswer(queNum, event.target.value)
  }

  // Function to handle the form submission
  function formSubmit(event) {
    // Preventing the default form submission behaviour
    event.preventDefault();

    // Logging the selected option

    // Alerting the user with the selected option
    alert("Your gender is " + selectedOption)
  }

  // Rendering the form
  return (
    <form onSubmit={formSubmit}>
      <h3>Q.{queNum} {question}</h3>

      {/* Radio button for "Male" */}
      {Object.keys(options).map((key) => {
        return (
          <>
            <label key={key}>
              <input
                type="radio"
                value={key}
                // Checking this radio button if the selected option is "Male"
                checked={selectedOption == key}
                onChange={onValueChange}
              />
              {options[key]}
            </label>
            <br />
          </>
        )
      })}

      {/* Displaying the selected option */}
      <div>
        Selected option is : {options[selectedOption]}
      </div>
      <br />
    </form>
  )
}

export default QuestionCard