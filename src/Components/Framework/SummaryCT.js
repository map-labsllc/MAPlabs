import { connect } from 'react-redux'
import Summary from './Summary'
import { getAnswers } from '../../store/answers/reducer'

/* *****************************************
   mapStateToProps()

   passedProps:
     XXX persistAC_CB -- this is a callback to an AC to persist to the table used
                     by the subcomponent.
     questionType -- constant from store/answers/constants.js to
                     determine the question_type value for persisting
     subComponents -- array of React components to work with a single question

******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  //console.log( "QuestionsCT::mapStateToProps()" )

  const {
    subComponents,
  } = passedProps

  // validation
  if ( !subComponents.length ) throw new Error( "no questions passed to QuestionsCT" )

  return {
    subComponents,
  }

}

export default connect(
  mapStateToProps,
  null
)( Summary )
