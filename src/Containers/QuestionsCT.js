import { connect } from 'react-redux'
import Questions from '../Components/Questions'
import { getUser } from '../store/user/reducer'
import { getAnswers } from '../store/answers/reducer'
import { getTransitions } from '../store/transitions/reducer'
import { persistAnswersAC } from '../store/answers/actions'
import { persistTransitionsAC } from '../store/transitions/actions'
import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS} from '../constants.js'

/* *****************************************
   mapStateToProps()

   passedProps:
     questionType -- from constants.js, handle ShortAnswers, Transitions, etx
     questions -- [ { code: 50, text: "question 50" }, { ... }
     onCloseModalCB -- call to close the modal this control resides in
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( "QuestionsCT::mapStateToProps()" )

  const {
    questionType,
    questions,
  } = passedProps

  // validation
  if ( !questions.length ) throw new Error( "no questions passed to QuestionsCT" )

  // get userId
  const userId = getUser( state.userRD ).user_id

  // question types
  switch ( questionType ) {
    case QUESTION_TYPE_SHORT_ANSWERS:
      return {
        userId,
        questionType,
        questions,
        RD: state.answersRD,
      }
    case QUESTION_TYPE_TRANSITIONS:
      return {
        userId,
        questionType,
        questions,
        RD: state.transitionsRD,
      }
    default:
      throw new Error( 'ERROR unkown QUESTION_TYPE' )
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
     onCloseModal()

     User clicked the Close button, tell modal to close
  ******************************************** */
  function onCloseModal() {
    console.log( `QuestionsCT::onCloseModal()` )

    const { onCloseModalCB } = passedProps
    onCloseModalCB()
  }

  /* *****************************************
     onPersistQuestion()

     Persist a question from the Store
  ******************************************** */
  function onPersistQuestion( userId, questionType, question, RD ) {
    console.log( `QuestionsCT::onPersistQuestion()` )

    switch ( questionType ) {
      case QUESTION_TYPE_SHORT_ANSWERS:
        console.log('======= *** ======');
        console.log("RD:", RD);
        const answers = getAnswers( RD, question.code )
        dispatch( persistAnswersAC( userId, question.code, answers ) )
        return

      case QUESTION_TYPE_TRANSITIONS:
        console.log('======= *** ======');
        console.log("RD:", RD);
        const transitions = getTransitions( RD, question.code )
        dispatch( persistTransitionsAC( userId, question.code, transitions ) )
        return

      default:
        throw new Error( 'ERROR unkown QUESTION_TYPE' )
    }

  }

  /* *****************************************
     The props being passed down
  ******************************************** */
  return {
    onCloseModalCB: onCloseModal,
    onPersistQuestionCB: onPersistQuestion,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Questions )
