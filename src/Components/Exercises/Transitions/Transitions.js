import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import Transition from './Transition'
import '../../../CSS/ModalNavButtons.css'

import { UUID } from '../../Utils/UUID'

/* **************************************************
   Transitions component

   Displays a single question with:
     -- Add button to add a new space for a transition
     -- <Transition> for each transition

   state:
     Manages the list of transitions in state to provide better UX when adding
       new blank entries (it allows us to be in control of the focus).

   props:
     number -- number of the question in <Questions>, 1-based
     question -- { code: 50, text: "Question 50" }
     previousTransitions -- [] or array of strings of previous transitions
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal
     onUpdateStoreCB(newTransitions) -- callback to update the store
***************************************************** */
export default class Transitions extends React.Component {
  uuid = new UUID() // provides unique keys for <Transition> components

  state = {
    isDirty: false,
    transitionsWithKeys: this.uuid.addKeys(this.props.previousTransitions)
  }

  // **********************************************
  componentDidMount = () => {
    // add an initial blank entry if there are no previous entries
    const { previousTransitions } = this.props
    if (previousTransitions.length === 0) this.onclickAdd()
  }

  // **********************************************
  // tell parent to update array of transitions to store
  updateTransition = (key, newTransition) => {
    console.log(`Transitions::updateTransition(${key}, ${newTransition})`)

    const { onUpdateStoreCB, question } = this.props
    const { transitionsWithKeys } = this.state

    // add transition area here
    const area = question.text

    const newTransitionsWithKeys = transitionsWithKeys.map(transitionWithKey => ((transitionWithKey.key === key) ? { key, item: { area, ...newTransition } } : transitionWithKey))

    onUpdateStoreCB(this.uuid.stripKeys(newTransitionsWithKeys))
    this.setState({ transitionsWithKeys: newTransitionsWithKeys })
  }

  // **********************************************
  // delete transition from state::transitions and
  //   tell parent to update array of transitions to store
  deleteTransition = (keyToDelete) => {
    console.log(`Transitions::deleteTransition(${keyToDelete})`)

    const { onUpdateStoreCB } = this.props
    const { transitionsWithKeys } = this.state

    const newTransitionsWithKeys = transitionsWithKeys.filter((transitionWithKey) => keyToDelete !== transitionWithKey.key)

    onUpdateStoreCB(this.uuid.stripKeys(newTransitionsWithKeys))
    this.setState({ transitionsWithKeys: newTransitionsWithKeys })
  }

  // **********************************************
  // add an empty transition to state::transitions
  onclickAdd = () => {
    // console.log(`Transitions::onclickAdd()`)
    const { transitionsWithKeys } = this.state

    const newTransitionsWithKeys = transitionsWithKeys.concat(this.uuid.getNewItemWithKey({ from: '', to: '' }))
    // console.log("newTransitionsWithKeys: ", newTransitionsWithKeys)
    this.setState({ transitionsWithKeys: newTransitionsWithKeys })
  }

  // **********************************************
  // render!
  render() {
    // console.log("Transitions::render()")

    const { number, question, isDynamic, onSubComponentChange } = this.props
    const { transitionsWithKeys } = this.state

    // console.log("transitionsWithKeys", transitionsWithKeys)
    // console.log("this.props.previousTransitions", this.props.previousTransitions)

    if (!isDynamic) {
      return (
        <>
          {transitionsWithKeys.map((transitionWithKey) => <Transition
            key={transitionWithKey.key}
            id={transitionWithKey.key}
            transition={transitionWithKey.item}
            isDynamic={isDynamic}
            updateTransitionCB={this.updateTransition}
            deleteTransitionCB={this.deleteTransition}
            onSubComponentChange={onSubComponentChange}
          >
          </Transition>)}
        </>
      )
    }

    return (
      <>
        <div className="text-center">
          <h4>{number}. {question.text}</h4>
        </div>
        {transitionsWithKeys.map((transitionWithKey) => <Transition
          key={transitionWithKey.key}
          id={transitionWithKey.key}
          transition={transitionWithKey.item}
          isDynamic={isDynamic}
          updateTransitionCB={this.updateTransition}
          deleteTransitionCB={this.deleteTransition}
          onSubComponentChange={onSubComponentChange}
        >
        </Transition>)}
        <div className="text-center">
          <Button className="addAnswerButton" type="button" onClick={this.onclickAdd}>Add Transition</Button>
        </div>
        <hr />
      </>
    )
  }
}

/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////

Transitions.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  previousTransitions: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  onSubComponentChange: PropTypes.func,
}

/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
