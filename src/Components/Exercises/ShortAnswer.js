import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Glyphicon
} from 'react-bootstrap'

/* **************************************************
   ShortAnswer component

   Displays a single question with:
     -- A single short answer
     -- Delete button

   props:
     id -- integer id for the question (poorman's UUID)
     previousAnswer -- string of previous answer
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal
     updateAnswerCB(newAnswer) -- callback for when user moves off on the field
     deleteAnswerCB -- callback when user clicks the Delete button
***************************************************** */
export default class ShortAnswer extends React.Component {

  state = {
    isDirty: false,

    // controlled component
    answer: this.props.previousAnswer,
  }

  // **************************************************
  // set isDirty and control answer field
  onChange = (e) => {
    // console.log("ShortAnswer::onChange(), e: ", e.target.value);
    this.setState({
      isDirty: true,
      answer: e.target.value,
    })
  }

  // **************************************************
  // pass to parent to update value and clear isDirty
  onBlur = (e) => {
    console.log("ShortAnswer::onBlur(), e: ", e.target.value)
    const { updateAnswerCB, id } = this.props
    const { isDirty } = this.state
    if (isDirty) {
      updateAnswerCB(id, e.target.value)
      this.setState({
        isDirty: false,
      })
    }
  }

  // **************************************************
  // pass to parent to delete
  onclickDelete = () => {
    console.log("ShortAnswer::onclickDelete()")
    const { deleteAnswerCB, id } = this.props
    deleteAnswerCB(id)
  }

  // **************************************************
  // render!
  render() {
    console.log("ShortAnswer::render()")

    // initialize
    let { answer, isDirty } = this.state
    const { id, isDynamic } = this.props

    if (!isDynamic) {
      return (
        <p>{answer}</p>
      )
    }

    return (
      <div>
        <br />
        <Form inline onSubmit={this.onSubmit}>
          <div >

            <textarea
              autoFocus={true}
              onChange={this.onChange}
              onBlur={this.onBlur}
              value={answer}
              placeholder="Please enter an answer"
              rows="2"
              cols="50"
            />
            {"   "}
            <Button style={style.inline} type="button" onClick={this.onclickDelete}><Glyphicon glyph="trash"></Glyphicon></Button>

          </div>
        </Form>
      </div>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

ShortAnswer.propTypes = {
  id: PropTypes.number.isRequired,
  previousAnswer: PropTypes.string.isRequired,
  isDynamic: PropTypes.bool,
  updateAnswerCB: PropTypes.func.isRequired,
  deleteAnswerCB: PropTypes.func.isRequired,
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

const style = {
  inline: {
    verticalAlign: "top",
    display: "inline",
    marginLeft: "1%"
  }
}
