import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SectionExercise from './SectionExercise'
import { getUser } from '../../store/user/reducer'
import { sectionCompletedAC } from '../../store/user/actions'
import { persistAnswersAC } from '../../store/answers/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
     moduleNum -- integer
     sectionNum -- integer
     sectionTitle -- title of the section for redisplay in modal
     exercise -- component user will interact with
******************************************** */
const mapStateToProps = (state, passedProps) => {
  // console.log( "SectionExerciseCT::mapStateToProps()" )

  const {
    moduleNum, sectionNum, sectionTitle, exercise
  } = passedProps

  // get user
  const user = getUser(state.userRD)

  return {
    user,
    moduleNum,
    sectionNum,
    sectionTitle,
    exercise,
    answersRD: state.answersRD,
    userRD: state.userRD,
    strengthsRD: state.listsRD.lists.strengths
  }
}

/// /////////////////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////////

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = (dispatch, passedProps) => ({
  onPersistQuestionCB: bindActionCreators(persistAnswersAC, dispatch),
  sectionCompletedCB: bindActionCreators(sectionCompletedAC, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionExercise)
