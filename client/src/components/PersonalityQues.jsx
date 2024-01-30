import React, { useEffect, useState } from 'react'

const PersonalityQues = (props) => {

    const { qnum, question, options, handleAnswer } = props

    // useEffect(() => {
    //   console.log(options)
    // }, [])

    // State for storing the selected option. Default is "Male"
    const [selectedOption, setSelectedOption] = useState(null)
    // Function to handle the change in radio button selection
    function onValueChange(event) {
        // Updating the state with the selected radio button's value
        setSelectedOption(event.target.value)
        handleAnswer(parseInt(qnum), Object.values(options)[event.target.value])
    }

    // Function to handle the form submission
    function formSubmit(event) {
        // Preventing the default form submission behaviour
        event.preventDefault();
        // Logging the selected option
        // Alerting the user with the selected option
    }

    // Rendering the form
    return (
        <form onSubmit={formSubmit}>
            <h3>Q.{qnum} {question}</h3>

            {/* Radio button for "Male" */}
            {Object.keys(options).map((key, index) => {
                return (
                    <>
                        <label key={key}>
                            <input
                                type="radio"
                                value={index}
                                // Checking this radio button if the selected option is "Male"
                                checked={selectedOption == index}
                                onChange={onValueChange}
                            />
                            {key}
                        </label>
                        <br />
                    </>
                )
            })}

            {/* Displaying the selected option */}
            <div>
                Selected option is : {Object.keys(options)[selectedOption]}
            </div>
            <br />
        </form>
    )
}

export default PersonalityQues