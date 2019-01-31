import React from 'react'
import { Col, Row, Panel, PanelGroup } from 'react-bootstrap'


const Dashboard = () => {
  return (
    <div style={style.background}>

      <div className="container-fluid">
        <Row style={style.bigContain}>
          <div className="text-center">
            <h1>Dashboard</h1>
          </div>
          <div style={style.lineUp}>
            <Col md={4} lg={4}>
              <h5>Current Situation M5 **Exercise 1**</h5>
              <div className="container-fluid" style={style.smallContain}><p>Currently sitting in galvanize</p></div>
              <h5>Future Desired Situation M5 **Exercise 1**</h5>
              <div className="container-fluid" style={style.smallContain}><p>THE FUTURE</p></div>
              <h5>Key Themes on Self-Knowlege **M5 Exercise 1**</h5>
              <div className="container-fluid" style={style.smallContain}><p>THEMES</p></div>
              <h5>Summarizing Thoughts or Directives **M5 Excercise 1**</h5>
              <div className="container-fluid" style={style.smallContain}><p>MY THOUGHTS ON THE DIRECTIVES ETC</p></div>
            </Col>
            <Col md={4} lg={4}>
              <PanelGroup accordian bsStyle="primary">
                <Panel eventKey="1">
                  <Panel.Heading>
                    <Panel.Title toggle>Key Themes on Meaning **M5 Exercise 2**  </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    Here lie my Key Themes on Meaning and such here it goes....
                  </Panel.Body>
                </Panel>
                <Panel eventKey="2">
                  <Panel.Heading>
                    <Panel.Title toggle>Desire Statement **M5 Exercise 2**</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    Here is what I desire most in the world
                  </Panel.Body>
                </Panel>
                <Panel eventKey="3">
                  <Panel.Heading>
                    <Panel.Title toggle>Key Strengths **M5 Exercise 2**</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    string... strength... strong..
                  </Panel.Body>
                </Panel>
                <Panel eventKey="4">
                  <Panel.Heading>
                    <Panel.Title toggle>Embodiment Themes **M5 Exercise 2**</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    theme... theme... theme...
                  </Panel.Body>
                </Panel>
                <Panel eventKey="5">
                  <Panel.Heading>
                    <Panel.Title toggle>Impediment Themes **M5 Exercise 2**</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    roadblock, cones, Road Closed.
                  </Panel.Body>
                </Panel>
              </PanelGroup>
            </Col>
            <Col md={4} lg={4}>
              <h5>Key Themes on the Beyond the Self service *****M5 Exercise 3****</h5>
              <div className="container-fluid" style={style.smallContain}><p>THEMS EKSDLJFJGILJGLSDIJGLKDJGLSIDJFGIJSDFIJ</p></div>
              <h5>Summarizing Thoughts or Directives ****M5 Exercise 3 *****</h5>
              <div className="container-fluid" style={style.smallContain}><p>answers go here I believe</p></div>
            </Col>
          </div>
        </Row>
      </div>
    </div >
  )
}

const style = {
  background: {
    backgroundImage: "url('trees.jpg')",
    backgroundSize: "cover",
  },
  bigContain: {
    backgroundColor: "white",
    paddingRight: "2%",
    paddingLeft: "2%",
    paddingTop: "2%",
    paddingBottom: "2%",
    marginTop: "6%",
    marginRight: "3%",
    marginLeft: "3%",
    marginBottom: "4%",
    borderRadius: "10px",
    boxShadow: "5px 5px 50px 10px grey",
  },
  lineUp: {
    display: "inline-block",
  },
  smallContain: {
    color: "black",
    backgroundColor: "#59C3F8",
    opacity: "0.3",
    borderRadius: "25px",

  }

}

export default Dashboard