import { connect } from 'react-redux'
import ShortAnswers from '../Components/ShortAnswers'
import { getUser } from '../store/user/reducer'
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

  // validation
  if (!question.code) throw new Error("missing question code: ", passedProps.question_code)

  // get userId
  const userId = getUser(state.userRD).user_id

  // get previous answers, if any
  const answers = getAnswers(state.answersRD, question.code)
  console.log(`getAnswers(${question.code}): `, answers);
  const previousAnswers = answers

  return {
    userId,
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
     onPersistCB()

     Save the new answers to store and persist them.

     userId -- integer
     newAnswers -- array of strings
  ******************************************** */
  onPersistCB: (userId, newAnswers) => {
    console.log(`ShortAnswersCT::onPersistCB(${newAnswers})`);

    const { question } = passedProps

    const filteredAnswers = newAnswers.filter((newAnswer) => {
      return newAnswer.trim().length
    })

    // save to store
    dispatch(updateAnswersAC(question.code, filteredAnswers))

    // optionally persist
    const { doesHandlePersistence } = passedProps
    if (doesHandlePersistence.value) {
      console.log('persisting...');
      dispatch(persistAnswersAC(userId, question.code, filteredAnswers))
    }
  },

  /* *****************************************
     onUpdateStoreCB()

     Save the new answers to store.  Does NOT persist.

     newAnswers -- array of strings
  ******************************************** */
  onUpdateStoreCB: (newAnswers) => {
    console.log(`ShortAnswersCT::onUpdateCB(${newAnswers})`);

    const { question } = passedProps

    const filteredAnswers = newAnswers.filter((newAnswer) => {
      return newAnswer.trim().length
    })

    // save to store
    dispatch(updateAnswersAC(question.code, filteredAnswers))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortAnswers)
