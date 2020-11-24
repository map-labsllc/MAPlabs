import { connect } from 'react-redux'
import Narrative from './Narrative'
import { getUser } from '../../../store/user/reducer'
import { getAnswers } from '../../../store/answers/reducer'
import { QUESTION_TYPE_NARRATIVE } from '../../../store/answers/constants'
import { updateAnswersAC, persistAnswersAC } from '../../../store/answers/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
    promptQuestionCode -- integer -- Object with 0 or questionCode to
      use as prompts for this Narrative.  questionCode must be a quesiton in answerRD.
    question -- { code: 50, text: "question 50" }
    instructions
    isDynamic -- undefined or true
                 rendering static version in Popup or dynamic verison in Modal
    onCloseModalCB -- call to close the modal
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  // console.log( "NarrativeCT::mapStateToProps()" )
  const { copyPrompt, promptQuestionCode, question, instructions, isDynamic, onCloseModalCB } = passedProps
  if ( !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get userId
  const userId = getUser( state.userRD ).id

  // find prompts, if any
  let prompts = []
  if ( promptQuestionCode ) {
    prompts = getAnswers( state.answersRD, promptQuestionCode )
  }

  // find previous answer, if any
  // Note: getAnswers() returns an array but narrative should have at most one answer
  const answers = getAnswers( state.answersRD, question.code )
  // console.log( `getAnswers( ${question.code} ): `, answers )
  if (answers.length > 1) {
    console.log( "ERROR: more than one narrative answer: ", question.code, answers )
    throw new Error( `more than one narrative answer:  ${question.code}, ${answers}` )
  }

  // unpack the string from answers[0][0] default to '' if there was no previous answer
  let previousAnswer = (answers[0] && answers[0][0]) || ''

  if (!previousAnswer && copyPrompt) {
    previousAnswer = prompts.map(p => p[0]).filter(answer => !!answer).join('. ')
  }

  return {
    userId,
    question,
    prompts,
    instructions,
    previousAnswer,
    isDynamic,
    onCloseModalCB,
  }
}

/// /////////////////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////////

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {

  /* *****************************************
  onPersistCB()

  Save the new answer to store and persist it.

  userId -- integer
  newAnswer -- string
  ******************************************** */
  function onPersist( userId, newAnswer ) {
    const { question } = passedProps
    console.log( `NarrativeCT::onPersist( ${question.code}, ${newAnswer} )` )

    // store wants 2D array of strings, so map the array of strings into that format
    const twoDimArrayOfString = [ [ newAnswer ] ]
    dispatch( updateAnswersAC( question.code, twoDimArrayOfString ) )
    dispatch( persistAnswersAC( userId, question.code, QUESTION_TYPE_NARRATIVE, twoDimArrayOfString ) )
  }

  return {
    onPersistCB: onPersist,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
 )( Narrative )
