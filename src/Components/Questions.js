import React from 'react'

import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import ShortAnswersCT from '../Containers/ShortAnswersCT'

/* **************************************************
   Questions component

   Manages array of questions displaying one at a time.
     -- Left/Right buttons to move to prev/next question
     -- Close button to initiate close of parent modal
     -- Left/Close/Right buttons perist the current question

   state:
     currIdx -- current position in array of questions

   props:
     userId -- integer
     questions -- [ { code: 50, text: "question 50" }, { ... }
     answersRD -- reducer to be passed back up in onPersistQuestionCB()
     onPersistQuestionCB -- call to have parent CT persist a question from Store
     onCloseModalCB -- call to close the modal this control resides in
***************************************************** */
export default class Questions extends React.Component {

  state = {
    currIdx: 0,
  }

  // ******************************************
  // getCurrQuestion = () => {
  //   const { questions } = this.props
  //   const { currIdx } = this.state
  //   return questions[currIdx]
  // }

  // ******************************************
  // persist the current question before moving off of it
  persistCurrent = () => {
    const { userId, questions, answersRD, onPersistQuestionCB } = this.props
    const { currIdx } = this.state
    onPersistQuestionCB(userId, questions[currIdx], answersRD)
  }

  // ******************************************
  // called when close button is clicked
  onclickClose = () => {
    console.log("Questions::onclickClose()")

    const { onCloseModalCB } = this.props

    this.persistCurrent()
    onCloseModalCB()
  }

  // ******************************************
  // called when left button clicked
  onclickLeft = () => {
    console.log("Questions::onclicLeft()")

    const { currIdx } = this.state

    if (currIdx === 0) return

    this.persistCurrent()
    this.setState({ currIdx: currIdx - 1 })
  }

  // ******************************************
  // called when right button clicked
  onclickRight = () => {
    console.log("Questions::onclickRight()")

    const { currIdx } = this.state
    const { questions } = this.props

    if (currIdx === (questions.length - 1)) return

    this.persistCurrent()
    this.setState({ currIdx: currIdx + 1})
  }

  // ******************************************
  // render!
  render() {
    console.log("ShortAnswers::render()")

    const { questions } = this.props
    const { currIdx } = this.state

    const currQuestion = questions[currIdx]

    return (
      <>
        <Button type="button" onClick={this.onclickLeft}>Left</Button>{' '}
        <Button type="button" onClick={this.onclickRight}>Right</Button>{' ... '}
        <Button type="button" onClick={this.onclickClose}>Close</Button>
        <hr/>{' '}{' '}{' '}
        {questions.map((question, idx) => (
          <>
            {(idx === currIdx) && (
              <ShortAnswersCT
                question = {question}
                doesHandlePersistence = {{ value: false }}
              />
            )}
          </>
        ))}
      </>
    )
  }
}
