import React from 'react'

import ModuleCT from '../Framework/ModuleCT'
import SectionCT from '../Framework/SectionCT'
import QuestionsCT from '../Framework/QuestionsCT'

import StrengthsCT from '../Exercises/Strengths/StrengthsCT'
import StrengthsEmImWrapperCT from '../Exercises/StrengthsEmIm/StrengthsEmImWrapperCT'

// import StrengthsEmImCT from '../Exercises/StrengthsEmIm/StrengthsEmImCT'
import ModuleLayout from './ModuleLayout'
import { MODULES } from './ModuleData'

import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
  QUESTION_TYPE_BRACKET,
  QUESTION_TYPE_STRENGTH,
 } from '../../store/answers/constants'


import {
  QUES_410_DESC,
  QUES_420_DESC,
  QUES_430_DESC,
  QUES_440_DESC,
  QUES_450_DESC,
  QUES_460_DESC,
} from './Module4Text'

import {
} from 'react-bootstrap'

/* **************************************************
   Used to test components during development
***************************************************** */
export default class Module4 extends React.Component {

  // Define questions and excercises for Module 4
  // --------------------------------------------------------------------

  exercise_410 = (
    <StrengthsCT
      question = { { code: 410, text: "Determine your top strengths" } }
      description = { QUES_410_DESC }
      instructions = "Add 5 strengths and select the values from the drop down in order from the survey."
    /> )

  exercise_420 = (
    // note, this exercise is child of 410
    // this could be fixed with a better DB structure
    <StrengthsEmImWrapperCT
      question = { { code: 420, parent_code: 410, text: "Embodiments and Impediments" } }
      description = { QUES_420_DESC }
    /> )

  _module = MODULES.filter(m => m.id === 4)[0]

  // interim refactor, needs to be in a DB
  sections =
  [
    {
      id: 410,
      module_id: 4,
      title: "Determine your Top 5 Strengths",
      exercise: this.exercise_410
    },
    {
      id: 420,
      module_id: 4,
      title: "Embodiments and Impediments",
      exercise: this.exercise_420
    },
    {
      id: 430,
      module_id: 4,
      title: "Top 5 Embodiments of Strength",
      exercise: this.exercise_430
    },
    {
      id: 440,
      module_id: 4,
      title: "Top 5 Impediments of Strength",
      exercise: this.exercise_440
    },
    {
      id: 450,
      module_id: 4,
      title: "Compare your “embodiment” themes to your “impediment” themes.",
      exercise: this.exercise_450
    },
    {
      id: 460,
      module_id: 4,
      title: "Breaking and building",
      exercise: this.exercise_460
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
