import { connect } from 'react-redux'
import Top5List from './Top5List'
import { getAnswers } from '../../../store/answers/reducer'
import { getUser } from '../../../store/user/reducer'
import { updateAnswersAC, persistAnswersAC } from '../../../store/answers/actions'
import { bindActionCreators } from 'redux';
import { IDX_DEFAULT, IDX_SELECTED, SELECTED } from '../../../constants'
import { hydrater, dehydrater } from '../../../store/answers/reducer'

// defaults for answer in first field
const DEFAULT_FIELD = 'field1'

const defaultAnswerShape = {
  [IDX_DEFAULT]: DEFAULT_FIELD,
  [IDX_SELECTED]: 'selected'
}

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

  const {
    question,
    promptQuestionCodes,
    instructions,
    isDynamic,
    onCloseModalCB,
    hydrateAnswer = hydrater(defaultAnswerShape),
    fields = [DEFAULT_FIELD],
    headings,
    selectedAttribute = DEFAULT_FIELD,
  } = passedProps

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get userId
  const userId = getUser( state.userRD ).id

  // find previous answers, if any, to display when static
  const answers = getAnswers( state.answersRD, question.code )
  let selectedAnswers = answers.map(hydrateAnswer)

  // make array of selected values
  let selectedValues = selectedAnswers.map(answer => answer[selectedAttribute])
  const isSelected = (value) => selectedValues.includes(value)

  // get all possible answers for prompts
  let prompts = []
  promptQuestionCodes.map(questionCode => {
    prompts = prompts.concat(getAnswers(state.answersRD, questionCode))
  })

  console.log(state.answersRD)
  console.log("prompts for", promptQuestionCodes, prompts)
  prompts = prompts.map(hydrateAnswer)
    // set selectedAnswers as "selected"
    .map(answer => ({...answer, selected: isSelected(answer[selectedAttribute]) ? SELECTED : ''}))

  return {
    userId,
    question,
    instructions,
    prompts,
    selectedAnswers,
    isDynamic: !!isDynamic,
    onCloseModalCB,
    fields,
    headings
  }
}

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {

  const {
    dehydrateAnswer = dehydrater(defaultAnswerShape),
    question,
    question_type
  } = passedProps

  /* *****************************************
    onSave()

    Save the checkbox selections back to the promptQuestionCode.  This Component added
      the 'selection' field to the existing influence records from the prompQuestionCode,
      now we save those influences back to the original promptQuestionCode.

    userId
    promptQuestionCode
    newData -- same format as the object that was passed down in props as "prompts"
  ******************************************** */
 function onSave(newData) {

  return async(dispatch, getState) => {
    let state = getState()
    // get userId
    const userId = getUser( state.userRD ).id

    const twoDimArrayOfString = newData.reduce((acc, item) => {
      // only save selected items
      if (item.selected) {
        acc.push(dehydrateAnswer(item))
      }
      return acc
    }, [])

    console.log('-- persisting:')
    console.log(JSON.stringify(twoDimArrayOfString))

    console.log('updateAnswersAC')
    await dispatch( updateAnswersAC( question.code, twoDimArrayOfString ) )
    console.log('persistAnswersAC')
    await dispatch( persistAnswersAC( userId, question.code, question_type, twoDimArrayOfString ) )
  }
 }
  /* ****************************************
     The props being passed down
  ******************************************** */
  return {
    onSaveCB: bindActionCreators(onSave, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Top5List )
