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
     -- Above buttons initiate peristing the current question from Store

   state:
     currIdx -- current position in array of questions

   props:
     userId -- integer
     questions -- [ { code: 50, text: "question 50" }, { ... }
     onPersistQuestionCB -- call to have parent CT persist a question from Store
     onCloseModalCB -- call to close the modal this control resides in
***************************************************** */
export default class Questions extends React.Component {

  state = {
    currIdx: 0,
  }

  // persist the current question before moving off of it
  persistCurrent = () => {
    const { questions } = this.props
    const { currIdx } = this.state
    return questions[currIdx].code
  }

  // called when close button is clicked
  onclickClose = () => {
    console.log("Questions::onclickClose()")
    this.persistCurrent()
    this.onCloseModalCB()
  }

  // called when left button clicked
  onclickLeft = () => {
    console.log("Questions::onclicLeft()")

    const { currIdx } = this.state

    this.persistCurrent()
    const newIdx = currIdx ? 0 : currIdx - 1
    this.setState({currIdx: newIdx})
  }

  // called when right button clicked
  onclickRight = () => {
    console.log("Questions::onclickRight()")

    const { currIdx } = this.state
    const { questions } = this.props

    this.persistCurrent()
    const newIdx = (currIdx < (questions.length - 1)) ? (currIdx + 1) : currIdx
    this.setState({currIdx: newIdx})
  }

  // render!
  render() {
    console.log("ShortAnswers::render()")

    const { questions } = this.props
    const { currIdx } = this.state

    const currQuestion = questions[currIdx]

    return (
      <>
        <ShortAnswersCT
          question = {currQuestion}
          doesHandlePersistence = {{ value: false }}
        />
        <Button type="button" onClick={this.onclickLeft}>Left</Button>{' '}
        <Button type="button" onClick={this.onclickClose}>Close</Button>{' '}
        <Button type="button" onClick={this.onclickRight}>Right</Button>
      </>
    )
  }
}
