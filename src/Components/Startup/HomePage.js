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
      <div  className="pageContainer">
        <Jumbotron style={style.jumboimage}>
          <div className="subheader">
            <p className="subText">The science of meaning and purpose.</p>
          </div>
          <div className="headContainer">
            <h1 className="header">
              Discover how to inform, empower, and fulfill your life.
            </h1>
          </div>
          <div style={{marginTop: '3em'}}>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      <p>
                        Visit our website to learn more about us.
                      </p>

                      <Button 
                        variant="primary"
                        href="https://www.map-labs.com/map-maker-core-meaning-and-purpose-program.html"
                        target="_blank"
                        className="btn"
                        variant="light"
                      >
                      Learn more about MAPMaker
                    </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      <p>
                        Find out more about this program
                      </p>
                      <Link className="outline-secondary btn" to="/infopage">Get Started</Link> 
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
              <Card>
                  <Card.Body>
                    <Card.Text>
                      <p>
                        Already have an account?
                      </p>
                      <Link className="btn" to="/login">Login here.</Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
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
