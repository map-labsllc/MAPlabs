import React from 'react'
import { Col, Row, Panel, PanelGroup, Grid } from 'react-bootstrap'
import '../../CSS/Dashboard.css'

const Dashboard = () => {
  return (
    <div style={style.backgroundDash} className="container-fluid">
      <Grid className="bigContain">
        <Row >
          <div className="text-center" >
            <h1>Dashboard</h1>
          </div>
          <div className="lineup">
            <Col md={4} lg={4}>
              <h5>Current Situation M5 **Exercise 1**</h5>
              <div className="container-fluid smallContain"><p>Currently sitting in galvanize</p></div>
              <h5>Future Desired Situation M5 **Exercise 1**</h5>
              <div className="container-fluid smallContain" ><p>THE FUTURE</p></div>
              <h5>Key Themes on Self-Knowlege **M5 Exercise 1**</h5>
              <div className="container-fluid smallContain" ><p>THEMES</p></div>
              <h5>Summarizing Thoughts or Directives **M5 Excercise 1**</h5>
              <div className="container-fluid smallContain"><p>MY THOUGHTS ON THE DIRECTIVES ETC</p></div>
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
              <div className="container-fluid smallContain">
                <p>THEMS EKSDLJFJGILJGLSDIJGLKDJGLSIDJFGIJSDFIJ</p>
              </div>
              <h5>Summarizing Thoughts or Directives ****M5 Exercise 3 *****</h5>
              <div className="container-fluid smallContain">
                <p>answers go here I believe</p>
              </div>
              <h5>From the elements you chose, this is your purpose statement ***M5 E4***</h5>
              <div className="container-fluid smallContain">
                <p>My purpose is this</p>
              </div>
              <div>Key commitments about personal growth ****M5 E5***</div>
              <div className="container-fluid smallContain">
                <p>These are my commitments to personal growth</p>
              </div>
              <h5>Key Relationships ****M5 E5***</h5>
              <div className="container-fluid smallContain">
                <p>These are important relations</p>
              </div>
              <h5>Key themes on engagement mastery ***M5 E5***</h5>
              <div className="container-fluid smallContain">
                <p>Engagementssssssss</p>
              </div>
              <h5>Break/Build Commitments</h5>
              <div className="container-fluid smallContain">
                <p>Break these and Build these commitments etc etccc</p>
              </div>
            </Col>
          </div>
        </Row>
      </Grid>
    </div >
  )
}

const style = {
  backgroundDash: {
    backgroundImage: "url('trees.jpg')",
    backgroundSize: "cover",
  },
}

export default Dashboard