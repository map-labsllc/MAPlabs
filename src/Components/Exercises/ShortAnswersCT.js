import { connect } from 'react-redux'
import ShortAnswers from './ShortAnswers'
import { getAnswersx } from '../../store/answersx/reducer'
import { updateAnswersxAC } from '../../store/answersx/actions'


/* *****************************************
   mapStateToProps()

   passedProps:
     number -- number of the question in <Questions>, 1-based
     question -- { code: 50, text: "question 50" }
     isDynamic -- undefined or true
                  undefined: render static version in Popup
                  true: render dynamic/interactive verison in Modal
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( "ShortAnswersCT::mapStateToProps()" )

  const {
    number,
    question,
    isDynamic,
  } = passedProps

  // validation
  if ( !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get previous answers, if any
  const answers = getAnswersx( state.answersxRD, question.code )
  console.log( `getAnswers(${question.code}): `, answers )
  // answers are an array of arrays:
  //   [["one"],["two"]]
  // use map() to pull them out to just an array of strings
  const previousAnswers = answers.map(answerArray => answerArray[0])

  return {
    number,
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

    // store wants 2D array of strings, so map the array of strings into that format
    const twoDimArrayOfString = filterOutBlanks( newAnswers ).map(str => [str])

    // update store
    dispatch( updateAnswersxAC( question.code, twoDimArrayOfString ) )
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
