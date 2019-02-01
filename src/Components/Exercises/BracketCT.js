import Bracket from './Bracket'

import { connect } from 'react-redux'
import { getAnswers } from '../../store/answers/reducer'
import {
  persistAnswersAC,
  updateAnswersAC } from '../../store/answers/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
     promptQuestionCode -- integer, code for the question that created the array of strings to be bracketed.
     question -- {
            code: 50,
            text: "Make trade-offs between your Financial/Material desires"
          }
     isDynamic -- undefined or true
                  undefined: render static version in Popup
                  true: render dynamic/interactive verison in Modal

******************************************** */
function mapStateToProps( state, { promptQuestionCode, question, isDynamic } ) {

  // Get previous answers, if any.
  //   If bracketing finished there will be a single answer.
  //   If bracketing wasn't finished there can be multiple answers
  const answers = getAnswers( state.answersRD, question.code )
  const previousAnswers = answers

  return {
    // todo: need to make this generic, can't hard code a question number
    // prompts: question.promptCode === 330 ? get330Prompts( state, question ) : state.answersRD.questions[promptQuestionCode],
    prompts: state.answersRD.questions[promptQuestionCode],
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

// todo: don't hard-code question number, make this generic
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
