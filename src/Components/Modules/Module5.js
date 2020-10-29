import React from 'react'

import ReflectionsTop5 from '../Exercises/ReflectionsTop5/ReflectionsTop5'
import StrengthsTop5 from '../Exercises/StrengthsTop5/StrengthsTop5'
import Top5ListCT from '../Exercises/Top5List/Top5ListCT'
import NarrativeCT from '../Exercises/Narrative/NarrativeCT'
import ShortAnswersCT from '../Exercises/ShortAnswers/ShortAnswersCT'
import QuestionsCT from '../Framework/QuestionsCT'

import ModuleLayout from './ModuleLayout'

import { EFFECT_EMBODIMENT, EFFECT_IMPEDIMENT } from '../../constants'
import {
  QUESTION_TYPE_TOP_BEYOND_SELF, 
  QUESTION_TYPE_TOP_MEANING,
  QUESTION_TYPE_TOP_THEMES,
  QUESTION_TYPE_TOP_PERSONAL_GROWTH,
  QUESTION_TYPE_TOP_RELATIONSHIPS,
  QUESTION_TYPE_TOP_ENGAGEMENT_MASTERY,
  QUESTION_TYPE_SHORT_ANSWERS
} from '../../store/answers/constants'

import {
  QUES_510_DESC,
  QUES_511_DESC,
  QUES_512_DESC,
  QUES_520_DESC,
  QUES_521_DESC,
  QUES_522_DESC,
  QUES_523_DESC,
  QUES_524_DESC,
  QUES_531_DESC,
  QUES_530_DESC,
  QUES_540_DESC,
  QUES_550_DESC,
  QUES_551_DESC,
  QUES_552_DESC,
  QUES_560_DESC,
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
  exercise_511 = (
    <Top5ListCT
      question = { { code: 511, text: "Add to your Dashboard your key themes" } }
      promptQuestionCodes = { [151, 261, 351, 451] }
      description = { QUES_511_DESC }
      headings = { ['Theme'] }
      question_type={QUESTION_TYPE_TOP_THEMES}
      instructions = "Select the top 5 themes that are most important to you."
    /> )

  // Module 5.1.C
  exercise_512 = (
    <NarrativeCT
      question = { { code: 513, text: "Summarize the context of your purpose-seeking life" } }
      promptQuestionCode = { 520 }
      description = { QUES_512_DESC }
      instructions = "Write your summarizing thoughts or directives below."
    /> )

  // Module 5.2.A
   exercise_520 = (
    <Top5ListCT 
      question = { { code: 520, text: "Add to your Dashboard your key insights about meaning." } }
      promptQuestionCodes = { [152, 262, 352, 452] }
      description = { QUES_540_DESC }      
      headings = { ['Meaning'] }
      question_type={QUESTION_TYPE_TOP_MEANING}
      instructions = "Select the top 5 insights that are most useful to you."
    /> )

  // Module 5.2.B
  exercise_521 = (
    <NarrativeCT
      question = { { code: 521, text: "Add to your Dashboard your key insights about your desires." } }
      promptQuestionCode = { 340 }
      description = { QUES_521_DESC }
      instructions = "Review what your desire statement and revise your statement below."
    /> )

  // Strengths
  // Module 5.2.C
  exercise_522 = (
    <StrengthsTop5
      question = { { code: 522, text: "Review your top 5 strengths" } }
      promptQuestionCodes = { [420] }
      description = { QUES_522_DESC }
      instructions = "Select the top 5 that are most useful to you."
    /> )

  // Module 5.2.C
  exercise_523 = (
    <ReflectionsTop5
      question = { { code: 523, text: "Select and review most important embodiment themes" } }
      promptQuestionCodes = { [430] }
      description = { QUES_523_DESC }
      filter = { EFFECT_EMBODIMENT }
      instructions = "Select the top 5 that are most useful to you."
    /> )

  // Module 5.2.C
  exercise_524 = (
    <ReflectionsTop5
      question = { { code: 524, text: "Select and review most important impediment themes" } }
      promptQuestionCodes = { [430] }
      description = { QUES_524_DESC }
      filter = { EFFECT_IMPEDIMENT }
      instructions = "Select the top 5 that are most useful to you."
    /> )
  
  // Module 5.3.A
  exercise_530 = (
    <Top5ListCT
      question = { { code: 530, text: "Add to your Dashboard your key insights about beyond-the-self service." } }
      promptQuestionCodes = { [153, 263, 353, 453] }
      description = { QUES_530_DESC }
      headings = { ['Beyond-Self-Service']}
      question_type = {QUESTION_TYPE_TOP_BEYOND_SELF}
      instructions = "Review your beyond-the-self service themes to consider how accurately they reflect your current self-knowledge and understanding. "
    /> )

  // Module 5.3.B
  exercise_531 = (
    <NarrativeCT
      question = { { code: 531, text: `Summarize the "what" of your purpose.` } }
      promptQuestionCode = { 530 }
      description = { QUES_531_DESC }
      instructions = "Add any summarizing thoughts or directives that you feel will be helpful to you in the future as a quick reference, reminder, or accountability statement about what you care about and want to serve that is beyond yourself."
    /> )

  // Module 5.4.A
  shortAnswers_540 = [
    <ShortAnswersCT question = { { 
      code: 541, 
      text: "My life is most meaningful when I experience or embrace", 
      placeholder: "Source(s) of meaning" } } />,
    <ShortAnswersCT question = { { 
      code: 542, 
      text: "That is why my greatest desire is to", 
      placeholder: "(Desire)" } } />,
    <ShortAnswersCT question = { { 
      code: 543, 
      text: "by using my", 
      placeholder: "(Strength)" } } />,
    <ShortAnswersCT question = { { 
      code: 544, 
      text: "in service of", 
      placeholder: "(Something or someone beyond the self)"} } />,
  ]

  exercise_540 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_SHORT_ANSWERS}
      description = { QUES_540_DESC }
      subComponents = {this.shortAnswers_540}
    /> )

  // Module 5.5.A
  exercise_550 = (
    <Top5ListCT
      question = { { code: 550, text: "Add to your Dashboard your key commitments about personal growth." } }
      promptQuestionCodes = { [154, 264, 354, 454] }
      description = { QUES_550_DESC }
      headings = { ['Personal Growth']}
      question_type = {QUESTION_TYPE_TOP_PERSONAL_GROWTH}
      instructions = ""
    /> )

  // Module 5.5.B
  exercise_551 = (
    <Top5ListCT
      question = { { code: 551, text: "Add to your Dashboard your key relationships." } }
      promptQuestionCodes = { [155, 265, 355, 455] }
      description = { QUES_551_DESC }
      headings = { ['Relationship']}
      question_type = {QUESTION_TYPE_TOP_RELATIONSHIPS}
      instructions = ""
    /> )

  // Module 5.5.C
  exercise_552 = (
    <Top5ListCT
      question = { { code: 552, text: "Add to your Dashboard your key engagement mastery." } }
      promptQuestionCodes = { [156, 266, 356, 456] }
      description = { QUES_552_DESC }
      headings = { ['Engagement Mastery']}
      question_type = {QUESTION_TYPE_TOP_ENGAGEMENT_MASTERY}
      instructions = ""
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
      id: 511,
      module_id: 5,
      title: "Determine your key themes",
      exercise: this.exercise_511,
    },
    {
      id: 512,
      module_id: 5,
      title: "Summarize the themes of your life",
      exercise: this.exercise_512,
    },
    {
      id: 520,
      module_id: 5,
      title: "Determine your key insights about meaning",
      exercise: this.exercise_540
    },
    {
      id: 521,
      module_id: 5,
      title: "Desire statement",
      exercise: this.exercise_521
    },
    {
      id: 522,
      module_id: 5,
      title: "Strengths",
      exercise: this.exercise_522
    },
    {
      id: 523,
      module_id: 5,
      title: "Strength Embodiments",
      exercise: this.exercise_523
    },
    {
      id: 524,
      module_id: 5,
      title: "Strength Impediments",
      exercise: this.exercise_532
    },
    { 
      id: 530,
      module_id: 5,
      title: "Determine your insights about beyond-the-self service",
      exercise: this.exercise_530,
    },
    {
      id: 531,
      module_id: 5,
      title: "Summarize the themes of your life",
      exercise: this.exercise_531,
    },
    {
      id: 540,
      module_id: 5,
      title: "Personal Life Purpose Statement",
      exercise: this.exercise_540,
    },
    {
      id: 550,
      module_id: 5,
      title: "Personal Growth",
      exercise: this.exercise_550,
    },
    {
      id: 551,
      module_id: 5,
      title: "Relationships",
      exercise: this.exercise_551,
    },
    {
      id: 552,
      module_id: 5,
      title: "Engagement Mastery",
      exercise: this.exercise_552,
    },
    {
      id: 560,
      module_id: 5,
      title: "Build and Break",
      exercise: this.exercise_560,
    },
    {
      id: 561,
      module_id: 5,
      title: "",
      exercise: this.exercise_561,
    },
    {
      id: 570,
      module_id: 5,
      title: "Dashboard",
      exercise: this.exercise_570,
    },
    {
      id: 580,
      module_id: 5,
      title: "MAPPERS Model",
      exercise: this.exercise_580,
    }
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
