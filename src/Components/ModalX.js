import React from 'react'
import QuestionsCT from '../Containers/QuestionsCT'
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from 'react-bootstrap'

/* **************************************************
   Modal component

   Renders a modal with an exercise in it.  Parent controls visibility with isVisble prop

   props:
     sectionTitle -- title of the section for resdisplay if we do a modal below this
     exercise -- component user will interact with
     isVisible -- t/f if the Modal should be open and visible, controlled by popup
     onModalOpeningCB -- probably don't need this
     onModalClosingCB -- CB to parent when the modal closes itself
***************************************************** */
export default class ModalX extends React.Component {

  // **************************************************
  // render!
  render() {
    console.log( "Modal::render()" )
    console.log( "props: ", this.props )

    const {
      sectionTitle,
      exercise,
      isVisible,
      onModalOpeningCB,
      onModalClosingCB } = this.props


    return (
      <Modal show={isVisible} onHide={onModalClosingCB}>

        <Modal.Header style={style.header} >
          <Modal.Title style={style.header}>{sectionTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={style.body}>
          <>
            {exercise}
          </>
        </Modal.Body>
      </Modal>
    )
  }
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


const style = {
  header: {
    fontWeight: "1",
    fontSize: "25px",
    backgroundColor: "#25274D",
    color: "#AAABB8",
  },
  previous: {
    float: "left",
    backgroundColor: "#29648A",
    color: "#AAABB8",
    borderColor: "#AAABB8",
  },
  complete: {
    marginLeft: "auto",
    marginRight: "175px",
    backgroundColor: "#2E9CCA",
    color: "black",
    borderColor: "black",
  },
  body: {
    backgroundColor: "#AAABB8",
  },
  footer: {
    backgroundColor: "#25274D",
  },
  next: {
    float: "right",
    backgroundColor: "#29648A",
    color: "#AAABB8",
    borderColor: "#AAABB8",
  }
}
