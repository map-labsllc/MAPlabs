import React from 'react'

import ReflectionsTop5CT from '../Exercises/ReflectionsTop5/ReflectionsTop5CT'
import TransitionsTop from '../Exercises/TransitionsTop/TransitionsTop'

import StrengthsTop5CT from '../Exercises/StrengthsTop5/StrengthsTop5CT'
import Top5ListCT from '../Exercises/Top5List/Top5ListCT'
import NarrativeCT from '../Exercises/Narrative/NarrativeCT'
import ShortAnswersCT from '../Exercises/ShortAnswers/ShortAnswersCT'
import QuestionsCT from '../Framework/QuestionsCT'
import Summary from '../Framework/Summary'
import Mappers from '../Exercises/Mappers/Mappers'
import ModuleLayout from './ModuleLayout'

import { EFFECT_EMBODIMENT, EFFECT_IMPEDIMENT } from '../../constants'
import {
  QUESTION_TYPE_TOP_BEYOND_SELF, 
  QUESTION_TYPE_TOP_MEANING,
  QUESTION_TYPE_TOP_THEMES,
  QUESTION_TYPE_TOP_PERSONAL_GROWTH,
  QUESTION_TYPE_TOP_RELATIONSHIPS,
  QUESTION_TYPE_TOP_ENGAGEMENT_MASTERY,
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TOP_TRANSITIONS
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
  QUES_565_DESC,
  QUES_570_DESC,
  QUES_580_DESC
 } from './Module5Text'

import { MODULES } from './ModuleData'

// Module 5.1.A
export const EXERCISE_510 = (
  <NarrativeCT
    summaryTitle = 'Current Situation'
    question = { { code: 510, text: "Review and revise your Current Situation statement" } }
    promptQuestionCode = { 120 }
    copyPrompt = { true }
    description = { QUES_510_DESC }
    instructions = "Review your responses about what you found most meaningful."
  /> )

// Module 5.1.B
export const EXERCISE_511 = (
  <Top5ListCT
    summaryTitle = 'Key themes on self-knowledge'
    question = { { code: 511, text: "Add to your Dashboard your key themes" } }
    promptQuestionCodes = { [151, 261, 351, 451] }
    description = { QUES_511_DESC }
    headings = { ['Theme'] }
    question_type={QUESTION_TYPE_TOP_THEMES}
    instructions = "Select the top 5 themes that are most important to you."
  /> )

// Module 5.1.C
export const EXERCISE_512 = (
  <NarrativeCT
    summaryTitle = 'Summarizing thoughts or directives'
    question = { { code: 512, text: "Summarize the context of your purpose-seeking life" } }
    promptQuestionCode = { 511 }
    copyPrompt = { false }
    description = { QUES_512_DESC }
    instructions = "Write your summarizing thoughts or directives below."
  /> )

// Module 5.2.A
  export const EXERCISE_520 = (
  <Top5ListCT
    summaryTitle = 'Key themes on meaning'
    question = { { code: 520, text: "Add to your Dashboard your key insights about meaning." } }
    promptQuestionCodes = { [152, 262, 352, 452] }
    description = { QUES_520_DESC }      
    headings = { ['Meaning'] }
    question_type={QUESTION_TYPE_TOP_MEANING}
    instructions = "Select the top 5 insights that are most useful to you."
  /> )

// Module 5.2.B
export const EXERCISE_521 = (
  <NarrativeCT
    summaryTitle = 'Desires statement'
    question = { { code: 521, text: "Add to your Dashboard your key insights about your desires." } }
    promptQuestionCode = { 340 }
    copyPrompt = { true }
    description = { QUES_521_DESC }
    instructions = "Review what your desire statement and revise your statement below."
  /> )

// Strengths
// Module 5.2.C
export const EXERCISE_522 = (
  <StrengthsTop5CT
    summaryTitle = 'Key strengths'
    question = { { code: 522, text: "Review your top 5 strengths" } }
    promptQuestionCodes = { [410] }
    description = { QUES_522_DESC }
    instructions = "Select the top 5 that are most useful to you."
  /> )

// Module 5.2.C
export const EXERCISE_523 = (
  <ReflectionsTop5CT
    summaryTitle = 'Embodiment themes'
    question = { { code: 523, text: "Review your most important embodiment themes" } }
    promptQuestionCode = { 420 }
    description = { QUES_523_DESC }
    filter = { EFFECT_EMBODIMENT }
    instructions = "Select the top 5 that are most useful to you."
  /> )

// Module 5.2.C
export const EXERCISE_524 = (
  <ReflectionsTop5CT
    summaryTitle = 'Impediment themes'
    question = { { code: 524, text: "Select and review most important impediment themes" } }
    promptQuestionCode = { 420 }
    description = { QUES_524_DESC }
    filter = { EFFECT_IMPEDIMENT }
    instructions = "Select the top 5 that are most useful to you."
  /> )

// Module 5.3.A
export const EXERCISE_530 = (
  <Top5ListCT
    summaryTitle = 'Key themes on beyond-the-self service'
    question = { { code: 530, text: "Add to your Dashboard your key insights about beyond-the-self service." } }
    promptQuestionCodes = { [153, 263, 353, 453] }
    description = { QUES_530_DESC }
    headings = { ['Beyond-Self-Service']}
    question_type = {QUESTION_TYPE_TOP_BEYOND_SELF}
    instructions = "Review your beyond-the-self service themes to consider how accurately they reflect your current self-knowledge and understanding. "
  /> )

// Module 5.3.B
export const EXERCISE_531 = (
  <NarrativeCT
    summaryTitle = 'Summarizing Thoughts or Directives.'
    question = { { code: 531, text: `Summarize the "what" of your purpose.` } }
    promptQuestionCode = { 530 }
    copyPrompt = { false }
    description = { QUES_531_DESC }
    instructions = "Add any summarizing thoughts or directives that you feel will be helpful to you in the future as a quick reference, reminder, or accountability statement about what you care about and want to serve that is beyond yourself."
  /> )

// Module 5.4.A
const shortAnswers_540 = [
  <ShortAnswersCT question = { { 
    code: 541, 
    text: "My life is most meaningful when I experience or embrace", 
    placeholder: "Sources of meaning" } } />,
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

export const EXERCISE_540 = (
  <QuestionsCT
    summaryTitle = 'Purpose statement'
    questionType = {QUESTION_TYPE_SHORT_ANSWERS}
    description = { QUES_540_DESC }
    subComponents = {shortAnswers_540}
    showNumbers = { false }
  /> )

// Module 5.5.A
export const EXERCISE_550 = (
  <Top5ListCT
    summaryTitle = 'Key commitments about personal growth'
    question = { { code: 550, text: "Add to your Dashboard your key commitments about personal growth." } }
    promptQuestionCodes = { [154, 264, 354, 454] }
    description = { QUES_550_DESC }
    headings = { ['Personal Growth']}
    question_type = {QUESTION_TYPE_TOP_PERSONAL_GROWTH}
    instructions = ""
  /> )

// Module 5.5.B
export const EXERCISE_551 = (
  <Top5ListCT
    summaryTitle = 'Key relationships'
    question = { { code: 551, text: "Add to your Dashboard your key relationships." } }
    promptQuestionCodes = { [155, 265, 355, 455] }
    description = { QUES_551_DESC }
    headings = { ['Relationship']}
    question_type = {QUESTION_TYPE_TOP_RELATIONSHIPS}
    instructions = ""
  /> )

// Module 5.5.C
export const EXERCISE_552 = (
  <Top5ListCT
    summaryTitle = 'Key themes on engagement mastery'
    question = { { code: 552, text: "Add to your Dashboard your key engagement mastery." } }
    promptQuestionCodes = { [156, 266, 356, 456] }
    description = { QUES_552_DESC }
    headings = { ['Engagement Mastery']}
    question_type = {QUESTION_TYPE_TOP_ENGAGEMENT_MASTERY}
    instructions = ""
  /> )

// Module 5.6.A
const transitions_560 = [
  <TransitionsTop
    question = { { code: 561, text: "Meaning and Motivations" } }
    promptQuestionCodes = { [161,162,163,164, ] }
  />,
  <TransitionsTop
    question = { { code: 562, text: "Social Context" } }
    promptQuestionCodes = { [ 271,272,273,274 ] }
  />,
  <TransitionsTop
    question = { { code: 563, text: "Personal Desires" } }
    promptQuestionCodes = { [ 361,362,363 ] }
  />,
  <TransitionsTop
    question = { { code: 564, text: "Personal Strengths" } }
    promptQuestionCodes = { [ 461, 462, 463, 464 ] }
  />
]

export const EXERCISE_560 = (
  <QuestionsCT
    summaryTitle = 'Break / build commitments'
    showNumbers = { false }
    questionType = {QUESTION_TYPE_TOP_TRANSITIONS}
    description = { QUES_560_DESC }
    subComponents = {transitions_560}
  /> )

// Module 5.6.B
export const EXERCISE_565 = (
  <NarrativeCT
    summaryTitle = 'Desired Future Statement'
    question = { { code: 565, text: "Review and revise your Desired Future Situation statement" } }
    promptQuestionCode = { 140 }
    copyPrompt = { true }
    description = { QUES_565_DESC }
    instructions = "Revise your statement in the box below"
  /> )

// dashboard
const EXERCISE_570 = (
  <Summary
    description = { QUES_570_DESC }
    isDynamic = { false }
    subComponents = {[
      EXERCISE_510,
      EXERCISE_511,
      EXERCISE_512,
      EXERCISE_520,
      EXERCISE_521,
      EXERCISE_522,
      EXERCISE_523,
      EXERCISE_524,
      EXERCISE_530,
      EXERCISE_531,
      EXERCISE_540,
      EXERCISE_550,
      EXERCISE_551,
      EXERCISE_552,
      EXERCISE_560,
      EXERCISE_565, // at top  in spreadsheet
    ]}
  />
)

// mappers
const EXERCISE_580 = (
  <Mappers
    description = { QUES_580_DESC }
    isDynamic = { false }
    moduleId = {5}
    sectionId = {580}
  />
)

export default class Module5 extends React.Component {

  _module = MODULES.filter(m => m.id === 5)[0]

  // interim refactor, needs to be in a DB
  sections =
  [
    {
      id: 510,
      module_id: 5,
      title: "Review and revise your current situation statement",
      exercise: EXERCISE_510,
    },
    { 
      id: 511,
      module_id: 5,
      title: "Determine your key themes",
      exercise: EXERCISE_511,
    },
    {
      id: 512,
      module_id: 5,
      title: "Summarize the themes of your life",
      exercise: EXERCISE_512,
    },
    {
      id: 520,
      module_id: 5,
      title: "Determine your key insights about meaning",
      exercise: EXERCISE_520
    },
    {
      id: 521,
      module_id: 5,
      title: "Desire statement",
      exercise: EXERCISE_521
    },
    {
      id: 522,
      module_id: 5,
      title: "Strengths",
      exercise: EXERCISE_522
    },
    {
      id: 523,
      module_id: 5,
      title: "Strength Embodiments",
      exercise: EXERCISE_523
    },
    {
      id: 524,
      module_id: 5,
      title: "Strength Impediments",
      exercise: EXERCISE_524
    },
    { 
      id: 530,
      module_id: 5,
      title: "Determine your insights about beyond-the-self service",
      exercise: EXERCISE_530,
    },
    {
      id: 531,
      module_id: 5,
      title: "Summarize the themes of your life",
      exercise: EXERCISE_531,
    },
    {
      id: 540,
      module_id: 5,
      title: "Personal Life Purpose Statement",
      exercise: EXERCISE_540,
      section_ids: [541, 542, 543, 544]
    },
    {
      id: 550,
      module_id: 5,
      title: "Personal Growth",
      exercise: EXERCISE_550,
    },
    {
      id: 551,
      module_id: 5,
      title: "Relationships",
      exercise: EXERCISE_551,
    },
    {
      id: 552,
      module_id: 5,
      title: "Engagement Mastery",
      exercise: EXERCISE_552,
    },
    {
      id: 560,
      module_id: 5,
      title: "Building and Breaking",
      exercise: EXERCISE_560,
      section_ids: [561, 562, 563, 564]
    },
    {
      id: 565,
      module_id: 5,
      title: "Desired Future Situation",
      exercise: EXERCISE_565,
    },
    {
      id: 570,
      module_id: 5,
      title: "Dashboard",
      exercise: EXERCISE_570,
      section_ids: [565] // if 565 is done, then this is done
    },
    {
      id: 580,
      module_id: 5,
      title: "MAPPERS Model",
      exercise: EXERCISE_580,
      section_ids: [565] // if 565 is done, then this is done
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
