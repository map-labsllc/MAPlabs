import React from "react"
import {
  Jumbotron,
  Button,
  Row,
  Col,
  Card
} from "react-bootstrap"
import { Link } from "react-router-dom"

class HomePage extends React.Component {
  render() {
    return (
      <div style={style.container} className="pageContainer">
        <Jumbotron style={style.jumboimage}>
          <div className="subheader">
            <p className="subText">The science of meaning and purpose.</p>
          </div>
          <div className="headContainer">
            <h1 className="header">
              Discover how to inform, empower, and fulfill your life.
            </h1>
          </div>
          <div>
            <Row>
              <Col md={4}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Text>
                    Visit our website to learn more about us.
                  </Card.Text>
                  <Button 
                    variant="primary"
                    href="https://www.map-labs.com/map-maker-core-meaning-and-purpose-program.html"
                    target="_blank"
                    className="btn pull-right align-bottom"
                    variant="light"
                  >
                  Learn more about MAPMaker
                  <img
                    style={{ width: "20px", paddingLeft: "5px" }}
                    src="Arrow-Right.svg"
                    alt="info icon"
                  />
                </Button>
                </Card.Body>
              </Card>
              </Col>
              <Col md={4}>
                Find out more about this progrm.
              <h3><Link className="outline-secondary btn" to="/infopage">Get Started</Link></h3> 
              </Col>
              <Col md={4}>
                <h4>
                  Already have an account?
                  <Link className="btn" to="/login">Login here.</Link>
                </h4>
              </Col>
            </Row>
          </div>
          <div style={style.coloroverlay} className="coloroverlay" />
        </Jumbotron>
      </div>
    )
  }
}

const style = {}

export default HomePage
