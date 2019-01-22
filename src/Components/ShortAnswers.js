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
     -- <ShortAnswer> for each answer
     -- Save button

   state:
     Manages the list of answers in state to provide better UX when adding
       new blank entries (it allows us to be in control of the focus).

   props:
     question -- { code: 50, text: "Question 50" }
     previousAnswers -- [] or array of strings of previous answers
     onUpdateStoreCB(newAnswers) -- callback to update the store
     onPersistCB(newAnswers) -- callback for when user clicks Save, updates store and persists
     doesHandlePesistence -- { value: true }
***************************************************** */
export default class ShortAnswers extends React.Component {

  state = {
    isDirty: false,
    answers: this.props.previousAnswers,
  }

  // tell parent to save the array of answers to store
  saveAnswer = (idx, newAnswer) => {
    console.log(`ShortAnswers::saveAnswer(${idx}, ${newAnswer})`);

    const { onUpdateStoreCB } = this.props
    const { answers } = this.state

    const newAnswers = [...answers]
    newAnswers[idx] = newAnswer
    onUpdateStoreCB(newAnswers)
    this.setState({answers: newAnswers})
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
  }

  // tell parent to persist the answers
  onclickSave = () => {
    console.log(`ShortAnswers::onclickSave()`);
    const { answers } = this.state
    const { onPersistCB } = this.props

    onPersistCB(answers)
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
