import { connect } from 'react-redux'

import Transitions from './Transitions'
import { getAnswers } from '../../store/answers/reducer'
import { updateAnswersAC } from '../../store/answers/actions'

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
    isDynamic,
  } = passedProps

  // validation
  if ( !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get previous transitions, if any
  const answers = getAnswers( state.answersRD, question.code )
  console.log( `getAnswers(${question.code}): `, answers )
  const previousTransitions = answers.map(answerArray => ({ from: answerArray[0], to: answerArray[1] }))

  console.log('TransitionsCT::previousTransitions: ', previousTransitions);

  return {
    number,
    question,
    previousTransitions,
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
)( Transitions )
