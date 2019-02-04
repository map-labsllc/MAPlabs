import { connect } from 'react-redux'
import ContextualInfluenceGroups from './ContextualInfluenceGroups'
import { getUser } from '../../store/user/reducer'
import { getAnswers } from '../../store/answers/reducer'

const mapStateToProps = ( state, passedProps ) => {

  const { question } = passedProps

  const user = getUser( state.userRD )

  const beliefs = state.staticdataRD.beliefs

  const answers = getAnswers( state.answersRD, question.code )

  return {
    user,
    beliefs,
    answers
  }
}

const mapDispatchToProps = ( dispatch ) => {

   return {dispatch}
}

export default connect(
  mapStateToProps,
mapDispatchToProps )( ContextualInfluenceGroups )
