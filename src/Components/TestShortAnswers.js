import React from 'react';
import { connect } from 'react-redux';

import ShortAnswersCT from '../Containers/ShortAnswersCT'
import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'
import { getUser } from '../store/user/reducer'
import ModalShortAnswer from './ModalShortAnswer'

import {
  Button,
  Form,
} from 'react-bootstrap';

/* **************************************************
   Used to test components during development
***************************************************** */
class TestShortAnswers extends React.Component {
  constructor(props) {
    super(props);
    //sets up close open and state without modal
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      ready: false,
      show: false,
    }
  }

  // load user data
  componentDidMount = () => {
    const { dispatch, userId } = this.props;
    dispatch(loadAllAnswersAC(userId));
    dispatch(loadAllTransitionsAC(userId));
    dispatch(loadAllStaticdataAC());
  }
  //close and open modal
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  // render!
  render() {

    const isLoading = this.props.isLoading

    return (
      <>
        <p>{((isLoading) ? "loading...." : "")}</p>
        {!isLoading && (
          <>
            <ModalShortAnswer handleShow={this.handleShow}
              handleClose={this.handleClose}
              show={this.state.show}
            />
            {/* <ShortAnswersCT
              question={{ code: 40, text: "ShortAnswers 40 question" }}
              doesHandlePersistence={{ value: false }}
            />
            <hr />
            <ShortAnswersCT
              question={{ code: 41, text: "ShortAnswers 41 question" }}
              doesHandlePersistence={{ value: true }}
            />
            <hr />
            <ShortAnswersCT
              question={{ code: 42, text: "ShortAnswers 42 question" }}
              doesHandlePersistence={{ value: true }} */}
            {/* /> */}
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
)(TestShortAnswers)
