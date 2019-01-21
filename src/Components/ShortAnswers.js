import React from 'react';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import ShortAnswer from './ShortAnswer'

/* **************************************************
   ShortAnswers component

   Displays a single question with:
     -- Add button to add a new space for a short answer
     -- Input field for each short answer
     -- Trashcan next to each Input field
     -- Save button

   state:
     Manages the list of answers in state to provide better UX when adding
       new blank entries (it allows us to be in control of the focus).

   props:
     question -- { code: 50, text: "Question 50" }
     previousAnswers -- [] or array of strings of previous answers
     onSaveCB(newAnswers) -- callback for when user clicks Save
     doesHandlePesistence -- { value: true }
***************************************************** */
export default class ShortAnswers extends React.Component {

  state = {
    isDirty: false,

    answers: this.props.previousAnswers,
  }

  saveAnswer = (idx, newAnswer) => {
    console.log(`ShortAnswers::saveAnswer(${idx}, ${newAnswer})`);
    console.log("TODO: add code to make it happen!");
  }

  deleteAnswer = (idx) => {
    console.log(`ShortAnswers::deleteAnswer(${idx})`);
    console.log("TODO: add code to make it happen!");
  }

  // // set isDirty and control answer field
  // onChange = (e) => {
  //   // console.log("ShortAnswers::onChange(), e: ", e.target.value);
  //   this.setState({
  //     isDirty: true,
  //     answers: [e.target.value],
  //   })
  // }
  //
  // // set isDirty and control answer field
  // onBlur = (e) => {
  //   console.log("ShortAnswers::onBlur(), e: ", e.target.value);
  //   // this.setState({
  //   //   isDirty: true,
  //   //   answers: [e.target.value],
  //   // })
  // }
  //
  // // Send newAnswers array back to Container to persist
  // //   and update Save button to indicate control is no longer dirty
  // onSubmit = (e) => {
  //   console.log(`ShortAnswers::onclickSave(): ${this.state.answers}`);
  //   console.log("ShortAnswers::state: ", this.state);
  //   e.preventDefault()
  //   // const value = e.target.answer.value.trim()
  //   // console.log("value: ", value)
  //   this.setState({ isDirty: false })
  //   this.props.onSaveCB(this.props.question.code, this.state.answers)
  // }

  // render!
  render() {
    console.log("ShortAnswers::render()")

    // initialize
    // const { question, onSaveCB } = this.props
    // const { isDirty, answers } = this.state
    // const answer = answers[0] || ''

    const { question } = this.props
    const { answers } = this.state

    return (
      <>
        <h3>{question.text}</h3>
        {answers.map((answer, idx) =>
          <ShortAnswer key={idx} id={idx} previousAnswer={answer} saveAnswerCB={this.saveAnswer} deleteAnswerCB={this.deleteAnswer}></ShortAnswer>
        )}
        <Button>Add answer</Button>
      </>
    )
  }
}

// export default ShortAnswers  // only neccessary for functional version
