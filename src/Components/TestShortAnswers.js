import React from 'react';
import { connect } from 'react-redux';

import ShortAnswersCT from '../Containers/ShortAnswersCT'
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
            <ShortAnswersCT
              question = {{ code: 40, text: "ShortAnswers 40 question" }}
              doesHandlePersistence = {{ value: false }}
            />
            <hr/>
            <ShortAnswersCT
              question = {{ code: 41, text: "ShortAnswers 41 question" }}
              doesHandlePersistence = {{ value: true }}
            />
            <hr/>
            <ShortAnswersCT
              question = {{ code: 42, text: "ShortAnswers 42 question" }}
              doesHandlePersistence = {{ value: true }}
            />
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
  )(TestShortAnswers)
