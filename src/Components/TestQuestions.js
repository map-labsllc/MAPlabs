import React from 'react';
import { connect } from 'react-redux';

import QuestionsCT from '../Containers/QuestionsCT'
import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'
import { getUser } from '../store/user/reducer'

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
    const { dispatch, userId } = this.props;
    dispatch(loadAllAnswersAC(userId));
    dispatch(loadAllTransitionsAC(userId));
    dispatch(loadAllStaticdataAC());
  }

  // use clicked in child to close the modal
  onCloseModal = () => {
    console.log("TestQuestions::onCloseModal()");

    // do the stuff
  }

  // render!
  render() {

    const isLoading = this.props.isLoading

    const questions = [
      { code: 40, text: "ShortAnswers 40 question" },
      { code: 41, text: "ShortAnswers 41 question" },
      { code: 42, text: "ShortAnswers 42 question" },
    ]

    return (
      <>
        <p>{((isLoading) ? "loading...." : ""  )}</p>
        {!isLoading && (
          <>
            <QuestionsCT
              questions = {questions}
              onCloseModalCB = {this.onCloseModal}
            />
          </>
        )}
      </>
    )
  }
}

// Wrap in container to get access to store and dispatch
const mapStateToProps = state => {
  return {
    isLoading: state.answersRD.isLoading || state.transitionsRD.isLoading,
    userId: getUser(state.userRD).user_id,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TestQuestions)
