import { connect } from 'react-redux'
import Narrative from '../Components/Narrative'
import { getUser } from '../store/user/reducer'
import { getAnswers } from '../store/answers/reducer'
import {
  updateAnswersAC,
  persistAnswersAC } from '../store/answers/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
    promptQuestionCode -- { questionCode: 123 } -- Object with 0 or questionCode to
      use as prompts for this Narrative.  questionCode must be a quesiton in answerRD.
    question -- { code: 50, text: "question 50" }
    instructions -- string with instructions, can be an empty string for no instructions
    onCloseModalCB -- call to close the modal
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log(  "NarrativeCT::mapStateToProps(  )"  )

  const { promptQuestionCode, question, instructions, onCloseModalCB } = passedProps
  if ( !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get userId
  const userId = getUser( state.userRD ).user_id

  // find prompts, if any
  let prompts = []
  if ( promptQuestionCode.questionCode ) {
    prompts = getAnswers( state.answersRD, promptQuestionCode.questionCode )
  }
  console.log("Prompts for narrative: ", prompts);

  // find previous answer, if any
  //   Note: getAnswers() returns an array but narrative should have at most one answer
  // const answers = state.answersRD.questions[question.code] || []
  const answers = getAnswers( state.answersRD, question.code )
  console.log( `getAnswers( ${question.code} ): `, answers )
  if ( 1 < answers.length ) throw new Error( "more than one narrative answer: ", passedProps.question_code, answers )
  const previousAnswer = answers[0] || ''

  return {
    userId,
    question,
    prompts,
    instructions,
    previousAnswer,
    onCloseModalCB,
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
    dispatch( updateAnswersAC( question.code, [newAnswer] ) )
    dispatch( persistAnswersAC( userId, question.code, [newAnswer] ) )
  }

  return {
    onPersistCB: onPersist,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
 )( Narrative )
