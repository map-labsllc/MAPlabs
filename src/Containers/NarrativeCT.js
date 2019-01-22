import { connect } from 'react-redux'
import Narrative from '../Components/Narrative'
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

  // find previous answer
  //   Note: getAnswers() returns an array but narrative should have at most one answer
  const answers = getAnswers(state.answersRD, question.code)
  console.log(`getAnswers(${question.code}): `, answers);
  if (1 < answers.length) throw new Error("more than one narrative answer: ", passedProps.question_code, answers)
  const previousAnswer = answers[0] || ''

  return {
    question,
    previousAnswer,
  }
}

/* *****************************************
   mapDispatchToProps()
******************************************** */
const mapDispatchToProps = dispatch => ({

  /* *****************************************
     onSaveCB()

     Save the new answer to store and persist it.

     question_code -- integer
     newAnswer -- string
  ******************************************** */
  onSaveCB: (question_code, newAnswer) => {
    console.log(`NarrativeCT::onSave(${question_code}, ${newAnswer})`);
    dispatch(updateAnswersAC(question_code, [newAnswer]))
    dispatch(persistAnswersAC(-1, question_code, [newAnswer]))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Narrative)
