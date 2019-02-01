import { connect } from 'react-redux'
import Questions from './Questions'
import { getUser } from '../../store/user/reducer'
import { getAnswers } from '../../store/answers/reducer'
import { getTransitions } from '../../store/transitions/reducer'
import { persistAnswersAC } from '../../store/answers/actions'
import { persistTransitionsAC } from '../../store/transitions/actions'
import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
  QUESTION_TYPE_BRACKET,
} from '../../constants.js'

/* *****************************************
   mapStateToProps()

   passedProps:
     questionType -- from constants.js, handle ShortAnswers, Transitions, etx
     subComponents -- array of React components to work with a single question 
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal
     onCloseModalCB -- call to close the modal this control resides in

******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( "QuestionsCT::mapStateToProps()" )

  const {
    questionType,
    isDynamic,

    subComponents,
  } = passedProps

  // validation
  if ( !subComponents.length ) throw new Error( "no questions passed to QuestionsCT" )

  // get userId
  const userId = getUser( state.userRD ).user_id

  let RD = null
  switch ( questionType ) {

    case QUESTION_TYPE_SHORT_ANSWERS:
    case QUESTION_TYPE_BRACKET:
      RD = state.answersRD
      break

    case QUESTION_TYPE_TRANSITIONS:
      RD = state.transitionsRD
      break

    default:
      throw new Error( 'unknown question type' )
  }

  return {
    userId,
    questionType,
    RD,
    isDynamic,

    subComponents,
  }


  // question types
  // switch ( questionType ) {
  //   case QUESTION_TYPE_SHORT_ANSWERS:
  //     return {
  //       userId,
  //       questionType,
  //       questions,
  //       RD: state.answersRD,
  //       isDynamic,
  //
  //       subComponents,
  //     }
  //   case QUESTION_TYPE_TRANSITIONS:
  //     return {
  //       userId,
  //       questionType,
  //       questions,
  //       RD: state.transitionsRD,
  //       isDynamic,
  //
  //       subComponents,
  //     }
  //   case QUESTION_TYPE_BRACKET:
  //     return {
  //       userId,
  //       questionType,
  //       questions,
  //       RD: state.answersRD,
  //       isDynamic,
  //
  //       subComponents,
  //     }
  //   default:
  //     throw new Error( 'ERROR unkown QUESTION_TYPE' )
  // }
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
      case QUESTION_TYPE_BRACKET:
        const answers = getAnswers( RD, question.code )
        dispatch( persistAnswersAC( userId, question.code, answers ) )
        return

      case QUESTION_TYPE_TRANSITIONS:
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
