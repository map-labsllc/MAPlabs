import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, FormControl, Button, ButtonGroup, FormGroup, Container, Col, Row
} from 'react-bootstrap'

import { EFFECT_IMPEDIMENT, EFFECT_EMBODIMENT } from '../../../constants'

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
  }

  // **********************************************
  // tell parent to update data to store
  updateData = () => {
    const { strength, onUpdateStoreCB } = this.props

    const newData = {}
    newData.strength = strength
    newData.reflections = this.state.reflections

    console.log('StrengthEmIm::updateData()', newData)
    onUpdateStoreCB(newData)
  }

  addReflection = () => {
    const reflections = this.state.reflections || []
    this.setState((prevState) => ({
      reflections: [...reflections, { reflection: '', effect: EFFECT_EMBODIMENT, id: reflections.length }],
    }));
  }

  handlePhraseChange = (idx) => (e) => {
    const reflections = [...this.state.reflections]

    reflections[idx].reflection = e.target.value
    this.setState((prevState) => ({
      isDirty: true,
      reflections
    }))
    this.updateData()
  }

  handleEIMChange = (idx) => (effect) => {
    const reflections = [...this.state.reflections]
    reflections[idx].effect = effect
    console.log('setting effect', idx, effect)
    this.setState((prevState) => ({
      isDirty: true,
      reflections
    }))
    this.updateData()
  }

  render() {
    const { reflections } = this.state
    const { strengthValue, isDynamic } = this.props

    if (!isDynamic) {
      return (
        <>
          { reflections.map((reflection, idx) => (
            <Row key={idx}>
              <Col md={1}></Col>
              <Col md={3}>{ reflections[idx].reflection }</Col>
              <Col md={3}>{ reflections[idx].effect }</Col>
            </Row>
          ))
          }
        </>
      )
    }

    return (
      <Container>
        <h3>{ strengthValue }</h3>
        <Form onSubmit={this.onSubmit} >
          <Container >
            { reflections ? reflections.map((reflection, idx) => {
              const btnStyleEm = reflections[idx].effect === EFFECT_EMBODIMENT ? 'btn-fill' : ''
              const btnStyleIm = reflections[idx].effect === EFFECT_IMPEDIMENT ? 'btn-fill' : ''

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
                  <Col md={4}>
                    <ButtonGroup>
                      <Button
                        onClick = { () => { this.handleEIMChange(idx)(EFFECT_EMBODIMENT) } }
                        className = { btnStyleEm }
                      >
                        <strong>{ EFFECT_EMBODIMENT }</strong>
                      </Button>

                      <Button
                        onClick = { () => { this.handleEIMChange(idx)(EFFECT_IMPEDIMENT) } }
                        className = { btnStyleIm }
                      >
                        <strong>{ EFFECT_IMPEDIMENT }</strong>
                      </Button>
                    </ButtonGroup>
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

StrengthEmIm.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  strength: PropTypes.string.isRequired,
  reflections: PropTypes.array.isRequired,
  strengthValue: PropTypes.string.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateStoreCB: PropTypes.func
}
