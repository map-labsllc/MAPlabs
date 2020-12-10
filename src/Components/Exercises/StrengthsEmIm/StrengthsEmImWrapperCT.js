import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import StrengthsEmImWrapper from './StrengthsEmImWrapper'
import { getAnswers } from '../../../store/answers/reducer'
import { updateAnswersAC, persistAnswersAC, copyParentAnswers } from '../../../store/answers/actions'
import { QUESTION_TYPE_STRENGTH_EM_IM } from '../../../store/answers/constants'
import { getUser } from '../../../store/user/reducer'
import { IDX_STRENGTH, IDX_PHRASE, IDX_EFFECT } from '../../../constants'

/* *****************************************
   mapStateToProps()
   passedProps:
     number -- number of the question in <Questions>, 1-based
     question -- { code: 50, text: "question 50" }
     isDynamic -- undefined - rendering static version in <Popup>
                  true - rendering dynamic verison in <ModalX>
******************************************** */
const mapStateToProps = (state, passedProps) => {
  const {
    number,
    question,
    isDynamic
  } = passedProps

  // validate params
  if (!question || !question.code) throw new Error('missing question code: ', passedProps.question_code)

  // get previous data, if any
  const answerRecords = getAnswers(state.answersRD, question.code)
  console.log(`BEFORE getAnswers(${question.code}): `, answerRecords)

  // filter to unique set of strength ids, reflections are adding in component
  const strengths = []
  const strengthIds = []
  answerRecords.map(answer => {
    const strength_id = answer[IDX_STRENGTH]
    if (!strengthIds.includes(strength_id)) {
      strengths.push(answer)
      strengthIds.push(strength_id)
    }
  })

  // console.log('AFTER strengths', strengths)

  return {
    number,
    question,
    strengths,
    strengthsList: state.listsRD.lists.strengths,
    isDynamic,
  }
}

/* *****************************************
   mapDispatchToProps()
   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = (dispatch, passedProps) => {
  const { question, promptQuestionCode } = passedProps
  const type = QUESTION_TYPE_STRENGTH_EM_IM

  // function copyParentAnswers() {

  //   return async(dispatch, getState) => {
  //     let state = getState()

  //     // get userId
  //     const userId = getUser(state.userRD).id

  //     // get parent answers
  //     const parentAnswers = getAnswers(state.answersRD, promptQuestionCode)
  //     console.log('parentAnswers', parentAnswers)

  //     await dispatch(updateAnswersAC(question.code, parentAnswers))
  //     await dispatch(persistAnswersAC(userId, question.code, QUESTION_TYPE_STRENGTH_EM_IM, parentAnswers))

  //   }
  // }

  /* *****************************************
     onUpdateStore()
     Save the new transitions to store.  Does NOT persist.
     id -- strength id to replace
     newData - {strength, reflections: []}
  ******************************************** */
  function onUpdateStore(newData) {
    return async (dispatch, getState) => {
      console.log('StrengthsEmImWrapper::onUpdate', newData)

      const { question } = passedProps

      const state = getState()

      const answers = getAnswers(state.answersRD, question.code)

      const strength_id = newData.strength
      // store wants 2D array of strings, so map newData into that format
      let reflectionsSet = false
      const twoDimArrayOfString = answers.reduce((acc, answer) => {
        // replace with new data
        if (+answer[IDX_STRENGTH] === +strength_id) {
          if (!reflectionsSet) {
            //  map reflections into individual rows
            newData.reflections.map((reflection) => {
              const arr = []
              arr[IDX_STRENGTH] = newData.strength
              arr[IDX_PHRASE] = reflection.reflection
              arr[IDX_EFFECT] = reflection.effect
              console.log('adding a reflection', arr)
              acc.push(arr)
            })
            reflectionsSet = true
          }
        } else {
          acc.push(answer)
        }

        return acc
      }, [])

      // update store
      dispatch(updateAnswersAC(question.code, twoDimArrayOfString))
    }
  }

  /* *****************************************
     The props being passed down
  ******************************************** */
  return {
    onUpdateStoreCB: bindActionCreators(onUpdateStore, dispatch),
    copyParentAnswersCB: bindActionCreators(() => copyParentAnswers(question, promptQuestionCode, type), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StrengthsEmImWrapper)
