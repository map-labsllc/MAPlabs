import React from "react"
import PropTypes from "prop-types"
import { Form, FormControl, Dropdown, Button, FormLabel, FormGroup } from "react-bootstrap"
import { UUID } from "../../Utils/UUID"

// legal values for an effect
export const EFFECT_IMPEDIMENT = "impediment"
export const EFFECT_EMBODIMENT = "embodiment"

/* **************************************************
   Strength component
   Displays a single question with:
     -- Selection list of strengths (ex: 'honesty')
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
export default class StrengthEmim extends React.Component {
  uuid = new UUID() // provides unique keys for <StrengthEmim> components

  state = {
    isDirty: false,
    strength: this.props.previousData.strength,
    reflectionsWithKeys: this.uuid.addKeys(this.props.previousData.reflections),
    phrases: [ { reflection:"", effect:"" } ],
  }

  // **********************************************
  // tell parent to update data to store
  updateData = () => {
    console.log(`Strength::updateData()`)

    const { onUpdateStoreCB } = this.props

    const newData = {}
    newData.strength = this.state.strength
    newData.reflections = this.uuid.stripKeys(this.state.reflectionsWithKeys)
    onUpdateStoreCB(newData)
  }

  onBlur = () => {
    const { isDirty } = this.state
    if (isDirty) {
      this.updateData()
      this.setState({
        isDirty: false
      })
    }
  }

  handleDropChange = (e, { value }) => this.setState({ strength: value })

  addReflection = () => {
    if(this.state.reflections){
    this.setState((prevState) => ({
      reflections: [ ...prevState.reflections, { reflection: "", effect: "" } ],
    }));
  } else {
    this.setState((prevState) => ({
      reflections: [ { reflection: "", effect: "" } ],
    }));
  }
  }

  handlePhraseChange = (e) => {
    console.log(this.state)
    let reflections = [...this.state.reflections]
    reflections[e.target.id].reflection = e.target.value
    this.setState((prevState) => ({
      isDirty: true, 
      reflections 
    }))
  }

  handleEIMChange = (e, idx) => {
    let reflections = [...this.state.reflections]
    reflections[idx].effect = e.target.value
    this.setState((prevState) => ({ 
      isDirty: true,
      reflections 
    }))
  }


  // **********************************************
  // render!
  render() {
    console.log("Strength::render()")
    const { strength, reflections } = this.state
    const { number, question, isDynamic } = this.props
    const { reflectionsWithKeys } = this.state

    console.log("reflectionsWithKeys", reflectionsWithKeys)
    console.log("this.props.previousData", this.props.previousData)

    if (!isDynamic) {
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

    const options= [] // TODO FIX...display each strength already determined in previous exercise
    return (
      <>
        <Form 
        onSubmit={this.onSubmit} >
          {/* <Dropdown
            name="strength"
            search
            selection
            options={options}
            placeholder="Select Strength"
            onChange={this.handleDropChange}
            value={strength}
            style={{ margin: "5px" }}
            onBlur={this.onBlur}
          /> */}
            { 
              /* if (reflections.length > 0) */
              reflections ? reflections.map((val, idx) => {
              return (
                <div key={idx} >
                <FormControl 
                fluid="true"
                className="reflection" 
                id={idx} 
                placeholder='Write about a situation where you were able or unable to use this strength.' 
                onChange={this.handlePhraseChange}
                onBlur={this.onBlur}
                style={{ margin: "10px" }}
                />
                <FormGroup style={{ margin: "10px" }}>
                  <FormLabel pointing="below" >Define the above sitation by Embodiment (if you were able) or Impediment (if you were unable).</FormLabel>

                  <FormControl
                  as="select" 
                  id={idx} 
                  onChange={(e) => this.handleEIMChange(e, idx)}
                  placeholder="Embodiment or Impendiment" 
                  >
                  <option>-- select --</option>
                  <option key={EFFECT_EMBODIMENT} value={EFFECT_EMBODIMENT}>{EFFECT_EMBODIMENT}</option>
                  <option key={EFFECT_IMPEDIMENT} value={EFFECT_IMPEDIMENT}>{EFFECT_IMPEDIMENT}</option>
                  </FormControl>
                </FormGroup>
                <hr />
                </div>
              )
              }) : null
            }
          <Button 
          onClick={this.addReflection}
          style={{ margin: "10px" }}
          >
          Add Reflection
          </Button>
        </Form>
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

StrengthEmim.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  previousData: PropTypes.object.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func // required, injected by <Popup>
}
