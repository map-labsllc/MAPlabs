import React from 'react';
//import { connect } from 'react-redux';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

/* **************************************************
   Narrative component

   Displays a single question and multi-line textarea.

   question -- string withe the question
   answer -- string with the previous answer
   onSaveCB(newAnswer) -- callback when user clicks to save the control
***************************************************** */
const Narrative = (props) => {

  const setSaveButtonText = (newText) => {
    document.getElementById('save-button').innerText = newText
  }

  // Change the save button text when user makes control dirty
  const onChange = (e) => {
    console.log("Narrative::onChange");
    setSaveButtonText("Save")
  }

  // Send newAnswer value back to Container to persist
  const onSubmit = (e) => {
    console.log("Narrative::onclickSave");
    e.preventDefault()
    const value = e.target.answer.value
    console.log("value: ", value)
    setSaveButtonText("----")
    // onSaveCB(value)
  }

  // initialize
  console.log("Narrative::render()")
  const { question, answer, onSaveCB } = props
  if (answer) document.getElementById('answer').innerText = answer

  return (
    <Form
      onSubmit={onSubmit}
      name = "narrative-form"
      id = "narrative-form"
    >
      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>{question}</ControlLabel>
        <FormControl
          componentClass = "textarea"
          onChange = {onChange}
          placeholder = "enter your answer and click Save"
          name = "answer"
          id = "answer" />
      </FormGroup>
      <Button type = "submit" name = "save-button" id = "save-button">----</Button>
    </Form>
  )
}

export default Narrative
