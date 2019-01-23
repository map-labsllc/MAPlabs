import React from 'react';
import QuestionsCT from '../Containers/QuestionsCT'
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
   Popup component

   Shows / hides a complex interactive component.

   props:
     title -- title of this set of questions
     questions -- [ { code: 50, text: "question 50" }, { ... }
***************************************************** */
export default class Popup extends React.Component {

  state = {
    isVisible: false,
  }

  // **************************************************
  // Show the complex interactive component
  onclickStart = () => {
    console.log("Popup::onclickStart()");
    this.setState({ isVisible: true })
  }

  // **************************************************
  // Hide the complex interactive component
  onCloseModal = () => {
    console.log("Popup::onCloseModal()");
    this.setState({ isVisible: false })
  }

  // **************************************************
  // render!
  // render() {
  //   console.log("Popup::render()")
  //
  //   let { isVisible } = this.state
  //   let { title, questions } = this.props
  //
  //   return (
  //     <>
  //       <h1>{title}</h1>
  //
  //         <QuestionsCT
  //           questions = {questions}
  //           onCloseModalCB = {this.onCloseModal}
  //         />
  //
  //
  //     </>
  //   )
  // }
  render() {
    console.log("Popup::render()")

    let { isVisible } = this.state
    let { title, questions } = this.props

    return (
      <>
        <h1>{title}</h1>
        {!isVisible && (
          <Button type = "button" onClick = {this.onclickStart}>Start</Button>
        )}
        {isVisible && (
          <>
          <QuestionsCT
            questions = {questions}
            onCloseModalCB = {this.onCloseModal}
          />
          </>
        )}
      </>
    )
  }
}
