import { MOD_1_DESC } from './Module1Text'
import { MOD_2_DESC } from './Module2Text'
import { MOD_3_DESC } from './Module3Text'
import { MOD_4_DESC } from './Module4Text'
import { MOD_5_DESC } from './Module5Text'

export const MODULES = [
  {
    id: 1,
    title: "Your Meanings and Motivations",
    description: MOD_1_DESC,
    sectionCount: 6  // TODO this should be DB
  },
  {
    id: 2,
    title: "Social Context",
    description: MOD_2_DESC,
    sectionCount: 9  // TODO this should be DB
  },
  {
    id: 3,
    title: "Personal Desires",
    description: MOD_3_DESC,
    sectionCount: 7  // TODO this should be DB
  },
  {
    id: 4,
    title: "Personal Strengths",
    description: MOD_4_DESC,
    sectionCount: 6  // TODO this should be DB
  },
  {
    id: 5,
    title: "Summary",
    description: MOD_5_DESC,
    sectionCount: 6  // TODO this should be DB
  }
]
