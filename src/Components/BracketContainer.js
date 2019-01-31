import Bracket from './Bracket'

import { connect } from 'react-redux'
import { persistAnswersAC, updateAnswersAC } from '../store/answers/actions'

const prompts330 = [ "Financial/Material", "Vocation/Career/Life Work", "Social/Community", "Family", "Mental/Educational", "Spiritual/Emotional/Creative", "Physical/Health/Recreational", "Other"]
function mapStateToProps( state, { question, isDynamic } ) {
    return {
        prompts: ( isQuestion330( state, question ) ) && ( question.promptCode == 330 ) ? prompts330
        : state.answersRD.questions[question.promptCode],
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

function isQuestion330( state, question ) {
    return state.answersRD.questions[question.promptCode] && !state.answersRD.questions[question.promptCode][0]
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Bracket )