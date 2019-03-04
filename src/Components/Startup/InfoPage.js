import React from 'react'
import {
  Button,
  PanelGroup,
  Panel } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const InfoPage = () => {
  return (
    <div style={style.background}>
      <div style={style.title}>
        <h1 >Welcome to <span style={style.map}>M</span><span style={style.map}>A</span><span style={style.map}>P</span>maker</h1>
      </div>
      <div className="container-fluid" style={style.otherContain}>


        {/* PROGRAM INTRODUCTION */}
        {/* ------------------------------ */}

        <div style={style.subtitle} className="container-fluid">
          <h3>Program Introduction</h3>
        </div>
        <div style={style.text} className="container-fluid">
          <p>Welcome to MAPmaker! </p>
          <p>By joining our community of searchers, you have taken a positive step toward a deeper sense of meaning and purpose. Over the next few weeks you will be immersed in a series of exercises designed to help you apply the latest science on well-being in your own life. </p>
          <p>The MAPmaker program will efficiently jumpstart your process of self-discovery. It will lead you to actionable insights about how, when, and where you experience meaning, and guide you through a personal decision-making process that leaves you with deeper self-understanding and a directed vision of how to live more purposefully.  </p>
          <p>Meaning and purpose are not items that can be discovered once-and-for-all like a hidden treasure that was always there just waiting for you. Instead, we are all actively involved in making our meaning everyday, and the meaning we make is foundational to enabling each of us to develop our senses of purpose.</p>
          <p>To arrive at a sense of life purpose, we first must do the work of understanding how, when, and where we make meaning in our lives. We then must use this self-knowledge to develop informed understandings about our purpose, make adjustments to our life, take intended actions, get feedback from the world and people around us, reflect on our new experiences, refine our understandings, and repeat the process again. Meaning and purpose continue to grow and evolve as we do.  A fulfilling life is something that we continually craft for ourselves, not something that we simply discover.</p>
          <p>Accepting this understanding of meaning and purpose as developmental processes is core to any authentic search, and is foundational to the MAPmaker program.  </p>
          <p>We are delighted that you have chosen to encounter your self, your meaning, and your purpose in a deeper, more intentional way.  What follows is an overview of the MAPmaker structure, along with guidelines for ensuring that you get the most out of this self-empowering encounter.</p>
        </div>


        {/* THE MODULE STRUCTURE */}
        {/* ------------------------------ */}

        <div style={style.subtitle} className="container-fluid">
          <h3>The Module Structure</h3>
        </div>
        <div style={style.text} className="container-fluid">
          <p>MAPmaker is divided into five modules. The modules follow a sequence designed to build up from the basics toward your own personal sense of meaning and purpose.</p>
          <p>Each module focuses on a particular aspect of the developmental process.  We begin each module with some instructional content, and then move into a series of exercises. Do them at whatever pace suits you best, and know that this process benefits from the quality and depth of effort you put into the exercises, not the speed at which you complete them.  The main objective is that you do them neither too quickly nor too slowly, but at a pace that best serves your personal exploration.</p>
          <p>The topics covered in each module are:</p>
          <ul>
            <li><i>Module 1: Your Current Status and Future Goals</i> - You will gain clarity on the current status of your search for meaning and purpose, and use insights to articulate what you hope to achieve in the future.</li>
            <li><i>Module 2: Your Social Context</i> - You will explore your social context and how it shapes your life. You will be able to specify the most influential aspects of this context, reflect critically on them, and differentiate supporting influences from inhibiting ones.</li>
            <li><i>Module 3: Your Deep Desires</i> - You will dive deeply into your own desires with reference to a wide range of categories (financial, professional, family, etc.) and prioritize among them. You will consider what sorts of goals are most important to you, and what sorts of goals distract you from your most important desires.</li>
            <li><i>Module 4: Your Personal Strengths</i> - Through a scientifically validated assessment, you will discover your top personal strengths.  You will identify how these strengths have been supported and used in your past, and also how they have been hindered in your past, distancing you from meaningful activity and a sense of purposefulness.</li>
            <li><i>Module 5: Your MAPmaker Dashboard</i> - Pulling together all that you have discovered to be meaningful, desired, and innately strong within you, you will develop a formalized understanding of what is purposeful, including what you are willing to commitment to, what your goals are, and how you envision enacting your life to better serve yourself and something beyond yourself.</li>
          </ul>
        </div>


        {/* BEST PRACTICES */}
        {/* ------------------------------ */}

        <div style={style.subtitle} className="container-fluid">
          <h3>Best Practices and Suggested Approaches</h3>
        </div>
        <div style={style.text} className="container-fluid">
          <p>As you begin the program, think about how you could arrange your calendar over the next few weeks or months to make room for a deep dive into your own personal search. You do not need to put everything on hold. In fact, it may be best not to. What we are ultimately trying to do, after all, is to help you shift how you approach your everyday routine, and staying in it can provide a constant source of valuable fodder for reflection.</p>
          <p>Here are some tips for specific practices and mentalities that can help you to get the most out of MAPmaker:</p>
        </div>
      </div >


      {/* SEVEN TIPS */}
      {/* ------------------------------ */}

      <div className="container-fluid" style={style.panelContain}>

        { /*pass id prop to prevent react runtime warning*/ }
        <PanelGroup id="0" accordian="true" bsStyle="primary" style={style.panel}>

          {/* TIP 1 */}
          <Panel eventKey="1">
            <Panel.Heading >
              <Panel.Title toggle style={style.panelTitle}>1.	Commit to the process.</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible style={style.panelBody}>
              One element of the scientific definition of purpose is “commitment.” Even if you do not yet have a sense of purpose, you can commit to the process of searching for it. Practically speaking, this commitment will work best by scheduling time for MAPmaker into your calendar. Everyone’s schedule is different, so try to find the times in your days and weeks that can consistently allow you to engage with this important investment in your future.
            </Panel.Body>
          </Panel>

          {/* TIP 2 */}
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle style={style.panelTitle}> 2.	Promise to be honest with yourself.</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible style={style.panelBody}>
              <p>This is harder than it sounds.  Chances are that questions about your meaning and purpose have nagged you for a long time, and that you have gotten used to ignoring them and soldiering on with life.  Your default stance may be one of accepting the status quo and allowing your pre-established conceptions to hold root, despite your growing awareness (whether conscious or subconscious) that your old patterns, beliefs, and principles may no longer be sufficient to sustain your growing, evolving self.  But with more honesty, you will likely find new personal insights and understandings that you have consciously or unconsciously avoided.</p>
              <p>Plus, we tend to internalize the voices of other people.  Even in the solitude of our own thoughts, they can quietly dictate what is admissible and what is not.  As you encounter yourself and the questions of meaning and purpose in the exercises, sense what your body is feeling.  Often we experience subtle, nonverbal, physical feelings that indicate the need for further awareness and investigation.  With heightened awareness and honesty we can often find personal truths that are counter to the truths that we have internalized and accepted from others.</p>
              <p>Throughout these modules, you will see the most benefit if you allow yourself to think, speak, and write freely and often. The more time and effort you put into digging into your deeper self, the more revelatory and profound your results will be.  This is particularly true of the moments when your most authentic senses and voices want to challenge the accepted “truths” that you have held. Try to allow yourself to honestly encounter these challenges even if they mean debunking some of the old “truths” that have directed your life to date.</p>
            </Panel.Body>
          </Panel>

          {/* TIP 3 */}
          <Panel eventKey="3">
            <Panel.Heading>
              <Panel.Title toggle style={style.panelTitle}> 3.	Open yourself to new ideas.</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible style={style.panelBody}>
              <p>Because MAPmaker will expose you to ways of thinking about yourself that you may never have considered before, or that you have previously avoided, it is important to approach the program with a willingness to entertain both new ideas and any old ideas that you may have avoided, but that you now come to understand as informing who you are.</p>
              <p>People who are open to new ideas and experiences have demonstrably higher levels of well-being than those who are not.  Adopting this posture will enhance your efforts of finding meaning and purpose, and it will serve the MAPPERS element of Personal growth.</p>
            </Panel.Body>
          </Panel>

          {/* TIP 4 */}
          <Panel eventKey="4">
            <Panel.Heading>
              <Panel.Title toggle style={style.panelTitle}>4.	Embrace discomfort.</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible style={style.panelBody}>
              The exercises might stir up a thought or desire that seems risky, something that makes you feel uncomfortable.  Pay attention to that feeling.  Resist the instinct to make it go away.  Instead, take a step back and think about why you are uncomfortable and what the underlying trigger of the discomfort is.  Often such discomfort arises from a perceived conflict between your deepest sense of personal truth that is being provoked, and a constraint in your life that seems to be at odds with your truth.  Most likely, this personal truth is not going to go away, and resolving the conflict it produces may be a major key to developing more meaning and purpose in your life.
            </Panel.Body>
          </Panel>

          {/* TIP 5 */}
          <Panel eventKey="5">
            <Panel.Heading>
              <Panel.Title toggle style={style.panelTitle}> 5.	Dare to not seek “happiness.”</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible style={style.panelBody}>
              The point of seeking purpose is flourishing (or as researchers sometimes say, eudaemonic well-being).  It turns out that flourishing does not require the transient state of conventional happiness.  In fact, seeking happiness can divert us from the search for purpose.  But if you find purpose, happiness, and more importantly life satisfaction, will almost certainly follow.
            </Panel.Body>
          </Panel>

          {/* TIP 6 */}
          <Panel eventKey="6">
            <Panel.Heading>
              <Panel.Title toggle style={style.panelTitle}>6.	Be aware that your search may be difficult for others to understand or contribute to.</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible style={style.panelBody}>
              <p>In fact, those closest to you may feel threatened, or even blamed, by your desire to seek a change in your life.  Your search for your meaning and purpose is up to you, not others.  So use discretion about who you talk to and what you reveal about your process.  This is especially important early on when your emerging understandings are like young seedlings that are just starting to sprout:  they are easily trampled and impaired by others even when there was no intention to do harm.</p>
              <p>Remember that a key challenge in finding purpose is correcting an imbalance between “self” and “other.”  Only you can know your circumstances, but you may want to wait until after completing some of the program, and establishing a stronger sense of your self-awareness and autonomy, before you share your intentions more broadly.</p>
              <p>At some point, you may find yourself ready to share your experiences.  A benefit of being open with someone else is that it may allow you to be more open with yourself.  And by talking through your journey, you may discover further insight.  But this can happen in due time when your insights and self-understandings are securely anchored and established.</p>
            </Panel.Body>
          </Panel>

          {/* TIP 7 */}
          <Panel eventKey="7">
            <Panel.Heading>
              <Panel.Title toggle style={style.panelTitle}>7.	To go deeper through journaling.</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible style={style.panelBody}>
              <p>Most people find new layers of understanding are revealed when they write about the insights they gain from the exercises. Establishing a regular journaling practice will not only benefit you throughout the MAPmaker program as you are examining your life, but will continue to provide insight and accountability after you complete the program. Establishing a journaling routine now will provide immediate and future rewards.</p>
              <p>If you’d like a little guidance for this writing, you could respond to one of the following prompts when you sit down to journal:</p>
              <ol>
                <li>What was most surprising or revelatory to you about what you did in the previous exercises? </li>
                <li>Did you see something about yourself that you hadn’t been aware of before? </li>
                <li>Did you struggle to articulate a response to any of the prompts? </li>
                <li>Did you feel any fear, anxiety, or heightened emotion that you can now explore in writing to better understand it? </li>
                <li>Did you feel any relief, encouragement, hope, or optimism that you can now explore in writing to better understand it?</li>
              </ol>
            </Panel.Body>
          </Panel>
        </PanelGroup>
      </div>


      {/* BEGIN MAPMAKER */}
      {/* ------------------------------ */}

      <div className="text-center">
        <Button className="startButton"><NavLink to="/modules/1" activeStyle={{
          fontWeight: "bold",
          color: "white"
        }}>Begin MAPMaker</NavLink></Button>
      </div>
    </div >
  )
}
const style = {
  background: {
    backgroundImage: 'url("MAPmaker.jpg")',
    backgroundSize: "cover",
    marginTop: "3%",
    padding: "6px",
    color: "#AAABB8"
  },
  panel: {
    paddingTop: "3%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  panelBody: {
    backgroundColor: "#25274D",
    color: "#AAABB8",
  },
  title: {
    textAlign: "center",
    color: "black",
    fontFamily: "Helvetica",
  },
  panelTitle: {
    textAlign: "center",
    color: "white",
    fontFamily: "Helvetica",
  },
  map: {
    color: "#29648A",
    fontFamily: "Helvetica",
  },
  subtitle: {
    color: "black",
    fontFamily: "Helvetica",
    width: "40%",
    textAlign: "center",
    borderRadius: "10px",
  },
  text: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    color: "black",
    marginLeft: "2%",
    marginRight: "2%",
    paddingRight: "1%",
    paddingLeft: "1%",
  },
  otherContain: {
    backgroundColor: "rgba(174, 198, 239, 0.6)",
    marginLeft: "20%",
    marginRight: '20%',
    borderRadius: '25px',
    paddingBottom: "1%",
    marginBottom: "1%"
  },
  panelContain: {
    backgroundColor: "rgba(174, 198, 239, 0.6)",
    marginLeft: "15%",
    marginRight: '15%',
    borderRadius: '25px',
    paddingBottom: "1%",
    marginBottom: "1%",
  }
}
export default InfoPage
