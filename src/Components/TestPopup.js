import React from 'react';
import { connect } from 'react-redux';

import Popup from '../Components/Popup'
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
class TestPopup extends React.Component {

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

  // render!
  render() {

    const isLoading = this.props.isLoading

    const questions1 = [
      { code: 40, text: "ShortAnswers 40 question" },
      { code: 41, text: "ShortAnswers 41 question" },
    ]
    const questions2 = [

      { code: 42, text: "ShortAnswers 42 question" },
    ]

    return (
      <>
        <p>{((isLoading) ? "loading...." : ""  )}</p>
        {!isLoading && (
          <>
            <Popup title = "Section One" questions = {questions1} />
            <hr />
            <Popup title = "Section Two" questions = {questions2} />
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
  )(TestPopup)
