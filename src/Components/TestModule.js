import React from 'react';
import { connect } from 'react-redux';

import Module from '../Components/Module'
import Section from '../Components/Section'
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
class TestModule extends React.Component {

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

  questions1 = [
    { code: 40, text: "ShortAnswers 40 question" },
    { code: 41, text: "ShortAnswers 41 question" },
    { code: 42, text: "ShortAnswers 42 question" },
  ]
  questions2 = [
    { code: 41, text: "ShortAnswers 41 question" },
    { code: 42, text: "ShortAnswers 42 question" },
  ]

  excercise1 = (<QuestionsCT questions = {this.questions1} onCloseModalCB = "unk" />)
  excercise2 = (<QuestionsCT questions = {this.questions2} onCloseModalCB = "unk" />)

  // render!
  render() {

    const isLoading = this.props.isLoading

    return (
      <>
        <p>{((isLoading) ? "loading...." : ""  )}</p>
        {!isLoading && (
          <>
            <Module moduleNum = "1" moduleTitle = "Module 1">
              <Section moduleNum = "1" sectionNum = "1" sectionTitle = "Section One" excercise = {this.excercise1} />
              <Section moduleNum = "1" sectionNum = "2" sectionTitle = "Section Two" excercise = {this.excercise2} />
            </Module>
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
  )(TestModule)
