import { connect } from 'react-redux'
import Top5List from '../Top5List/Top5List'
import { getAnswers } from '../../../store/answers/reducer'
import { getUser } from '../../../store/user/reducer'
import {
  updateAnswersAC,
  persistAnswersAC
} from '../../../store/answers/actions'
import { bindActionCreators } from 'redux';

import { QUESTION_TYPE_TOP_THEMES } from '../../../store/answers/constants'
import { SELECTED, IDX_THEME, IDX_SELECTED } from '../../../constants'

// format answers for checkbox selector
const hydrateAnswer = (answer) => ({
  theme: answer[IDX_THEME],
  selected: answer[IDX_SELECTED]
})

// format item into answer for saving
const dehydrateAnswer = (item) => {
  const record = []
  record[IDX_THEME] = item.theme
  record[IDX_SELECTED] = item.selected

  return record
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
  console.log( "ThemesTop5CT::mapStateToProps()" )

  const {
    question,
    promptQuestionCodes,
    instructions,
    isDynamic,
    onCloseModalCB,
  } = passedProps

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get userId
  const userId = getUser( state.userRD ).id

  // find previous answers, if any, to display when static
  const answers = getAnswers( state.answersRD, question.code )
  let selectedAnswers = answers.map(hydrateAnswer)

  // make array of selected themes
  let selectedThemes = selectedAnswers.map(answer => answer.theme)
  console.log('selectedThemes', selectedThemes)
  const isSelected = (theme) => selectedThemes.includes(theme)

  // get all possible answers for prompts
  let prompts = []
  promptQuestionCodes.map(questionCode => {
    prompts = prompts.concat(getAnswers( state.answersRD, questionCode ) )
  })

  console.log("prompts", prompts)
  prompts = prompts.map(hydrateAnswer)
    // set selectedAnswers as "selected"
    .map(answer => ({...answer, selected: isSelected(answer.theme) ? SELECTED : ''}))

  return {
    userId,
    question,
    instructions,
    prompts,
    selectedAnswers,
    isDynamic: !!isDynamic,
    onCloseModalCB,
    fields: ['theme'],
    headings: ['Theme']
  }
}

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {

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

    const { question } = passedProps

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
    await dispatch( persistAnswersAC( userId, question.code, QUESTION_TYPE_TOP_THEMES, twoDimArrayOfString ) )
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
