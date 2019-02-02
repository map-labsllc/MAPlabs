import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import Transition from './Transition'
import '../../CSS/ModalNavButtons.css'

/* **************************************************
   Transitions component

   Displays a single question with:
     -- Add button to add a new space for a transition
     -- <Transition> for each transition

   state:
     Manages the list of transitions in state to provide better UX when adding
       new blank entries (it allows us to be in control of the focus).

   props:
     question -- { code: 50, text: "Question 50" }
     previousTransitions -- [] or array of strings of previous transitions
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal
     onUpdateStoreCB(newTransitions) -- callback to update the store
***************************************************** */
export default class Transitions extends React.Component {

  // -------------------------------------------------------
  // UUID to be used as the component key
  uuid = 1;

  // get new UUID
  getUUID = () => {
    console.log("Transitions::getUUID() returning ", this.uuid + 1)
    return this.uuid++
  }

  // make a new transitionWithKey
  getNewTransitionWithKey = (transition) => ({
    key: this.getUUID(),
    transition,
  })

  // strip keys
  stripKeys = (transitionsWithKeys) => transitionsWithKeys.map(transitionWithKey => transitionWithKey.transition)

  // add keys
  // addKeys = (transitions) => transitions.map(transition => ({ key: this.getUUID() , transition}))
  addKeys = (transitions) => transitions.map((transition) => {
    console.log("addKeys: ", transition)
    return { key: this.getUUID(), transition }
  })
  // -------------------------------------------------------

  state = {
    isDirty: false,
    transitionsWithKeys: this.addKeys(this.props.previousTransitions)
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

    const { onUpdateStoreCB } = this.props
    const { transitionsWithKeys } = this.state

    const newTransitionsWithKeys = transitionsWithKeys.map(transitionWithKey =>
      (transitionWithKey.key === key) ? { key: key, transition: newTransition } : transitionWithKey)

    onUpdateStoreCB(this.stripKeys(newTransitionsWithKeys))
    this.setState({ transitionsWithKeys: newTransitionsWithKeys })
  }

  // **********************************************
  // delete transition from state::transitions and
  //   tell parent to update array of transitions to store
  deleteTransition = (keyToDelete) => {
    console.log(`Transitions::deleteTransition(${keyToDelete})`)

    const { onUpdateStoreCB } = this.props
    const { transitionsWithKeys } = this.state

    const newTransitionsWithKeys = transitionsWithKeys.filter((transitionWithKey) =>
      keyToDelete !== transitionWithKey.key)

    onUpdateStoreCB(this.stripKeys(newTransitionsWithKeys))
    this.setState({ transitionsWithKeys: newTransitionsWithKeys })
  }

  // **********************************************
  // add an empty transition to state::transitions
  onclickAdd = () => {
    console.log(`Transitions::onclickAdd()`)
    const { transitionsWithKeys } = this.state

    const newTransitionsWithKeys = transitionsWithKeys.concat(this.getNewTransitionWithKey({ from: '', to: '' }))
    console.log("newTransitionsWithKeys: ", newTransitionsWithKeys)
    this.setState({ transitionsWithKeys: newTransitionsWithKeys })
  }

  // **********************************************
  // render!
  render() {
    console.log("Transitions::render()")

    const { question, isDynamic } = this.props
    const { transitionsWithKeys } = this.state

    console.log("transitionsWithKeys", transitionsWithKeys)
    console.log("this.props.previousTransitions", this.props.previousTransitions)

    if (!isDynamic) {
      return (
        <>
          {transitionsWithKeys.map((transitionWithKey) =>
            <Transition
              key={transitionWithKey.key}
              id={transitionWithKey.key}
              previousTransition={transitionWithKey.transition}
              isDynamic={isDynamic}
              updateTransitionCB={this.updateTransition}
              deleteTransitionCB={this.deleteTransition}
            >
            </Transition>
          )}
        </>
      )
    }

    return (
      <>
        <div className="text-center">
          <h4>{question.text}</h4>
        </div>
        {transitionsWithKeys.map((transitionWithKey) =>
          <Transition
            key={transitionWithKey.key}
            id={transitionWithKey.key}
            previousTransition={transitionWithKey.transition}
            isDynamic={isDynamic}
            updateTransitionCB={this.updateTransition}
            deleteTransitionCB={this.deleteTransition}
          >
          </Transition>
        )}
        <hr />
        <div className="text-center">
          <Button className="addAnswerButton" type="button" onClick={this.onclickAdd}>Add transition</Button>
        </div>
        <hr />
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

Transitions.propTypes = {
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  previousTransitions: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func,  // required, injected by <Popup>
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
