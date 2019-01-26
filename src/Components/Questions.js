import React from 'react'

import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import ShortAnswersCT from '../Containers/ShortAnswersCT'
import TransitionsCT from '../Containers/TransitionsCT'
import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS
} from '../constants.js'
import '../CSS/ModalNavButtons.css'

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
     questionType -- enum from constants.js
     questions -- [ { code: 50, text: "question 50" }, { ... }
     RD -- reducer to be passed back up in onPersistQuestionCB()
     onPersistQuestionCB -- call to have parent CT persist a question from Store
     onCloseModalCB -- call to close the modal this control resides in
***************************************************** */
export default class Questions extends React.Component {

  state = {
    currIdx: 0,
  }

  // ******************************************
  // persist the current question before moving off of it
  persistCurrent = () => {
    const { userId, questionType, questions, RD, onPersistQuestionCB } = this.props
    const { currIdx } = this.state

    onPersistQuestionCB(userId, questionType, questions[currIdx], RD)
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
    this.setState({ currIdx: currIdx + 1 })
  }

  // ******************************************
  render() {
    console.log("ShortAnswers::render()")

    const { questionType, questions } = this.props
    const { currIdx } = this.state

    console.log('**********************************');
    console.log('questionType: ', questionType)

    // NOTE: The <div key = {idx}> tag is used to suppress React warning about
    //       elements needing a unique key.
    return (
      <>
        <div className="bgButton">
          <Button className="previousButton" onClick={this.onclickLeft}>Previous</Button>{' '}
          <Button className="nextButton" onClick={this.onclickRight}>Next</Button>
        </div>
        {questions.map((question, idx) => (
          <div key={idx}>
            {(idx === currIdx) && (questionType === QUESTION_TYPE_SHORT_ANSWERS) && (
              <ShortAnswersCT
                key={idx}
                question={question}
                doesHandlePersistence={{ value: false }}
              />
            )}
            {(idx === currIdx) && (questionType === QUESTION_TYPE_TRANSITIONS) && (
              <TransitionsCT
                key={idx}
                question={question}
              />
            )}
          </div>
        ))}
        <br />
        <div className="text-center">
          <Button className="closeButton" type="button" onClick={this.onclickClose}>Close</Button>
        </div>
      </>
    )
  }
}

// {( idx === currIdx ) && ( questionType === QUESTION_TYPE_TRANSITIONS ) && (
//   <ShortAnswersCT
//     key = {idx}
//     question = {question}
//     doesHandlePersistence = {{ value: false }}
//   />
// )}
