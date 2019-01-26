import React from 'react'
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap'

/* **************************************************
   Transition component

   Displays a single question with:
     -- A single transition
     -- Delete button

   props:
     id -- integer id for the question (poorman's UUID)
     previousTransition -- previous transition
     updateTransitionCB(newTransition) -- callback for when user moves off on the field
     deleteTransitionCB -- callback when user clicks the Delete button
***************************************************** */
export default class Transition extends React.Component {

  state = {
    isDirty: false,

    // controlled component
    transition: this.props.previousTransition,
  }

  // **************************************************
  // set isDirty and update state with new transition.from
  onChangeFrom = ( e ) => {
    // console.log("Transition::onChangeFrom(), e: ", e.target.value);

    const newTransition = { ...this.state.transition }
    newTransition.from = e.target.value

    this.setState( {
      isDirty: true,
      transition: newTransition,
    } )
  }

  // **************************************************
  // set isDirty and update state with new transition.to
  onChangeTo = ( e ) => {
    // console.log("Transition::onChangeTo(), e: ", e.target.value);

    const newTransition = {...this.state.transition}
    newTransition.to = e.target.value

    this.setState( {
      isDirty: true,
      transition: newTransition,
    } )
  }


  // **************************************************
  // pass to parent to update value and clear isDirty
  onBlur = ( e ) => {
    console.log( "Transition::onBlur(), e: ", e.target.value )
    const { updateTransitionCB, id } = this.props
    const { isDirty, transition } = this.state
    if ( isDirty ) {
      updateTransitionCB( id, transition )
      this.setState( {
        isDirty: false,
      } )
    }
  }

  // **************************************************
  // pass to parent to delete
  onclickDelete = () => {
    console.log( "Transition::onclickDelete()" )
    const { deleteTransitionCB, id } = this.props
    deleteTransitionCB( id )
  }

  // **************************************************
  // render!
  render() {
    console.log( "Transition::render()" )

    // initialize
    let { transition, isDirty } = this.state
    const { id } = this.props

    return (
      <Form inline onSubmit={this.onSubmit}>
        <FormGroup>
          <Button type = "button" onClick={this.onclickDelete}>del</Button>
          {' '}
          <FormControl
            type = "text"
            onChange = {this.onChangeFrom}
            onBlur = {this.onBlur}
            value = {transition.from}
            placeholder = "Please enter a from"
          />
          <FormControl
            type = "text"
            onChange = {this.onChangeTo}
            onBlur = {this.onBlur}
            value = {transition.to}
            placeholder = "Please enter a to"
          />
          {` `}{id}{` `}{( isDirty ? 'dirty' : '' )}
        </FormGroup>
      </Form>
    )
  }
}
