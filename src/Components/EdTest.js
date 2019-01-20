import React from 'react';
import { connect } from 'react-redux';

import NarrativeCT from '../Containers/NarrativeCT'

import {
  Button,
  Form,
} from 'react-bootstrap';

/* **************************************************
   Used to test components during development
***************************************************** */
class EdTest extends React.Component {

  state = {
    ready: false,
  }

  // load the textarea with previousAnswer
  componentDidMount = () => {
    // console.log("Narrative::componentDidMount()");
    // const { previousAnswer } = this.props
    // const elem = document.getElementById('answer')
    // if (previousAnswer) elem.value = previousAnswer
  }

  // set isDirty
  onChange = (e) => {
    // console.log("Narrative::onChange");
    // this.setState({ isDirty: true })
  }

  // Send newAnswer value back to Container to persist
  //   and update Save button to indicate control is no longer dirty
  onSubmit = (e) => {
    // console.log("Narrative::onclickSave");
    // e.preventDefault()
    // const value = e.target.answer.value.trim()
    // console.log("value: ", value)
    // this.setState({ isDirty: false })
    // // this.props.onSaveCB(value)
  }

  // render!
  render() {

    // <Button type = "button" id = "save-button">Load</Button>
    return (
      <Form>
        <Button>Open</Button>
        <p>  </p>
        {this.state.ready &&
          <NarrativeCT question_code = "50" question="When did you...?" previousAnswer="My answer is..." />
        }

      </Form>
    )
  }
}
// <NarrativeCT question_code = "50" question="When did you...?" previousAnswer="My answer is..." />

// <Button>Open</Button>

// {(state.ready &&
//   <NarrativeCT question_code = "50" question="When did you...?" previousAnswer="My answer is..." />)}

// Wrap in container to get access to store
const mapStateToProps = state => {
  console.log("--- state: ", state);
  return {
    isLoading: state.transitionsRD.isLoading,
    state
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EdTest)
