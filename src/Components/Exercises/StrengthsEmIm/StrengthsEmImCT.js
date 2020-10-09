import { connect } from 'react-redux'
import StrengthsEmIm from './StrengthsEmIm'
import { getAnswers } from '../../../store/answers/reducer'
import { updateAnswersAC } from '../../../store/answers/actions'
import { IDX_STRENGTH, IDX_PHRASE, IDX_EFFECT } from './StrengthsEmImConstants'
import { bindActionCreators } from 'redux';

/* *****************************************
   mapStateToProps()
   props:
     number -- number of the question in <Questions>, 1-based
     question -- { code: 50, text: "question 50" }
     isDynamic -- undefined - rendering static version in <Popup>
                  true - rendering dynamic verison in <ModalX>
******************************************** */
const mapStateToProps = ( state, props ) => {

  const {
    number,
    question,
    isDynamic,
    strength // answerRecord format
  } = props

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", props.question_code )

  let strength_id = strength[IDX_STRENGTH]
  let reflections = []

  // get all the records with this strength_id
  const answerRecords = getAnswers( state.answersRD, question.code).filter((answer => +answer[IDX_STRENGTH] === +strength_id))
  // console.log( `getAnswers(${question.code}) wtih ${strength_id}: `, answerRecords )

  // translate data from the 2D array of strings to
  if (answerRecords.length) {
    // check that each record has the same strength
    if (!answerRecords.every(record => +record[IDX_STRENGTH] === +strength_id)) {
      console.error("ERROR, question.code:", question.code, "records should all have the same strength")
    }

    // REFLECTIONS array
    // ----------------
    reflections = answerRecords.map((record, i) => {
      return { 
        reflection: record[IDX_PHRASE],
        effect: record[IDX_EFFECT]
      }
    })
  }

  return {
    number,
    question,
    isDynamic,
    strength: strength_id,
    reflections
  }
}

/* *****************************************
   mapDispatchToProps()
   props -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, props ) => {

  return {}

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( StrengthsEmIm )