import React from "react"
import {
  Navbar,
  Nav,
  NavItem,
  Jumbotron,
  Button,
  Row,
  Col
} from "react-bootstrap"
import { NavLink } from "react-router-dom"

class HomePage extends React.Component {
  render() {
    return (
      <div style={style.container} className="pageContainer">
        {/* <div className="container"> */}
        <Navbar
          style={style.navbar}
          className="navbar"
          bg="light"
          variant="light"
        >
          <Navbar.Brand style={style.homelink} className="homelink" href="/">
            MAPMaker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav variant="pills" className="mr-auto navlinks">
              <NavItem>
                <NavLink style={style.signup} className="signup" to="/signup">
                  Signup
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={style.login} className="login" to="/login">
                  Login
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron style={style.jumboimage}>
          <div className="subheader">
            <p className="subText">The science of meaning and purpose.</p>
          </div>
          <div className="headContainer">
            <h1 className="header">
              Discover how to inform, empower, and fulfill your life.
              <Button
                href="https://www.map-labs.com/map-maker-core-meaning-and-purpose-program.html"
                target="_blank"
                className="infoBtn"
                variant="light"
              >
                Learn more about MAPMaker
                <img
                  style={{ width: "20px", paddingLeft: "5px" }}
                  src="Arrow-Right.svg"
                  alt="info icon"
                />
              </Button>
            </h1>
          </div>
          {/* <h3 className="signupHead" >Reveal your purpose.</h3> */}
          <div className="signupHead">
            {/* <Row className="signupText" >
              <Col>
                <h3>Reveal your purpose.</h3>
              </Col>
            </Row> */}
            <Row className="signupBtn" >
              <Col>
              <h3><Button className="outline-secondary">Get Started</Button></h3> 
              </Col>
            </Row>
            <Row className="loginText" >
              <Col>
                <h4 className="acct">
                  Already have an account?{" "}
                  <a className="loginLink">Login here.</a>
                </h4>
              </Col>
            </Row>
          </div>
          <div style={style.coloroverlay} className="coloroverlay" />
        </Jumbotron>
        {/* </div> */}
      </div>
    )
  }
}

const style = {
  navbar: {
    marginBottom: 0,
    position: "absolute",
    top: "0px",
    left: "0px",
    background: "transparent",
    zIndex: 1,
    height: "100%",
    width: "100%",
    border: "none"
  },
  pageContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
    marginRight: "0px",
    marginLeft: "0px",
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  login: {
    color: "white"
  },
  homelink: {
    color: "white",
    textDecoration: "underline",
    fontSize: "32px",
    fontWeight: "400",
    fontFamily: "'Roboto', sans-serif"
  },
  jumboimage: {
    color: "white",
    backgroundImage: 'url("leaves.jpg")',
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    position: "relative",
    marginBottom: "0px"
  },
  coloroverlay: {
    width: "100%",
    height: "100%",
    background: "#242582",
    opacity: ".7",
    position: "absolute"
  }
}

export default HomePage
