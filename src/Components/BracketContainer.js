import Bracket from './Bracket'

import { connect } from 'react-redux'
import { persistAnswersAC, updateAnswersAC } from '../store/answers/actions'

function mapStateToProps( state, { question, isDynamic } ) {
    return {
        prompts: state.answersRD.questions[question.promptCode],
        userId: state.userRD.user.user_id,
        question,
        isDynamic
    }
}

function mapDispatchToProps( dispatch ) {
    return  {
        onUpdateStoreCB: function( userId, questionCode, prompts ) {
            dispatch( updateAnswersAC( questionCode, prompts ) )
            return dispatch( persistAnswersAC( userId, questionCode, prompts ) )  
        } 
    } 
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Bracket )