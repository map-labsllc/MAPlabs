import React from "react"
import PropTypes from "prop-types"
// import { Button } from "react-bootstrap"
import { Form, Dropdown, TextArea, Select, Button, Label, Input, Divider } from "semantic-ui-react"
import "../../CSS/ModalNavButtons.css"
import { UUID } from "../Utils/UUID"

// legal values for an effect
export const EFFECT_IMPEDIMENT = "impediment"
export const EFFECT_EMBODIMENT = "embodiment"

const options = [
  {
    key: "0",
    text: "Appreciation of beauty and excellence",
    value: "appreciation of beauty and excellence"
  },
  { key: "1", text: "Bravery", value: "bravery" },
  { key: "2", text: "Creativity", value: "creativity" },
  { key: "3", text: "Curiosity", value: "curiosity" },
  { key: "4", text: "Fairness", value: "fairness" },
  { key: "5", text: "Forgiveness", value: "forgiveness" },
  { key: "6", text: "Gratitude", value: "gratitude" },
  { key: "7", text: "Honesty", value: "honesty" },
  { key: "8", text: "Hope", value: "hope" },
  { key: "9", text: "Humility", value: "humility" },
  { key: "10", text: "Humor", value: "humor" },
  { key: "11", text: "Judgment", value: "judgment" },
  { key: "12", text: "Kindness", value: "kindness" },
  { key: "13", text: "Leadership", value: "leadership" },
  { key: "14", text: "Love", value: "love" },
  { key: "15", text: "Love of learning", value: "love of learning" },
  { key: "16", text: "Perseverance", value: "perseverance" },
  { key: "17", text: "Perspective", value: "perspective" },
  { key: "18", text: "Prudence", value: "prudence" },
  { key: "19", text: "Self-regulation", value: "self-regulation" },
  { key: "20", text: "Social intelligence", value: "social intelligence" },
  { key: "21", text: "Spirituality", value: "spirituality" },
  { key: "22", text: "Teamwork", value: "teamwork" },
  { key: "23", text: "Zest", value: "zest" }
]

const bodimentOpts = [
  { key: "0", text: "Embodiment", value: "em" },
  { key: "1", text: "Impediment", value: "im" }
]

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
    reflectionsWithKeys: this.uuid.addKeys(this.props.previousData.reflections),
    phrases: [ { reflection:"", effect:"" } ],
  }

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
    const { strength, reflections } = this.state
    const { isDynamic } = this.props
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

    return (
      <>
        <Form 
        onSubmit={this.onSubmit} >
          <Dropdown
            name="strength"
            search
            selection
            options={options}
            placeholder="Select Strength"
            onChange={this.handleDropChange}
            value={strength}
            style={{ margin: "5px" }}
            onBlur={this.onBlur}
          />
          <TextArea 
          placeholder="Reflect broadly and generally on this strength." 
          style={{ margin: "10px" }}
          onBlur={this.onBlur}
          />
            { 
              /* if (reflections.length > 0) */
              reflections ? reflections.map((val, idx) => {
              return (
                <div key={idx} >
                <Input 
                fluid
                className="reflection" 
                id={idx} 
                placeholder='Write about a situation where you were able or unable to use this strength.' 
                onChange={this.handlePhraseChange}
                onBlur={this.onBlur}
                style={{ margin: "10px" }}
                />
                <Form.Field style={{ margin: "10px" }}>
                <Label pointing="below" >Define the above sitation by Embodiment (if you were able) or Impediment (if you were unable).</Label>
                <Select 
                id={idx}
                className="select" 
                options={bodimentOpts} 
                onChange={(e) => this.handleEIMChange(e, idx)}
                onBlur={this.onBlur}
                placeholder="Embodiment or Impendiment" 
                />
                </Form.Field>
                <Divider />
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

StrengthX.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  previousData: PropTypes.object.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func // required, injected by <Popup>
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
