import { connect } from 'react-redux'
import ContextualInfluenceGroups from './ContextualInfluenceGroups'
import { getUser } from '../../store/user/reducer'

const mapStateToProps = ( state, passedProps ) => {

  const {question} = passedProps

  const user = getUser( state.userRD )

  const beliefs = state.staticdataRD.beliefs

  return {
    user,
    beliefs,
    answers: state.answersRD.questions[question.code]
  }
}

const mapDispatchToProps = ( dispatch ) => {

   return {dispatch}
}

export default connect(
  mapStateToProps,
mapDispatchToProps )( ContextualInfluenceGroups )
