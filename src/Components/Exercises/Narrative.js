import React from 'react'
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap'
import Prompts from '../Framework/Prompts'
import '../../CSS/ModalNavButtons.css'

/* **************************************************
   Narrative component

   Displays a single question with:
     -- multi-line textarea
     -- Save button

   props:
     userId -- integer
     question -- { code: 50, text: "Question 50" }
     prompts -- [] or array of strings with short answers saved by previous exercise
     instructions -- can be empty string
     previousAnswer -- string with the previous answer
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal     onPersistCB(newAnswer) -- callback for when user clicks Save
     onCloseModalCB -- call to close the modal this control resides in
***************************************************** */
export default class Narrative extends React.Component {

  state = {
    isDirty: false,

    // controlled component
    answer: this.props.previousAnswer,
  }

  /* ******************************************************** */
  // set isDirty and controlled answer field
  onChange = ( e ) => {
    console.log( "Narrative::onChange(), e: ", e.target.value )
    this.setState( {
      isDirty: true,
      answer: e.target.value,
    } )
  }

  /* ******************************************************** */
  // update store and persist the value as user could be clicking outside Modal and shitting it down
  onBlur = () => {
    console.log( "Narrative::onBlur()" )
    this.updateAndPersist()
  }

  /* ******************************************************** */
  // helper, update the store and persist
  updateAndPersist = () => {
    console.log( "state: ", this.state )

    this.setState( { isDirty: false } )

    const { onPersistCB, onCloseModalCB, userId } = this.props
    const { answer } = this.state

    onPersistCB( userId, answer )
    onCloseModalCB()
  }

  /* ******************************************************** */
  // Send newAnswer value back to Container to persist
  //   and update Save button to indicate control is no longer dirty
  onSubmit = ( e ) => {
    console.log( `Narrative::onclickSave(): ${this.state.answer}` )
    console.log( "state: ", this.state )
    e.preventDefault()
    this.updateAndPersist()
  }

  /* ******************************************************** */
  // render!
  render() {
    // console.log("Narrative::render()")

    // initialize
    const { question, prompts, instructions, isDynamic } = this.props
    const { answer } = this.state

    if ( !isDynamic ) {
      return (
        <p><i>{answer}</i></p>
      )
    }

    return (
      <>
        <Prompts prompts={prompts} />
        <Form onSubmit={this.onSubmit} >
          <FormGroup>
            {instructions && (
              <p><i>{instructions}</i></p>
            )}
            <ControlLabel>&nbsp;&nbsp;{question.text}</ControlLabel>
            <FormControl
              componentClass="textarea"
              onChange={this.onChange}
              onBlur={this.onBlur}
              value={answer}
              placeholder="Please enter an answer and click Close"
            />
          </FormGroup>
          <div className="text-center">
            <Button className="closeButton" type="submit" style={style.closeButton}>Close</Button>
          </div>
        </Form>
      </>
    )
  }
}
const style = {
  closeButton: {
    marginRight: "auto",
    marginLeft: "auto",
  }
}
