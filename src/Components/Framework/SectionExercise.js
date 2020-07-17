import React from 'react'
import {
  Button,
} from 'react-bootstrap'

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
class SectionExercise extends React.Component {

  state = {
    isVisible: false,
  }

  // **************************************************
  // Show the complex interactive component
  onclickStart = () => {
    this.setState({ isVisible: true })
  }

  // **************************************************
  // CB from the <exercise> when its close/save button is clicked
  onCloseModal = () => {
    const { dispatch, user, moduleNum, sectionNum } = this.props
    dispatch(sectionCompletedAC(user, moduleNum, sectionNum))

    this.setState({ isVisible: false })
  }

  // **************************************************
  // render!
  render() {

    let { isVisible } = this.state
    let { sectionTitle, exercise } = this.props
    const { user, sectionNum } = this.props

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

    let buttonLabel = user.curr_section >= sectionNum ? 'Continue' : 'Start'

    return (
      <>
        {/* display instructions */ }
        {!isVisible && (
          <>
            <div>
              <span className="reading" dangerouslySetInnerHTML={{ __html: description }} />
              <hr className="divider" />
              {exerciseStatic}
              <div className="text-center">
                <Button className="btn btn-primary" type="button" onClick={this.onclickStart}>{buttonLabel}</Button>
              </div>
            </div>
          </>
        )}

        {/* display the exercise */ }  
        {isVisible && (
          <>
            <div>
              <span className="reading" dangerouslySetInnerHTML={{ __html: description }} />
              <hr className="divider" />
              { exerciseDynamic }
            </div>
          </>
        )}
      </>
    )
  }
}

export default SectionExercise