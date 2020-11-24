import { connect } from 'react-redux'
import ReflectionsTop5 from './ReflectionsTop5'
import { getUser } from '../../../store/user/reducer'
import { updateAnswersAC, persistAnswersAC } from '../../../store/answers/actions'
import { listIdToValue } from '../../../store/lists/actions'
import { QUESTION_TYPE_STRENGTH_EM_IM } from '../../../store/answers/constants'
import { IDX_STRENGTH, IDX_PHRASE, IDX_EFFECT, IDX_SELECTED } from '../../../constants'
import { getAnswers, hydrater, dehydrater } from '../../../store/answers/reducer'
 
/* *****************************************
   mapStateToProps()

   passedProps:
      question -- { code: 50, text: 'question 50' }
      promptQuestionCode -- where to get the list of influences to choose from
      filter -- filter the reflections to impediment/embodiment
      instructions
      isDynamic -- undefined - rendering static version in <Popup>
                  true - rendering dynamic verison in <ModalX>
      onCloseModalCB -- call when user clicks Save button
******************************************** */

const answerShape = {
  [IDX_STRENGTH]: 'strength',
  [IDX_PHRASE]: 'phrase',
  [IDX_SELECTED]: 'selected',
  [IDX_EFFECT]: 'effect'
}

// format item into answer for saving
const dehydrateAnswer = dehydrater(answerShape)

const mapStateToProps = (state, passedProps) => {
  const {
    question,
    promptQuestionCode,
    filter,
    isDynamic,
    onCloseModalCB,
    saveToPrompt
  } = passedProps

  // validate params
  if (!question || !question.code) throw new Error('missing question code: ', passedProps.question_code)

  // get userId
  const userId = getUser(state.userRD).id

  // get prompts from earlier question
  const prompts = getAnswers(state.answersRD, promptQuestionCode)
  let answerRecords 

  if (saveToPrompt) {
    answerRecords = prompts
  } else {
    // get current answers
    answerRecords = getAnswers(state.answersRD, question.code)

    if (answerRecords.length === 0) {
      answerRecords = prompts
    }
  }

  const strengthOptions = state.listsRD.lists.strengths
  const hydrateAnswer = (answer) => {
    const hydrated = hydrater(answerShape)(answer)
    return ({
      strengthValue: listIdToValue(strengthOptions, answer[IDX_STRENGTH]), ...hydrated
    })
  }

  const reflections = answerRecords.map(hydrateAnswer)

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

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = (dispatch, passedProps) => {
  const { saveToPrompt, question } = passedProps

  /* *****************************************
    persistSelections()

    Save the checkbox selections back to the promptQuestionCode.  This Component added
      the 'selection' field to the existing influence records from the prompQuestionCode,
      now we save those influences back to the original promptQuestionCode.

    userId
    promptQuestionCode
  ******************************************** */
  const persistSelections = (userId, promptQuestionCode, newReflections) => {
    const data = newReflections.map(dehydrateAnswer)
    const saveQuestionCode = saveToPrompt ? promptQuestionCode : question.code

    dispatch(updateAnswersAC(saveQuestionCode, data))
    dispatch(persistAnswersAC(userId, saveQuestionCode, QUESTION_TYPE_STRENGTH_EM_IM, data))
  }

  /* *****************************************
    onPersist()

    Update store and persist both the 'selections' and new madlibs.

    userId -- integer
    newReflections -- same format as the object that was passed down in props as 'allInfluences'
  ******************************************** */
  function onPersist(userId, newReflections) {
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
)(ReflectionsTop5)
