import React from 'react'
import { Col, Row, Panel, PanelGroup, Grid } from 'react-bootstrap'
import '../../CSS/Dashboard.css'

const Dashboard = () => {
  return (
    <div style={style.backgroundDash}>
      <div style={style.title} className="text-center container-fluid">
        <h2>Dashboard</h2>
      </div>
      <div>
        <img src="dash.png" alt="dash" style={style.dash} />
      </div>
    </div>
    // <div style={style.backgroundDash} className="container-fluid">
    //   <Grid className="bigContain">
    //     <Row >
    //       <div className="text-center" >
    //         <h1>Dashboard</h1>
    //       </div>
    //       <div className="lineup">
    //         <Col md={4} lg={4}>
    //           <h5>Current Situation</h5>
    //           <div className="container-fluid smallContain"><p>Currently I am not satisfied with my job</p></div>
    //           <h5>Future Desired Situation</h5>
    //           <div className="container-fluid smallContain" ><p> To find a career that inspires me and brings me joy</p></div>
    //           <h5>Key Themes on Self-Knowlege</h5>
    //           <div className="container-fluid smallContain" ><p> Inspiration, joy, interest, intelligence</p></div>
    //           <h5>Summarizing Thoughts or Directives</h5>
    //           <div className="container-fluid smallContain"><p>My thoughts on the directives are that they will help me to inspire future generation to pursue a career in the field of education</p></div>
    //         </Col>
    //         <Col md={4} lg={4}>
    //           <PanelGroup accordian bsStyle="primary" style={style.bump}>
    //             <Panel eventKey="1">
    //               <Panel.Heading>
    //                 <Panel.Title toggle>Key Themes on Meaning  </Panel.Title>
    //               </Panel.Heading>
    //               <Panel.Body collapsible>
    //                 I find meaning in inspiring people. I find meaning in showing my skills. I find meaning in making sure that I have a career that makes me happy.
    //               </Panel.Body>
    //             </Panel>
    //             <Panel eventKey="2">
    //               <Panel.Heading>
    //                 <Panel.Title toggle>Desire Statement</Panel.Title>
    //               </Panel.Heading>
    //               <Panel.Body collapsible>
    //                 I desire a career that compensates me for what I am worth.  I desire something that pushes my intelligence.  I desire the one ring.
    //               </Panel.Body>
    //             </Panel>
    //             <Panel eventKey="3">
    //               <Panel.Heading>
    //                 <Panel.Title toggle>Key Strengths</Panel.Title>
    //               </Panel.Heading>
    //               <Panel.Body collapsible>
    //                 One key Strength that I have is my ability to adapt to an ever changing world.
    //               </Panel.Body>
    //             </Panel>
    //             <Panel eventKey="4">
    //               <Panel.Heading>
    //                 <Panel.Title toggle>Embodiment Themes</Panel.Title>
    //               </Panel.Heading>
    //               <Panel.Body collapsible>
    //                 I can search for the right fit.
    //               </Panel.Body>
    //             </Panel>
    //             <Panel eventKey="5">
    //               <Panel.Heading>
    //                 <Panel.Title toggle>Impediment Themes</Panel.Title>
    //               </Panel.Heading>
    //               <Panel.Body collapsible>
    //                 Orcs, goblins, the Mines of Moria.
    //               </Panel.Body>
    //             </Panel>
    //           </PanelGroup>
    //         </Col>
    //         <Col md={4} lg={4}>
    //           <h5>Key Themes on the Beyond the Self Service</h5>
    //           <div className="container-fluid smallContain">
    //             <p>Making sure that I contribute positivly to the world.</p>
    //           </div>
    //           <h5>Summarizing Thoughts or Directives</h5>
    //           <div className="container-fluid smallContain">
    //             <p>Summarizing my thoughts about Directives</p>
    //           </div>
    //           <h5>From the elements you chose, this is your purpose statement</h5>
    //           <div className="container-fluid smallContain">
    //             <p>My purpose is to destroy the one ring by throwing it in the fires of Mordor</p>
    //           </div>
    //           <div>Key commitments about personal growth</div>
    //           <div className="container-fluid smallContain">
    //             <p>I need to realize that in my quest to destroy the one ring I must make sure to accept help from my friends.</p>
    //           </div>
    //           <h5>Key Relationships</h5>
    //           <div className="container-fluid smallContain">
    //             <p>My friends, My family, Middle-Earth</p>
    //           </div>
    //           <h5>Key themes on engagement mastery</h5>
    //           <div className="container-fluid smallContain">
    //             <p>I will engage on engagement by engaging in many different things.</p>
    //           </div>
    //           <h5>Break/Build Commitments</h5>
    //           <div className="container-fluid smallContain">
    //             <p>I plan to break the ring and build a better future for Middle Earth.</p>
    //           </div>
    //         </Col>
    //       </div>
    //     </Row>
    //   </Grid>
    // </div >
  )
}

const style = {
  backgroundDash: {
    backgroundImage: "url('trees.jpg')",
    backgroundSize: "cover",
  },
  title: {
    backgroundColor: "black",
    color: "white",
    marginTop: "2%",
    width: "20%",
    borderRadius: "20px",
    paddingTop: "1px",

  },
  dash: {
    width: "90%",
    marginTop: "1%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "10%",

  },
}

export default Dashboard