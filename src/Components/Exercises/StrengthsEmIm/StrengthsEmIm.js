import React from "react"
import PropTypes from "prop-types"
import { Form, FormControl, Dropdown, Button, FormLabel, FormGroup, Container, Col, Row } from "react-bootstrap"
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
  state = {
    isDirty: false,
    strength: this.props.strength,
    reflections: this.props.previousData.reflections,
    phrases: [ { reflection: "", effect: "" } ],
  }

  // **********************************************
  // tell parent to update data to store
  updateData = () => {
    console.log(`Strength::updateData()`)

    const { onUpdateStoreCB } = this.props

    const newData = {}
    newData.strength = this.state.strength
    newData.reflections = this.state.reflections

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

  addReflection = () => {
    let reflections = this.state.reflections || []
    this.setState((prevState) => ({
      reflections: [ ...reflections, { reflection: "", effect: "", id: reflections.length } ],
    }));
  }

  handlePhraseChange = (e, idx) => {
    let reflections = [...this.state.reflections]
    
    reflections[idx].reflection = e.target.value
    this.setState((prevState) => ({
      isDirty: true, 
      reflections 
    }))
    this.updateData()
  }

  handleEIMChange = (e, idx) => {
    let reflections = [...this.state.reflections]
    reflections[idx].effect = e.target.value
    this.setState((prevState) => ({ 
      isDirty: true,
      reflections 
    }))
    this.updateData()
  }


  // **********************************************
  // render!
  render() {
    console.log("StrengthsEmIm::render()")
    const { reflections } = this.state
    const { strength, number, question, isDynamic } = this.props

    console.log("reflections", reflections)
    console.log("this.props.previousData", this.props.previousData)

    if (!isDynamic) {
      return (
        <>
        { reflections.map((reflection, idx) => (
            <Row key={idx}>
              <Col>{ reflection.reflection }</Col>
              <Col>{ reflection.effect }</Col> 
            </Row>
          ))
        }
        </>
      )
    }

    const options= []

    return (
      <Container>
        <h3>{ strength }</h3>
        <Form onSubmit={this.onSubmit} >
          <Container >
            { reflections ? reflections.map((reflection, idx) => {
              return (
                <FormGroup as={Row} key={idx}>
                  <Col md={6}>
                    <FormControl 
                      as="textarea"
                      id={idx}
                      value={reflection.phrase}
                      placeholder='Write about a situation where you were able or unable to use this strength.' 
                      onChange={(e) => this.handlePhraseChange(e, idx)}
                      onBlur={this.onBlur}
                    />
                  </Col>
                  <Col md={2}>
                    <FormControl
                      as="select" 
                      onChange={(e) => this.handleEIMChange(e, idx)}
                      onBlur={this.onBlur}
                      placeholder="Embodiment or Impendiment" 
                      value={reflection.effect}
                    >
                      <option>-- select --</option>
                      <option key={EFFECT_EMBODIMENT} value={EFFECT_EMBODIMENT}>{EFFECT_EMBODIMENT}</option>
                      <option key={EFFECT_IMPEDIMENT} value={EFFECT_IMPEDIMENT}>{EFFECT_IMPEDIMENT}</option>
                    </FormControl>                                     
                  </Col>
                </FormGroup>
              )
              }) : null
            }
          </Container>

          <Button onClick={this.addReflection} >
            Add Reflection
          </Button>

        </Form>
      </Container>
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
