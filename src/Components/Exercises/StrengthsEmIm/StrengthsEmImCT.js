import { connect } from 'react-redux'
import StrengthsEmIm from './StrengthsEmIm'
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
  console.log( `getAnswers(${question.code}): `, answerRecords )

  // data structure to pass down in props
  const previousData = {
    strength: "",
    reflections: [],  // array of objects in form { reflection: "str", effect: "impediment/embodiment" }
    }

  // translate data from the 2D array of strings to
  //   the object structure to pass down as prop to <Strength>
  if (answerRecords.length) {

    // STRENGTH
    // --------
    previousData.strength = answerRecords[0][IDX_STRENGTH]

    // check that each record has the same strength
    if (!answerRecords.every(record => record[0] === previousData.strength)) {
      console.log("ERROR, question.code:", question.code, "records should all have the same strength")
    }

    // REFLECTIONS array
    // ----------------

    const reflections = []
    for (let i = 1; i < answerRecords.length; i++) {
      reflections.push({
        reflection: answerRecords[i][IDX_PHRASE],
        effect:     answerRecords[i][IDX_EFFECT]
      })
    }
    previousData.reflections = reflections
  }

  return {
    number,
    question,
    previousData,
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

    console.log("Will update store with: ")
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
)( StrengthsEmIm )