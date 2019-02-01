import React from 'react'
import PopupCT from './PopupCT'
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Panel,
} from 'react-bootstrap'
import { sectionLoadingAC } from '../../store/user/actions'
import '../../CSS/Section.css'

/* **************************************************
   Section

   Shows / hides a section depending on user's curr_module / curr_section

   props:
     user -- the complete user object to check the furthest mod/sec they've gotten to
     isVisible -- is the user able to view this section yet?
     moduleNum -- integer, the module this section is in (1-based)
     sectionNum -- integer, the section
     sectionTitle -- title of the section
     exercise -- component user will interact with
***************************************************** */
export default class Section extends React.Component {

  // check that user has gotten up to this module and section
  // canUserView = ( user, moduleNum, sectionNum ) => {
  //   if ( moduleNum < user.curr_module ) return true
  //   if ( user.curr_module < moduleNum ) return false
  //   return sectionNum <= user.curr_section
  // }

  componentDidMount = () => {
    const { dispatch, moduleNum, sectionNum } = this.props

    // let the userRD know about this section so it can help move
    //   user to the next moduleNum/sectionNum as they complete sections
    dispatch(sectionLoadingAC(moduleNum, sectionNum))
  }

  render() {
    console.log("Section::render()")

    // let { isVisible } = this.state
    let { user, isVisible, moduleNum, sectionNum, sectionTitle, exercise } = this.props
    // const isVisible = this.canUserView(user, moduleNum, sectionNum)

    return (
      <div className="background">
        <Panel bsStyle='primary' className="panelSpace">
          <Panel.Heading className="sectionHeader">
            <Panel.Title><div className="text-center">{sectionTitle}</div></Panel.Title>
          </Panel.Heading>

          {isVisible && (
            <Panel.Body className="sectionBody">
              <div className="container-fluid contain">
                <PopupCT moduleNum={moduleNum} sectionNum={sectionNum} sectionTitle={sectionTitle} exercise={exercise} />
              </div>
            </Panel.Body>
          )}

          {!isVisible && (
            <p>not availble yet</p>
          )}
        </Panel>
      </div >
    )
  }
}
//  <>
//         <p>.</p>
//         <p>-----------------------------------------</p>
//         <h4><u>Section</u>: {sectionTitle}</h4>
//         {!isVisible && (
//           <p>not available yet</p>
//         )}
//         {isVisible && (
//           <>
//             <Popup sectionTitle = {sectionTitle} exercise = {exercise} />
//           </>
//         )}
//       <p> </p>
//       </>
