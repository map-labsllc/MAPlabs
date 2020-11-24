import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import MadLibs from './MadLibs'
import { getAnswers } from '../../../store/answers/reducer'
import { getUser } from '../../../store/user/reducer'

import { updateAnswersAC, persistAnswersAC } from '../../../store/answers/actions'
import { QUESTION_TYPE_MADLIBS } from '../../../store/answers/constants'

import {
  IDX_RELATIONSHIP,
  IDX_NAME,
  IDX_BELIEF,
  IDX_IMPACT,
  IDX_SELECTED,
  IMPACT_SUPPORTIVE,
  IMPACT_INHIBITING,
  IMPACT_SUPPORTS,
  IMPACT_INHIBITS,
  SELECTED,
} from '../../../constants'

// indexes into the data structure coming from the store
const IDX_JSON = 0

/* *****************************************
   mapStateToProps()
   passedProps:
     number -- number of the question in <Questions>, 1-based
     question -- { code: 50, text: "question 50" }
     isDynamic -- undefined - rendering static version in <Popup>
                  true - rendering dynamic verison in <ModalX>
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  const {
    number,
    question,
    isDynamic
  } = passedProps

  // get userId
  const userId = getUser(state.userRD).id

  // validate params
  if (!question || !question.code) throw new Error("missing question code: ", passedProps.question_code)

  // get previous data, if any
  const answerRecords = getAnswers(state.answersRD, question.code)
  console.log(`getAnswers(${question.code}): `, answerRecords )

  const data = answerRecords.map(answer=> JSON.parse(answer[IDX_JSON]))

  return {
    number,
    question,
    madlibs: data,
    isDynamic,
    userId
  }
}

/* *****************************************
   mapDispatchToProps()
   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {
  const { question, promptQuestionCode, impactFilter } = passedProps

  function copyParentAnswers() {
    return async(dispatch, getState) => {
      const state = getState()

      // get userId
      const userId = getUser(state.userRD).id

      // get parent answers
      const parentAnswers = getAnswers(state.answersRD, promptQuestionCode)
        .filter(answer => answer[IDX_SELECTED] === SELECTED) // filter out selected ones
        .filter(answer =>answer[IDX_IMPACT] === impactFilter) // supports/inhbits

      // reformat into object
      const data = parentAnswers
        .map(answer => {
          let impact
          switch(answer[IDX_IMPACT]) {
            case IMPACT_SUPPORTIVE:
              impact = IMPACT_SUPPORTS
              break
            case IMPACT_INHIBITING:
              impact = IMPACT_INHIBITS
              break
            default:
              break;
          } 

          return JSON.stringify({
            belief: answer[IDX_BELIEF],
            relationship: answer[IDX_RELATIONSHIP],
            name: answer[IDX_NAME],
            impact,
            emotion: '',
            desire: '',
            identity: '',
            action: '',
            result: '',
            change: '',
            intention: ''
          })
        })

      // move into proper index
      const records = data.reduce((acc, item) => {
        const arr = []
        arr[IDX_JSON] = item  // should be stringified already
        acc.push(arr)
        return acc
      }, [])

      console.log('parentCopy records', records)

      await dispatch(updateAnswersAC(question.code, records))
      await dispatch(persistAnswersAC(userId, question.code, QUESTION_TYPE_MADLIBS, records) )
    }
  }

  /* *****************************************
     onUpdateStore()
     Save the new data to store.  Does NOT persist.
     newTransitions -- array of transitinos
  ******************************************** */
  function onUpdateStore(id, newData ) {

    return async(dispatch, getState) => {
      console.log( `MadLibsCT::onUpdate`, newData )

      const { question } = passedProps

      const state = getState()

      const answers = getAnswers(state.answersRD, question.code)

      // store wants 2D array of strings, so map newData into that format
      const twoDimArrayOfString = answers.reduce((acc, answer, idx) => {
        // replace with new data
        if (idx === id) {
          // console.log('replacing?', idx, id, idx === id, newData)

          const arr = []
          arr[IDX_JSON] = JSON.stringify(newData)
          acc.push(arr)
        } else {
          acc.push(answer)
        }

        return acc
      }, [])

      console.log('dispatching store update for MadLibs', twoDimArrayOfString)

      // update store
      dispatch(updateAnswersAC(question.code, twoDimArrayOfString))
    }
  }

  /* *****************************************
     The props being passed down
  ******************************************** */
  return {
    onUpdateStoreCB: bindActionCreators(onUpdateStore, dispatch),
    copyParentAnswersCB: bindActionCreators(copyParentAnswers, dispatch)
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( MadLibs )