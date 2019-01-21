import React from 'react';
import { connect } from 'react-redux';

import QuestionCT from '../Containers/QuestionCT'
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
class TestQuestions extends React.Component {

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
            <QuestionCT question_code = "40" question="40 question...?" />
            <hr/>
            <QuestionCT question_code = "41" question="41 question...?" />
            <hr/>
            <QuestionCT question_code = "42" question="42 question...?" />
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
  )(TestQuestions)
