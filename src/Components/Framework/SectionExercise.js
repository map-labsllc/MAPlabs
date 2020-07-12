import React from 'react'
import {
  Button,
} from 'react-bootstrap'
import ShowMoreLess from '../Utils/ShowMoreLess'

import { sectionCompletedAC } from '../../store/user/actions'

/* **************************************************
   SectionExercise component

   Shows / hides a complex interactive component.

   props:
     user -- user object
     moduleNum -- integer
     sectionNum -- integer
     sectionTitle -- title of the section for resdisplay if we do a modal below this
     exercise -- component user will interact with
***************************************************** */
export default class SectionExercise extends React.Component {

  state = {
    isVisible: false,
  }

  // **************************************************
  // Show the complex interactive component
  onclickStart = () => {
    console.log("SectionExercise::onclickStart()")
    this.setState({ isVisible: true })
  }

  // **************************************************
  // CB from the <exercise> when its close/save button is clicked
  onCloseModal = () => {
    console.log("SectionExercise::onCloseModal()")

    const { dispatch, user, moduleNum, sectionNum } = this.props
    dispatch(sectionCompletedAC(user, moduleNum, sectionNum))

    this.setState({ isVisible: false })
  }

  // **************************************************
  // render!
  render() {
    console.log("SectionExercise::render()")
    console.log('isVisible', isVisible)

    let { isVisible } = this.state
    let { sectionTitle, exercise } = this.props

    // Link the <exersise> to this instance of the SectionExercise Component.
    //   - onCloseModalCB() is called when exercise completes to tell us to close ModalX
    //   - isDynamic flag directs exercise to go live and take user input.  This flag
    //       doesn't exist (is undefined) in <exercise>.
    const exerciseDynamic = React.cloneElement(
      exercise,
      {
        onCloseModalCB: this.onCloseModal,
        isDynamic: true
      }
    )

    // By default <exercise> does not have the isDynamic prop and will
    //   render itself in a static format for display in <SectionExercise>.
    //   The assignment below is only to emphasize this fact.
    const exerciseStatic = exercise

    // get the exercise's descrition
    const { description } = exerciseStatic.props

    return (
      <>
        {/* display instructions */ }
        {!isVisible && (
          <>
            <div style={style.inner}>
              <span dangerouslySetInnerHTML={{ __html: description }} />
              <hr className="divider" />
              {exerciseStatic}
              <div className="text-center">
                <Button className="btn btn-primary" type="button" onClick={this.onclickStart}>Start</Button>
              </div>
            </div>
          </>
        )}

        {/* display the exercise */ }  
        {isVisible && (
          <>
            <div style={style.inner}>
              <span dangerouslySetInnerHTML={{ __html: description }} />
              <hr className="divider" />
              { exerciseDynamic }
            </div>
          </>
        )}
      </>
    )
  }
}
const style = {
  inner: {
    marginLeft: "5%",
    marginRight: "5%",
  }
}

        // return (
//   <>
//     <h6><i>..SectionExercise controller manages starting a section..</i></h6>
//     {!isVisible && (
//       <Button type = "button" onClick = {this.onclickStart}>Start</Button>
//     )}
//     {isVisible && (
//       <>
//       <ModalX
//         sectionTitle = {sectionTitle}
//         exercise = {exerciseWithOnCloseCB}
//         isVisible = {this.state.isVisible}
//         onModalOpeningCB = {this.onModalOpening}
//         onModalClosingCB = {this.onModalClosing}
//       />
//       </>
//     )}
//   </>
// )


// WORKING CODE pre-modal
// May need to pass a prop to SectionExercise to decide if the exercise should be wrapped
//   in a Modal or appear flat.

// return (
//   <>
//     <h6><i>..SectionExercise controller manages starting a section..</i></h6>
//     {!isVisible && (
//       <Button type = "button" onClick = {this.onclickStart}>Start</Button>
//     )}
//     {isVisible && (
//       <>
//       {exerciseWithOnCloseCB}
//       </>
//     )}
//   </>
// )
