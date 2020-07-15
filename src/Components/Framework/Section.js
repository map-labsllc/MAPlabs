import React from 'react'
import SectionExercise from './SectionExercise'
import { Card } from 'react-bootstrap'
import { sectionLoadingAC } from '../../store/user/actions'
import '../../CSS/light-bootstrap-dashboard.css'

/* **************************************************
   Section

   Shows / hides a section depending on user's curr_module / curr_section

   props:
     user -- the complete user object to check the furthest mod/sec they've gotten to
     isVisible -- is the user able to view this section yet?
     moduleNum -- integer, the module this section is in (1-based)
     sectionNum -- integer, the section, ex: 260
     number -- the order number of this section in the module: 1, 2, 3, ...
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
    // let { isVisible } = this.state
    let { number, user, isVisible, moduleNum, sectionNum, sectionTitle, exercise } = this.props
    // const isVisible = this.canUserView(user, moduleNum, sectionNum)

    return (
      <div className="background">
        <Card>
          <Card.Header>
            <Card.Title><div className="text-center">{number}. {sectionTitle}</div></Card.Title>
          </Card.Header>

          {isVisible && (
            <Card.Body >
              <div className="container-fluid contain">
                <SectionExercise moduleNum={moduleNum} sectionNum={sectionNum} sectionTitle={sectionTitle} exercise={exercise} />
              </div>
            </Card.Body>
          )}

          {!isVisible && (
            <p>Please complete the the previous exercise.</p>
          )}
        </Card>
      </div>
    )
  }
}
