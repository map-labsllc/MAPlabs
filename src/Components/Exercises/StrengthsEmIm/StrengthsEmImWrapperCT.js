import { connect } from 'react-redux'
import StrengthsEmImWrapper from './StrengthsEmImWrapper'
import { getAnswers } from '../../../store/answers/reducer'
import { updateAnswersAC } from '../../../store/answers/actions'

// legal values for the IDX_EFFECT field of the
export const EFFECT_BROADLY = 'broadly'

// indexes into the data structure coming from the store
const IDX_STRENGTH = 0
const IDX_PHRASE = 1
const IDX_EFFECT = 2

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
    isDynamic,
  } = passedProps

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get previous data, if any
  const answerRecords = getAnswers( state.answersRD, question.code )
  console.log(`getAnswers(${question.code}): `, answerRecords )

  return {
    number,
    question,
    strengths: answerRecords,
    isDynamic,
  }
}

/* *****************************************
   mapDispatchToProps()
   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {

  /* *****************************************
     onUpdateStore()
     Save the new transitions to store.  Does NOT persist.
     newTransitions -- array of transitinos
  ******************************************** */
  function onUpdateStore( newData ) {
    console.log( `StrengthsEmImCT::onUpdate(${newData})` )

    const { question } = passedProps

    // store wants 2D array of strings, so map newData into that format
    const twoDimArrayOfString = []

    if (newData.strength) {
      newData.reflections.forEach((reflection) => {
        const newRecord = []
        newRecord[IDX_STRENGTH] = newData.strength
        newRecord[IDX_PHRASE] = reflection.reflection
        newRecord[IDX_EFFECT] = reflection.effect
        twoDimArrayOfString.push(newRecord)
      })
    }

    console.log(twoDimArrayOfString)

    // update store
    dispatch( updateAnswersAC( question.code, twoDimArrayOfString ) )
  }

  /* *****************************************
     The props being passed down
  ******************************************** */
  return {
    onUpdateStoreCB: onUpdateStore,
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( StrengthsEmImWrapper )