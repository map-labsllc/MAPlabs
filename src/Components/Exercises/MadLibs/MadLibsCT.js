import { connect } from 'react-redux'
import MadLibs from './MadLibs'
import { getAnswers } from '../../../store/answers/reducer'
import { updateAnswersAC, persistAnswersAC } from '../../../store/answers/actions'
import { QUESTION_TYPE_MADLIBS } from '../../../store/answers/constants'
import { bindActionCreators } from 'redux';



import {
  IDX_RELATIONSHIP,
  IDX_GROUP,
  IDX_NAME,
  IDX_BELIEF,
  IDX_IMPACT,
  IDX_SELECTED,

  IMPACT_SUPPORTIVE,
  IMPACT_INHIBITING,
  IMPACT_SUPPORTS,
  IMPACT_INHIBITS,
  SELECTED, 
} from '../Influences/InfluencesConstants.js'

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

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get previous data, if any
  let answerRecords = getAnswers( state.answersRD, question.code )
  console.log(`getAnswers(${question.code}): `, answerRecords )

  let data = answerRecords.map(answer => {
    console.log("JSON to rehydrate", answer)
    return JSON.parse(answer)
  })

  return {
    number,
    question,
    madlibs: data,
    isDynamic,
  }
}


/* *****************************************
   mapDispatchToProps()
   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {
  const { question, userId, promptQuestionCode, impactFilter } = passedProps

  function copyParentAnswers() {

    return async(dispatch, getState) => {
      let state = getState()
  
      // get parent answers
      let parentAnswers = getAnswers(state.answersRD, promptQuestionCode)
        .filter(answer => answer[IDX_SELECTED] === SELECTED) // filter out selected ones
        .filter(answer =>answer[IDX_IMPACT] === impactFilter) // supports/inhbits

      // reformat into object
      let data = parentAnswers
        .map(answer => {
          let impact
          switch(answer[IDX_IMPACT]) {
            case IMPACT_SUPPORTIVE:
              impact = IMPACT_SUPPORTS
              break
            case IMPACT_INHIBITING:
              impact = IMPACT_INHIBITS
              break
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
      let records = data.reduce((acc, item) => {
        let arr = []
        arr[IDX_JSON] = item
        acc.push(item)
        return acc
      }, [])

      console.log('records', records)

      await dispatch(updateAnswersAC(question.code, records))
      await dispatch(persistAnswersAC(userId, question.code, QUESTION_TYPE_MADLIBS, records) )
    }
  }

  /* *****************************************
     onUpdateStore()
     Save the new data to store.  Does NOT persist.
     newTransitions -- array of transitinos
  ******************************************** */
  function onUpdateStore( newData ) {
    console.log( `MadLibsCT::onUpdate`, newData )

    const { question, userId } = passedProps

    // store wants 2D array of strings, so map newData into that format
    const twoDimArrayOfString = []

    if (newData.madlib) {
      newData.madlibs.forEach((madlib) => {
        const newRecord = []
        newRecord[IDX_JSON] = JSON.stringify(newData.madlib)

        twoDimArrayOfString.push(newRecord)
      })
    }

    console.log(twoDimArrayOfString)

    // update store
    dispatch( updateAnswersAC( question.code, twoDimArrayOfString ) )
    // save
    //dispatch( persistAnswersAC( userId, question.code, QUESTION_TYPE_STRENGTH, twoDimArrayOfString ) )

  }

  /* *****************************************
     The props being passed down
  ******************************************** */
  return {
    onUpdateStoreCB: onUpdateStore,
    copyParentAnswersCB: bindActionCreators(copyParentAnswers, dispatch)
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( MadLibs )