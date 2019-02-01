import Bracket from './Bracket'

import { connect } from 'react-redux'
import { persistAnswersAC, updateAnswersAC } from '../../store/answers/actions'

function mapStateToProps( state, { question, isDynamic } ) {
    return {
        prompts: question.promptCode === 330 ? get330Prompts( state, question ) : state.answersRD.questions[question.promptCode],
        userId: state.userRD.user.user_id,
        question,
        isDynamic
    }
}

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

function mapDispatchToProps( dispatch ) {
    return  {
        onUpdateStoreCB: function( userId, questionCode, prompts ) {
            dispatch( updateAnswersAC( questionCode, prompts ) )
            return dispatch( persistAnswersAC( userId, questionCode, prompts ) )
        }
    }
}

function get330Prompts( state, question ) {
    const existingAnswer = state.answersRD.questions[question.code] ? state.answersRD.questions[question.code][0].trim() :""
    return question.promptCodes.reduce( ( acc, childQuestion ) =>( [...acc,
        state.answersRD.questions[childQuestion.code] && state.answersRD.questions[childQuestion.code][0] ?
        `${existingAnswer.includes( childQuestion.text ) ? '(Previous winner)' : ''} ${childQuestion.text}: ${state.answersRD.questions[childQuestion.code]}` : ''] ), [] )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Bracket )
