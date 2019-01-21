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

   Displays a single question with multi-line textarea and Save button.

   props:
     question_code -- integer
     question -- string with the question
     previousAnswer -- string with the previous answer
     onSaveCB(newAnswer) -- callback for when user clicks Save
***************************************************** */
export default class Narrative extends React.Component {

  state = {
    isDirty: false,

    // controlled component
    answer: this.props.previousAnswer,
  }

  // set isDirty and control answer field
  onChange = (e) => {
    console.log("Narrative::onChange(), e: ", e.target.value);
    this.setState({
      answer: e.target.value,
      isDirty: true,
    })
  }

  // Send newAnswer value back to Container to persist
  //   and update Save button to indicate control is no longer dirty
  onSubmit = (e) => {
    console.log(`Narrative::onclickSave(): ${this.state.answer}`);
    console.log("state: ", this.state);
    e.preventDefault()
    // const value = e.target.answer.value.trim()
    // console.log("value: ", value)
    this.setState({ isDirty: false })
    this.props.onSaveCB(this.props.question_code, this.state.answer)
  }

  // render!
  render() {
    // console.log("Narrative::render()")

    // initialize
    const { question, onSaveCB } = this.props
    const { isDirty, answer } = this.state

    return (
      <Form
        onSubmit={this.onSubmit}
        id = "narrative-form"
      >
        <FormGroup>
          <ControlLabel>&nbsp;&nbsp;{question}</ControlLabel>
          <FormControl
            componentClass = "textarea"
            onChange = {this.onChange}
            value = {answer}
            placeholder = "Please enter an answer and click < Save >"
            id = "answer"
          />
        </FormGroup>
        <Button type = "submit" id = "save-button">{((isDirty) ? "Save" : "----")}</Button>
      </Form>
    )
  }
}

// export default Narrative  // only neccessary for functional version
