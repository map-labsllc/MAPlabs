import Bracket from './Bracket'

import { connect } from 'react-redux'
import { getAnswers } from '../../store/answers/reducer'
import {
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

  // find previous answers, if any, to display when static
  const answers = getAnswers( state.answersRD, question.code )

  // pull answers out of 2D array of strings to an simple array of strings
  const previousAnswers = answers.map(answerArray => answerArray[0])

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

      // store wants 2D array of strings, so map the array of strings into that format
      const twoDimArrayOfString = prompts.map(str => [str])

      dispatch( updateAnswersAC( questionCode, twoDimArrayOfString ) )
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Bracket )
