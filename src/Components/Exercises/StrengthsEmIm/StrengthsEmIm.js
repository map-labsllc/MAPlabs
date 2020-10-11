import React from "react"
import PropTypes from "prop-types"
import { Form, FormControl, Dropdown, Button, FormLabel, FormGroup, Container, Col, Row } from "react-bootstrap"
import { listIdToValue } from "../../../store/lists/actions"

import { EFFECT_IMPEDIMENT, EFFECT_EMBODIMENT } from './StrengthsEmImConstants'

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
    strength -- {strength, reflections: []}
     isDynamic -- undefined - render static version in <PopUp>
                  true - render dynamic version <ModalX>
     onUpdateStoreCB() -- callback to update the store
***************************************************** */
export default class StrengthEmIm extends React.Component {
  state = {
    isDirty: false,
    reflections: this.props.reflections,
    phrases: [ { reflection: "", effect: "" } ],
  }

  // **********************************************
  // tell parent to update data to store
  updateData = () => {

    const { strength, onUpdateStoreCB } = this.props

    const newData = {}
    newData.strength = strength
    newData.reflections = this.state.reflections

    console.log(`StrengthEmIm::updateData()`, newData )
    onUpdateStoreCB(newData)
  }

  addReflection = () => {
    let reflections = this.state.reflections || []
    this.setState((prevState) => ({
      reflections: [ ...reflections, { reflection: "", effect: "", id: reflections.length } ],
    }));
  }

  handlePhraseChange = (idx) => {
    return (e) => {
      let reflections = [...this.state.reflections]
    
      reflections[idx].reflection = e.target.value
      this.setState((prevState) => ({
        isDirty: true, 
        reflections 
      }))
      this.updateData()
    }
  }

  handleEIMChange = (idx) => {
    return (e) => {
      let reflections = [...this.state.reflections]
      reflections[idx].effect = e.target.value
      this.setState((prevState) => ({ 
        isDirty: true,
        reflections 
      }))
      this.updateData()
    }
  }

  render() {
    const { reflections } = this.state
    const { strengthValue, strength, number, question, isDynamic } = this.props


    if (!isDynamic) {
      return (
        <>
        { reflections.map((reflection, idx) => (
            <Row key={idx}>
              {/* <Col>{ strengthValue }</Col> */}
              <Col>{ reflections[idx].reflection }</Col>
              <Col>{ reflections[idx].effect }</Col> 
            </Row>
          ))
        }
        </>
      )
    }

    const options= []

    return (
      <Container>
        <h3>{ strengthValue }</h3>
        <Form onSubmit={this.onSubmit} >
          <Container >
            { reflections ? reflections.map((reflection, idx) => {
              return (
                <FormGroup as={Row} key={idx}>
                  <Col md={6}>
                    <FormControl 
                      as="textarea"
                      id={idx}
                      value={reflections[idx].reflection}
                      placeholder='Write about a situation where you were able or unable to use this strength.' 
                      onChange={this.handlePhraseChange(idx)}
                    />
                  </Col>
                  <Col md={2}>
                    <FormControl
                      as="select" 
                      onChange={this.handleEIMChange(idx)}
                      value={reflections[idx].effect}
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

StrengthEmIm.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  strength: PropTypes.string.isRequired,
  relfections: PropTypes.array.isRequired,
  strengthValue: PropTypes.string.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateStoreCB: PropTypes.func 
}
