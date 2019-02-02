import { connect } from 'react-redux'
import ShortAnswers from './ShortAnswers'
import { getAnswers } from '../../store/answers/reducer'
import { updateAnswersAC } from '../../store/answers/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
     question -- { code: 50, text: "question 50" }
     isDynamic -- undefined or true
                  undefined: render static version in Popup
                  true: render dynamic/interactive verison in Modal
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( "ShortAnswersCT::mapStateToProps()" )

  const {
    question,
    isDynamic,
  } = passedProps

  // validation
  if ( !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get previous answers, if any
  const answers = getAnswers( state.answersRD, question.code )
  console.log( `getAnswers(${question.code}): `, answers )
  const previousAnswers = answers

  return {
    question,
    previousAnswers,
    isDynamic,
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

  // helper function
  function filterOutBlanks( answers ) {
    return answers.filter( answer => answer.trim().length )
  }

  /* *****************************************
     onUpdateStore()

     Save the new answers to store.  Does NOT persist.

     newAnswers -- array of strings
  ******************************************** */
  function onUpdateStore( newAnswers ) {
    console.log( `ShortAnswersCT::onUpdate(${newAnswers})` )

    const { question } = passedProps

    // save to store
    dispatch( updateAnswersAC( question.code, filterOutBlanks( newAnswers ) ) )
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
)( ShortAnswers )
