import React from "react"
import PropTypes from "prop-types"
import { Form, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap"
import { UUID } from "../../Utils/UUID"

// legal values for an effect
export const EFFECT_IMPEDIMENT = "impediment"
export const EFFECT_EMBODIMENT = "embodiment"

const bodimentOpts = [
  { key: "0", text: "Embodiment", value: "embodiment" },
  { key: "1", text: "Impediment", value: "impediment" }
]

/* **************************************************
   Strength component

   Displays a single question with:
     -- Selection list of strengthOptions (ex: 'honesty')
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
export default class Strength extends React.Component {
  uuid = new UUID() // provides unique keys for <Strength> components

  state = {
    isDirty: false,
    strength: this.props.previousData.strength,
    broadly: this.props.previousData.broadly,
    reflectionsWithKeys: this.uuid.addKeys(this.props.previousData.reflections),
    phrases: [ { reflection:"", effect:"" } ],
  }

  options = this.props.strengthOptions.map((s, key) => ({ key, text: s, value: s }))

  // **********************************************
  componentDidMount = () => {
    console.log(this.props)
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
    newData.strength = this.state.strength
    newData.broadly = this.state.broadly
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

  onPhraseAddClick = () => {
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
    const { strength, reflections, reflectionsWithKeys } = this.state
    const { isDynamic, strengthOptions } = this.props

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

    return (
      <>
        <Form 
        onSubmit={this.onSubmit} >
          <FormControl
            as="select"
            search="true"
            selection
            placeholder="Select Strength"
            onChange={this.handleDropChange}
            value={strength}
            style={{ margin: "5px" }}
            onBlur={this.onBlur}
          >
            {strengthOptions.map((value, key) => (
              <option key={key} value={value}>
                { value }
              </option>
              )
            )}
          </FormControl>
          <FormControl 
          as="textarea" 
          placeholder="Reflect broadly and generally on this strength." 
          style={{ margin: "10px" }}
          onBlur={this.onBlur}
          />
            { 
              /* if (reflections.length > 0) */
              reflections ? reflections.map((val, idx) => {
              return (
                <div key={idx} >
                <FormControl 
                fluid
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
                id={idx}
                as="select"
                className="select" 
                options={bodimentOpts} 
                onChange={(e) => this.handleEIMChange(e, idx)}
                onBlur={this.onBlur}
                placeholder="Embodiment or Impendiment" 
                />
                </FormGroup>
                <hr className="divider" />
                </div>
              )
              }) : null
            }
          <Button 
          onClick={this.onPhraseAddClick}
          style={{ margin: "10px" }}
          >
          Add Phrase
          </Button>
        </Form>
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

Strength.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  previousData: PropTypes.object.isRequired,
  isDynamic: PropTypes.bool,
  strengthOptions: PropTypes.array,
  onUpdateAnswerCB: PropTypes.func // required, injected by <Popup>
}

