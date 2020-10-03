import { connect } from 'react-redux'
import InfluencesTop5 from './InfluencesTop5'
import { getAnswers } from '../../../store/answers/reducer'
import { getUser } from '../../../store/user/reducer'
import {
  updateAnswersAC,
  persistAnswersAC
} from '../../../store/answers/actions'

import {
  QUESTION_TYPE_INFLUENCES,
  QUESTION_TYPE_NARRATIVE,
 } from '../../../store/answers/constants'

import {
  GROUP_PERSONAL,
  GROUP_SOCIAL,
  GROUP_WIDER,

  IDX_RELATIONSHIP,
  IDX_GROUP,
  IDX_NAME,
  IDX_BELIEF,
  IDX_IMPACT,
  IDX_SELECTED,

  IMPACT_SUPPORTIVE,
  IMPACT_INHIBITING,
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
    impactFilter,
    instructions,
    isDynamic,
    onCloseModalCB,
  } = passedProps

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get userId
  const userId = getUser( state.userRD ).id

  // get influence record from earlier question
  const answerRecords = getAnswers( state.answersRD, promptQuestionCode )

  let allInfluences = answerRecords.map(record => (
    {
      group:        record[IDX_GROUP],
      relationship: record[IDX_RELATIONSHIP],
      name:         record[IDX_NAME],
      belief:       record[IDX_BELIEF],
      impact:       record[IDX_IMPACT],
      selected:     record[IDX_SELECTED],
    })
  )

  allInfluences = allInfluences.sort((a, b) =>
      a.name.localeCompare(b.name))

  console.log('InfluencesTop5CT::influences: ', allInfluences)

  return {
    userId,
    question,
    instructions,
    impactFilter,
    allInfluences,
    isDynamic,
    onCloseModalCB,
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
    newInfluences -- same format as the object that was passed down in props as "allInfluences"
  ******************************************** */
 function persistSelections(userId, promptQuestionCode, newInfluences) {

    // store wants 2D array of strings, so map the object into that format
    const twoDimArrayOfString = []
    newInfluences.forEach(influence => {
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
    dispatch( persistAnswersAC( userId, promptQuestionCode, QUESTION_TYPE_INFLUENCES, twoDimArrayOfString ) )
  }

  /* *****************************************
    persistMadlibs()

    Create madlibs and add to store and persist to outputQuestionCode.
      Note: old contents of outputQuestionCode are overwritten without warning,
      so if user had worked on them, then come back and made different selections
      here then their old work will be overwritten.

    userId
    promptQuestionCode
    impactFilter -- only create the mad libs for IMPACT_SUPPORTIVE or IMPACT_INHIBITING
    newInfluences -- same format as the object that was passed down in props as "allInfluences"
  ******************************************** */
 function persistMadlibs(userId, outputQuestionCode, impactFilter, newInfluences) {

  let madlibs = newInfluences.filter(influence => influence.impact === impactFilter).map(influence => JSON.stringify(influence))

  // store wants 2D array of strings, in this case we're just adding one narrative string
  const twoDimArrayOfString = [ [ '', madlibs ] ]

  console.log('-- persisting:')
  console.log(JSON.stringify(twoDimArrayOfString))

  dispatch( updateAnswersAC( outputQuestionCode, twoDimArrayOfString ) )
  dispatch( persistAnswersAC( userId, outputQuestionCode, QUESTION_TYPE_NARRATIVE, twoDimArrayOfString ) )
}

  /* *****************************************
    onPersist()

    Update store and persist both the 'selections' and new madlibs.

    userId -- integer
    newInfluences -- same format as the object that was passed down in props as "allInfluences"
  ******************************************** */
  function onPersist( userId, newInfluences ) {
    console.log( 'InfluencesTop5CT::onPersist(newInfluences)',  newInfluences  )

    const { promptQuestionCode, outputQuestionCode, impactFilter } = passedProps

    // persist 'selections' back to promptQuestionCode
    persistSelections(
      userId,
      promptQuestionCode,
      newInfluences
    )

    // persist the madlibs to outputQuestionCode
    persistMadlibs(
      userId,
      outputQuestionCode,
      impactFilter,
      newInfluences
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
)( InfluencesTop5 )
