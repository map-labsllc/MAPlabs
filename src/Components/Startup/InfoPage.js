import React from 'react'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import Tips from './Tips'
import { isLoggedIn } from '../../store/user/reducer'

const InfoPage = ({ user, isLoggedIn }) => {

  return (
    <div className="reading-wrapper">
      <div className="container-fluid text-center reading">

        <h1>Introduction</h1> 
        {/* PROGRAM INTRODUCTION */}
        {/* ------------------------------ */}

        <h2 >Welcome to MAP Maker</h2>

        <div className="reading">
          <p>By joining our community of searchers, you have taken a positive step toward a deeper sense of meaning and purpose. Over the next few weeks you will be immersed in a series of exercises designed to help you apply the latest science on well-being in your own life. </p>
          <p>The MAPmaker program will efficiently jumpstart your process of self-discovery. It will lead you to actionable insights about how, when, and where you experience meaning, and guide you through a personal decision-making process that leaves you with deeper self-understanding and a directed vision of how to live more purposefully.  </p>
          <p>Meaning and purpose are not items that can be discovered once-and-for-all like a hidden treasure that was always there just waiting for you. Instead, we are all actively involved in making our meaning everyday, and the meaning we make is foundational to enabling each of us to develop our senses of purpose.</p>
          <p>To arrive at a sense of life purpose, we first must do the work of understanding how, when, and where we make meaning in our lives. We then must use this self-knowledge to develop informed understandings about our purpose, make adjustments to our life, take intended actions, get feedback from the world and people around us, reflect on our new experiences, refine our understandings, and repeat the process again. Meaning and purpose continue to grow and evolve as we do.  A fulfilling life is something that we continually craft for ourselves, not something that we simply discover.</p>
          <p>Accepting this understanding of meaning and purpose as developmental processes is core to any authentic search, and is foundational to the MAPmaker program.  </p>
          <p>We are delighted that you have chosen to encounter your self, your meaning, and your purpose in a deeper, more intentional way.  What follows is an overview of the MAPmaker structure, along with guidelines for ensuring that you get the most out of this self-empowering encounter.</p>
        </div>


        {/* THE MODULE STRUCTURE */}
        {/* ------------------------------ */}

        <h2>The Module Structure</h2>

        <div>
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

        <h2>Best Practices and Suggested Approaches</h2>
        <div>
          <p>As you begin the program, think about how you could arrange your calendar over the next few weeks or months to make room for a deep dive into your own personal search. You do not need to put everything on hold. In fact, it may be best not to. What we are ultimately trying to do, after all, is to help you shift how you approach your everyday routine, and staying in it can provide a constant source of valuable fodder for reflection.</p>
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
}

const mapStateToProps = state => {
  const { user } = state.userRD
  return {
    user,
    isLoggedIn: isLoggedIn(state.userRD),
  }
}

export default connect(
  mapStateToProps
)( InfoPage )

