import { connect } from 'react-redux'

import Transitions from './Transitions'
import { getAnswersx } from '../../store/answersx/reducer'
import { updateAnswersxAC } from '../../store/answersx/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
     number -- number of the question in <Questions>, 1-based
     question -- { code: 50, text: "question 50" }
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( "TransitionsCT::mapStateToProps()" )

  const {
    number,
    question,
  } = passedProps

  // validation
  if ( !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get previous transitions, if any
  const answers = getAnswersx( state.answersxRD, question.code )
  console.log( `getAnswers(${question.code}): `, answers )
  const previousTransitions = answers.map(answerArray => ({ from: answerArray[0], to: answerArray[1] }))

  console.log('TransitionsCT::previousTransitions: ', previousTransitions);

  return {
    number,
    question,
    previousTransitions,
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
  function filterOutBlanks( transition ) {
    return transition.filter( transitions => ( transitions.from.trim().length + transitions.to.trim().length ) )
  }

  /* *****************************************
     onUpdateStore()

     Save the new transitions to store.  Does NOT persist.

     newTransitions -- array of transitinos
  ******************************************** */
  function onUpdateStore( newTransitions ) {
    console.log( `TransitionsCT::onUpdate(${newTransitions})` );

    const { question } = passedProps

    // store wants 2D array of strings, so map the array of transitions into that format
    const twoDimArrayOfString = filterOutBlanks( newTransitions ).map(transition => [transition.from, transition.to])

    // update store
    dispatch( updateAnswersxAC( question.code, twoDimArrayOfString ) )
  }

  /* *****************************************
     The props being passed down
  ******************************************** */
  const { isDynamic } = passedProps
  return {
    onUpdateStoreCB: onUpdateStore,
    isDynamic,
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Transitions )
