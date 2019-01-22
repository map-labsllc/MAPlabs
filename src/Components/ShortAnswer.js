import React from 'react';
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

/* **************************************************
   ShortAnswer component

   Displays a single question with:
     -- A single short answer
     -- Delete button

   props:
     id -- integer id for the question (currently the idx into the array of answers in parent)
     previousAnswer -- string of previous answer
     saveAnswerCB(newAnswer) -- callback for when user moves off on the field
     deleteAnswerCB -- callback when user clicks the Delete button
***************************************************** */
export default class ShortAnswer extends React.Component {

  state = {
    isDirty: false,

    // controlled component
    answer: this.props.previousAnswer,
  }

  // set isDirty and control answer field
  onChange = (e) => {
    // console.log("ShortAnswer::onChange(), e: ", e.target.value);
    this.setState({
      isDirty: true,
      answer: e.target.value,
    })
  }

  // pass to parent to save value and clear isDirty
  onBlur = (e) => {
    console.log("ShortAnswer::onBlur(), e: ", e.target.value);
    const { saveAnswerCB, id } = this.props
    const { isDirty } = this.state
    if (isDirty) {
      saveAnswerCB(id, e.target.value)
      this.setState({
        isDirty: false,
      })
    }
  }

  // pass to parent to delete
  onclickDelete = () => {
    console.log("ShortAnswer::onclickDelete()");
    const { deleteAnswerCB, id } = this.props
    deleteAnswerCB(id)
  }

  // render!
  render() {
    console.log("ShortAnswer::render()")

    // initialize
    let { answer, isDirty } = this.state

    return (
      <Form inline onSubmit={this.onSubmit}>
        <FormGroup>
          <Button type = "button" onClick={this.onclickDelete}>del</Button>
          {' '}
          <FormControl
            type = "text"
            onChange = {this.onChange}
            onBlur = {this.onBlur}
            value = {answer}
            placeholder = "Please enter an answer"
          />
          {` `}{(isDirty ? 'dirty' : '')}
        </FormGroup>
      </Form>
    )
  }
}
