import Bracket from './Bracket'

import { connect } from 'react-redux'
import { persistAnswersAC } from '../store/answers/actions'

function mapStateToProps( state, { question } ) {
    return {
        prompts: state.answersRD[question.code],
        userId: state.userRD.user_id,
        question,
    }
}

function mapDispatchToProps( dispatch ) {
    return  {
        onUpdateStoreCB: function( userId, questionCode, prompt ) {
            return dispatch( persistAnswersAC( userId, questionCode, prompt ) )  
        } 
    } 
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Bracket )