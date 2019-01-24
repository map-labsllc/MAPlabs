import React from 'react';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

/* **************************************************
   Narrative component

   Displays a single question with:
     -- multi-line textarea
     -- Save button

   props:
     userId -- integer
     question -- { code: 50, text: "Question 50" }
     instructions -- can be empty string
     previousAnswer -- string with the previous answer
     onPersistCB(newAnswer) -- callback for when user clicks Save
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
      isDirty: true,
      answer: e.target.value,
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

    const { onPersistCB, question, userId } = this.props
    const { answer } = this.state

    onPersistCB(userId, answer)
  }

  // render!
  render() {
    // console.log("Narrative::render()")

    // initialize
    const { question, instructions } = this.props
    const { isDirty, answer } = this.state

    return (
      <Form onSubmit={this.onSubmit} >
        <FormGroup>
          {instructions && (
            <p>..Narrative instructions: <i>{instructions}</i></p>
          )}
          <ControlLabel>&nbsp;&nbsp;{question.text}</ControlLabel>
          <FormControl
            componentClass = "textarea"
            onChange = {this.onChange}
            value = {answer}
            placeholder = "Please enter an answer and click < Save >"
          />
        </FormGroup>
        <Button type = "submit">{((isDirty) ? "Save" : "----")}</Button>
      </Form>
    )
  }
}
