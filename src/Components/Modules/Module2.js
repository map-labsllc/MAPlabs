import React from 'react'

import ModuleCT from '../Framework/ModuleCT'
import SectionCT from '../Framework/SectionCT'
import QuestionsCT from '../Framework/QuestionsCT'

import TransitionsCT from '../Exercises/TransitionsCT'
import NarrativeCT from '../Exercises/NarrativeCT'
import ShortAnswersCT from '../Exercises/ShortAnswersCT'
import InfluencesCT from '../Exercises/InfluencesCT'

import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
 } from '../../store/answers/constants'


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
} from 'react-bootstrap'

/* **************************************************
   Module 2 layout
***************************************************** */
export default class Module2 extends React.Component {


  // Define questions and excercises for Module 3
  // ---------------------------------------------------------------------


  // -------------------------
  // Contextual Influences
  // Module 2: 1A-B
  exercise_210 = (
    <InfluencesCT
      question = { { code: 210, text: "List your most important contextual influences" } }
      description = { QUES_210_DESC }
      instructions = "Choose influences in your life, their beliefs / values, and if they are supportive or inhibiting."
    /> )

    // -------------------------
    // Contextual Influences
    // Module 2: 2B for supportive influences
    exercise_220 = (
      <NarrativeCT
        question = { { code: 220, text: "Choose your most important supportive contextual influences" } }
        promptQuestionCode = { 0 }
        description = { QUES_220_DESC }
        instructions = "Choose your top 5 supportive influences"
      /> )

    // -------------------------
    // Contextual Influences
    // Module 2: 2B for inhibiting influences
    exercise_221 = (
      <NarrativeCT
        question = { { code: 221, text: "Choose your most important inhibiting contextual influences" } }
        promptQuestionCode = { 0 }
        description = { QUES_220_DESC }
        instructions = "Choose your top 5 inhibiting influences"
      /> )


  // -------------------------
  // Module 2: 3A for supportive
  exercise_230 = (
    <NarrativeCT
      question = { { code: 230, text: "Relating Your Values and Beliefs to Those of Your Supportive Influences" } }
      promptQuestionCode = { 220 }
      description = { QUES_230_DESC }
      instructions = { QUES_230_DESC }
    /> )


  // -------------------------
  // Module 2: 3A for inhibiting
  exercise_240 = (
    <NarrativeCT
      question = { { code: 240, text: "Relating Your Values and Beliefs to Those of Your Inhibiting Influences" } }
      promptQuestionCode = { 221 }
      description = { QUES_240_DESC }
      instructions = { QUES_240_DESC }
    /> )


  // -------------------------
  // Module 2: 3B
  exercise_250 = (
    <NarrativeCT
      question = { { code: 250, text: "Synthesize Your Values and Beliefs into a Supportive Self-Acceptance Statement" } }
      promptQuestionCode = { 230 }
      description = { QUES_250_DESC }
      instructions = { QUES_250_DESC }
    /> )

  // -------------------------
  // Module 2: 3C
  exercise_260 = (
    <NarrativeCT
      question = { { code: 260, text: "Synthesize Your Values and Beliefs into a Self-Inhibiting Statement" } }
      promptQuestionCode = { 240 }
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
      questionType = {QUESTION_TYPE_SHORT_ANSWERS}
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
      questionType = {QUESTION_TYPE_TRANSITIONS}
      subComponents = {this.transitions_280}
      description = { QUES_280_DESC }
    /> )


  /* *********************************************************** */
  render() {
    return (
      <ModuleCT
        moduleNum = { 2 }
        moduleTitle = "Your Social Context"
        moduleDescription = { MOD_2_DESC }
      >
        <SectionCT
          moduleNum = { 2 }
          sectionNum = { 210 }
          sectionTitle = "Contextual Influences"
          exercise = {this.exercise_210}
        />
         {/*<SectionCT
          moduleNum = { 2 }
          sectionNum = { 220 }
          sectionTitle = "Top 5 Supportive Influences"
          exercise = {this.exercise_220}
        />
         <SectionCT
          moduleNum = { 2 }
          sectionNum = { 221 }
          sectionTitle = "Top 5 Inhibiting Influences"
          exercise = {this.exercise_221}
        />
        <SectionCT
          moduleNum = { 2 }
          sectionNum = { 230 }
          sectionTitle = "Relating Your Values and Beliefs to Those of Your Influencers, I"
          exercise = {this.exercise_230}
        />
        <SectionCT
          moduleNum = { 2 }
          sectionNum = { 240 }
          sectionTitle = "Relating Your Values and Beliefs to Those of Your Influencers, II"
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
        />*/}
      </ModuleCT>
    )
  }
}
