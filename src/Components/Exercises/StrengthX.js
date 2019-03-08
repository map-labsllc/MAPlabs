import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import '../../CSS/ModalNavButtons.css'
import { UUID } from '../Utils/UUID'

// legal values for an effect
export const EFFECT_IMPEDIMENT = 'impediment'
export const EFFECT_EMBODIMENT = 'embodiment'

/* **************************************************
   Strength component

   Displays a single question with:
     -- Selection list of strengths (ex: 'honesty')
     -- Text control for thinking 'broadly' about strength
     -- <Phrase> for each reflection (a phrase and its effect)
     -- TODO: OR PUT THIS IN <PHRASES>:  Add button to add a new reflection (phrase/effect)

   state:
     Manage the strength, the 'broadly' text, and list of reflections (phrase/effect)
     TODO: OR PUT THE LIST OF REFLECTIONS IN <PHRASES>

   props:
     number -- number of the question in <Questions> when isDynamic, 1-based
     question -- { code: 50, text: "Question 50" }
     previousData --  {
                        strength: "honest",
                        broadly: "broad thoughts",
                        reflections: [ { reflection: "str", effect: "impediment/embodiment" }, {...} ]
                      }
     isDynamic -- undefined - render static version in <PopUp>
                  true - render dynamic version <ModalX>
     onUpdateStoreCB() -- callback to update the store
***************************************************** */
export default class StrengthX extends React.Component {

  uuid = new UUID() // provides unique keys for <StrengthX> components

  state = {
    isDirty: false,
    strength: this.props.previousData.strength,
    broadly: this.props.previousData.broadly,
    reflectionsWithKeys: this.uuid.addKeys(this.props.previousData.reflections)
  }

  // **********************************************
  componentDidMount = () => {
    // add an initial blank entry if there are no previous entries
    // const { previousData } = this.props
    // TODO: NEED TO ADD THIS TO <Phrases>:  if (previousData.reflections.length === 0) this.onclickAdd()
  }

  // **********************************************
  // tell parent to update data to store
  updateData = () => {
    console.log(`Strength::updateData()`)

    const { onUpdateStoreCB } = this.props

    const newData = {}
    newData.strength    = this.state.strength
    newData.broadly     = this.state.broadly
    newData.reflections = this.uuid.stripKeys(this.state.reflectionsWithKeys)

    onUpdateStoreCB(newData)
  }

  // **********************************************
  // render!
  render() {
    console.log("Strength::render()")

    const { number, question, isDynamic } = this.props
    const { reflectionsWithKeys } = this.state

    console.log("reflectionsWithKeys", reflectionsWithKeys)
    console.log("this.props.previousData", this.props.previousData)

    if ( !isDynamic ) {

      return (
        <>
          <p>STATIC data, should call Phrases components so they can render</p>
          <p>this.state:</p>
          <p>- strength: {this.state.strength}</p>
          <p>- broadly: {this.state.broadly}</p>
          <p>- reflections: </p>
          <p>{JSON.stringify(this.state.reflectionsWithKeys)}</p>
        </>
      )
    }

    return (
      <>
        <p>{number}. DYNAMIC  data</p>
        <Button onClick={this.updateData}>update store</Button>
        <p>this.state:</p>
        <p>- strength: {this.state.strength}</p>
        <p>- broad thought: {this.state.broadly}</p>
        <p>- reflections: </p>
        <p>{JSON.stringify(this.state.reflectionsWithKeys)}</p>
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

StrengthX.propTypes = {
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  previousData: PropTypes.object.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func,  // required, injected by <Popup>
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
