import { connect } from 'react-redux'
import ReflectionsTop5 from './ReflectionsTop5'
import { getAnswers } from '../../../store/answers/reducer'
import { getUser } from '../../../store/user/reducer'
import { updateAnswersAC, persistAnswersAC } from '../../../store/answers/actions'
import { listIdToValue } from "../../../store/lists/actions"
import { QUESTION_TYPE_STRENGTH_EM_IM } from '../../../store/answers/constants'
import { IDX_STRENGTH, IDX_PHRASE, IDX_EFFECT, IDX_SELECTED } from '../../../constants'

 
/* *****************************************
   mapStateToProps()

   passedProps:
      question -- { code: 50, text: "question 50" }
      promptQuestionCode -- where to get the list of influences to choose from
      outputQuestionCode -- where to output the madlibs
      filter -- filter the reflections to impediment/embodiment
      instructions
      isDynamic -- undefined - rendering static version in <Popup>
                  true - rendering dynamic verison in <ModalX>
      onCloseModalCB -- call when user clicks Save button
******************************************** */
const mapStateToProps = ( state, passedProps ) => {

  const {
    question,
    promptQuestionCode,
    filter,
    isDynamic,
    onCloseModalCB,
  } = passedProps

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get userId
  const userId = getUser(state.userRD).id

  // get influence record from earlier question
  const answerRecords = getAnswers(state.answersRD, promptQuestionCode)

  const strengthsList = state.listsRD.lists.strengths
  let reflections = answerRecords.map(record => ({
      strength: record[IDX_STRENGTH],
      strengthValue: listIdToValue(strengthsList, record[IDX_STRENGTH]),
      phrase: record[IDX_PHRASE],
      effect: record[IDX_EFFECT],
      selected: record[IDX_SELECTED],
    })
  )

  return {
    userId,
    question,
    instructions: question.text,
    filter,
    reflections,
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
  ******************************************** */
 function persistSelections(userId, promptQuestionCode, newReflections) {

    // store wants 2D array of strings, so map the object into that format
    const twoDimArrayOfString = []
    newReflections.forEach(reflection => {
      const record = []
      record[IDX_STRENGTH] = reflection.strength
      record[IDX_PHRASE] = reflection.phrase
      record[IDX_EFFECT] = reflection.effect
      record[IDX_SELECTED] = reflection.selected
      twoDimArrayOfString.push(record)
    })

    // note: these answers are saved to the promptQuestionCode
    // console.log("preparing to dispatch ids", userId, promptQuestionCode, QUESTION_TYPE_STRENGTH_EM_IM, )
    dispatch( updateAnswersAC( promptQuestionCode, twoDimArrayOfString ) )
    dispatch( persistAnswersAC( userId, promptQuestionCode, QUESTION_TYPE_STRENGTH_EM_IM, twoDimArrayOfString ) )
  }

  /* *****************************************
    onPersist()

    Update store and persist both the 'selections' and new madlibs.

    userId -- integer
    newReflections -- same format as the object that was passed down in props as "allInfluences"
  ******************************************** */
  function onPersist( userId, newReflections ) {

    const { promptQuestionCode } = passedProps

    // persist 'selections' back to promptQuestionCode
    persistSelections(
      userId,
      promptQuestionCode,
      newReflections
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
)( ReflectionsTop5 )
