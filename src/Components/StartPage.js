import React from 'react'
import { Col } from 'react-bootstrap'

const StartPage = () => {
  return (
    <div >
      <Col lg={2} md={1} />
      <Col lg={8} md={10} sm={12} style={style.background}>
        <h2 style={style.title}>Welcome to MAPmaker</h2>
        <div>
          <h3>The Module Structure</h3>
          <p>
            MAPmaker is divided into five modules. The modules follow a sequence designed to build up from the basics toward your own personal sense of meaning and purpose.
            Each module focuses on a particular aspect of the developmental process.
        </p>
          <h3>Best Practices and Suggested Approaches</h3>
          <br />
          As you begin the program, think about how you could arrange your calendar over the next few weeks or months to make room for a deep dive into your own personal search. You do not need to put everything on hold. In fact, it may be best not to. What we are ultimately trying to do, after all, is to help you shift how you approach your everyday routine, and staying in it can provide a constant source of valuable fodder for reflection.
          Here are some tips for specific practices and mentalities that can help you to get the most out of MAPmaker:
        <br />
          <br />
          1.	Commit to the process.
        <br />
          One element of the scientific definition of purpose is “commitment.” Even if you do not yet have a sense of purpose, you can commit to the process of searching for it. Practically speaking, this commitment will work best by scheduling time for MAPmaker into your calendar. Everyone’s schedule is different, so try to find the times in your days and weeks that can consistently allow you to engage with this important investment in your future.
        <br />
          <br />
          2.	Promise to be honest with yourself.
        <br />
          This is harder than it sounds.  Chances are that questions about your meaning and purpose have nagged you for a long time, and that you have gotten used to ignoring them and soldiering on with life.  Your default stance may be one of accepting the status quo and allowing your pre-established conceptions to hold root, despite your growing awareness (whether conscious or subconscious) that your old patterns, beliefs, and principles may no longer be sufficient to sustain your growing, evolving self.  But with more honesty, you will likely find new personal insights and understandings that you have consciously or unconsciously avoided.

          Plus, we tend to internalize the voices of other people.  Even in the solitude of our own thoughts, they can quietly dictate what is admissible and what is not.  As you encounter yourself and the questions of meaning and purpose in the exercises, sense what your body is feeling.  Often we experience subtle, nonverbal, physical feelings that indicate the need for further awareness and investigation.  With heightened awareness and honesty we can often find personal truths that are counter to the truths that we have internalized and accepted from others.

          Throughout these modules, you will see the most benefit if you allow yourself to think, speak, and write freely and often. The more time and effort you put into digging into your deeper self, the more revelatory and profound your results will be.  This is particularly true of the moments when your most authentic senses and voices want to challenge the accepted “truths” that you have held. Try to allow yourself to honestly encounter these challenges even if they mean debunking some of the old “truths” that have directed your life to date.
        <br />
          <br />
          3.	Open yourself to new ideas.
        <br />
          Because MAPmaker will expose you to ways of thinking about yourself that you may never have considered before, or that you have previously avoided, it is important to approach the program with a willingness to entertain both new ideas and any old ideas that you may have avoided, but that you now come to understand as informing who you are.

          People who are open to new ideas and experiences have demonstrably higher levels of well-being than those who are not.  Adopting this posture will enhance your efforts of finding meaning and purpose, and it will serve the MAPPERS element of Personal growth.
        <br />
          <br />
          4.	Embrace discomfort.
        <br />
          The exercises might stir up a thought or desire that seems risky, something that makes you feel uncomfortable.  Pay attention to that feeling.  Resist the instinct to make it go away.  Instead, take a step back and think about why you are uncomfortable and what the underlying trigger of the discomfort is.  Often such discomfort arises from a perceived conflict between your deepest sense of personal truth that is being provoked, and a constraint in your life that seems to be at odds with your truth.  Most likely, this personal truth is not going to go away, and resolving the conflict it produces may be a major key to developing more meaning and purpose in your life.

        <br />
          <br />
          5.	Dare to not seek “happiness.”
        <br />
          The point of seeking purpose is flourishing (or as researchers sometimes say, eudaemonic well-being).  It turns out that flourishing does not require the transient state of conventional happiness.  In fact, seeking happiness can divert us from the search for purpose.  But if you find purpose, happiness, and more importantly life satisfaction, will almost certainly follow.

        <br />
          <br />
          6.	Be aware that your search may be difficult for others to understand or contribute to.
        <br />
          In fact, those closest to you may feel threatened, or even blamed, by your desire to seek a change in your life.  Your search for your meaning and purpose is up to you, not others.  So use discretion about who you talk to and what you reveal about your process.  This is especially important early on when your emerging understandings are like young seedlings that are just starting to sprout:  they are easily trampled and impaired by others even when there was no intention to do harm.

          Remember that a key challenge in finding purpose is correcting an imbalance between “self” and “other.”  Only you can know your circumstances, but you may want to wait until after completing some of the program, and establishing a stronger sense of your self-awareness and autonomy, before you share your intentions more broadly.

          At some point, you may find yourself ready to share your experiences.  A benefit of being open with someone else is that it may allow you to be more open with yourself.  And by talking through your journey, you may discover further insight.  But this can happen in due time when your insights and self-understandings are securely anchored and established.
        <br />
          <br />
          7.	To go deeper through journaling.
        <br />
          Most people find new layers of understanding are revealed when they write about the insights they gain from the exercises. Establishing a regular journaling practice will not only benefit you throughout the MAPmaker program as you are examining your life, but will continue to provide insight and accountability after you complete the program. Establishing a journaling routine now will provide immediate and future rewards.
        </div>
      </Col>
      <Col lg={2} md={1} />
    </div>
  )
}
const style = {
  background: {
    content: "",
    backgroundColor: "#25274D",
    color: "#AAABB8"
  },
  columns: {
    backgroundImage: "url('https://images.unsplash.com/photo-1515199967007-46e047fffd71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')"
  },
  title: {
    textAlign: "center",
  },
}
export default StartPage
