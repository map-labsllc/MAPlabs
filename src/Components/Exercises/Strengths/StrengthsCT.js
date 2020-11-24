import { connect } from 'react-redux'
import Strengths from './Strengths'
import { getAnswers } from '../../../store/answers/reducer'
import { getUser } from '../../../store/user/reducer'
import {
  updateAnswersAC,
  persistAnswersAC
} from '../../../store/answers/actions'

import { QUESTION_TYPE_STRENGTH } from '../../../store/answers/constants'

// *******************************************************
// getStrengths()
export const getStrengths = (state, questionCode) => {
  // get previous data, if any
  const answerRecords = getAnswers(state.answersRD, questionCode)
  console.log(`getAnswers(${questionCode}): `, answerRecords)

  return answerRecords || []
}

/* *****************************************
   mapStateToProps()

   passedProps:
     question -- { code: 50, text: "question 50" }
     instructions
     isDynamic -- undefined - rendering static version in <Popup>
                  true - rendering dynamic verison in <ModalX>
     onCloseModalCB -- call when user clicks Save button
******************************************** */
const mapStateToProps = (state, passedProps) => {
  console.log('StrengthsCT::mapStateToProps()')

  const {
    question,
    instructions,
    isDynamic,
    onCloseModalCB,
  } = passedProps

  // validate params
  if (!question || !question.code) throw new Error('missing question code: ', passedProps.question_code)

  // get userId
  const userId = getUser(state.userRD).id

  const strengthValues = getStrengths(state, question.code)

  const strengths = strengthValues.map((value, key) => value[0])
    .reduce((acc, v) => { acc.push(v); return acc }, [])

  console.log('StrengthsCT::Strengths: ', strengths)

  return {
    userId,
    question,
    instructions,
    strengths,
    isDynamic,
    onCloseModalCB,
    strengthOptions: state.listsRD.lists.strengths
  }
}

// ******************************************************
export function persist(dispatch, question, userId, newStrengths) {
  console.log(`StrengthsCT::persist( ${newStrengths} )`)

  const twoDimArrayOfString = newStrengths.map(str => [str])

  dispatch(updateAnswersAC(question.code, twoDimArrayOfString))
  dispatch(persistAnswersAC(userId, question.code, QUESTION_TYPE_STRENGTH, twoDimArrayOfString))
}

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = (dispatch, passedProps) => {
  /* *****************************************
  onPersist()

  Save the new Strengths to store and persist them.

  userId -- integer
  newStrengths --

  ******************************************** */
  function onPersist(userId, newStrengths) {
    console.log(`StrengthsCT::onPersist( ${newStrengths} )`)
    persist(dispatch, passedProps.question, userId, newStrengths)
  }

  /* *****************************************
     The props being passed down
  ******************************************** */
  return {
    onPersistCB: onPersist,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Strengths)
