import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap'
import Prompts from '../../Framework/Prompts'
import MultiLineString from '../../Utils/MultiLineString'
import '../../../CSS/ModalNavButtons.css'

/* **************************************************
   Narrative component

   Displays a single question with:
     -- multi-line textarea
     -- Save button

   props:
     userId -- integer
     question -- { code: 50, text: "Question 50" }
     prompts -- [] or 2D array of strings with short answers saved by prior exercise
                    [ [ 'prompt1' ], ['prompt2'] ]
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
    this.setState( {
      isDirty: true,
      answer: e.target.value,
    } )
  }

  /* ******************************************************** */
  // update store and persist the value as user could be clicking outside Modal and shutting it down
  onBlur = () => {
    this.updateAndPersist()
  }

  /* ******************************************************** */
  // helper, update the store and persist
  updateAndPersist = () => {

    this.setState( { isDirty: false } )

    const { onPersistCB, onCloseModalCB, userId } = this.props
    const { answer } = this.state

    onPersistCB( userId, answer )
    onCloseModalCB()
  }

  /* ******************************************************** */
  render() {

    // initialize
    const { question, prompts, instructions, isDynamic } = this.props
    const { answer } = this.state

    // static render
    if ( !isDynamic ) {
        return (
          <MultiLineString str={answer} />   
        )
      }

    // render dynamic version
    return (
      <>
        <form onSubmit={this.onSubmit} >
          <div>
            {instructions && (
              <p className="text-left">{instructions}</p>
            )}
            <Prompts prompts={prompts}/>
            {/* <h4>{question.text}</h4> */}

            {/* TODO refactor */}
            <textarea
              rows="10"
              style={style.contain}
              autoFocus={true}
              placeholder="Please enter an answer and click Save"
              onChange={this.onChange}
              onBlur={this.onBlur}
              value={answer}
              wrap="hard"
              display="block"
            />
          </div>
          <div className="text-center">
            <Button className="closeButton btn"  type="button" style={style.closeButton}>Save</Button>
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
  prompts: PropTypes.arrayOf( PropTypes.array ).isRequired,
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
