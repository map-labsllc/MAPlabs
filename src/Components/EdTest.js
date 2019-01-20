import React from 'react';
import { connect } from 'react-redux';

import NarrativeCT from '../Containers/NarrativeCT'
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
class EdTest extends React.Component {

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
            <NarrativeCT question_code = "50" question="50 question...?" />
            <hr/>
            <NarrativeCT question_code = "51" question="51 question...?" />
            <hr/>
            <NarrativeCT question_code = "52" question="52 question...?" />
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
  )(EdTest)
