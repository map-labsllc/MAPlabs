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
  PanelGroup,
  Panel
} from 'react-bootstrap';
import '../CSS/Section.css'

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
    open: true,
    ActiveKey: "1"
  }

  render() {
    console.log("Section::render()")

    let { isVisible } = this.state
    let { sectionTitle, exercise } = this.props

    return (

      <div>
        <Panel bsStyle='primary'>
          <Panel.Heading className="sectionHeader">
            <Panel.Title><div className="text-center"><u>Section</u>: {sectionTitle}</div></Panel.Title>
          </Panel.Heading>
          <Panel.Body className="sectionBody">
            <Popup sectionTitle={sectionTitle} excercise={excercise} />
          </Panel.Body>
        </Panel>
      </div >
    )
  }
}

//      <>
{/* <p>.</p>
<p>-----------------------------------------</p>
<h4><u>Section</u>: {sectionTitle}</h4>
{!isVisible && (
  <p>not available yet</p>
)}
{isVisible && (
  <>
    <Popup sectionTitle = {sectionTitle} excercise = {excercise} />
  </>
)}
<p> </p>
</> */}
