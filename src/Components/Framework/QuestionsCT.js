import { connect } from 'react-redux'
import Questions from './Questions'
import { getUser } from '../../store/user/reducer'
import { getAnswers } from '../../store/answers/reducer'
import { persistAnswersAC } from '../../store/answers/actions'
import { bindActionCreators } from 'redux'

/* *****************************************
   mapStateToProps()

   passedProps:
     XXX persistAC_CB -- this is a callback to an AC to persist to the table used
                     by the subcomponent.
     questionType -- constant from store/answers/constants.js to
                     determine the question_type value for persisting
     subComponents -- array of React components to work with a single question
     isDynamic -- undefined or true
                  undefined: render static version in Popup
                  true: render dynamic/interactive verison in Modal
     onCloseModalCB -- call to close the modal this control resides in

******************************************** */
const mapStateToProps = (state, passedProps) => {
  // console.log( "QuestionsCT::mapStateToProps()", passedProps)

  const {
    isDynamic,
    subComponents,
  } = passedProps

  // validation
  if (!subComponents.length) throw new Error('no questions passed to QuestionsCT')

  return {
    isDynamic,
    subComponents,
  }
}

/// /////////////////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////////

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = (dispatch, passedProps) => {
  /* *****************************************
     onCloseModal()

     User clicked the Close button, tell modal to close
  ******************************************** */
  function onCloseModal() {
    console.log('QuestionsCT::onCloseModal()')

    const { onCloseModalCB } = passedProps
    if (onCloseModalCB) {
      onCloseModalCB()
    }
  }

  /* *****************************************
    presistQuestion()
    */
  function getAnswersForCode(questionCode) {
    return (dispatch, getStore) => {
      const store = getStore()
      return getAnswers(store.answersRD, questionCode)
    }
  }

  /* *****************************************
     presistQuestion()

     Helper that actually persists the data to the correct database table.

     params:
       question -- { code: 50, text: "The question" }

  ******************************************** */
  function persistQuestionAC(question) {
    console.log('QuestionsCT::persistQuestion')

    return (dispatch, getStore) => {
      const store = getStore()
      const { questionType } = passedProps
      const userId = getUser(store.userRD).id
      const twoDimArrayOfString = getAnswers(store.answersRD, question.code)

      dispatch(persistAnswersAC(userId, question.code, questionType, twoDimArrayOfString))
    }
  }

  /* *****************************************
     The props being passed down
  ******************************************** */
  return {
    onCloseModalCB: onCloseModal,
    onPersistQuestionCB: bindActionCreators(persistQuestionAC, dispatch),
    getAnswersForCodeCB: bindActionCreators(getAnswersForCode, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions)
