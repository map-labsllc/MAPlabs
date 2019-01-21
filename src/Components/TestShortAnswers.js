import React from 'react';
import { connect } from 'react-redux';

import ShortAnswersCT from '../Containers/ShortAnswersCT'
import {
  loadAllAnswersAC,
  updateAnswersAC,
  persistAnswersAC } from '../store/answers/actions'
import {
  loadAllTransitionsAC,
  updateTransitionsAC,
  persistTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'

import {
  Button,
  Form,
} from 'react-bootstrap';

/* **************************************************
   Used to test components during development
***************************************************** */
class TestShortAnswers extends React.Component {

  state = {
    ready: false,
  }

  // load user data
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(loadAllAnswersAC());
    dispatch(loadAllTransitionsAC());
    dispatch(loadAllStaticdataAC());
  }


  // render!
  render() {

    const isLoading = this.props.isLoading

    return (
      <>
        <p>{((isLoading) ? "loading...." : ""  )}</p>
        {!isLoading && (
          <>
            <ShortAnswersCT question_code = "40" question="ShortAnswers 40 question" />
            <hr/>
            <ShortAnswersCT question_code = "41" question="ShortAnswers 41 question" />
            <hr/>
            <ShortAnswersCT question_code = "42" question="ShortAnswers 42 question" />
          </>
        )}
      </>
    )
  }
}

// Wrap in container to get access to store and dispatch
const mapStateToProps = state => {
  console.log("--- state: ", state);
  return {
    isLoading: state.answersRD.isLoading && state.transitionsRD.isLoading,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TestShortAnswers)
