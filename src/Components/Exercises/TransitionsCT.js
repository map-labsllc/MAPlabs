import { connect } from 'react-redux'

import Transitions from './Transitions'
import { getTransitions } from '../../store/transitions/reducer'
import { updateTransitionsAC } from '../../store/transitions/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
     question -- { code: 50, text: "question 50" }
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( "TransitionsCT::mapStateToProps()" )

  const {
    question,
  } = passedProps

  // validation
  if ( !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get previous transitions, if any
  const transitions = getTransitions( state.transitionsRD, question.code )
  console.log( `getTransitions(${question.code}): `, transitions )
  const previousTransitions = transitions

  console.log('TransitionsCT::previousTransitions: ', previousTransitions);

  return {
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

    // save to store
    dispatch( updateTransitionsAC( question.code, filterOutBlanks( newTransitions ) ) )
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
