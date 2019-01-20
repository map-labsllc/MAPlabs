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

  state = {
    isDirty: false,
  }

  // load the textarea with previousAnswer
  componentDidMount = () => {
    console.log("Narrative::componentDidMount()");
    const { previousAnswer } = this.props
    const elem = document.getElementById('answer')
    if (previousAnswer) elem.value = previousAnswer
  }

  // set isDirty
  onChange = (e) => {
    // console.log("Narrative::onChange");
    this.setState({ isDirty: true })
  }

  // Send newAnswer value back to Container to persist
  //   and update Save button to indicate control is no longer dirty
  onSubmit = (e) => {
    console.log("Narrative::onclickSave");
    e.preventDefault()
    const value = e.target.answer.value.trim()
    console.log("value: ", value)
    this.setState({ isDirty: false })
    // this.props.onSaveCB(value)
  }

  // render!
  render() {
    // console.log("Narrative::render()")

    // initialize
    const { question, previousAnswer, onSaveCB } = this.props
    const { isDirty } = this.state

    return (
      <Form
        onSubmit={this.onSubmit}
        id = "narrative-form"
      >
        <FormGroup>
          <ControlLabel>{question}</ControlLabel>
          <FormControl
            componentClass = "textarea"
            onChange = {this.onChange}
            placeholder = "Please enter an answer and click < Save >"
            id = "answer"
            autoFocus />
        </FormGroup>
        <Button type = "submit" id = "save-button">{((isDirty) ? "Save" : "----")}</Button>
      </Form>
    )
  }
}

// export default Narrative  // only neccessary for functional version
