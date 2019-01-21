import React from 'react';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

/* **************************************************
   ShortAnswers component

   Displays a single question with:
     -- Add button to add a new space for a short answer
     -- Input field for each short answer
     -- Trashcan next to each Input field
     -- Save button

   props:
     question -- { code: 50, text: "Question 50" }
     previousAnswers -- array of strings of previous answers
     onSaveCB(newAnswer) -- callback for when user clicks Save
***************************************************** */
export default class ShortAnswers extends React.Component {

  state = {
    isDirty: false,

    // controlled component
    answers: this.props.previousAnswers,
  }

  // set isDirty and control answer field
  onChange = (e) => {
    // console.log("ShortAnswers::onChange(), e: ", e.target.value);
    this.setState({
      isDirty: true,
      answers: [e.target.value],
    })
  }

  // set isDirty and control answer field
  onBlur = (e) => {
    console.log("ShortAnswers::onBlur(), e: ", e.target.value);
    // this.setState({
    //   isDirty: true,
    //   answers: [e.target.value],
    // })
  }

  // Send newAnswers array back to Container to persist
  //   and update Save button to indicate control is no longer dirty
  onSubmit = (e) => {
    console.log(`ShortAnswers::onclickSave(): ${this.state.answers}`);
    console.log("ShortAnswers::state: ", this.state);
    e.preventDefault()
    // const value = e.target.answer.value.trim()
    // console.log("value: ", value)
    this.setState({ isDirty: false })
    this.props.onSaveCB(this.props.question.code, this.state.answers)
  }

  // render!
  render() {
    // console.log("Narrative::render()")

    // initialize
    const { question, onSaveCB } = this.props
    const { isDirty, answers } = this.state
    const answer = answers[0] || ''

    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <FormGroup>
          <ControlLabel>&nbsp;&nbsp;{question.text}</ControlLabel>
          <FormControl
            componentClass = "textarea"
            onChange = {this.onChange}
            onBlur = {this.onBlur}
            value = {answer}
            placeholder = "Please enter an answer and click < Save >"
          />
        </FormGroup>
        <Button type = "submit">{((isDirty) ? "Save" : "----")}</Button>
      </Form>
    )
  }
}

// export default ShortAnswers  // only neccessary for functional version
