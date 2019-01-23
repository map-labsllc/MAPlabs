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
   Section

   Shows / hides a section depending on user's curr_module / curr_section

   props:
     moduleNum -- integer, the module this section is in (1-based)
     sectionNum -- integer, the section (1-based)
     user -- the complete user object to check the furthest mod/sec they've gotten to
     title -- title of the section
***************************************************** */
export default class Section extends React.Component {

  canUserView = (user, moduleNum, sectionNum) => {
    return (   user.curr_module <= curr_module 
            && user.curr_section <= curr_section)
  }

  state = {
    isVisible: canUserView(this.props.user, this.props.moduleNum, this.props.sectionNum),
  }




  render() {
    console.log("Section::render()")

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
