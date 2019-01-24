import React from 'react';
import Popup from '../Components/Popup'
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
     moduleNum -- integer in a string, the module this section is in (1-based)
     sectionNum -- integer in a string, the section (1-based)
     user -- the complete user object to check the furthest mod/sec they've gotten to
     sectionTitle -- title of the section
     exercise -- component user will interact with
***************************************************** */
export default class Section extends React.Component {

  // check that user has gotten up to this module and section
  canUserView = (user, moduleNum, sectionNum) => {
    return true;

    // TODO: get code below working

    // if (moduleNum < user.curr_module) return true
    // if (user.curr_module < moduleNum) return false
    // return user.curr_section <= sectionNum
  }

  state = {
    isVisible: this.canUserView(
      this.props.user,
      this.props.moduleNum,
      this.props.sectionNum),
  }

  render() {
    console.log("Section::render()")

    const questions1 = [
      { code: 40, text: "ShortAnswers 40 question" },
      { code: 41, text: "ShortAnswers 41 question" },
      { code: 42, text: "ShortAnswers 42 question" },
    ]


    let { isVisible } = this.state
    let { sectionTitle, excercise } = this.props

    return (
      <>
        <p> </p>
        <h2>SECTION: {sectionTitle}</h2>
        {!isVisible && (
          <p>not available yet</p>
        )}
        {isVisible && (
          <>
            <Popup title = {sectionTitle} questions = {questions1} excercise = {excercise} />
          </>
        )}
      <p> </p>
      </>
    )
  }
}
