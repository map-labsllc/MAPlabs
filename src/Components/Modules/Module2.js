import React from 'react'
import { connect } from 'react-redux'
import  { Redirect } from 'react-router-dom'
import Module from '../Framework/Module'
import SectionCT from '../Framework/SectionCT'
import QuestionsCT from '../Framework/QuestionsCT'

import TransitionsCT from '../Exercises/TransitionsCT'
import NarrativeCT from '../Exercises/NarrativeCT'
import ContextualInfluenceGroups from '../Exercises/ContextualInfluenceGroups'
import ContextualInfluencesCT from '../Exercises/ContextualInfluencesCT'
import ShortAnswersCT from '../Exercises/ShortAnswersCT'

import { persistAnswersFromQuestionAC } from '../../store/answers/actions'
import { persistTransitionsFromQuestionAC } from '../../store/transitions/actions'


import { getUser } from '../../store/user/reducer'
import { isLoading } from '../../store/ui/reducer'

import {
  MOD_2_DESC,
  QUES_210_DESC,
  QUES_220_DESC,
  QUES_230_DESC,
  QUES_240_DESC,
  QUES_250_DESC,
  QUES_260_DESC,
  QUES_270_DESC,
  QUES_280_DESC,
} from './Module2Text'

import {
  Button,
  Form,
} from 'react-bootstrap'

/* **************************************************
   Module 2 layout
***************************************************** */
class Module2 extends React.Component {


  // Define questions and excercises for Module 3
  // ---------------------------------------------------------------------


  // -------------------------
  // Replace with new component
  // Module 2: 1A-B
  exercise_210 = (
    <NarrativeCT
      question = { { code: 210, text: "List all of your contextual influences" } }
      promptQuestionCode = { 0 }
      description = { QUES_210_DESC }
      instructions = "Choose influences in your life, their beliefs / values, and if they are supporrtive or inhibiting."
    /> )


  // -------------------------
  // May drop this??
  // Module 2: 2B part 1
  // <ContextualInfluenceGroups
  exercise_220 = (
    <ContextualInfluencesCT
      groups = {[
        {
          code:2201,
          name: "Personal Relationships",
          text: "These are all the individuals who now or in the past have directly influenced you positively, negatively, or both. (Examples: mother, father, step parents, brothers, sisters, grandparents, aunts, uncles, cousins, teachers, coaches, mentors, religious leaders, neighbors, friends from different eras, parents’ friends, camp counselors, bosses, etc…). Feel free to list these or any other personal relationships that have influenced you."},
        {
          code:2202,
          name: "Social Groups/Ideologies",
          text: "Ideologies: These are specific groups to which you belong or have belonged, or schools of thought and ideologies to which you have subscribed. These affiliations can be personally chosen or not. (Examples: schools, colleges, teams, religious communities, thought leaders [such as philosophers, theologians, self-help writers, artists, media personalities], youth groups, clubs, fraternities/sororities, civic organizations, volunteer activities, jobs, companies, affinity groups, etc…). Feel free to list these or any other social groups or ideologies that have influenced you." },
        {
          code:2203,
          name: "Wider Communities and Culture Groups",
          text: "These are also groups to which you belong or have belonged, but the scope is much wider. As a result, the influence may be a bit more indirect. (Examples: cities, towns, states, countries, neighborhoods, ethnicities, genders, socio-economic sectors, educational groups, industries, etc…). Feel free to list these or any other communities or cultural groups that have influenced you."
        }
      ]}
      question = { { code: 220, text: "Rank your supportive influences" } }
      promptQuestionCode = { 0 }
      description = { QUES_220_DESC }
      instructions = ""
    /> )

  // -------------------------
  // May drop this??
  // Module 2: 2B part 2
  exercise_230 = (
    <NarrativeCT
      question = { { code: 230, text: "Rank your inhibiting influences" } }
      promptQuestionCode = { 0 }
      description = { QUES_230_DESC }
      instructions = { QUES_230_DESC }
    /> )


  // -------------------------
  // Replace with new component
  // Module 2: 3A
  exercise_240 = (
    <NarrativeCT
      question = { { code: 240, text: "Relating Your Values and Beliefs to Those of Your Influences" } }
      promptQuestionCode = { 0 } // would need to do something here, maybe an array of promptQuestionCodes like in <Bracket>
      description = { QUES_240_DESC }
      instructions = { QUES_240_DESC }
    /> )


  // -------------------------
  // Module 2: 3B
  exercise_250 = (
    <NarrativeCT
      question = { { code: 250, text: "Synthesize Your Values and Beliefs into a Supportive Self-Acceptance Statement" } }
      promptQuestionCode = { 0 }
      description = { QUES_250_DESC }
      instructions = { QUES_250_DESC }
    /> )

  // -------------------------
  // Module 2: 3C
  exercise_260 = (
    <NarrativeCT
      question = { { code: 260, text: "Synthesize Your Values and Beliefs into a Self-Inhibiting Statement" } }
      promptQuestionCode = { 0 }
      description = { QUES_260_DESC }
      instructions = { QUES_260_DESC }
    /> )

  // -------------------------
  // Module 2: 4A
  shortAnswers_270 = [
    <ShortAnswersCT question={ { code: 271, text: "As you compare the two statements, list the most important overarching themes that impact how meaningful and purposeful your life is." } } />,
    <ShortAnswersCT question={ { code: 272, text: "Which core values and beliefs are most meaningful to you?" } } />,
    <ShortAnswersCT question={ { code: 273, text: "What things beyond yourself could be served if you more intentionally lived by your core values and beliefs?" } } />,
    <ShortAnswersCT question={ { code: 274, text: "What areas of personal growth are needed to fill your life with more of your core values and beliefs?" } } />,
    <ShortAnswersCT question={ { code: 275, text: "Which relationships that you either currently have or need to develop in the future (to any people, groups, practices, experiences, etc.) are most needed to support your core values and beliefs?" } } />,
    <ShortAnswersCT question={ { code: 276, text: "What areas of engagement could your core values and beliefs lead you to master (either in your life’s work or avocationally) in order to create a more meaningful and purposeful life?" } } />,
  ]

  exercise_270 = (
    <QuestionsCT
      persistAC_CB = {persistAnswersFromQuestionAC}
      subComponents = {this.shortAnswers_270}
      description = { QUES_270_DESC }
    /> )


  // -------------------------
  // Module 2: 4B
  transitions_280 = [
    <TransitionsCT question = { { code: 281, text: "Values and Beliefs" } } />,
    <TransitionsCT question = { { code: 282, text: "Primary Influences" } } />,
    <TransitionsCT question = { { code: 283, text: "Relationships" } } />,
    <TransitionsCT question = { { code: 284, text: "Commitments" } } />,
  ]

  exercise_280 = (
    <QuestionsCT
      persistAC_CB = {persistTransitionsFromQuestionAC}
      subComponents = {this.transitions_280}
      description = { QUES_280_DESC }
    /> )


  /* *********************************************************** */
  // render!
  render() {

    const { isLoading } = this.props
    if ( isLoading ) {
      return (
        <>
          <p>.</p>
          <p>.</p>
          <p>Imagine a spinner...</p>
        </>
      )
    }


    return (
      !this.props.token ? <Redirect to="/infopage"/>:
      <>
        <Module
          moduleNum = { 2 }
          moduleTitle = "Your Social Context"
          moduleDescription = { MOD_2_DESC }
        >
          <SectionCT
            moduleNum = { 2 }
            sectionNum = { 210 }
            sectionTitle = "Contextual Influences I"
            exercise = {this.exercise_210}
          />
          <SectionCT
            moduleNum = { 2 }
            sectionNum = { 220 }
            sectionTitle = "Contextual Influences II"
            exercise = {this.exercise_220}
          />
          <SectionCT
            moduleNum = { 2 }
            sectionNum = { 230 }
            sectionTitle = "Contextual Influences III"
            exercise = {this.exercise_230}
          />
          <SectionCT
            moduleNum = { 2 }
            sectionNum = { 240 }
            sectionTitle = "Relating Your Values and Beliefs to Those of You Influencers"
            exercise = {this.exercise_240}
          />
          <SectionCT
            moduleNum = { 2 }
            sectionNum = { 250 }
            sectionTitle = "Synthesize Your Values and Beliefs into a Supportive Self-Acceptance Statement"
            exercise = {this.exercise_250}
          />
          <SectionCT
            moduleNum = { 2 }
            sectionNum = { 260 }
            sectionTitle = "Synthesize Your Values and Beliefs into an Self-Inhibiting Statement"
            exercise = {this.exercise_260}
          />
          <SectionCT
            moduleNum = { 2 }
            sectionNum = { 270 }
            sectionTitle = "Compare your 'Supportive Self-Acceptance' statement to your 'Self-Inhibiting' statement"
            exercise = {this.exercise_270}
          />
          <SectionCT
            moduleNum = { 2 }
            sectionNum = { 280 }
            sectionTitle = "Breaking and building"
            exercise = {this.exercise_280}
          />
        </Module>
      </>


    )
  }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// Wrap in container to get access to store and dispatch
const mapStateToProps = state => {
  return {
    isLoading: isLoading( state ),
    userId: getUser( state.userRD ).user_id,
    token: state.userRD.user.login_token
  }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

const mapDispatchToProps = dispatch => ( {
  dispatch,
} )

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( Module2 )
