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
     question -- { code: 50, text: "question 50" }
******************************************** */
const mapStateToProps = (state, passedProps) => {
  console.log("NarrativeCT::mapStateToProps()");

  const { question } = passedProps
  if (!question.code) throw new Error("missing question code: ", passedProps.question_code)

  // get userId
  const userId = getUser(state.userRD).user_id

  // find previous answer, if any
  //   Note: getAnswers() returns an array but narrative should have at most one answer
  const answers = getAnswers(state.answersRD, question.code)
  console.log(`getAnswers(${question.code}): `, answers);
  if (1 < answers.length) throw new Error("more than one narrative answer: ", passedProps.question_code, answers)
  const previousAnswer = answers[0] || ''

  return {
    userId,
    question,
    previousAnswer,
  }
}

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = (dispatch, passedProps) => ({

  /* *****************************************
     onPersistCB()

     Save the new answer to store and persist it.

     userId -- integer
     newAnswer -- string
  ******************************************** */
  onPersistCB: (userId, newAnswer) => {
    const { question } = passedProps
    console.log(`NarrativeCT::onPersistCB(${question.code}, ${newAnswer})`);
    dispatch(updateAnswersAC(question.code, [newAnswer]))
    dispatch(persistAnswersAC(userId, question.code, [newAnswer]))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Narrative)
