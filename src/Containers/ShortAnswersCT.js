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
     doesHandlePersistence -- { value: true } // will this container persist data or not
******************************************** */
const mapStateToProps = (state, passedProps) => {
  console.log("ShortAnswersCT::mapStateToProps()");

  const {
    question,
    doesHandlePersistence
  } = passedProps

  if (!question.code) throw new Error("missing question code: ", passedProps.question_code)

  // find previous answers
  const answers = getAnswers(state.answersRD, question.code)
  console.log(`getAnswers(${question.code}): `, answers);
  const previousAnswers = answers

  return {
    question,
    previousAnswers,
    doesHandlePersistence,
  }
}

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = (dispatch, passedProps) => ({

  /* *****************************************
     onSaveCB()

     Save the new answers to store and persist them.

     question_code -- integer
     newAnswers -- array of strings
  ******************************************** */
  onSaveCB: (newAnswers) => {
    console.log(`ShortAnswersCT::onSave(${newAnswers})`);

    const { question } = passedProps

    const filteredAnswers = newAnswers.filter((newAnswer) => {
      return newAnswer.trim().length
    })

    // save to store
    dispatch(updateAnswersAC(question.code, filteredAnswers))

    // optionally persist
    const { doesHandlePersistence } = passedProps
    if (doesHandlePersistence.value)
      dispatch(persistAnswersAC(-1, question.code, filteredAnswers))

    // // save to store
    // dispatch(updateAnswersAC(question_code, newAnswers))
    //
    // // optionally persist
    // const { doesHandlePersistence } = passedProps
    // if (doesHandlePersistence.value)
    //   dispatch(persistAnswersAC(-1, question_code, newAnswers))
  }
  // /* *****************************************
  //    onSaveCB()
  //
  //    Save the new answers to store and persist them.
  //
  //    question_code -- integer
  //    newAnswers -- array of strings
  // ******************************************** */
  // onSaveCB: (question_code, newAnswers) => {
  //   console.log(`ShortAnswersCT::onSave(${question_code}, ${newAnswers})`);
  //
  //   const filteredAnswers = newAnswers.filter((newAnswer) => {
  //     return newAnswer.trim().length
  //   })
  //
  //   // save to store
  //   dispatch(updateAnswersAC(question_code, filteredAnswers))
  //
  //   // optionally persist
  //   const { doesHandlePersistence } = passedProps
  //   if (doesHandlePersistence.value)
  //     dispatch(persistAnswersAC(-1, question_code, filteredAnswers))
  //
  //   // // save to store
  //   // dispatch(updateAnswersAC(question_code, newAnswers))
  //   //
  //   // // optionally persist
  //   // const { doesHandlePersistence } = passedProps
  //   // if (doesHandlePersistence.value)
  //   //   dispatch(persistAnswersAC(-1, question_code, newAnswers))
  // }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortAnswers)
