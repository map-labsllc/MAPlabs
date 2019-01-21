import { connect } from 'react-redux'
import Narrative from '../Components/Narrative'
import { getAnswers } from '../store/answers/reducer'
import {
  updateAnswersAC,
  persistAnswersAC } from '../store/answers/actions'

/* *****************************************
   onSave()

   Save the new answer to store and persist it.

   question_code -- integer
   newAnswer -- string
******************************************** */
// const onSave = (question_code, newAnswer) => {
//   console.log(`NarrativeCT::onSave(${question_code}, ${newAnswer})`);
//
// }

/* *****************************************
   mapStateToProps()

   passedProps:
     question_code -- "50"  // needs to be converted to integer
     question -- the question string
******************************************** */
const mapStateToProps = (state, passedProps) => {
  console.log("NarrativeCT::mapStateToProps()");

  // get and validate question_code and question
  let { question_code, question } = passedProps
  question_code = parseInt(question_code, 10)
  if (!question_code) throw new Error("missing or non-integer question code: ", passedProps.question_code)
  console.log("question: ", question);

  // find previous answer,
  //   Note: getAnswers() returns an array but narrative should have at most one answer
  const answers = getAnswers(state.answersRD, question_code)
  console.log(`getAnswers(${question_code}): `, answers);
  if (1 < answers.length) throw new Error("more than one narrative answer: ", passedProps.question_code, answers)
  const previousAnswer = answers[0] || ''

  return {
    question_code,
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
    dispatch(persistAnswersAC(question_code, [newAnswer]))
  }
  // voteUpCB: (post) => dispatch(voteUpAC(post)),
  // voteDownCB: (post) => dispatch(voteDownAC(post)),
  // addCommentCB: (comment) => dispatch(addCommentAC(comment)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Narrative)
