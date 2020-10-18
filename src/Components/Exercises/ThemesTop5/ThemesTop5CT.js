import { connect } from 'react-redux'
import Top5List from '../Top5List/Top5List'
import { getAnswers } from '../../../store/answers/reducer'
import { getUser } from '../../../store/user/reducer'
import {
  updateAnswersAC,
  persistAnswersAC
} from '../../../store/answers/actions'

import { QUESTION_TYPE_TOP_THEMES } from '../../../store/answers/constants'
import { IDX_THEME, IDX_SELECTED } from '../../../constants'

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
    promptQuestionCodes,
    instructions,
    isDynamic,
    onCloseModalCB,
  } = passedProps

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get userId
  const userId = getUser( state.userRD ).id

  // format answers for checkbox selector
  const formatAnswer = (answer) => ({
      label: answer[IDX_THEME],
      selected: answer[IDX_SELECTED]
    })

  let prompts = []
  promptQuestionCodes.reduce(questionCode => {
    prompts = prompts.concat( getAnswers( state.answersRD, questionCode ) )
  })
  prompts = prompts.map(formatAnswer)

  // find previous answers, if any, to display when static
  const answers = getAnswers( state.answersRD, question.code )
  let selectedAnswers = answers.map(formatAnswer)

  return {
    userId,
    question,
    instructions,
    prompts,
    selectedAnswers,
    isDynamic: !!isDynamic,
    onCloseModalCB,
    fields: ['label'],
    headings: ['Theme']
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
    newInfluences -- same format as the object that was passed down in props as "allInfluences"
  ******************************************** */
 function persistSelections(userId, promptQuestionCode, newInfluences) {

    // store wants 2D array of strings, so map the object into that format
    const twoDimArrayOfString = []
    newInfluences.forEach(influence => {
      const record = []
      // record[IDX_GROUP]        = influence.group
      // record[IDX_RELATIONSHIP] = influence.relationship
      // record[IDX_NAME]         = influence.name
      // record[IDX_BELIEF]       = influence.belief
      // record[IDX_IMPACT]       = influence.impact
      // record[IDX_SELECTED]     = influence.selected
      twoDimArrayOfString.push(record)
    })

    console.log('-- persisting:')
    console.log(JSON.stringify(twoDimArrayOfString))

    dispatch( updateAnswersAC( promptQuestionCode, twoDimArrayOfString ) )
    dispatch( persistAnswersAC( userId, promptQuestionCode, QUESTION_TYPE_TOP_THEMES, twoDimArrayOfString ) )
  }

  /* *****************************************
    onPersist()

    Update store and persist both the 'selections' and new madlibs.

    userId -- integer
    newInfluences -- same format as the object that was passed down in props as "allInfluences"
  ******************************************** */
  function onPersist( userId, newInfluences ) {
    console.log( 'Top5ListCT::onPersist(newInfluences)',  newInfluences  )

    const { promptQuestionCode, outputQuestionCode, impactFilter } = passedProps

    // persist 'selections' back to promptQuestionCode
    persistSelections(
      userId,
      promptQuestionCode,
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
)( Top5List )
