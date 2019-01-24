import React from 'react';
import ModalX from './ModalX'
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
     sectionTitle -- title of the section for resdisplay if we do a modal below this
     exercise -- component user will interact with
***************************************************** */
export default class Popup extends React.Component {

  state = {
    isVisible: false,
  }

  // **************************************************
  // Show the complex interactive component
  onclickStart = () => {
    console.log( "Popup::onclickStart()" )
    this.setState( { isVisible: true } )
  }

  // **************************************************
  // CB from the <exercise> when its close/save button is clicked
  onCloseModal = () => {
    console.log("Popup::onCloseModal()");
    this.setState( { isVisible: false } )
  }


  // **************************************************
  // CB from <Modal>
  onModalClosing = () => {
    console.log("Popup::onModalClosing()");
    this.setState( { isVisible: false } )
  }
  // **************************************************
  // CB from <Modal>
  onModalOpening = () => {
    console.log("Popup::onModalOpening()");
    // this.setState( { isVisible: false } )
  }

  // **************************************************
  // render!
  render() {
    console.log("Popup::render()")

    let { isVisible } = this.state
    let { sectionTitle, excercise } = this.props

    // link the <excersise> to this/Popup Component
    const excerciseWithOnCloseCB = React.cloneElement( excercise, { onCloseModalCB: this.onCloseModal } )

    return (
      <>
        <h6><i>..Popup controller manages starting a section..</i></h6>
        {!isVisible && (
          <Button type = "button" onClick = {this.onclickStart}>Start</Button>
        )}
        {isVisible && (
          <>
          <ModalX
            sectionTitle = {sectionTitle}
            exercise = {excerciseWithOnCloseCB}
            isVisible = {this.state.isVisible}
            onModalOpeningCB = {this.onModalOpening}
            onModalClosingCB = {this.onModalClosing}
          />
          </>
        )}
      </>
    )
  }
}


// WORKING CODE pre-modal
// May need to pass a prop to Popup to decide if the excercise should be wrapped
//   in a Modal or appear flat.

// return (
//   <>
//     <h6><i>..Popup controller manages starting a section..</i></h6>
//     {!isVisible && (
//       <Button type = "button" onClick = {this.onclickStart}>Start</Button>
//     )}
//     {isVisible && (
//       <>
//       {excerciseWithOnCloseCB}
//       </>
//     )}
//   </>
// )
