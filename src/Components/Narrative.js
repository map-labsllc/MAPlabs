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
   previousAnswer -- string with the previous answer
   onSaveCB(newAnswer) -- callback when user clicks to save the control
***************************************************** */
export default class Narrative extends React.Component {

  // load the textarea with previousAnswer
  componentDidMount = () => {
    console.log("Narrative::componentDidMount()");
    const { previousAnswer } = this.props
    const elem = document.getElementById('answer')
    if (previousAnswer) elem.value = previousAnswer
  }

  // change the text of the save button
  setSaveButtonText = (newText) => {
    document.getElementById('save-button').innerText = newText
  }

  // When textarea changes update the Save button to indicate control is dirty
  onChange = (e) => {
    console.log("Narrative::onChange");
    this.setSaveButtonText("Save")
  }

  // Send newAnswer value back to Container to persist
  //   and update Save button to indicate control is no longer dirty
  onSubmit = (e) => {
    console.log("Narrative::onclickSave");
    e.preventDefault()
    const value = e.target.answer.value.trim()
    console.log("value: ", value)
    this.setSaveButtonText("----")
    // this.props.onSaveCB(value)
  }

  // render!
  render() {

    // initialize
    console.log("Narrative::render()")
    const { question, previousAnswer, onSaveCB } = this.props

    return (
      <Form
        onSubmit={this.onSubmit}
        name = "narrative-form"
        id = "narrative-form"
      >
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>{question}</ControlLabel>
          <FormControl
            componentClass = "textarea"
            onChange = {this.onChange}
            placeholder = "Please enter an answer and click < Save >"
            name = "answer"
            id = "answer"
            autoFocus />
        </FormGroup>
        <Button type = "submit" name = "save-button" id = "save-button">----</Button>
      </Form>
    )
  }
}

// export default Narrative  // neccessary for functional version
