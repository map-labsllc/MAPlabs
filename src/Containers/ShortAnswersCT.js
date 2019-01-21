import { connect } from 'react-redux'
import ShortAnswers from '../Components/ShortAnswers'
import { getAnswers } from '../store/answers/reducer'
import {
  updateAnswersAC,
  persistAnswersAC } from '../store/answers/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
     question_code -- "50"  // needs to be converted to integer
     question -- the question string
******************************************** */
const mapStateToProps = (state, passedProps) => {
  console.log("ShortAnswersCT::mapStateToProps()");

  // get and validate question_code and question
  let { question_code, question } = passedProps
  question_code = parseInt(question_code, 10)
  if (!question_code) throw new Error("missing or non-integer question code: ", passedProps.question_code)
  console.log("question: ", question);

  // find previous answers,
  const answers = getAnswers(state.answersRD, question_code)
  console.log(`getAnswers(${question_code}): `, answers);
  const previousAnswers = answers

  return {
    question_code,
    question,
    previousAnswers,
  }
}

/* *****************************************
   mapDispatchToProps()
******************************************** */
const mapDispatchToProps = dispatch => ({

  /* *****************************************
     onSaveCB()

     Save the new answers to store and persist them.

     question_code -- integer
     newAnswers -- array of strings
  ******************************************** */
  onSaveCB: (question_code, newAnswers) => {
    console.log(`ShortAnswersCT::onSave(${question_code}, ${newAnswers})`);
    dispatch(updateAnswersAC(question_code, newAnswers))
    dispatch(persistAnswersAC(question_code, newAnswers))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortAnswers)
