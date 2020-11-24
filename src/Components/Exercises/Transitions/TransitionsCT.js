import { connect } from 'react-redux'

import Transitions from './Transitions'
import { updateAnswersAC } from '../../../store/answers/actions'
import { IDX_FROM, IDX_TO, IDX_TRANSITION } from '../../../constants'
import { getAnswers, hydrater, dehydrater } from '../../../store/answers/reducer'

/* *****************************************
   mapStateToProps()

   passedProps:
     number -- number of the question in <Questions>, 1-based
     question -- { code: 50, text: "question 50" }
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal
******************************************** */
const answerShape = {
  [IDX_FROM]: 'from',
  [IDX_TO]: 'to',
  [IDX_TRANSITION]: 'area'
}

// format answers for checkbox selector
const hydrateAnswer = hydrater(answerShape)

// format item into answer for saving
const dehydrateAnswer = dehydrater(answerShape)

const mapStateToProps = (state, passedProps) => {
  // console.log( "TransitionsCT::mapStateToProps()" )

  const {
    number,
    question,
    isDynamic,
  } = passedProps

  // validation
  if (!question.code) throw new Error('missing question code: ', passedProps.question_code)

  // get previous transitions, if any
  const answers = getAnswers(state.answersRD, question.code)
  console.log(`getAnswers(${question.code}): `, answers)
  const previousTransitions = answers.map(hydrateAnswer)

  // console.log('TransitionsCT::previousTransitions: ', previousTransitions);

  return {
    number,
    question,
    previousTransitions,
    isDynamic,
  }
}

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = (dispatch, passedProps) => {
  // helper function
  function filterOutBlanks(transition) {
    return transition.filter(transitions => (transitions.from.trim().length + transitions.to.trim().length))
  }

  /* *****************************************
     onUpdateStore()

     Save the new transitions to store.  Does NOT persist.

     newTransitions -- array of transitinos
  ******************************************** */
  function onUpdateStore(newTransitions) {
    console.log(`TransitionsCT::onUpdate(${newTransitions})`);

    const { question } = passedProps

    const data = filterOutBlanks(newTransitions).map(dehydrateAnswer)

    dispatch(updateAnswersAC(question.code, data))
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
)(Transitions)
