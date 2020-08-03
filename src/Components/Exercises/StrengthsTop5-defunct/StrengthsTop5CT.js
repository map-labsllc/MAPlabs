import { connect } from 'react-redux'
import StrengthsTop5 from './StrengthsTop5'
import { getAnswers } from '../../../store/answers/reducer'
import { getUser } from '../../../store/user/reducer'
import {
  updateAnswersAC,
  persistAnswersAC
} from '../../../store/answers/actions'

import {
  QUESTION_TYPE_STRENGTHS,
 } from '../../../store/answers/constants'

import {

  IDX_RELATIONSHIP,
  IDX_GROUP,
  IDX_NAME,
  IDX_BELIEF,
  IDX_IMPACT,
  IDX_SELECTED

} from '../Influences/InfluencesConstants.js'

import {
  getInfluences,
  persist,
} from '../Influences/InfluencesCT'

 
/* *****************************************
   mapStateToProps()

   passedProps:
      question -- { code: 50, text: "question 50" }
      promptQuestionCode -- where to get the list of influences to choose from
      outputQuestionCode -- where to output the madlibs
      impactFilter -- filter the influences to IMPACT_SUPPORTIVE or IMPACT_INHIBITING
      instructions
      isDynamic -- undefined - rendering static version in <Popup>
                  true - rendering dynamic verison in <ModalX>
      onCloseModalCB -- call when user clicks Save button
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( "InfluencesCT::mapStateToProps()" )

  const {
    question,
    promptQuestionCode,
    instructions,
    isDynamic,
    onCloseModalCB,
  } = passedProps

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get userId
  const userId = getUser( state.userRD ).user_id

  // get influence record from earlier question
  const answerRecords = getAnswers( state.answersRD, promptQuestionCode )


  return {
    userId,
    question,
    instructions,
    isDynamic,
    onCloseModalCB,
  }
}

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {

  /* *****************************************
    persistSelections()

    Save the checkbox selections back to the promptQuestionCode.  This Component added
      the 'selection' field to the existing influence records from the prompQuestionCode,
      now we save those influences back to the original promptQuestionCode.

    userId
    promptQuestionCode
    newStrengths -- same format as the object that was passed down in props as "allInfluences"
  ******************************************** */
 function persistSelections(userId, promptQuestionCode, newStrengths) {

    // TODO FIX...
    
    // store wants 2D array of strings, so map the object into that format
    const twoDimArrayOfString = []
    newStrengths.forEach(influence => {
      const record = []
      record[IDX_GROUP]        = influence.group
      record[IDX_RELATIONSHIP] = influence.relationship
      record[IDX_NAME]         = influence.name
      record[IDX_BELIEF]       = influence.belief
      record[IDX_IMPACT]       = influence.impact
      record[IDX_SELECTED]     = influence.selected
      twoDimArrayOfString.push(record)
    })

    console.log('-- persisting:')
    console.log(JSON.stringify(twoDimArrayOfString))

    dispatch( updateAnswersAC( promptQuestionCode, twoDimArrayOfString ) )
    dispatch( persistAnswersAC( userId, promptQuestionCode, QUESTION_TYPE_STRENGTH, twoDimArrayOfString ) )
  }


  /* *****************************************
    onPersist()

    Update store and persist both the 'selections' and new madlibs.

    userId -- integer
    newStrengths -- same format as the object that was passed down in props as "allInfluences"
  ******************************************** */
  function onPersist( userId, newStrengths ) {
    console.log( 'StrengthsTop5CT::onPersist(newStrengths)',  newStrengths )

    const { promptQuestionCode } = passedProps

    // persist 'selections' back to promptQuestionCode
    persistSelections(
      userId,
      promptQuestionCode,
      newStrengths
    )
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
)( StrengthsTop5 )
