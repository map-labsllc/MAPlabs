import React from 'react'
import PropTypes from 'prop-types'

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
                  rendering static version in Popup or dynamic verison in Modal
     onPersistCB(newAnswer) -- callback for when user clicks Save
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
  // update store and persist the value as user could be clicking outside Modal and shutting it down
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
  // render!
  render() {
    // console.log("Narrative::render()")

    // initialize
    const { question, prompts, instructions, isDynamic } = this.props
    const { answer } = this.state

    // render static version
    if ( !isDynamic ) {
      return (
        <p>{answer}</p>
      )
    }

    // render dynamic version
    return (
      <>
        <Prompts prompts={prompts} />
        <form onSubmit={this.onSubmit} >
          <div>
            {instructions && (
              <h4>{instructions}</h4>
            )}
            <h2>&nbsp;&nbsp;{question.text}</h2>
            <textarea
              rows="10"
              style={style.contain}
              autoFocus={true}
              placeholder="Please enter an answer and click Close"
              onChange={this.onChange}
              onBlur={this.onBlur}
              value={answer}
              wrap="hard"
              display="block"
            />
          </div>
          <div className="text-center">
            <Button className="closeButton" type="button" style={style.closeButton}>Close</Button>
          </div>
        </form>
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

Narrative.propTypes = {
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  prompts: PropTypes.arrayOf( PropTypes.string ).isRequired,
  instructions: PropTypes.string.isRequired,
  previousAnswer: PropTypes.string.isRequired,
  isDynamic: PropTypes.bool,
  onCloseModalCB: PropTypes.func,  // this is required but injected by <Popup>
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

const style = {
  closeButton: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  contain: {
    width: "100%",
  }
}
