import React from 'react'
import QuestionsCT from './QuestionsCT'
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
import '../../CSS/ModalNavButtons.css'

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
    console.log("Modal::render()")
    console.log("props: ", this.props)

    const {
      sectionTitle,
      exercise,
      isVisible,
      onModalOpeningCB,
      onModalClosingCB } = this.props

    return (
      <Modal show={isVisible} onHide={onModalClosingCB} bsSize="large">

        <Modal.Header style={style.header} >
          <Modal.Title style={style.header}>{sectionTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={style.body}>
          <div className="container-fluid" style={style.modalContain}>
            {exercise}
          </div>
        </Modal.Body>

      </Modal>
    )
  }
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


const style = {
  modalContain: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "2%",
    margin: "2%",
    boxShadow: "3px 3px 1px 3px rgb(46, 102, 178)",
  },
  header: {
    fontWeight: "1",
    fontSize: "25px",
    backgroundColor: "#25274D",
    color: "white",
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
