import Bracket from './Bracket'

import { connect } from 'react-redux'
import { getAnswers } from '../../store/answers/reducer'
import {
  persistAnswersAC,
  updateAnswersAC } from '../../store/answers/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
     promptQuestionCodes -- array of questionCodes to load prompts from
     question -- {
            code: 50,
            text: "Make trade-offs between your Financial/Material desires"
          }
     isDynamic -- undefined or true
                  undefined: render static version in Popup
                  true: render dynamic/interactive verison in Modal

******************************************** */
function mapStateToProps( state, { promptQuestionCodes, question, isDynamic } ) {

  // Get previous answers, if any.
  //   If bracketing finished there will be a single answer.
  //   If bracketing wasn't finished there can be multiple answers

  const previousAnswers = getAnswers( state.answersRD, question.code )

  let prompts = []
  promptQuestionCodes.forEach( (questionCode) => {
    prompts = prompts.concat( getAnswers( state.answersRD, questionCode ) )
  } )

  return {
    prompts,
    question,
    previousAnswers,
    isDynamic
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
function mapDispatchToProps( dispatch ) {
  return  {
    onUpdateStoreCB: function( questionCode, prompts ) {
      dispatch( updateAnswersAC( questionCode, prompts ) )
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Bracket )
