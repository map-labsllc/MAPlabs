import React from 'react'

import QuestionsCT from '../Framework/QuestionsCT'

import LifeDescriptorsCT from '../Exercises/LifeDescriptors/LifeDescriptorsCT'
import TransitionsCT from '../Exercises/Transitions/TransitionsCT'
import NarrativeCT from '../Exercises/Narrative/NarrativeCT'
import ShortAnswersCT from '../Exercises/ShortAnswers/ShortAnswersCT'

import ModuleLayout from './ModuleLayout'

import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
 } from '../../store/answers/constants'

import {
  QUES_110_DESC,
  QUES_120_DESC,
  QUES_130_DESC,
  QUES_140_DESC,
  QUES_150_DESC,
  QUES_160_DESC,
 } from './Module1Text'

import { MODULES } from './ModuleData'

/* **************************************************
   Used to test components during development
***************************************************** */
export default class Module1 extends React.Component {

  // -------------------------
  // Module 1: 2C-F
  exercise_110 = (
    <LifeDescriptorsCT
      question = { { code: 110, text: "Reflect on your current situation" } }
      description = { QUES_110_DESC }
      instructions = "Complete sentences that are important to you."
    /> )


  // -------------------------
  // Module 1: 2F
  exercise_120 = (
    <NarrativeCT
      question = { { code: 120, text: "Describe your current situation" } }
      promptQuestionCode = { 110 }
      description = { QUES_120_DESC }
      instructions = "Using the phrases you chose, as well as the descriptions you created next to each one of them, write a full description of your current state of mind, state of being, and general assessment of your current condition today as you begin MAPmaker."
    /> )


  // -------------------------
  // Module 1: 3B-D
  exercise_130 = (
    <LifeDescriptorsCT
      question = { { code: 130, text: "Imagine your future desired situation" } }
      description = { QUES_130_DESC }
      instructions = "Complete sentences that are important to you."
    /> )


  // -------------------------
  // Module 1: 3E
  exercise_140 = (
    <NarrativeCT
      question = { { code: 140, text: "Describe your future situation" } }
      promptQuestionCode = { 130 }
      description = { QUES_140_DESC }
      instructions = "Using the phrases you chose, as well as the descriptions you created next to each one of them, write a full description of your future desired state of being as you begin MAPmaker. Create this description in your own image capturing how you want to feel, what you will think of your future situation, what will be good and bad, and how you would describe your future self to your current self. "
    /> )


  // -------------------------
  // Module 1: 4A
  shortAnswers_150 = [
    <ShortAnswersCT question = { { code: 151, text: "As you compare the two statements, list the most important overarching themes that impact how meaningful and purposeful your life is." } } />,
    <ShortAnswersCT question = { { code: 152, text: "Which core feelings and experiences are most important to providing you with personal senses of the meaning in your life?" } } />,
    <ShortAnswersCT question = { { code: 153, text: "Name some things beyond yourself that you could serve if you lived with more of your core feelings and experiences." } } />,
    <ShortAnswersCT question = { { code: 154, text: "List the areas of personal growth that will enable your life to be more filled with the core feelings and experiences you desire." } } />,
    <ShortAnswersCT question = { { code: 155, text: "List which relationships that you either currently have or need to develop in the future (to any influence, such as people, groups, practices, experiences, etc.) are most important to supporting your life being lived with more of your core feelings and experiences." } } />,
    <ShortAnswersCT question = { { code: 156, text: "List any areas of engagement or mastery (either in your life’s work or avocationally) that would provide you with more of your core feelings and experiences." } } />,
  ]
  exercise_150 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_SHORT_ANSWERS}
      description = { QUES_150_DESC }
      subComponents = {this.shortAnswers_150}
    /> )


  // -------------------------
  // Module 1: 4B

  transitions_160 = [
    <TransitionsCT question = { { code: 161, text: "Thoughts/Attitudes" } } />,
    <TransitionsCT question = { { code: 162, text: "Behaviors/Actions" } } />,
    <TransitionsCT question = { { code: 163, text: "Goals" } } />,
    <TransitionsCT question = { { code: 164, text: "Commitments" } } />,
  ]
  exercise_160 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_TRANSITIONS}
      description = { QUES_160_DESC }
      subComponents = {this.transitions_160}
    /> )

  _module = MODULES.filter(m => m.id === 1)[0]

  // interim refactor, needs to be in a DB
  sections =
  [
    {
      id: 110,
      module_id: 1,
      title: "Reflect on Your Current Situation",
      exercise: this.exercise_110,
    },
    { 
      id: 120,
      module_id: 1,
      title: "Describe Your Current Situation",
      exercise: this.exercise_120,
    },
    {
      id: 130,
      module_id: 1,
      title: "Imagine Your Future Desired Situation",
      exercise: this.exercise_130,
    },
    {
      id: 140,
      module_id: 1,
      title: "Describe Your Future Situation",
      exercise: this.exercise_140
    },
    {
      id: 150,
      module_id: 1,
      title: "Compare Your 'Current Situation' Statement to Your 'Future Desired Situation' Statement",
      exercise: this.exercise_150,
      section_ids: [151,152,153,154,155,156]
    },
    {
      id: 160,
      module_id: 1,
      title: "Breaking and Building",
      exercise: this.exercise_160,
      section_ids: [161,162,163,164]
    },
  ]

  render() {
    const { moduleId, sectionId } = this.props

    return (
      <ModuleLayout
        title = { this._module.title }
        description= { this._module.description }
        moduleId = { moduleId }
        sections = { this.sections } 
        sectionId = { sectionId }
      >
      </ModuleLayout>
    )
  }
}
