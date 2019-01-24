import { connect } from 'react-redux'
import Questions from '../Components/Questions'
import { getUser } from '../store/user/reducer'
import { getAnswers } from '../store/answers/reducer'
import {
  persistAnswersAC } from '../store/answers/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
     questions -- [ { code: 50, text: "question 50" }, { ... }
     onCloseModalCB -- call to close the modal this control resides in
******************************************** */
const mapStateToProps = (state, passedProps) => {
  console.log("QuestionsCT::mapStateToProps()");

  const {
    questions,
  } = passedProps

  // validation
  if (!questions.length) throw new Error("no questions passed to QuestionsCT")

  // get props to pass
  const userId = getUser(state.userRD).user_id
  const answersRD = state.answersRD

  return {
    userId,
    questions,
    answersRD,
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
    console.log(`QuestionsCT::onCloseModal()`);

    const { onCloseModalCB } = passedProps
    onCloseModalCB()
  }

  /* *****************************************
     onPersistQuestion()

     Persist a question from the Store
  ******************************************** */
  function onPersistQuestion(userId, question, answersRD) {
    console.log(`QuestionsCT::onPersistQuestion()`);

    const answers = getAnswers(answersRD, question.code)

    dispatch(persistAnswersAC(userId, question.code, answers))
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
)(Questions)
