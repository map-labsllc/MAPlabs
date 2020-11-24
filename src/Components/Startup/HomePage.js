import React from 'react'
import {
  Jumbotron,
  Button,
  Row,
  Col,
  Card
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
  render() {
    return (
      <div className="pageContainer">
        <Jumbotron style={style.jumboimage}>
          <div className="subheader">
            <p className="subText">The science of meaning and purpose.</p>
          </div>
          <div className="headContainer">
            <h1 className="header">
              Discover how to inform, empower, and fulfill your life.
            </h1>
          </div>
          <div style={{ marginTop: '3em' }}>
            <Row>
              <Col md={4}>
                <Card style={style.Card}>
                  <Card.Body>
                    <Card.Text>
                      Visit our website to learn more about us.

                      <Button style={style.CardButton}
                        href="https://www.map-labs.com/map-maker-core-meaning-and-purpose-program.html"
                        target="_blank"
                        className="btn btn-info btn-fill"
                        variant="light"
                      >
                      MAPmaker
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card style={style.Card}>
                  <Card.Body>
                    <Card.Text>
                        Find out more about this program.
                      <Link style={style.CardButton} className="btn btn-info btn-fill" to="/infopage">Get Started</Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card style={style.Card}>
                  <Card.Body>
                    <Card.Text>
                        Already have an account?
                      <Link style={style.CardButton} className="btn btn-info btn-fill" to="/login">Login here.</Link>
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

const style = {
  Card: { minHeight: '160px' },

  CardButton: {
    marginTop: '1em',
    verticalAlign: 'bottom',
    display: 'block'
  }
}

export default HomePage
