import React from 'react'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import Tips from './Tips'
import { isLoggedIn } from '../../store/user/reducer'

const InfoPage = ({ user, isLoggedIn }) => (
  <div className="reading-wrapper">
    <div className="container-fluid text-center reading">

      <h1>Introduction</h1>
      {/* PROGRAM INTRODUCTION */}
      {/* ------------------------------ */}

      <h2 >Welcome to MAPmaker</h2>

      <div className="reading">
        <p>By joining our community of searchers, you have taken a positive step toward a deeper sense of meaning and purpose. Over the next few weeks you will be immersed in a series of exercises designed to help you apply the latest science on well-being in your own life. </p>
        <p>The MAPmaker program will efficiently jumpstart your process of self-discovery. It will lead you to actionable insights about how, when, and where you experience meaning, and guide you through a personal decision-making process that leaves you with deeper self-understanding and a directed vision of how to live more purposefully.  </p>
        <p>Meaning and purpose are not items that can be discovered once-and-for-all like a hidden treasure that was always there just waiting for you. Instead, we are all actively involved in making our meaning everyday, and the meaning we make is foundational to enabling each of us to develop our senses of purpose.</p>
        <p>To arrive at a sense of life purpose, we first must do the work of understanding how, when, and where we make meaning in our lives. We then must use this self-knowledge to develop informed understandings about our purpose, make adjustments to our lives, take intended actions, get feedback from the world and people around us, reflect on our new experiences, refine our understandings, and repeat the process again. Meaning and purpose continue to grow and evolve as we do. Accepting this understanding of meaning and purpose as developmental processes is core to any authentic search, and is foundational to the MAPmaker program.  </p>
        <p>We are delighted that you have chosen to encounter your self, your meaning, and your purpose in a deeper, more intentional way.  In the remainder of this introduction, you will find an overview of the MAPmaker structure, followed by an outline of the core elements of well-being. In closing, we will leave you with a few essential guidelines for ensuring that you get the most out of this self-empowering encounter.</p>
      </div>

      {/* THE MODULE STRUCTURE */}
      {/* ------------------------------ */}

      <h2>The Module Structure</h2>

      <div>
        <p>MAPmaker is divided into five modules. The modules follow a sequence designed to build up from the basics toward your own personal sense of meaning and purpose.</p>
        <p>Each module focuses on a particular aspect of the developmental process.  We begin each module with some instructional content, and then move into a series of exercises. Do them at whatever pace suits you best, and know that this process benefits from the quality and depth of effort you put into the exercises, not the speed at which you complete them.</p>
        <p>The topics covered in each module are:</p>
        <ul>
          <li><i>Module 1: Your Current Status and Future Goals</i> - You will gain clarity on the current landscape of meaning and purpose in your life, and use insights to articulate what you hope to achieve in the future.</li>
          <li><i>Module 2: Your Social Context</i> - You will explore your social context and how it shapes your life. You will be able to specify the most influential aspects of this context, reflect critically on them, and differentiate supporting influences from inhibiting ones.</li>
          <li><i>Module 3: Your Deep Desires</i> - You will dive deeply into your own desires with reference to a wide range of categories (financial, professional, family, etc.) and prioritize among them. You will consider what sorts of goals are most important to you, and what sorts of goals distract you from your most important desires.</li>
          <li><i>Module 4: Your Personal Strengths</i> - Through a scientifically validated assessment, you will discover your top personal strengths.  You will identify how these strengths have been supported and used in your past, and also how they have been hindered in your past, distancing you from meaningful activity and senses of purposefulness.</li>
          <li><i>Module 5: Your MAPmaker Dashboard</i> - Pulling together all that you have discovered to be meaningful, desired, and innately strong within you, you will develop a formalized understanding of what is purposeful, including what you are willing to commit to, what your goals are, and how you envision enacting your life to better serve yourself and something beyond yourself.</li>
        </ul>
      </div>

      {/* THE MAPPERS MODEL */}
      {/* ------------------------------ */}

      <h2>The MAPPERS Model of Well-Being</h2>

      <div>
        <p>There are two primary models of well-being that have grown out of the research. One is by Martin Seligman at the University of Pennsylvania, and the other is by Carol Ryff at the University of Wisconsin, Madison. Between these two models, several building blocks of psychological well-being have been identified and validated through numerous studies over the past few decades. We’ve brought them together into our MAPPERS Model, which is an acronym for:</p>
        <ul>
          <li><i><b>M</b>eaning:</i> Meaning is both your experience of life events that positively align with your personal values, beliefs, and desires, and your ability to understand your world and how you fit into it.</li>
          <li><i><b>A</b>utonomy:</i> This is your “anchor” self that gives you the ability to be self-determining, and a willingness to act independently of contextual influences and social pressures.</li>
          <li><i><b>P</b>ersonal growth:</i> You are continually growing, and you are open to new experiences that lead to more self-knowledge and self-improvement.</li>
          <li><i><b>P</b>urpose in life:</i> This brings your meaning-making values and beliefs to life through life goals, commitments, and a sense of directedness that impacts something beyond yourself.</li>
          <li><i><b>E</b>nvironmental mastery:</i> You know your personal values, beliefs, desires, and strengths, and you are able to manage and master your environment in order to effectively work with, and impact, the opportunities surrounding you.</li>
          <li><i><b>R</b>elationships:</i> Flourishing is about finding the proper balance between self and other. We need others, and need to be needed. But relationships must be positive, supporting, and characterized by mutual trust, concern, and edification.</li>
          <li><i><b>S</b>elf-acceptance:</i> Having a positive attitude toward yourself, and accepting yourself as you are for both your good and bad qualities, is core to well-being. You need to know yourself to assess whether or not you are intrinsically motivated (vs. extrinsically).</li>
        </ul>
        <p>Meaning and purpose are the core drivers and sustainers of long-term well-being. However, each of these building blocks supports and emboldens the others. Although our focus in MAPmaker will be on meaning and purpose, these elements must be considered in the larger context of the MAPPERS Model.</p>
        <p>To help you to achieve greater overall well-being, we have integrated each of these building blocks into the modules of MAPmaker, and we will be returning to them in more depth as the program goes on.</p>
      </div>

      {/* BEST PRACTICES */}
      {/* ------------------------------ */}

      <h2>Best Practices and Suggested Approaches</h2>
      <div>
        <p>Here are some tips for specific practices and mentalities that can help you to get the most out of MAPmaker:</p>
      </div>

      <Tips />

      <div className="text-center">
        { isLoggedIn ?
          <NavLink to="/modules/list" className="btn btn-primary">Continue</NavLink>
          :
          <NavLink className="btn btn-primary" to="/signup">Sign Up</NavLink>
        }
      </div>
    </div >
  </div >
)

const mapStateToProps = state => {
  const { user } = state.userRD
  return {
    user,
    isLoggedIn: isLoggedIn(state.userRD),
  }
}

export default connect(
  mapStateToProps
)(InfoPage)
