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
  const answerRecords = getAnswers( state.answersRD, questionCode )
  console.log( `getAnswers(${questionCode}): `, answerRecords )

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
const mapStateToProps = ( state, passedProps ) => {
  console.log( "StrengthsCT::mapStateToProps()" )

  const {
    question,
    instructions,
    isDynamic,
    onCloseModalCB,
  } = passedProps

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get userId
  const userId = getUser( state.userRD ).user_id

  const strengths = getStrengths(state, question.code)

  console.log('StrengthsCT::Strengths: ', strengths)

  return {
    userId,
    question,
    instructions,
    strengths,
    isDynamic,
    onCloseModalCB,
  }
}

// ******************************************************
export function persist( dispatch, question, userId, newStrengths ) {
  console.log( `StrengthsCT::persist( ${newStrengths} )` )

  // const { question } = passedProps

  // store wants 2D array of strings, so map the object into that format
// TODO FIX
  const twoDimArrayOfString = []
  // const groupIds = [GROUP_PERSONAL, GROUP_SOCIAL, GROUP_WIDER]
  // groupIds.forEach(groupId => {
  //   newStrengths[groupId].forEach(influence => {
  //     // don't save unless name was entered
  //     if (influence.name.trim().length) {
  //       const record = []
  //       record[IDX_GROUP]        = groupId
  //       record[IDX_RELATIONSHIP] = influence.relationship
  //       record[IDX_NAME]         = influence.name
  //       record[IDX_BELIEF]       = influence.belief
  //       record[IDX_IMPACT]       = influence.impact
  //       record[IDX_SELECTED]     = influence.selected
  //       twoDimArrayOfString.push(record)
  //     }
  //   })
  // })

  console.log('-------------------- persisting')
  console.log(JSON.stringify(twoDimArrayOfString))

  dispatch( updateAnswersAC( question.code, twoDimArrayOfString ) )
  dispatch( persistAnswersAC( userId, question.code, QUESTION_TYPE_STRENGTH, twoDimArrayOfString ) )
}


/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {

  /* *****************************************
  onPersist()

  Save the new Strengths to store and persist them.

  userId -- integer
  newStrengths -- 

  ******************************************** */
  function onPersist( userId, newStrengths ) {
    console.log( `StrengthsCT::onPersist( ${newStrengths} )` )
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
)( Strengths )
