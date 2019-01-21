import React from 'react';
import { connect } from 'react-redux';

import NarrativeCT from '../Containers/NarrativeCT'
import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'

import {
  Button,
  Form,
} from 'react-bootstrap';

/* **************************************************
   Used to test components during development
***************************************************** */
class TestNarratives extends React.Component {

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
            <NarrativeCT question={{ code: 50, text: "Narrative 50 question" }} />
            <hr/>
            <NarrativeCT question={{ code: 51, text: "Narrative 51 question" }} />
            <hr/>
            <NarrativeCT question={{ code: 52, text: "Narrative 52 question" }} />
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
    isLoading: state.answersRD.isLoading || state.transitionsRD.isLoading,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TestNarratives)
