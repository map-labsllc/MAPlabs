import { connect } from 'react-redux'
import ShortAnswers from '../Components/ShortAnswers'
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
  console.log("ShortAnswersCT::mapStateToProps()");

  const { question } = passedProps
  if (!question.code) throw new Error("missing question code: ", passedProps.question_code)

  // find previous answers,
  const answers = getAnswers(state.answersRD, question.code)
  console.log(`getAnswers(${question.code}): `, answers);
  const previousAnswers = answers

  return {
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
    dispatch(persistAnswersAC(-1, question_code, newAnswers))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortAnswers)
