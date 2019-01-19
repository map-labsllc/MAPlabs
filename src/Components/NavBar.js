import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap'
import { connect } from 'react-redux';

import {
  loadAllAnswersAC,
  updateAnswersAC,
  persistQuestionAC } from '../store/answers/actions'
import {
  getAnswers,
  setAnswers } from '../store/answers/reducer'

// export default class NavBar extends React.Component {
class NavBar extends React.Component {

  // load static data and user's previous saved responses from db
  componentDidMount() {
    console.log("NavBar::componentDidMount()");
    const { dispatch } = this.props;

    // asynch calls to load from db
    dispatch(loadAllAnswersAC());
    // dispatch(loadAllTransitionsAC());
    // dispatch(loadAllStaticdataAC());
  }

  onclick = (e) => {
    console.log("onClick()");
    if (!this.props.isLoading) {
      const q = 11
      const a = ["11", "11"]
      this.props.dispatch(updateAnswersAC(q, a))
      this.props.dispatch(persistQuestionAC(q, a))
      // The following fails since getAnswers() pulls from store before the updateAC has completed
      // this.props.dispatch(persistQuestionAC(q, getAnswers(this.props.answersRD, q)))
    }
  }

  render() {
    console.log("NavBar::render");
    return (
      <Navbar>
      <p>Status: {this.props.isLoading ? "loading" : "loaded"}</p>
      <p>Answers: {JSON.stringify(this.props.answers)}</p>
      <p>AnswersRD: {JSON.stringify(this.props.answersRD)}</p>
      <Button onClick={this.onclick}>buton</Button>
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

// ==================================================================

// Wrap NavBar in container to get access to dispatch
const mapStateToProps = state => {
  return {
    isLoading: state.answersRD.isLoading,
    answers: getAnswers(state.answersRD, 2),
    answersRD: state.answersRD,
    state
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
