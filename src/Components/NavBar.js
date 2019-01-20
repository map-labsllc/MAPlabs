import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap'
import { connect } from 'react-redux';

// import {
//   loadAllQuestionsAC,
//   updateQuestionAC,
//   persistQuestionAC } from '../store/answers/actions'
// import { getAnswers } from '../store/answers/reducer'

// import {
//   loadAllTransitionsAC,
//   updateQuestionAC,
//   persistQuestionAC } from '../store/transitions/actions'
// import { getTransitions } from '../store/transitions/reducer'

import { loadAllStaticdataAC } from '../store/staticdata/actions'

// export default class NavBar extends React.Component {
class NavBar extends React.Component {

  // load static data and user's previous saved responses from db
  componentDidMount() {
    console.log("NavBar::componentDidMount()");
    const { dispatch } = this.props;

    // asynch calls to load from db
    // dispatch(loadAllQuestionsAC());
    // dispatch(loadAllTransitionsAC());
    dispatch(loadAllStaticdataAC());
  }

  onclick = (e) => {
    console.log("onClick()");
    if (!this.props.isLoading) {

      // const q = 4
      // const t = [{ from: 'a', to: 'b'},{from: 'up', to: 'down' }]
      // this.props.dispatch(updateQuestionAC(q, t))
      // this.props.dispatch(persistQuestionAC(q, t))

      // const q = 11
      // const a = ["11", "11"]
      // this.props.dispatch(updateQuestionAC(q, a))
      // this.props.dispatch(persistQuestionAC(q, a))
      // The following fails since getAnswers() pulls from store before the updateAC has completed
      // this.props.dispatch(persistQuestionAC(q, getAnswers(this.props.answersRD, q)))
    }
  }

  render() {
    console.log("NavBar::render");
    return (
      <Navbar>

      {/*<p>Status: {this.props.isLoading ? "loading" : "loaded"}</p>
      <p>transition: {JSON.stringify(this.props.transitions)}</p>
      <p>transitionsRD: {JSON.stringify(this.props.transitionsRD)}</p>*/}

      {/*<p>Status: {this.props.isLoading ? "loading" : "loaded"}</p>
      <p>Answers: {JSON.stringify(this.props.answers)}</p>
      <p>AnswersRD: {JSON.stringify(this.props.answersRD)}</p>*/}
      <Button onClick={this.onclick}>button</Button>

      <Navbar.Header>
        <Navbar.Brand>
          <a href="#home">M.A.P.Labs</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#">
          Module 1
        </NavItem>
        <NavItem eventKey={2} href="#">
          Module 2
        </NavItem>
        <NavItem eventKey={2} href="#">
          Module 3
        </NavItem>
        <NavItem eventKey={2} href="#">
          Module 4
        </NavItem>
        <NavItem eventKey={2} href="#">
          Module 5
        </NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Dashboard</MenuItem>
          <MenuItem eventKey={3.2}>Account info</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Log out</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
    )

  }
}

const styles = {
  NavBar
}

// Wrap NavBar in container to get access to dispatch
const mapStateToProps = state => {
  console.log("--- state: ", state);
  return {

  }
}

// const mapStateToProps = state => {
//   console.log("--- state: ", state);
//   return {
//     isLoading: state.transitionsRD.isLoading,
//     transitions: getTransitions(state.transitionsRD, 2),
//     transitionsRD: state.transitionsRD,
//     state
//   }
// }

// const mapStateToProps = state => {
//   return {
//     isLoading: state.answersRD.isLoading,
//     answers: getAnswers(state.answersRD, 2),
//     answersRD: state.answersRD,
//     state
//   }
// }

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
