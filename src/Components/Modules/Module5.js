import React from 'react'

import InsightsTop5 from '../Exercises/InsightsTop5/InsightsTop5'
import ReflectionsTop5 from '../Exercises/ReflectionsTop5/ReflectionsTop5'
import StrengthsTop5 from '../Exercises/StrengthsTop5/StrengthsTop5'
import ThemesTop5 from '../Exercises/ThemesTop5/ThemesTop5'

import NarrativeCT from '../Exercises/Narrative/NarrativeCT'

import ModuleLayout from './ModuleLayout'

import { EFFECT_EMBODIMENT, EFFECT_IMPEDIMENT } from '../../constants'

import {
  QUES_510_DESC,
  QUES_520_DESC,
  QUES_530_DESC,
  QUES_540_DESC,
  QUES_550_DESC,
  QUES_560_DESC,
  QUES_570_DESC,
  QUES_580_DESC
 } from './Module5Text'

import { MODULES } from './ModuleData'

/* **************************************************
   Used to test components during development
***************************************************** */
export default class Module5 extends React.Component {


  // Define questions and excercises for Module 5

  // Module 5.1.A

  exercise_510 = (
    <NarrativeCT
      question = { { code: 510, text: "Review and revise your Current Situation statement" } }
      promptQuestionCode = { 120 }
      description = { QUES_510_DESC }
      instructions = "Review your responses about what you found most meaningful."
    /> )


  // Module 5.1.B
  exercise_520 = (
    <ThemesTop5
      question = { { code: 520, text: "Add to your Dashboard your key themes" } }
      promptQuestionCodes = { [151, 261, 351, 451] }
      description = { QUES_520_DESC }
      instructions = "Select the top 5 themes that are most important to you."
    /> )

  // Module 5.1.C
  exercise_530 = (
    <NarrativeCT
      question = { { code: 530, text: "Summarize the context of your purpose-seeking life" } }
      promptQuestionCode = { 520 }
      description = { QUES_530_DESC }
      instructions = "Write your summarizing thoughts or directives below."
    /> )

  // Module 5.2.A
   exercise_540 = (
    <InsightsTop5 
      question = { { code: 540, text: "Add to your Dashboard your key insights about meaning." } }
      promptQuestionCodes = { [152, 262, 352, 452] }
      description = { QUES_540_DESC }
      instructions = "Select the top 5 insights that are most useful to you."
    /> )

  // Module 5.2.B
  exercise_550 = (
    <NarrativeCT
      question = { { code: 550, text: "Add to your Dashboard your key insights about your desires." } }
      promptQuestionCode = { 340 }
      description = { QUES_550_DESC }
      instructions = "Review what your desire statement and revise your statement below."
    /> )

  // Strengths
  // Module 5.2.C
  exercise_560 = (
    <StrengthsTop5
      question = { { code: 560, text: "Review your top 5 strengths" } }
      promptQuestionCodes = { [420] }
      description = { QUES_560_DESC }
      instructions = "Select the top 5 that are most useful to you."
    /> )

  // Module 5.2.C
  exercise_570 = (
    <ReflectionsTop5
      question = { { code: 570, text: "Select and review most important embodiment themes" } }
      promptQuestionCodes = { [430] }
      description = { QUES_570_DESC }
      filter = { EFFECT_EMBODIMENT }
      instructions = "Select the top 5 that are most useful to you."
    /> )

  // Module 5.2.C
  exercise_580 = (
    <ReflectionsTop5
      question = { { code: 580, text: "Select and review most important impediment themes" } }
      promptQuestionCodes = { [430] }
      description = { QUES_580_DESC }
      filter = { EFFECT_IMPEDIMENT }
      instructions = "Select the top 5 that are most useful to you."
    /> )
  

  _module = MODULES.filter(m => m.id === 5)[0]

  // interim refactor, needs to be in a DB
  sections =
  [
    {
      id: 510,
      module_id: 5,
      title: "Review and revise your Current Situation statement",
      exercise: this.exercise_510,
    },
    { 
      id: 520,
      module_id: 5,
      title: "Determine your key themes",
      exercise: this.exercise_520,
    },
    {
      id: 530,
      module_id: 5,
      title: "Summarize the themes of your life",
      exercise: this.exercise_530,
    },
    {
      id: 540,
      module_id: 5,
      title: "Determine your key insights about meaning",
      exercise: this.exercise_540
    },
    {
      id: 550,
      module_id: 5,
      title: "Desire statement",
      exercise: this.exercise_550
    },
    {
      id: 560,
      module_id: 5,
      title: "Strengths",
      exercise: this.exercise_560
    },
    {
      id: 570,
      module_id: 5,
      title: "Strength Embodiments",
      exercise: this.exercise_570
    },
    {
      id: 580,
      module_id: 5,
      title: "Strength Impediments",
      exercise: this.exercise_580
    },
    // {
    //   id: 560,
    //   module_id: 5,
    //   title: "Breaking and building",
    //   exercise: this.exercise_560,
    //   section_ids: [161,162,163,164]
    // },
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
