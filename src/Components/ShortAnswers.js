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

  // tell parent to save the array of answers
  saveAnswer = (idx, newAnswer) => {
    console.log(`ShortAnswers::saveAnswer(${idx}, ${newAnswer})`);

    const { onSaveCB } = this.props
    const { answers } = this.state

    const newAnswers = [...answers]
    newAnswers[idx] = newAnswer
    onSaveCB(newAnswers)
  }

  // delete answer from state::answers
  deleteAnswer = (idxToDelete) => {
    console.log(`ShortAnswers::deleteAnswer(${idxToDelete})`);
    const { answers } = this.state

    // this.setState({ answers: answers.filter((answer, idx) => idx !== idxToDelete) })
    const newAnswers = answers.filter((answer, idx) => idx !== idxToDelete)
    console.log("newAnswers: ", newAnswers);
    this.setState({ answers: newAnswers })
  }

  // add an empty answer to state::answers
  onclickAdd = () => {
    console.log(`ShortAnswers::onclickAdd()`);
    const { answers } = this.state

    const newAnswers = answers.concat('')
    console.log("newAnswers: ", newAnswers);
    this.setState({ answers: newAnswers })
    // this.setState({ answers: answers.concat('empty') })
  }

  // have parent persist the answers
  onclickSave = () => {
    console.log(`ShortAnswers::onclickSave()`);
    const { answers } = this.stat
    const { onSaveCB } = this.props

    onSaveCB(answers)
  }

  // render!
  render() {
    console.log("ShortAnswers::render()")

    const { question, doesHandlePersistence } = this.props
    const { answers } = this.state

    return (
      <>
        <h3>{question.text}</h3>
        {answers.map((answer, idx) => 
          <ShortAnswer key={idx} id={idx} previousAnswer={answer} saveAnswerCB={this.saveAnswer} deleteAnswerCB={this.deleteAnswer}></ShortAnswer>
        )}
        <Button type="button" onClick={this.onclickAdd}>Add answer</Button>
        {doesHandlePersistence.value && (
          <Button type="button" onClick={this.onclickSave}>Save</Button>
        )}
      </>
    )
  }
}
